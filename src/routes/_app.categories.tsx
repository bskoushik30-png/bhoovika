import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { RecordDialog } from "@/components/record-dialog";
import { createId, useErpData, type Category } from "@/lib/erp-store";
import { FolderTree, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/categories")({
  head: () => ({ meta: [{ title: "Categories - PureHarvest ERP" }] }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const { categories, addCategory, addActivity } = useErpData();
  const form = (
    <RecordDialog
      title="New category"
      triggerLabel="New category"
      fields={[
        { name: "name", label: "Category name", required: true },
        { name: "color", label: "Color", type: "select", defaultValue: "#2E7D32", options: ["#2E7D32", "#F59E0B", "#06B6D4", "#8B5CF6", "#EF4444", "#84CC16"] },
      ]}
      onSubmit={(values) => {
        const category: Category = { id: createId("CAT"), name: String(values.name), products: 0, color: String(values.color || "#2E7D32") };
        addCategory(category);
        addActivity("Stock", `${category.name} category created`);
      }}
    />
  );

  return (
    <>
      <PageHeader title="Categories" description="Group products into meaningful catalog buckets.">{form}</PageHeader>
      {categories.length === 0 ? (
        <EmptyState title="No categories yet" description="Create categories first, then assign products to them." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <div key={c.id} className="group rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-elegant transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: c.color + "22", color: c.color }}>
                  <FolderTree className="h-6 w-6" />
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-4">
                <div className="text-base font-semibold">{c.name}</div>
                <div className="text-sm text-muted-foreground mt-0.5">{c.products} products</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
