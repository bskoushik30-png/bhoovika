import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { DataTable, type Column } from "@/components/data-table";
import { StatusBadge } from "@/components/status-badge";
import { RecordDialog } from "@/components/record-dialog";
import { StatCard } from "@/components/stat-card";
import { createId, fmtCurrency, todayIso, useErpData, type ProductionBatch } from "@/lib/erp-store";
import { Factory, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/_app/production")({
  head: () => ({ meta: [{ title: "Production - PureHarvest ERP" }] }),
  component: ProductionPage,
});

function ProductionPage() {
  const { productionBatches, products, boms, addProductionBatch, addActivity } = useErpData();
  const today = todayIso();
  const todayBatches = productionBatches.filter((b) => b.mfgDate === today);
  const unitsToday = todayBatches.reduce((sum, batch) => sum + batch.quantity, 0);
  const inProgress = productionBatches.filter((b) => b.status === "In Progress" || b.status === "Quality Check").length;
  const costToday = todayBatches.reduce((sum, batch) => sum + batch.cost, 0);
  const cols: Column<ProductionBatch>[] = [
    { key: "id", header: "Batch", render: (b) => <span className="font-medium">{b.id}</span> },
    { key: "product", header: "Product" },
    { key: "quantity", header: "Qty", align: "right", render: (b) => <span className="tabular-nums">{b.quantity}</span> },
    { key: "bomVersion", header: "BOM", render: (b) => <span className="text-muted-foreground">{b.bomVersion}</span> },
    { key: "mfgDate", header: "Mfg Date", render: (b) => <span className="text-muted-foreground">{b.mfgDate}</span> },
    { key: "expiry", header: "Expiry", render: (b) => <span className="text-muted-foreground">{b.expiry}</span> },
    { key: "operator", header: "Operator", render: (b) => <span className="text-muted-foreground">{b.operator}</span> },
    { key: "cost", header: "Cost", align: "right", render: (b) => <span className="tabular-nums font-medium">{fmtCurrency(b.cost)}</span> },
    { key: "status", header: "Status", render: (b) => <StatusBadge status={b.status} /> },
  ];

  return (
    <>
      <PageHeader title="Production" description="Create batches, consume raw materials, and track manufacturing cost." showFilter showExport>
        <RecordDialog
          title="New batch"
          triggerLabel="New batch"
          fields={[
            { name: "product", label: "Product", type: "select", required: true, options: products.map((p) => p.name) },
            { name: "quantity", label: "Quantity", type: "number", required: true },
            { name: "bomVersion", label: "BOM version", type: "select", options: boms.map((b) => `${b.product} ${b.version}`) },
            { name: "mfgDate", label: "Manufacturing date", type: "date", defaultValue: today, required: true },
            { name: "expiry", label: "Expiry date", type: "date" },
            { name: "operator", label: "Operator" },
            { name: "cost", label: "Batch cost", type: "number", defaultValue: 0 },
            { name: "status", label: "Status", type: "select", defaultValue: "In Progress", options: ["In Progress", "Quality Check", "Completed", "Cancelled"] },
          ]}
          onSubmit={(values) => {
            const batch: ProductionBatch = { id: createId("PB"), product: String(values.product), quantity: Number(values.quantity), bomVersion: String(values.bomVersion), mfgDate: String(values.mfgDate), expiry: String(values.expiry), operator: String(values.operator), status: String(values.status || "In Progress"), cost: Number(values.cost) };
            addProductionBatch(batch);
            addActivity("Production", `${batch.id} started for ${batch.product}`);
          }}
        />
      </PageHeader>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="Batches today" value={String(todayBatches.length)} icon={Factory} tone="primary" />
        <StatCard label="Units produced" value={String(unitsToday)} icon={CheckCircle2} />
        <StatCard label="In progress" value={String(inProgress)} icon={Clock} tone="info" />
        <StatCard label="Mfg cost today" value={fmtCurrency(costToday)} icon={AlertCircle} tone="warning" />
      </div>
      <DataTable columns={cols} rows={productionBatches} empty="No production batches yet. Create one when you start manufacturing." />
    </>
  );
}
