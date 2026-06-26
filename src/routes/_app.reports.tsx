import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import {
  BarChart3, ShoppingCart, Factory, Boxes, Wallet, TrendingUp,
  Users, Truck, Package, AlertTriangle, FileText, Receipt,
} from "lucide-react";

export const Route = createFileRoute("/_app/reports")({
  head: () => ({ meta: [{ title: "Reports — PureHarvest ERP" }] }),
  component: ReportsPage,
});

const reports = [
  { name: "Sales Report", desc: "Revenue, invoices, GST collected", icon: Receipt, color: "#2E7D32" },
  { name: "Purchase Report", desc: "POs raised, materials received", icon: ShoppingCart, color: "#06B6D4" },
  { name: "Production Report", desc: "Batches, yield, downtime", icon: Factory, color: "#8B5CF6" },
  { name: "Inventory Report", desc: "Stock on hand by location", icon: Boxes, color: "#F59E0B" },
  { name: "Manufacturing Cost", desc: "Cost per batch and per unit", icon: BarChart3, color: "#EF4444" },
  { name: "Profit & Loss", desc: "Revenue vs expenses with margin", icon: TrendingUp, color: "#2E7D32" },
  { name: "Inventory Valuation", desc: "FIFO valuation across SKUs", icon: Package, color: "#06B6D4" },
  { name: "Expense Report", desc: "Category-wise expense ledger", icon: Wallet, color: "#F59E0B" },
  { name: "Customer Report", desc: "Top buyers, outstanding, history", icon: Users, color: "#8B5CF6" },
  { name: "Supplier Report", desc: "Vendor purchases & payments", icon: Truck, color: "#06B6D4" },
  { name: "Batch Report", desc: "Production batch traceability", icon: FileText, color: "#2E7D32" },
  { name: "Expiry Report", desc: "Stock approaching expiry", icon: AlertTriangle, color: "#EF4444" },
];

function ReportsPage() {
  return (
    <>
      <PageHeader title="Reports" description="Generate and export ready-made reports as PDF, Excel or CSV." showExport />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((r) => {
          const Icon = r.icon;
          return (
            <button key={r.name} className="text-left group rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-elegant transition-all hover:-translate-y-0.5">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: r.color + "22", color: r.color }}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold group-hover:text-primary transition-colors">{r.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{r.desc}</div>
                </div>
              </div>
              <div className="mt-4 flex gap-1.5">
                <span className="text-[11px] px-2 py-0.5 rounded-md border border-border text-muted-foreground">PDF</span>
                <span className="text-[11px] px-2 py-0.5 rounded-md border border-border text-muted-foreground">Excel</span>
                <span className="text-[11px] px-2 py-0.5 rounded-md border border-border text-muted-foreground">CSV</span>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
