import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { useErpData } from "@/lib/erp-store";
import { Receipt, Factory, Wallet, ShoppingCart, AlertTriangle, Boxes, Activity } from "lucide-react";

export const Route = createFileRoute("/_app/activity")({
  head: () => ({ meta: [{ title: "Activity Logs - PureHarvest ERP" }] }),
  component: ActivityPage,
});

const ICON: Record<string, any> = { Sale: Receipt, Production: Factory, Stock: Boxes, Purchase: ShoppingCart, Alert: AlertTriangle, Expense: Wallet };

function ActivityPage() {
  const { activities } = useErpData();
  return (
    <>
      <PageHeader title="Activity Logs" description="A trail of actions across the plant." showFilter showExport />
      {activities.length === 0 ? (
        <EmptyState title="No activity yet" description="Actions you take, like creating products or invoices, will appear here." />
      ) : (
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="relative">
            <div className="absolute left-4 top-2 bottom-2 w-px bg-border" />
            <div className="space-y-5">
              {activities.map((a) => {
                const Icon = ICON[a.type] ?? Activity;
                return (
                  <div key={a.id} className="relative flex gap-4 pl-1">
                    <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-card"><Icon className="h-4 w-4" /></div>
                    <div className="flex-1 pt-0.5">
                      <div className="flex flex-wrap items-baseline justify-between gap-2"><span className="text-sm font-medium">{a.message}</span><span className="text-xs text-muted-foreground">{a.time}</span></div>
                      <div className="text-xs text-muted-foreground mt-0.5">{a.type} - by {a.user}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
