export type AuthUser = {
  name: string;
  email: string;
};

export const AUTH_EMAIL = "bskoushik06@gmail.com";
export const AUTH_PASSWORD = "admin@123";
export const AUTH_NAME = "Bhoovika Enterprises";

export async function fetchSession(): Promise<AuthUser | null> {
  const response = await fetch("/api/auth/session", { credentials: "include" });
  if (response.status === 401) return null;
  if (!response.ok) throw new Error("Failed to load session");
  return (await response.json()) as AuthUser;
}

export async function signIn(email: string, password: string) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    credentials: "include",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Invalid email or password");
  }

  return (await response.json()) as AuthUser;
}

export async function signOut() {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
}
