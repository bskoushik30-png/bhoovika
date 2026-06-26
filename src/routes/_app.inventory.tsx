import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { DataTable, type Column } from "@/components/data-table";
import { StatusBadge } from "@/components/status-badge";
import { fmtCurrency, useErpData, type Product, type RawMaterial } from "@/lib/erp-store";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StatCard } from "@/components/stat-card";
import { Boxes, Package, Wheat } from "lucide-react";

export const Route = createFileRoute("/_app/inventory")({
  head: () => ({ meta: [{ title: "Inventory - PureHarvest ERP" }] }),
  component: InventoryPage,
});

function InventoryPage() {
  const [tab, setTab] = useState("finished");
  const { products, rawMaterials } = useErpData();
  const finishedValue = products.reduce((sum, product) => sum + product.stock * product.cost, 0);
  const rawValue = rawMaterials.reduce((sum, material) => sum + material.quantity * material.avgCost, 0);
  const lowStock = products.filter((p) => p.stock < p.minStock).length + rawMaterials.filter((r) => r.quantity < r.minStock).length;

  const finishedCols: Column<Product>[] = [
    { key: "name", header: "Product", render: (p) => <span className="font-medium">{p.name}</span> },
    { key: "sku", header: "SKU", render: (p) => <span className="text-muted-foreground">{p.sku}</span> },
    { key: "stock", header: "On hand", align: "right", render: (p) => <span className="tabular-nums">{p.stock}</span> },
    { key: "min", header: "Min", align: "right", render: (p) => <span className="text-muted-foreground tabular-nums">{p.minStock}</span> },
    { key: "max", header: "Max", align: "right", render: (p) => <span className="text-muted-foreground tabular-nums">{p.maxStock}</span> },
    { key: "value", header: "Value", align: "right", render: (p) => <span className="tabular-nums font-medium">{fmtCurrency(p.stock * p.cost)}</span> },
    { key: "status", header: "Status", render: (p) => <StatusBadge status={p.status} /> },
  ];

  const rawCols: Column<RawMaterial>[] = [
    { key: "name", header: "Material", render: (r) => <span className="font-medium">{r.name}</span> },
    { key: "batch", header: "Batch", render: (r) => <span className="text-muted-foreground">{r.batch}</span> },
    { key: "quantity", header: "On hand", align: "right", render: (r) => <span className="tabular-nums">{r.quantity} {r.unit}</span> },
    { key: "available", header: "Available", align: "right", render: (r) => <span className="tabular-nums text-success">{r.available} {r.unit}</span> },
    { key: "location", header: "Location", render: (r) => <span className="text-muted-foreground">{r.location}</span> },
    { key: "expiry", header: "Expiry", render: (r) => <span className="text-muted-foreground">{r.expiry}</span> },
    { key: "value", header: "Value", align: "right", render: (r) => <span className="tabular-nums font-medium">{fmtCurrency(r.quantity * r.avgCost)}</span> },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <>
      <PageHeader title="Inventory" description="Live stock across raw materials, packaging, and finished goods." showExport />
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="Total inventory value" value={fmtCurrency(finishedValue + rawValue)} icon={Boxes} tone="primary" />
        <StatCard label="Finished goods" value={fmtCurrency(finishedValue)} icon={Package} />
        <StatCard label="Raw materials" value={fmtCurrency(rawValue)} icon={Wheat} />
        <StatCard label="Low / out of stock" value={`${lowStock} items`} tone="warning" />
      </div>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="finished">Finished Goods</TabsTrigger>
          <TabsTrigger value="raw">Raw Materials</TabsTrigger>
          <TabsTrigger value="packaging">Packaging</TabsTrigger>
        </TabsList>
        <TabsContent value="finished"><DataTable columns={finishedCols} rows={products} empty="No finished goods yet. Add products with opening stock." /></TabsContent>
        <TabsContent value="raw"><DataTable columns={rawCols} rows={rawMaterials} empty="No raw materials yet. Add materials with opening stock." /></TabsContent>
        <TabsContent value="packaging"><div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">Add packaging items as raw materials for now.</div></TabsContent>
      </Tabs>
    </>
  );
}
