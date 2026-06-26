import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Wheat,
  ClipboardList,
  Factory,
  Boxes,
  ShoppingCart,
  Receipt,
  Users,
  Truck,
  Wallet,
  BarChart3,
  Settings,
  History,
  Leaf,
} from "lucide-react";
import { AUTH_NAME, type AuthUser } from "@/lib/auth";
import { cn } from "@/lib/utils";

const sections: { label: string; items: { title: string; url: string; icon: any }[] }[] = [
  { label: "Overview", items: [{ title: "Dashboard", url: "/", icon: LayoutDashboard }] },
  {
    label: "Catalog",
    items: [
      { title: "Products", url: "/products", icon: Package },
      { title: "Categories", url: "/categories", icon: FolderTree },
      { title: "Raw Materials", url: "/raw-materials", icon: Wheat },
      { title: "Bill of Materials", url: "/bom", icon: ClipboardList },
    ],
  },
  {
    label: "Operations",
    items: [
      { title: "Production", url: "/production", icon: Factory },
      { title: "Inventory", url: "/inventory", icon: Boxes },
      { title: "Purchase Orders", url: "/purchase-orders", icon: ShoppingCart },
      { title: "Sales", url: "/sales", icon: Receipt },
    ],
  },
  {
    label: "Network",
    items: [
      { title: "Customers", url: "/customers", icon: Users },
      { title: "Suppliers", url: "/suppliers", icon: Truck },
      { title: "Expenses", url: "/expenses", icon: Wallet },
    ],
  },
  {
    label: "Insights",
    items: [
      { title: "Reports", url: "/reports", icon: BarChart3 },
      { title: "Activity Logs", url: "/activity", icon: History },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
];

export function AppSidebar({ user }: { user: AuthUser }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const initials = user.name.slice(0, 2).toUpperCase();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
      <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-glow">
          <Leaf className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-sidebar-foreground">{AUTH_NAME}</div>
          <div className="text-[11px] text-muted-foreground">Organic Foods ERP</div>
        </div>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
        {sections.map((section) => (
          <div key={section.label}>
            <div className="mb-1.5 px-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">{section.label}</div>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.url;

                return (
                  <li key={item.url}>
                    <Link
                      to={item.url}
                      className={cn(
                        "group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-all",
                        active ? "bg-primary/10 text-primary" : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                      )}
                    >
                      <Icon className={cn("h-4 w-4 shrink-0", active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-xs font-semibold text-primary-foreground">{initials}</div>
          <div className="min-w-0 leading-tight">
            <div className="truncate text-sm font-medium text-sidebar-foreground">{user.name}</div>
            <div className="truncate text-[11px] text-muted-foreground">{user.email}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
