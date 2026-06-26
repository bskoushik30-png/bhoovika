import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Leaf, LockKeyhole, Mail } from "lucide-react";
import { AUTH_EMAIL, AUTH_NAME, fetchSession, signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login - Bhoovika Enterprises ERP" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(AUTH_EMAIL);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    void fetchSession().then((session) => {
      if (active && session) {
        void navigate({ to: "/", replace: true });
      }
    }).catch(() => undefined);

    return () => {
      active = false;
    };
  }, [navigate]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(74,124,89,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(205,150,52,0.18),_transparent_35%)]" />
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card/95 p-8 shadow-soft backdrop-blur">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-glow">
            <Leaf className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{AUTH_NAME}</h1>
            <p className="text-sm text-muted-foreground">Sign in to access your ERP workspace</p>
          </div>
        </div>

        <form
          className="space-y-5"
          onSubmit={async (event) => {
            event.preventDefault();
            setSubmitting(true);
            setError("");

            try {
              await signIn(email, password);
              void navigate({ to: "/", replace: true });
            } catch (submitError) {
              setError(submitError instanceof Error ? submitError.message : "Login failed");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9" placeholder={AUTH_EMAIL} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="pl-9" placeholder="Enter your password" />
            </div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="h-10 w-full" disabled={submitting}>{submitting ? "Signing in..." : "Sign in"}</Button>
        </form>
      </div>
    </div>
  );
}
