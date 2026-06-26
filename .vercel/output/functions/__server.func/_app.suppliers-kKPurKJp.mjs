import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { c as useErpData, n as fmtCurrency, t as createId } from "./_ssr/erp-store-CE9bb68C.mjs";
import { _ as Mail, a as Truck, m as Phone } from "./_libs/lucide-react.mjs";
import { t as PageHeader } from "./_ssr/page-header-BjVR05eH.mjs";
import { t as RecordDialog } from "./_ssr/record-dialog-DFVuCVPe.mjs";
import { t as DataTable } from "./_ssr/data-table-Dtd-v00R.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.suppliers-kKPurKJp.js
var import_jsx_runtime = require_jsx_runtime();
function SuppliersPage() {
	const { suppliers, addSupplier, addActivity } = useErpData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Suppliers",
		description: "Vendor directory, GST details, and pending payments.",
		showFilter: true,
		showExport: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordDialog, {
			title: "Add supplier",
			triggerLabel: "Add supplier",
			fields: [
				{
					name: "name",
					label: "Supplier name",
					required: true
				},
				{
					name: "phone",
					label: "Phone",
					type: "tel"
				},
				{
					name: "email",
					label: "Email",
					type: "email"
				},
				{
					name: "gst",
					label: "GST number"
				},
				{
					name: "address",
					label: "Address",
					type: "textarea"
				}
			],
			onSubmit: (values) => {
				const supplier = {
					id: createId("SUP"),
					name: String(values.name),
					phone: String(values.phone),
					email: String(values.email),
					gst: String(values.gst),
					address: String(values.address),
					products: 0,
					purchases: 0,
					pending: 0
				};
				addSupplier(supplier);
				addActivity("Purchase", `${supplier.name} added as supplier`);
			}
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
		columns: [
			{
				key: "name",
				header: "Supplier",
				render: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium",
						children: s.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: s.address
					})] })]
				})
			},
			{
				key: "contact",
				header: "Contact",
				render: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-0.5 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3 w-3" }), s.phone]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3 w-3" }), s.email]
					})]
				})
			},
			{
				key: "gst",
				header: "GST",
				render: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs",
					children: s.gst
				})
			},
			{
				key: "products",
				header: "Products",
				align: "right",
				render: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular-nums",
					children: s.products
				})
			},
			{
				key: "purchases",
				header: "Total Purchases",
				align: "right",
				render: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium tabular-nums",
					children: fmtCurrency(s.purchases)
				})
			},
			{
				key: "pending",
				header: "Pending",
				align: "right",
				render: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: s.pending > 0 ? "text-warning-foreground tabular-nums" : "text-muted-foreground tabular-nums",
					children: fmtCurrency(s.pending)
				})
			}
		],
		rows: suppliers,
		empty: "No suppliers yet. Add suppliers before creating purchase orders."
	})] });
}
//#endregion
export { SuppliersPage as component };
