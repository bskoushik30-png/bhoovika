import { createHmac, randomUUID } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
//#region node_modules/.nitro/vite/services/ssr/index.js
var lastCapturedError;
var TTL_MS = 5e3;
function record(error) {
	lastCapturedError = {
		error,
		at: Date.now()
	};
}
if (typeof globalThis.addEventListener === "function") {
	globalThis.addEventListener("error", (event) => record(event.error ?? event));
	globalThis.addEventListener("unhandledrejection", (event) => record(event.reason));
}
function consumeLastCapturedError() {
	if (!lastCapturedError) return void 0;
	if (Date.now() - lastCapturedError.at > TTL_MS) {
		lastCapturedError = void 0;
		return;
	}
	const { error } = lastCapturedError;
	lastCapturedError = void 0;
	return error;
}
function renderErrorPage() {
	return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
var AUTH_EMAIL = "bskoushik06@gmail.com";
var AUTH_PASSWORD = "admin@123";
var AUTH_NAME = "Bhoovika Enterprises";
async function fetchSession() {
	const response = await fetch("/api/auth/session", { credentials: "include" });
	if (response.status === 401) return null;
	if (!response.ok) throw new Error("Failed to load session");
	return await response.json();
}
async function signIn(email, password) {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		credentials: "include",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			email,
			password
		})
	});
	if (!response.ok) {
		const text = await response.text();
		throw new Error(text || "Invalid email or password");
	}
	return await response.json();
}
async function signOut() {
	await fetch("/api/auth/logout", {
		method: "POST",
		credentials: "include"
	});
}
var sessionCookieName = "erp_session";
var collectionKeys = [
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
	"activities"
];
var cachedLocalEnv = null;
var serverEntryPromise;
function readLocalEnv() {
	if (cachedLocalEnv) return cachedLocalEnv;
	const files = [".env.local", ".env"];
	const values = {};
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
			values[key] = trimmed.slice(index + 1).trim();
		}
	}
	cachedLocalEnv = values;
	return values;
}
function getRuntimeEnv(name) {
	return process.env[name] || readLocalEnv()[name];
}
function getSessionSecret() {
	return getRuntimeEnv("ERP_SESSION_SECRET") || "change-me-in-production";
}
function createSessionToken() {
	return createHmac("sha256", getSessionSecret()).update(`${AUTH_EMAIL}:${AUTH_PASSWORD}`).digest("hex");
}
function parseCookies(request) {
	const header = request.headers.get("cookie") || "";
	return Object.fromEntries(header.split(";").map((part) => part.trim()).filter(Boolean).map((part) => {
		const index = part.indexOf("=");
		return [part.slice(0, index), decodeURIComponent(part.slice(index + 1))];
	}));
}
function isSecureRequest(request) {
	const forwardedProto = request.headers.get("x-forwarded-proto");
	if (forwardedProto) return forwardedProto.includes("https");
	return new URL(request.url).protocol === "https:";
}
function buildSessionCookie(request, value, maxAge) {
	return `${sessionCookieName}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${isSecureRequest(request) ? "; Secure" : ""}`;
}
function getAuthedUser(request) {
	if (parseCookies(request)[sessionCookieName] !== createSessionToken()) return null;
	return {
		name: AUTH_NAME,
		email: AUTH_EMAIL
	};
}
function json(data, init) {
	return new Response(JSON.stringify(data), {
		...init,
		headers: {
			"content-type": "application/json; charset=utf-8",
			...init?.headers ?? {}
		}
	});
}
function unauthorized(message = "Unauthorized") {
	return new Response(message, { status: 401 });
}
function emptySnapshot() {
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
		activities: []
	};
}
function requireSupabaseConfig() {
	const url = getRuntimeEnv("SUPABASE_URL");
	const key = getRuntimeEnv("SUPABASE_SERVICE_ROLE_KEY");
	if (!url || !key) throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
	return {
		url,
		key
	};
}
async function supabase(path, init) {
	const { url, key } = requireSupabaseConfig();
	const response = await fetch(`${url}/rest/v1/${path}`, {
		...init,
		headers: {
			apikey: key,
			Authorization: `Bearer ${key}`,
			"content-type": "application/json",
			...init?.headers ?? {}
		}
	});
	if (!response.ok) {
		const text = await response.text();
		throw new Error(text || `Supabase request failed: ${response.status}`);
	}
	return response;
}
async function loadErpSnapshot() {
	const rows = await (await supabase("erp_items?select=collection,payload&order=created_at.desc")).json();
	const snapshot = emptySnapshot();
	for (const row of rows) if (collectionKeys.includes(row.collection)) snapshot[row.collection].push(row.payload);
	return snapshot;
}
async function insertErpRecord(collection, payload) {
	if (!collectionKeys.includes(collection)) throw new Error(`Invalid collection: ${collection}`);
	const id = typeof payload === "object" && payload && "id" in payload ? String(payload.id) : randomUUID();
	await supabase("erp_items", {
		method: "POST",
		headers: { Prefer: "return=minimal" },
		body: JSON.stringify({
			id,
			collection,
			payload
		})
	});
}
async function handleApi(request) {
	const url = new URL(request.url);
	if (url.pathname === "/api/auth/session") {
		const user = getAuthedUser(request);
		return user ? json(user) : unauthorized();
	}
	if (url.pathname === "/api/auth/login" && request.method === "POST") {
		const body = await request.json();
		const email = body.email?.trim().toLowerCase() || "";
		const password = body.password?.trim() || "";
		if (email !== "bskoushik06@gmail.com" || password !== "admin@123") return unauthorized("Invalid email or password");
		return json({
			name: AUTH_NAME,
			email: AUTH_EMAIL
		}, { headers: { "set-cookie": buildSessionCookie(request, createSessionToken(), 2592e3) } });
	}
	if (url.pathname === "/api/auth/logout" && request.method === "POST") return new Response(null, {
		status: 204,
		headers: { "set-cookie": buildSessionCookie(request, "", 0) }
	});
	if (!getAuthedUser(request)) return unauthorized();
	if (url.pathname === "/api/erp" && request.method === "GET") return json(await loadErpSnapshot());
	if (url.pathname.startsWith("/api/erp/") && request.method === "POST") {
		await insertErpRecord(url.pathname.replace("/api/erp/", ""), await request.json());
		return json({ ok: true });
	}
	return new Response("Not found", { status: 404 });
}
async function getServerEntry() {
	if (!serverEntryPromise) serverEntryPromise = import("./server-BtQG7yqF.mjs").then((m) => m.default ?? m);
	return serverEntryPromise;
}
async function normalizeCatastrophicSsrResponse(response) {
	if (response.status < 500) return response;
	if (!(response.headers.get("content-type") ?? "").includes("application/json")) return response;
	const body = await response.clone().text();
	if (!body.includes("\"unhandled\":true") || !body.includes("\"message\":\"HTTPError\"")) return response;
	console.error(consumeLastCapturedError() ?? /* @__PURE__ */ new Error(`h3 swallowed SSR error: ${body}`));
	return new Response(renderErrorPage(), {
		status: 500,
		headers: { "content-type": "text/html; charset=utf-8" }
	});
}
var server_default = { async fetch(request, env, ctx) {
	try {
		if (new URL(request.url).pathname.startsWith("/api/")) return await handleApi(request);
		return await normalizeCatastrophicSsrResponse(await (await getServerEntry()).fetch(request, env, ctx));
	} catch (error) {
		console.error(error);
		if (new URL(request.url).pathname.startsWith("/api/")) return new Response(error instanceof Error ? error.message : "Server error", { status: 500 });
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
} };
//#endregion
export { signOut as a, server_default as default, signIn as i, AUTH_NAME as n, renderErrorPage as o, fetchSession as r, AUTH_EMAIL as t };
