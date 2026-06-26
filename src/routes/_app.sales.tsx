import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { DataTable, type Column } from "@/components/data-table";
import { StatusBadge } from "@/components/status-badge";
import { RecordDialog } from "@/components/record-dialog";
import { StatCard } from "@/components/stat-card";
import { createId, fmtCurrency, todayIso, useErpData, type Sale } from "@/lib/erp-store";
import { Receipt, TrendingUp, Clock, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/_app/sales")({
  head: () => ({ meta: [{ title: "Sales - PureHarvest ERP" }] }),
  component: SalesPage,
});

function SalesPage() {
  const { sales, customers, addSale, addActivity } = useErpData();
  const today = todayIso();
  const todaySales = sales.filter((sale) => sale.date === today).reduce((sum, sale) => sum + sale.total, 0);
  const monthSales = sales.filter((sale) => sale.date.slice(0, 7) === today.slice(0, 7)).reduce((sum, sale) => sum + sale.total, 0);
  const outstanding = sales.filter((sale) => sale.payment !== "Paid").reduce((sum, sale) => sum + sale.total, 0);
  const paidInvoices = sales.filter((sale) => sale.payment === "Paid").length;

  const cols: Column<Sale>[] = [
    { key: "id", header: "Invoice", render: (s) => <span className="font-medium">{s.id}</span> },
    { key: "customer", header: "Customer" },
    { key: "date", header: "Date", render: (s) => <span className="text-muted-foreground">{s.date}</span> },
    { key: "items", header: "Items", align: "right", render: (s) => <span className="tabular-nums">{s.items}</span> },
    { key: "subtotal", header: "Subtotal", align: "right", render: (s) => <span className="tabular-nums text-muted-foreground">{fmtCurrency(s.subtotal)}</span> },
    { key: "gst", header: "GST", align: "right", render: (s) => <span className="tabular-nums text-muted-foreground">{fmtCurrency(s.gst)}</span> },
    { key: "total", header: "Total", align: "right", render: (s) => <span className="font-semibold tabular-nums">{fmtCurrency(s.total)}</span> },
    { key: "payment", header: "Payment", render: (s) => <StatusBadge status={s.payment} /> },
    { key: "status", header: "Status", render: (s) => <StatusBadge status={s.status} /> },
  ];

  return (
    <>
      <PageHeader title="Sales" description="Issue invoices, track payments, and print GST-ready receipts." showFilter showExport>
        <RecordDialog
          title="New invoice"
          triggerLabel="New invoice"
          fields={[
            { name: "customer", label: "Customer", type: "select", required: true, options: customers.map((c) => c.name) },
            { name: "date", label: "Date", type: "date", defaultValue: today, required: true },
            { name: "items", label: "Items", type: "number", defaultValue: 1 },
            { name: "subtotal", label: "Subtotal", type: "number", required: true },
            { name: "gst", label: "GST", type: "number", defaultValue: 0 },
            { name: "payment", label: "Payment", type: "select", defaultValue: "Pending", options: ["Paid", "Pending", "Partial"] },
            { name: "status", label: "Status", type: "select", defaultValue: "Sent", options: ["Draft", "Sent", "Completed", "Cancelled"] },
          ]}
          onSubmit={(values) => {
            const subtotal = Number(values.subtotal);
            const gst = Number(values.gst);
            const sale: Sale = { id: createId("INV"), customer: String(values.customer), date: String(values.date), items: Number(values.items), subtotal, gst, total: subtotal + gst, payment: String(values.payment || "Pending"), status: String(values.status || "Sent") };
            addSale(sale);
            addActivity("Sale", `${sale.id} created for ${sale.customer}`);
          }}
        />
      </PageHeader>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="Today's sales" value={fmtCurrency(todaySales)} icon={Receipt} tone="primary" />
        <StatCard label="Month to date" value={fmtCurrency(monthSales)} icon={TrendingUp} />
        <StatCard label="Outstanding" value={fmtCurrency(outstanding)} icon={Clock} tone="warning" />
        <StatCard label="Paid invoices" value={String(paidInvoices)} icon={CheckCircle2} />
      </div>
      <DataTable columns={cols} rows={sales} empty="No invoices yet. Add customers, then create your first invoice." />
    </>
  );
}
