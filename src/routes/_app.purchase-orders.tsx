import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { DataTable, type Column } from "@/components/data-table";
import { StatusBadge } from "@/components/status-badge";
import { RecordDialog } from "@/components/record-dialog";
import { createId, fmtCurrency, todayIso, useErpData, type PurchaseOrder } from "@/lib/erp-store";

export const Route = createFileRoute("/_app/purchase-orders")({
  head: () => ({ meta: [{ title: "Purchase Orders - PureHarvest ERP" }] }),
  component: POPage,
});

function POPage() {
  const { purchaseOrders, suppliers, addPurchaseOrder, addActivity } = useErpData();
  const cols: Column<PurchaseOrder>[] = [
    { key: "id", header: "PO #", render: (p) => <span className="font-medium">{p.id}</span> },
    { key: "supplier", header: "Supplier" },
    { key: "date", header: "Order Date", render: (p) => <span className="text-muted-foreground">{p.date}</span> },
    { key: "expected", header: "Expected", render: (p) => <span className="text-muted-foreground">{p.expected}</span> },
    { key: "items", header: "Items", align: "right", render: (p) => <span className="tabular-nums">{p.items}</span> },
    { key: "total", header: "Total", align: "right", render: (p) => <span className="font-medium tabular-nums">{fmtCurrency(p.total)}</span> },
    { key: "payment", header: "Payment", render: (p) => <StatusBadge status={p.payment} /> },
    { key: "receiving", header: "Receiving", render: (p) => <StatusBadge status={p.receiving} /> },
    { key: "status", header: "Status", render: (p) => <StatusBadge status={p.status} /> },
  ];

  return (
    <>
      <PageHeader title="Purchase Orders" description="Order raw materials, track deliveries, and reconcile payments." showFilter showExport>
        <RecordDialog
          title="New purchase order"
          triggerLabel="New PO"
          fields={[
            { name: "supplier", label: "Supplier", type: "select", required: true, options: suppliers.map((s) => s.name) },
            { name: "date", label: "Order date", type: "date", defaultValue: todayIso(), required: true },
            { name: "expected", label: "Expected date", type: "date" },
            { name: "items", label: "Items", type: "number", defaultValue: 1 },
            { name: "total", label: "Total", type: "number", required: true },
            { name: "payment", label: "Payment", type: "select", defaultValue: "Pending", options: ["Pending", "Paid", "Partial"] },
            { name: "receiving", label: "Receiving", type: "select", defaultValue: "Pending", options: ["Pending", "Partial", "Received"] },
            { name: "status", label: "Status", type: "select", defaultValue: "Draft", options: ["Draft", "Confirmed", "Cancelled"] },
          ]}
          onSubmit={(values) => {
            const po: PurchaseOrder = { id: createId("PO"), supplier: String(values.supplier), date: String(values.date), expected: String(values.expected), items: Number(values.items), total: Number(values.total), payment: String(values.payment || "Pending"), status: String(values.status || "Draft"), receiving: String(values.receiving || "Pending") };
            addPurchaseOrder(po);
            addActivity("Purchase", `${po.id} created for ${po.supplier}`);
          }}
        />
      </PageHeader>
      <DataTable columns={cols} rows={purchaseOrders} empty="No purchase orders yet. Add suppliers, then create a PO." />
    </>
  );
}
