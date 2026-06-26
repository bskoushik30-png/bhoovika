import "./lib/error-capture";

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createHmac, randomUUID } from "node:crypto";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { AUTH_EMAIL, AUTH_NAME, AUTH_PASSWORD, type AuthUser } from "./lib/auth";
import type { ErpSnapshot } from "./lib/erp-store";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

type ErpItemRow = {
  collection: keyof ErpSnapshot;
  payload: unknown;
};

const sessionCookieName = "erp_session";
const collectionKeys: (keyof ErpSnapshot)[] = [
  "categories",
  "products",
  "rawMaterials",
  "boms",
  "productionBatches",
  "customers",
  "suppliers",
  "purchaseOrders",
  "sales",
  "expenses",
  "activities",
];
let cachedLocalEnv: Record<string, string> | null = null;
let serverEntryPromise: Promise<ServerEntry> | undefined;

function readLocalEnv() {
  if (cachedLocalEnv) return cachedLocalEnv;

  const files = [".env.local", ".env"];
  const values: Record<string, string> = {};

  for (const file of files) {
    const path = join(process.cwd(), file);
    if (!existsSync(path)) continue;

    const content = readFileSync(path, "utf8");
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const index = trimmed.indexOf("=");
      if (index === -1) continue;
      const key = trimmed.slice(0, index).trim();
      const value = trimmed.slice(index + 1).trim();
      values[key] = value;
    }
  }

  cachedLocalEnv = values;
  return values;
}

function getRuntimeEnv(name: string) {
  return process.env[name] || readLocalEnv()[name];
}

function getSessionSecret() {
  return getRuntimeEnv("ERP_SESSION_SECRET") || "change-me-in-production";
}

function createSessionToken() {
  return createHmac("sha256", getSessionSecret()).update(`${AUTH_EMAIL}:${AUTH_PASSWORD}`).digest("hex");
}

function parseCookies(request: Request) {
  const header = request.headers.get("cookie") || "";
  return Object.fromEntries(
    header
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const index = part.indexOf("=");
        return [part.slice(0, index), decodeURIComponent(part.slice(index + 1))];
      }),
  );
}

function isSecureRequest(request: Request) {
  const forwardedProto = request.headers.get("x-forwarded-proto");
  if (forwardedProto) return forwardedProto.includes("https");
  return new URL(request.url).protocol === "https:";
}

function buildSessionCookie(request: Request, value: string, maxAge: number) {
  const secure = isSecureRequest(request) ? "; Secure" : "";
  return `${sessionCookieName}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

function getAuthedUser(request: Request): AuthUser | null {
  const cookies = parseCookies(request);
  if (cookies[sessionCookieName] !== createSessionToken()) return null;
  return { name: AUTH_NAME, email: AUTH_EMAIL };
}

function json(data: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...(init?.headers ?? {}),
    },
  });
}

function unauthorized(message = "Unauthorized") {
  return new Response(message, { status: 401 });
}

function emptySnapshot(): ErpSnapshot {
  return {
    categories: [],
    products: [],
    rawMaterials: [],
    boms: [],
    productionBatches: [],
    customers: [],
    suppliers: [],
    purchaseOrders: [],
    sales: [],
    expenses: [],
    activities: [],
  };
}

function requireSupabaseConfig() {
  const url = getRuntimeEnv("SUPABASE_URL");
  const key = getRuntimeEnv("SUPABASE_SERVICE_ROLE_KEY");

  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  return { url, key };
}

async function supabase(path: string, init?: RequestInit) {
  const { url, key } = requireSupabaseConfig();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "content-type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Supabase request failed: ${response.status}`);
  }

  return response;
}

async function loadErpSnapshot() {
  const response = await supabase("erp_items?select=collection,payload&order=created_at.desc");
  const rows = (await response.json()) as ErpItemRow[];
  const snapshot = emptySnapshot();

  for (const row of rows) {
    if (collectionKeys.includes(row.collection)) {
      snapshot[row.collection].push(row.payload as never);
    }
  }

  return snapshot;
}

async function insertErpRecord(collection: keyof ErpSnapshot, payload: unknown) {
  if (!collectionKeys.includes(collection)) {
    throw new Error(`Invalid collection: ${collection}`);
  }

  const id = typeof payload === "object" && payload && "id" in (payload as Record<string, unknown>)
    ? String((payload as Record<string, unknown>).id)
    : randomUUID();

  await supabase("erp_items", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ id, collection, payload }),
  });
}

async function handleApi(request: Request) {
  const url = new URL(request.url);

  if (url.pathname === "/api/auth/session") {
    const user = getAuthedUser(request);
    return user ? json(user) : unauthorized();
  }

  if (url.pathname === "/api/auth/login" && request.method === "POST") {
    const body = (await request.json()) as { email?: string; password?: string };
    const email = body.email?.trim().toLowerCase() || "";
    const password = body.password?.trim() || "";

    if (email !== AUTH_EMAIL || password !== AUTH_PASSWORD) {
      return unauthorized("Invalid email or password");
    }

    const user: AuthUser = { name: AUTH_NAME, email: AUTH_EMAIL };
    return json(user, {
      headers: {
        "set-cookie": buildSessionCookie(request, createSessionToken(), 2592000),
      },
    });
  }

  if (url.pathname === "/api/auth/logout" && request.method === "POST") {
    return new Response(null, {
      status: 204,
      headers: {
        "set-cookie": buildSessionCookie(request, "", 0),
      },
    });
  }

  if (!getAuthedUser(request)) {
    return unauthorized();
  }

  if (url.pathname === "/api/erp" && request.method === "GET") {
    return json(await loadErpSnapshot());
  }

  if (url.pathname.startsWith("/api/erp/") && request.method === "POST") {
    const collection = url.pathname.replace("/api/erp/", "") as keyof ErpSnapshot;
    const payload = await request.json();
    await insertErpRecord(collection, payload);
    return json({ ok: true });
  }

  return new Response("Not found", { status: 404 });
}

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      if (url.pathname.startsWith("/api/")) {
        return await handleApi(request);
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      if (new URL(request.url).pathname.startsWith("/api/")) {
        return new Response(error instanceof Error ? error.message : "Server error", { status: 500 });
      }
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
