import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { c as useErpData, n as fmtCurrency, o as getRawMaterialStatus, t as createId } from "./_ssr/erp-store-CE9bb68C.mjs";
import { n as Wheat } from "./_libs/lucide-react.mjs";
import { t as PageHeader } from "./_ssr/page-header-BjVR05eH.mjs";
import { t as RecordDialog } from "./_ssr/record-dialog-DFVuCVPe.mjs";
import { t as DataTable } from "./_ssr/data-table-Dtd-v00R.mjs";
import { t as StatusBadge } from "./_ssr/status-badge-fPpqYvzY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.raw-materials-CFqdLmcZ.js
var import_jsx_runtime = require_jsx_runtime();
function RawMaterialsPage() {
	const { rawMaterials, suppliers, addRawMaterial, addActivity } = useErpData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Raw Materials",
		description: "Track every ingredient with batches, expiry, and supplier links.",
		showFilter: true,
		showExport: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordDialog, {
			title: "Add material",
			triggerLabel: "Add material",
			fields: [
				{
					name: "name",
					label: "Material name",
					required: true
				},
				{
					name: "unit",
					label: "Unit",
					type: "select",
					required: true,
					defaultValue: "kg",
					options: [
						"kg",
						"g",
						"ltr",
						"ml",
						"pcs"
					]
				},
				{
					name: "quantity",
					label: "Quantity",
					type: "number",
					defaultValue: 0
				},
				{
					name: "reserved",
					label: "Reserved",
					type: "number",
					defaultValue: 0
				},
				{
					name: "price",
					label: "Purchase price",
					type: "number",
					defaultValue: 0
				},
				{
					name: "avgCost",
					label: "Average cost",
					type: "number",
					defaultValue: 0
				},
				{
					name: "supplier",
					label: "Supplier",
					type: "select",
					options: suppliers.map((s) => s.name)
				},
				{
					name: "minStock",
					label: "Minimum stock",
					type: "number",
					defaultValue: 0
				},
				{
					name: "location",
					label: "Location"
				},
				{
					name: "expiry",
					label: "Expiry date",
					type: "date"
				},
				{
					name: "batch",
					label: "Batch"
				}
			],
			onSubmit: (values) => {
				const quantity = Number(values.quantity);
				const reserved = Number(values.reserved);
				const minStock = Number(values.minStock);
				const material = {
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
					status: getRawMaterialStatus(quantity, minStock, String(values.expiry))
				};
				addRawMaterial(material);
				addActivity("Stock", `${material.name} added to raw materials`);
			}
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
		columns: [
			{
				key: "name",
				header: "Material",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheat, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium",
						children: r.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground",
						children: ["Batch ", r.batch || "-"]
					})] })]
				})
			},
			{
				key: "quantity",
				header: "Stock",
				align: "right",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-medium tabular-nums",
					children: [
						r.quantity,
						" ",
						r.unit
					]
				})
			},
			{
				key: "reserved",
				header: "Reserved",
				align: "right",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-muted-foreground tabular-nums",
					children: [
						r.reserved,
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
					className: "text-success font-medium tabular-nums",
					children: [
						r.available,
						" ",
						r.unit
					]
				})
			},
			{
				key: "price",
				header: "Price",
				align: "right",
				render: (r) => `${fmtCurrency(r.price)}/${r.unit}`
			},
			{
				key: "supplier",
				header: "Supplier",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: r.supplier
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
				key: "status",
				header: "Status",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status })
			}
		],
		rows: rawMaterials,
		empty: "No raw materials yet. Add ingredients and packaging stock here."
	})] });
}
//#endregion
export { RawMaterialsPage as component };
