import { Bell, LogOut, Search, Moon, Sun, UserCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { type AuthUser } from "@/lib/auth";
import { useErpData } from "@/lib/erp-store";

export function Topbar({ user, onSignOut }: { user: AuthUser; onSignOut: () => Promise<void> }) {
  const [dark, setDark] = useState(false);
  const { activities } = useErpData();
  const latest = activities.slice(0, 5);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex h-full items-center gap-3 px-5 lg:px-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search products, invoices, customers..."
            className="h-9 w-full rounded-lg border border-border bg-muted/40 pl-9 pr-3 text-sm transition placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg" onClick={() => setDark((d) => !d)}>
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-lg">
                <Bell className="h-4 w-4" />
                {latest.length > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Recent activity</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {latest.length === 0 ? (
                <DropdownMenuItem className="py-2.5 text-xs text-muted-foreground">No activity yet</DropdownMenuItem>
              ) : latest.map((item) => (
                <DropdownMenuItem key={item.id} className="flex flex-col items-start gap-0.5 py-2.5">
                  <div className="flex w-full justify-between gap-2">
                    <span className="text-sm font-medium">{item.type}</span>
                    <span className="text-[11px] text-muted-foreground">{item.time}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.message}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="hidden h-9 items-center gap-2 rounded-lg px-2 sm:inline-flex">
                <UserCircle2 className="h-4 w-4" />
                <span className="max-w-40 truncate text-sm">{user.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => void onSignOut()} className="gap-2">
                <LogOut className="h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
