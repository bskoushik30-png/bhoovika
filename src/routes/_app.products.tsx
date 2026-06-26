import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { DataTable, type Column } from "@/components/data-table";
import { StatusBadge } from "@/components/status-badge";
import { RecordDialog } from "@/components/record-dialog";
import { createId, fmtCurrency, getProductStatus, useErpData, type Product } from "@/lib/erp-store";
import { Package, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/products")({
  head: () => ({ meta: [{ title: "Products - PureHarvest ERP" }] }),
  component: ProductsPage,
});

function ProductsPage() {
  const { products, categories, addProduct, addActivity } = useErpData();

  const columns: Column<Product>[] = [
    {
      key: "name", header: "Product",
      render: (p) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <div className="font-medium">{p.name}</div>
            <div className="text-xs text-muted-foreground">{p.sku} - {p.weight}</div>
          </div>
        </div>
      ),
    },
    { key: "category", header: "Category", render: (p) => <span className="text-muted-foreground">{p.category || "Uncategorized"}</span> },
    { key: "price", header: "Price", align: "right", render: (p) => fmtCurrency(p.price) },
    { key: "cost", header: "Cost", align: "right", render: (p) => <span className="text-muted-foreground">{fmtCurrency(p.cost)}</span> },
    { key: "margin", header: "Margin", align: "right", render: (p) => <span className="text-success font-medium">{p.margin.toFixed(1)}%</span> },
    {
      key: "stock", header: "Stock", align: "right",
      render: (p) => (
        <div>
          <div className="font-medium tabular-nums">{p.stock}</div>
          <div className="text-[11px] text-muted-foreground">min {p.minStock}</div>
        </div>
      ),
    },
    { key: "status", header: "Status", render: (p) => <StatusBadge status={p.status} /> },
    { key: "actions", header: "", align: "right", render: () => <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button> },
  ];

  return (
    <>
      <PageHeader title="Products" description="Finished goods catalog with pricing, stock, and margin at a glance." showFilter showExport>
        <RecordDialog
          title="Add product"
          description="Create a finished good. It will be saved in this browser until you connect a database."
          triggerLabel="Add product"
          fields={[
            { name: "name", label: "Product name", required: true },
            { name: "sku", label: "SKU", required: true },
            { name: "category", label: "Category", type: "select", options: categories.map((c) => c.name) },
            { name: "brand", label: "Brand" },
            { name: "weight", label: "Pack size", placeholder: "500g" },
            { name: "shelfLife", label: "Shelf life", placeholder: "6 months" },
            { name: "price", label: "Selling price", type: "number", required: true },
            { name: "mrp", label: "MRP", type: "number" },
            { name: "cost", label: "Cost", type: "number", required: true },
            { name: "stock", label: "Opening stock", type: "number", defaultValue: 0 },
            { name: "minStock", label: "Minimum stock", type: "number", defaultValue: 0 },
            { name: "maxStock", label: "Maximum stock", type: "number", defaultValue: 0 },
          ]}
          onSubmit={(values) => {
            const price = Number(values.price);
            const cost = Number(values.cost);
            const stock = Number(values.stock);
            const minStock = Number(values.minStock);
            const product: Product = {
              id: createId("PROD"),
              name: String(values.name),
              sku: String(values.sku),
              category: String(values.category),
              brand: String(values.brand),
              weight: String(values.weight),
              price,
              mrp: Number(values.mrp) || price,
              cost,
              stock,
              minStock,
              maxStock: Number(values.maxStock),
              shelfLife: String(values.shelfLife),
              status: getProductStatus(stock, minStock),
              margin: price > 0 ? ((price - cost) / price) * 100 : 0,
            };
            addProduct(product);
            addActivity("Stock", `${product.name} added to products`);
          }}
        />
      </PageHeader>
      <DataTable columns={columns} rows={products} empty="No products yet. Add your first finished good." />
    </>
  );
}
