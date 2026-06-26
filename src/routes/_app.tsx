import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchSession, signOut, type AuthUser } from "@/lib/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { Topbar } from "@/components/topbar";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const session = await fetchSession();
        if (!active) return;

        if (!session) {
          void navigate({ to: "/login", replace: true });
          return;
        }

        setUser(session);
      } catch (error) {
        console.error(error);
        if (active) {
          void navigate({ to: "/login", replace: true });
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, [navigate]);

  if (loading || !user) {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <AppSidebar user={user} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          user={user}
          onSignOut={async () => {
            await signOut();
            void navigate({ to: "/login", replace: true });
          }}
        />
        <main className="flex-1 px-5 py-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
