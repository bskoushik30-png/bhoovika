import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { RecordDialog } from "@/components/record-dialog";
import { createId, fmtCurrency, useErpData, type Bom } from "@/lib/erp-store";
import { ClipboardList, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_app/bom")({
  head: () => ({ meta: [{ title: "Bill of Materials - PureHarvest ERP" }] }),
  component: BomPage,
});

function BomPage() {
  const { boms, products, rawMaterials, addBom, addActivity } = useErpData();

  return (
    <>
      <PageHeader title="Bill of Materials" description="Recipes, costing, and profit per finished product.">
        <RecordDialog
          title="New BOM"
          description="Start with one ingredient. You can expand this into a full editor when the backend is connected."
          triggerLabel="New BOM"
          fields={[
            { name: "product", label: "Product", type: "select", required: true, options: products.map((p) => p.name) },
            { name: "version", label: "Version", defaultValue: "v1.0", required: true },
            { name: "packageSize", label: "Package size" },
            { name: "batchOutput", label: "Batch output", type: "number", defaultValue: 1 },
            { name: "ingredient", label: "Ingredient", type: "select", options: rawMaterials.map((r) => r.name) },
            { name: "ingredientQty", label: "Ingredient qty", type: "number", defaultValue: 0 },
            { name: "ingredientUnit", label: "Ingredient unit", defaultValue: "g" },
            { name: "ingredientCost", label: "Ingredient cost", type: "number", defaultValue: 0 },
            { name: "packaging", label: "Packaging cost", type: "number", defaultValue: 0 },
            { name: "labour", label: "Labour cost", type: "number", defaultValue: 0 },
            { name: "sellingPrice", label: "Selling price", type: "number", defaultValue: 0 },
          ]}
          onSubmit={(values) => {
            const ingredientName = String(values.ingredient);
            const bom: Bom = {
              id: createId("BOM"),
              product: String(values.product),
              version: String(values.version || "v1.0"),
              packageSize: String(values.packageSize),
              batchOutput: Number(values.batchOutput),
              ingredients: ingredientName ? [{ name: ingredientName, qty: Number(values.ingredientQty), unit: String(values.ingredientUnit || "g"), cost: Number(values.ingredientCost) }] : [],
              costs: { ingredient: Number(values.ingredientCost), packaging: Number(values.packaging), labour: Number(values.labour) },
              sellingPrice: Number(values.sellingPrice),
            };
            addBom(bom);
            addActivity("Production", `BOM ${bom.version} created for ${bom.product}`);
          }}
        />
      </PageHeader>
      {boms.length === 0 ? (
        <EmptyState title="No BOMs yet" description="Create a product first, then add its bill of materials." />
      ) : (
        <div className="space-y-4">
          {boms.map((b) => {
            const totalCost = Object.values(b.costs).reduce((a, c) => a + c, 0);
            const profit = b.sellingPrice - totalCost;
            const margin = b.sellingPrice > 0 ? (profit / b.sellingPrice) * 100 : 0;
            return (
              <div key={b.id} className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-5 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><ClipboardList className="h-5 w-5" /></div>
                    <div><div className="font-semibold">{b.product}</div><div className="text-xs text-muted-foreground">{b.version} - {b.packageSize} - batch of {b.batchOutput}</div></div>
                  </div>
                  <div className="grid grid-cols-4 gap-6 text-right">
                    <div><div className="text-[11px] text-muted-foreground uppercase tracking-wider">Cost</div><div className="text-base font-semibold tabular-nums">{fmtCurrency(totalCost)}</div></div>
                    <div><div className="text-[11px] text-muted-foreground uppercase tracking-wider">Price</div><div className="text-base font-semibold tabular-nums">{fmtCurrency(b.sellingPrice)}</div></div>
                    <div><div className="text-[11px] text-muted-foreground uppercase tracking-wider">Profit</div><div className="text-base font-semibold text-success tabular-nums">{fmtCurrency(profit)}</div></div>
                    <div><div className="text-[11px] text-muted-foreground uppercase tracking-wider">Margin</div><div className="text-base font-semibold text-success tabular-nums">{margin.toFixed(1)}%</div></div>
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border">
                  <div className="p-5">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Ingredients</div>
                    <div className="space-y-1.5">
                      {b.ingredients.length === 0 ? <div className="text-sm text-muted-foreground">No ingredients added</div> : b.ingredients.map((ing, i) => <div key={i} className="flex items-center justify-between text-sm py-1.5 border-b border-border/60 last:border-0"><div className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-muted-foreground" /><span>{ing.name}</span></div><div className="flex items-center gap-4 text-muted-foreground"><span className="tabular-nums">{ing.qty}{ing.unit}</span><span className="tabular-nums font-medium text-foreground w-20 text-right">{fmtCurrency(ing.cost)}</span></div></div>)}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Cost Breakdown</div>
                    <div className="space-y-1.5">
                      {Object.entries(b.costs).map(([k, v]) => <div key={k} className="flex items-center justify-between text-sm py-1.5 border-b border-border/60 last:border-0"><span className="capitalize text-muted-foreground">{k}</span><span className="tabular-nums font-medium">{fmtCurrency(v)}</span></div>)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
