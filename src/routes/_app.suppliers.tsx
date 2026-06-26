import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { DataTable, type Column } from "@/components/data-table";
import { RecordDialog } from "@/components/record-dialog";
import { createId, fmtCurrency, useErpData, type Supplier } from "@/lib/erp-store";
import { Mail, Phone, Truck } from "lucide-react";

export const Route = createFileRoute("/_app/suppliers")({
  head: () => ({ meta: [{ title: "Suppliers - PureHarvest ERP" }] }),
  component: SuppliersPage,
});

function SuppliersPage() {
  const { suppliers, addSupplier, addActivity } = useErpData();
  const cols: Column<Supplier>[] = [
    { key: "name", header: "Supplier", render: (s) => <div className="flex items-center gap-3"><div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><Truck className="h-4 w-4" /></div><div><div className="font-medium">{s.name}</div><div className="text-xs text-muted-foreground">{s.address}</div></div></div> },
    { key: "contact", header: "Contact", render: (s) => <div className="space-y-0.5 text-xs text-muted-foreground"><div className="flex items-center gap-1.5"><Phone className="h-3 w-3" />{s.phone}</div><div className="flex items-center gap-1.5"><Mail className="h-3 w-3" />{s.email}</div></div> },
    { key: "gst", header: "GST", render: (s) => <span className="font-mono text-xs">{s.gst}</span> },
    { key: "products", header: "Products", align: "right", render: (s) => <span className="tabular-nums">{s.products}</span> },
    { key: "purchases", header: "Total Purchases", align: "right", render: (s) => <span className="font-medium tabular-nums">{fmtCurrency(s.purchases)}</span> },
    { key: "pending", header: "Pending", align: "right", render: (s) => <span className={s.pending > 0 ? "text-warning-foreground tabular-nums" : "text-muted-foreground tabular-nums"}>{fmtCurrency(s.pending)}</span> },
  ];

  return (
    <>
      <PageHeader title="Suppliers" description="Vendor directory, GST details, and pending payments." showFilter showExport>
        <RecordDialog
          title="Add supplier"
          triggerLabel="Add supplier"
          fields={[
            { name: "name", label: "Supplier name", required: true },
            { name: "phone", label: "Phone", type: "tel" },
            { name: "email", label: "Email", type: "email" },
            { name: "gst", label: "GST number" },
            { name: "address", label: "Address", type: "textarea" },
          ]}
          onSubmit={(values) => {
            const supplier: Supplier = { id: createId("SUP"), name: String(values.name), phone: String(values.phone), email: String(values.email), gst: String(values.gst), address: String(values.address), products: 0, purchases: 0, pending: 0 };
            addSupplier(supplier);
            addActivity("Purchase", `${supplier.name} added as supplier`);
          }}
        />
      </PageHeader>
      <DataTable columns={cols} rows={suppliers} empty="No suppliers yet. Add suppliers before creating purchase orders." />
    </>
  );
}
