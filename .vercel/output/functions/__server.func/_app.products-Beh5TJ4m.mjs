import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./_ssr/button-Bq5vK6RO.mjs";
import { a as getProductStatus, c as useErpData, n as fmtCurrency, t as createId } from "./_ssr/erp-store-CE9bb68C.mjs";
import { B as Ellipsis, h as Package } from "./_libs/lucide-react.mjs";
import { t as PageHeader } from "./_ssr/page-header-BjVR05eH.mjs";
import { t as RecordDialog } from "./_ssr/record-dialog-DFVuCVPe.mjs";
import { t as DataTable } from "./_ssr/data-table-Dtd-v00R.mjs";
import { t as StatusBadge } from "./_ssr/status-badge-fPpqYvzY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.products-Beh5TJ4m.js
var import_jsx_runtime = require_jsx_runtime();
function ProductsPage() {
	const { products, categories, addProduct, addActivity } = useErpData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Products",
		description: "Finished goods catalog with pricing, stock, and margin at a glance.",
		showFilter: true,
		showExport: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordDialog, {
			title: "Add product",
			description: "Create a finished good. It will be saved in this browser until you connect a database.",
			triggerLabel: "Add product",
			fields: [
				{
					name: "name",
					label: "Product name",
					required: true
				},
				{
					name: "sku",
					label: "SKU",
					required: true
				},
				{
					name: "category",
					label: "Category",
					type: "select",
					options: categories.map((c) => c.name)
				},
				{
					name: "brand",
					label: "Brand"
				},
				{
					name: "weight",
					label: "Pack size",
					placeholder: "500g"
				},
				{
					name: "shelfLife",
					label: "Shelf life",
					placeholder: "6 months"
				},
				{
					name: "price",
					label: "Selling price",
					type: "number",
					required: true
				},
				{
					name: "mrp",
					label: "MRP",
					type: "number"
				},
				{
					name: "cost",
					label: "Cost",
					type: "number",
					required: true
				},
				{
					name: "stock",
					label: "Opening stock",
					type: "number",
					defaultValue: 0
				},
				{
					name: "minStock",
					label: "Minimum stock",
					type: "number",
					defaultValue: 0
				},
				{
					name: "maxStock",
					label: "Maximum stock",
					type: "number",
					defaultValue: 0
				}
			],
			onSubmit: (values) => {
				const price = Number(values.price);
				const cost = Number(values.cost);
				const stock = Number(values.stock);
				const minStock = Number(values.minStock);
				const product = {
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
					margin: price > 0 ? (price - cost) / price * 100 : 0
				};
				addProduct(product);
				addActivity("Stock", `${product.name} added to products`);
			}
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
		columns: [
			{
				key: "name",
				header: "Product",
				render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium",
						children: p.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground",
						children: [
							p.sku,
							" - ",
							p.weight
						]
					})] })]
				})
			},
			{
				key: "category",
				header: "Category",
				render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: p.category || "Uncategorized"
				})
			},
			{
				key: "price",
				header: "Price",
				align: "right",
				render: (p) => fmtCurrency(p.price)
			},
			{
				key: "cost",
				header: "Cost",
				align: "right",
				render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: fmtCurrency(p.cost)
				})
			},
			{
				key: "margin",
				header: "Margin",
				align: "right",
				render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-success font-medium",
					children: [p.margin.toFixed(1), "%"]
				})
			},
			{
				key: "stock",
				header: "Stock",
				align: "right",
				render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-medium tabular-nums",
					children: p.stock
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-[11px] text-muted-foreground",
					children: ["min ", p.minStock]
				})] })
			},
			{
				key: "status",
				header: "Status",
				render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: p.status })
			},
			{
				key: "actions",
				header: "",
				align: "right",
				render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "h-8 w-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "h-4 w-4" })
				})
			}
		],
		rows: products,
		empty: "No products yet. Add your first finished good."
	})] });
}
//#endregion
export { ProductsPage as component };
