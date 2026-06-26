import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { c as useErpData, n as fmtCurrency, t as createId } from "./_ssr/erp-store-CE9bb68C.mjs";
import { j as ChevronRight, k as ClipboardList } from "./_libs/lucide-react.mjs";
import { t as PageHeader } from "./_ssr/page-header-BjVR05eH.mjs";
import { t as EmptyState } from "./_ssr/empty-state-DTKGFbCP.mjs";
import { t as RecordDialog } from "./_ssr/record-dialog-DFVuCVPe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.bom-C6LNZpwp.js
var import_jsx_runtime = require_jsx_runtime();
function BomPage() {
	const { boms, products, rawMaterials, addBom, addActivity } = useErpData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Bill of Materials",
		description: "Recipes, costing, and profit per finished product.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordDialog, {
			title: "New BOM",
			description: "Start with one ingredient. You can expand this into a full editor when the backend is connected.",
			triggerLabel: "New BOM",
			fields: [
				{
					name: "product",
					label: "Product",
					type: "select",
					required: true,
					options: products.map((p) => p.name)
				},
				{
					name: "version",
					label: "Version",
					defaultValue: "v1.0",
					required: true
				},
				{
					name: "packageSize",
					label: "Package size"
				},
				{
					name: "batchOutput",
					label: "Batch output",
					type: "number",
					defaultValue: 1
				},
				{
					name: "ingredient",
					label: "Ingredient",
					type: "select",
					options: rawMaterials.map((r) => r.name)
				},
				{
					name: "ingredientQty",
					label: "Ingredient qty",
					type: "number",
					defaultValue: 0
				},
				{
					name: "ingredientUnit",
					label: "Ingredient unit",
					defaultValue: "g"
				},
				{
					name: "ingredientCost",
					label: "Ingredient cost",
					type: "number",
					defaultValue: 0
				},
				{
					name: "packaging",
					label: "Packaging cost",
					type: "number",
					defaultValue: 0
				},
				{
					name: "labour",
					label: "Labour cost",
					type: "number",
					defaultValue: 0
				},
				{
					name: "sellingPrice",
					label: "Selling price",
					type: "number",
					defaultValue: 0
				}
			],
			onSubmit: (values) => {
				const ingredientName = String(values.ingredient);
				const bom = {
					id: createId("BOM"),
					product: String(values.product),
					version: String(values.version || "v1.0"),
					packageSize: String(values.packageSize),
					batchOutput: Number(values.batchOutput),
					ingredients: ingredientName ? [{
						name: ingredientName,
						qty: Number(values.ingredientQty),
						unit: String(values.ingredientUnit || "g"),
						cost: Number(values.ingredientCost)
					}] : [],
					costs: {
						ingredient: Number(values.ingredientCost),
						packaging: Number(values.packaging),
						labour: Number(values.labour)
					},
					sellingPrice: Number(values.sellingPrice)
				};
				addBom(bom);
				addActivity("Production", `BOM ${bom.version} created for ${bom.product}`);
			}
		})
	}), boms.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "No BOMs yet",
		description: "Create a product first, then add its bill of materials."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4",
		children: boms.map((b) => {
			const totalCost = Object.values(b.costs).reduce((a, c) => a + c, 0);
			const profit = b.sellingPrice - totalCost;
			const margin = b.sellingPrice > 0 ? profit / b.sellingPrice * 100 : 0;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-card shadow-soft overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-5 border-b border-border bg-muted/30",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-semibold",
							children: b.product
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground",
							children: [
								b.version,
								" - ",
								b.packageSize,
								" - batch of ",
								b.batchOutput
							]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-4 gap-6 text-right",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] text-muted-foreground uppercase tracking-wider",
								children: "Cost"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-base font-semibold tabular-nums",
								children: fmtCurrency(totalCost)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] text-muted-foreground uppercase tracking-wider",
								children: "Price"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-base font-semibold tabular-nums",
								children: fmtCurrency(b.sellingPrice)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] text-muted-foreground uppercase tracking-wider",
								children: "Profit"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-base font-semibold text-success tabular-nums",
								children: fmtCurrency(profit)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] text-muted-foreground uppercase tracking-wider",
								children: "Margin"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-base font-semibold text-success tabular-nums",
								children: [margin.toFixed(1), "%"]
							})] })
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3",
							children: "Ingredients"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-1.5",
							children: b.ingredients.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-muted-foreground",
								children: "No ingredients added"
							}) : b.ingredients.map((ing, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-sm py-1.5 border-b border-border/60 last:border-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: ing.name })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4 text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "tabular-nums",
										children: [ing.qty, ing.unit]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular-nums font-medium text-foreground w-20 text-right",
										children: fmtCurrency(ing.cost)
									})]
								})]
							}, i))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3",
							children: "Cost Breakdown"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-1.5",
							children: Object.entries(b.costs).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-sm py-1.5 border-b border-border/60 last:border-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "capitalize text-muted-foreground",
									children: k
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums font-medium",
									children: fmtCurrency(v)
								})]
							}, k))
						})]
					})]
				})]
			}, b.id);
		})
	})] });
}
//#endregion
export { BomPage as component };
