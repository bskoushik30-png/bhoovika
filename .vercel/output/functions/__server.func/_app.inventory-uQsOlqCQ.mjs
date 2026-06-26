import { i as __toESM } from "./_runtime.mjs";
import { t as cn } from "./_ssr/utils-C_uf36nf.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { c as useErpData, n as fmtCurrency } from "./_ssr/erp-store-CE9bb68C.mjs";
import { N as Boxes, h as Package, n as Wheat } from "./_libs/lucide-react.mjs";
import { t as PageHeader } from "./_ssr/page-header-BjVR05eH.mjs";
import { t as DataTable } from "./_ssr/data-table-Dtd-v00R.mjs";
import { t as StatCard } from "./_ssr/stat-card-VW4cLc1_.mjs";
import { t as StatusBadge } from "./_ssr/status-badge-fPpqYvzY.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "./_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.inventory-uQsOlqCQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function InventoryPage() {
	const [tab, setTab] = (0, import_react.useState)("finished");
	const { products, rawMaterials } = useErpData();
	const finishedValue = products.reduce((sum, product) => sum + product.stock * product.cost, 0);
	const rawValue = rawMaterials.reduce((sum, material) => sum + material.quantity * material.avgCost, 0);
	const lowStock = products.filter((p) => p.stock < p.minStock).length + rawMaterials.filter((r) => r.quantity < r.minStock).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Inventory",
			description: "Live stock across raw materials, packaging, and finished goods.",
			showExport: true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 grid-cols-2 lg:grid-cols-4 mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Total inventory value",
					value: fmtCurrency(finishedValue + rawValue),
					icon: Boxes,
					tone: "primary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Finished goods",
					value: fmtCurrency(finishedValue),
					icon: Package
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Raw materials",
					value: fmtCurrency(rawValue),
					icon: Wheat
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Low / out of stock",
					value: `${lowStock} items`,
					tone: "warning"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			value: tab,
			onValueChange: setTab,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "mb-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "finished",
							children: "Finished Goods"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "raw",
							children: "Raw Materials"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "packaging",
							children: "Packaging"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "finished",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
						columns: [
							{
								key: "name",
								header: "Product",
								render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: p.name
								})
							},
							{
								key: "sku",
								header: "SKU",
								render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: p.sku
								})
							},
							{
								key: "stock",
								header: "On hand",
								align: "right",
								render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums",
									children: p.stock
								})
							},
							{
								key: "min",
								header: "Min",
								align: "right",
								render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground tabular-nums",
									children: p.minStock
								})
							},
							{
								key: "max",
								header: "Max",
								align: "right",
								render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground tabular-nums",
									children: p.maxStock
								})
							},
							{
								key: "value",
								header: "Value",
								align: "right",
								render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums font-medium",
									children: fmtCurrency(p.stock * p.cost)
								})
							},
							{
								key: "status",
								header: "Status",
								render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: p.status })
							}
						],
						rows: products,
						empty: "No finished goods yet. Add products with opening stock."
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "raw",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
						columns: [
							{
								key: "name",
								header: "Material",
								render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: r.name
								})
							},
							{
								key: "batch",
								header: "Batch",
								render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: r.batch
								})
							},
							{
								key: "quantity",
								header: "On hand",
								align: "right",
								render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular-nums",
									children: [
										r.quantity,
										" ",
										r.unit
									]
								})
							},
							{
								key: "available",
								header: "Available",
								align: "right",
								render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular-nums text-success",
									children: [
										r.available,
										" ",
										r.unit
									]
								})
							},
							{
								key: "location",
								header: "Location",
								render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: r.location
								})
							},
							{
								key: "expiry",
								header: "Expiry",
								render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: r.expiry
								})
							},
							{
								key: "value",
								header: "Value",
								align: "right",
								render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums font-medium",
									children: fmtCurrency(r.quantity * r.avgCost)
								})
							},
							{
								key: "status",
								header: "Status",
								render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status })
							}
						],
						rows: rawMaterials,
						empty: "No raw materials yet. Add materials with opening stock."
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "packaging",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground",
						children: "Add packaging items as raw materials for now."
					})
				})
			]
		})
	] });
}
//#endregion
export { InventoryPage as component };
