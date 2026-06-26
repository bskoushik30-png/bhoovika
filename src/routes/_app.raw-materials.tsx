import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { DataTable, type Column } from "@/components/data-table";
import { StatusBadge } from "@/components/status-badge";
import { RecordDialog } from "@/components/record-dialog";
import { createId, fmtCurrency, getRawMaterialStatus, useErpData, type RawMaterial } from "@/lib/erp-store";
import { Wheat } from "lucide-react";

export const Route = createFileRoute("/_app/raw-materials")({
  head: () => ({ meta: [{ title: "Raw Materials - PureHarvest ERP" }] }),
  component: RawMaterialsPage,
});

function RawMaterialsPage() {
  const { rawMaterials, suppliers, addRawMaterial, addActivity } = useErpData();
  const cols: Column<RawMaterial>[] = [
    {
      key: "name", header: "Material",
      render: (r) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Wheat className="h-5 w-5" /></div>
          <div>
            <div className="font-medium">{r.name}</div>
            <div className="text-xs text-muted-foreground">Batch {r.batch || "-"}</div>
          </div>
        </div>
      ),
    },
    { key: "quantity", header: "Stock", align: "right", render: (r) => <span className="font-medium tabular-nums">{r.quantity} {r.unit}</span> },
    { key: "reserved", header: "Reserved", align: "right", render: (r) => <span className="text-muted-foreground tabular-nums">{r.reserved} {r.unit}</span> },
    { key: "available", header: "Available", align: "right", render: (r) => <span className="text-success font-medium tabular-nums">{r.available} {r.unit}</span> },
    { key: "price", header: "Price", align: "right", render: (r) => `${fmtCurrency(r.price)}/${r.unit}` },
    { key: "supplier", header: "Supplier", render: (r) => <span className="text-muted-foreground">{r.supplier}</span> },
    { key: "expiry", header: "Expiry", render: (r) => <span className="text-muted-foreground">{r.expiry}</span> },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <>
      <PageHeader title="Raw Materials" description="Track every ingredient with batches, expiry, and supplier links." showFilter showExport>
        <RecordDialog
          title="Add material"
          triggerLabel="Add material"
          fields={[
            { name: "name", label: "Material name", required: true },
            { name: "unit", label: "Unit", type: "select", required: true, defaultValue: "kg", options: ["kg", "g", "ltr", "ml", "pcs"] },
            { name: "quantity", label: "Quantity", type: "number", defaultValue: 0 },
            { name: "reserved", label: "Reserved", type: "number", defaultValue: 0 },
            { name: "price", label: "Purchase price", type: "number", defaultValue: 0 },
            { name: "avgCost", label: "Average cost", type: "number", defaultValue: 0 },
            { name: "supplier", label: "Supplier", type: "select", options: suppliers.map((s) => s.name) },
            { name: "minStock", label: "Minimum stock", type: "number", defaultValue: 0 },
            { name: "location", label: "Location" },
            { name: "expiry", label: "Expiry date", type: "date" },
            { name: "batch", label: "Batch" },
          ]}
          onSubmit={(values) => {
            const quantity = Number(values.quantity);
            const reserved = Number(values.reserved);
            const minStock = Number(values.minStock);
            const material: RawMaterial = {
              id: createId("RM"),
              name: String(values.name),
              unit: String(values.unit || "kg"),
              quantity,
              reserved,
              available: Math.max(quantity - reserved, 0),
              price: Number(values.price),
              avgCost: Number(values.avgCost) || Number(values.price),
              supplier: String(values.supplier),
              minStock,
              location: String(values.location),
              expiry: String(values.expiry),
              batch: String(values.batch),
              status: getRawMaterialStatus(quantity, minStock, String(values.expiry)),
            };
            addRawMaterial(material);
            addActivity("Stock", `${material.name} added to raw materials`);
          }}
        />
      </PageHeader>
      <DataTable columns={cols} rows={rawMaterials} empty="No raw materials yet. Add ingredients and packaging stock here." />
    </>
  );
}
