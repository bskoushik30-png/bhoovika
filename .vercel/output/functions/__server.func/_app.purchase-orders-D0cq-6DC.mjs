import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { c as useErpData, n as fmtCurrency, s as todayIso, t as createId } from "./_ssr/erp-store-CE9bb68C.mjs";
import { t as PageHeader } from "./_ssr/page-header-BjVR05eH.mjs";
import { t as RecordDialog } from "./_ssr/record-dialog-DFVuCVPe.mjs";
import { t as DataTable } from "./_ssr/data-table-Dtd-v00R.mjs";
import { t as StatusBadge } from "./_ssr/status-badge-fPpqYvzY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.purchase-orders-D0cq-6DC.js
var import_jsx_runtime = require_jsx_runtime();
function POPage() {
	const { purchaseOrders, suppliers, addPurchaseOrder, addActivity } = useErpData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Purchase Orders",
		description: "Order raw materials, track deliveries, and reconcile payments.",
		showFilter: true,
		showExport: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordDialog, {
			title: "New purchase order",
			triggerLabel: "New PO",
			fields: [
				{
					name: "supplier",
					label: "Supplier",
					type: "select",
					required: true,
					options: suppliers.map((s) => s.name)
				},
				{
					name: "date",
					label: "Order date",
					type: "date",
					defaultValue: todayIso(),
					required: true
				},
				{
					name: "expected",
					label: "Expected date",
					type: "date"
				},
				{
					name: "items",
					label: "Items",
					type: "number",
					defaultValue: 1
				},
				{
					name: "total",
					label: "Total",
					type: "number",
					required: true
				},
				{
					name: "payment",
					label: "Payment",
					type: "select",
					defaultValue: "Pending",
					options: [
						"Pending",
						"Paid",
						"Partial"
					]
				},
				{
					name: "receiving",
					label: "Receiving",
					type: "select",
					defaultValue: "Pending",
					options: [
						"Pending",
						"Partial",
						"Received"
					]
				},
				{
					name: "status",
					label: "Status",
					type: "select",
					defaultValue: "Draft",
					options: [
						"Draft",
						"Confirmed",
						"Cancelled"
					]
				}
			],
			onSubmit: (values) => {
				const po = {
					id: createId("PO"),
					supplier: String(values.supplier),
					date: String(values.date),
					expected: String(values.expected),
					items: Number(values.items),
					total: Number(values.total),
					payment: String(values.payment || "Pending"),
					status: String(values.status || "Draft"),
					receiving: String(values.receiving || "Pending")
				};
				addPurchaseOrder(po);
				addActivity("Purchase", `${po.id} created for ${po.supplier}`);
			}
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
		columns: [
			{
				key: "id",
				header: "PO #",
				render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: p.id
				})
			},
			{
				key: "supplier",
				header: "Supplier"
			},
			{
				key: "date",
				header: "Order Date",
				render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: p.date
				})
			},
			{
				key: "expected",
				header: "Expected",
				render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: p.expected
				})
			},
			{
				key: "items",
				header: "Items",
				align: "right",
				render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular-nums",
					children: p.items
				})
			},
			{
				key: "total",
				header: "Total",
				align: "right",
				render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium tabular-nums",
					children: fmtCurrency(p.total)
				})
			},
			{
				key: "payment",
				header: "Payment",
				render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: p.payment })
			},
			{
				key: "receiving",
				header: "Receiving",
				render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: p.receiving })
			},
			{
				key: "status",
				header: "Status",
				render: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: p.status })
			}
		],
		rows: purchaseOrders,
		empty: "No purchase orders yet. Add suppliers, then create a PO."
	})] });
}
//#endregion
export { POPage as component };
