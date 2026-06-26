import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { c as useErpData, n as fmtCurrency, s as todayIso, t as createId } from "./_ssr/erp-store-CE9bb68C.mjs";
import { H as CircleCheck, O as Clock, f as Receipt, o as TrendingUp } from "./_libs/lucide-react.mjs";
import { t as PageHeader } from "./_ssr/page-header-BjVR05eH.mjs";
import { t as RecordDialog } from "./_ssr/record-dialog-DFVuCVPe.mjs";
import { t as DataTable } from "./_ssr/data-table-Dtd-v00R.mjs";
import { t as StatCard } from "./_ssr/stat-card-VW4cLc1_.mjs";
import { t as StatusBadge } from "./_ssr/status-badge-fPpqYvzY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.sales-C1t4LVrK.js
var import_jsx_runtime = require_jsx_runtime();
function SalesPage() {
	const { sales, customers, addSale, addActivity } = useErpData();
	const today = todayIso();
	const todaySales = sales.filter((sale) => sale.date === today).reduce((sum, sale) => sum + sale.total, 0);
	const monthSales = sales.filter((sale) => sale.date.slice(0, 7) === today.slice(0, 7)).reduce((sum, sale) => sum + sale.total, 0);
	const outstanding = sales.filter((sale) => sale.payment !== "Paid").reduce((sum, sale) => sum + sale.total, 0);
	const paidInvoices = sales.filter((sale) => sale.payment === "Paid").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Sales",
			description: "Issue invoices, track payments, and print GST-ready receipts.",
			showFilter: true,
			showExport: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordDialog, {
				title: "New invoice",
				triggerLabel: "New invoice",
				fields: [
					{
						name: "customer",
						label: "Customer",
						type: "select",
						required: true,
						options: customers.map((c) => c.name)
					},
					{
						name: "date",
						label: "Date",
						type: "date",
						defaultValue: today,
						required: true
					},
					{
						name: "items",
						label: "Items",
						type: "number",
						defaultValue: 1
					},
					{
						name: "subtotal",
						label: "Subtotal",
						type: "number",
						required: true
					},
					{
						name: "gst",
						label: "GST",
						type: "number",
						defaultValue: 0
					},
					{
						name: "payment",
						label: "Payment",
						type: "select",
						defaultValue: "Pending",
						options: [
							"Paid",
							"Pending",
							"Partial"
						]
					},
					{
						name: "status",
						label: "Status",
						type: "select",
						defaultValue: "Sent",
						options: [
							"Draft",
							"Sent",
							"Completed",
							"Cancelled"
						]
					}
				],
				onSubmit: (values) => {
					const subtotal = Number(values.subtotal);
					const gst = Number(values.gst);
					const sale = {
						id: createId("INV"),
						customer: String(values.customer),
						date: String(values.date),
						items: Number(values.items),
						subtotal,
						gst,
						total: subtotal + gst,
						payment: String(values.payment || "Pending"),
						status: String(values.status || "Sent")
					};
					addSale(sale);
					addActivity("Sale", `${sale.id} created for ${sale.customer}`);
				}
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 grid-cols-2 lg:grid-cols-4 mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Today's sales",
					value: fmtCurrency(todaySales),
					icon: Receipt,
					tone: "primary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Month to date",
					value: fmtCurrency(monthSales),
					icon: TrendingUp
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Outstanding",
					value: fmtCurrency(outstanding),
					icon: Clock,
					tone: "warning"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Paid invoices",
					value: String(paidInvoices),
					icon: CircleCheck
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			columns: [
				{
					key: "id",
					header: "Invoice",
					render: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: s.id
					})
				},
				{
					key: "customer",
					header: "Customer"
				},
				{
					key: "date",
					header: "Date",
					render: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: s.date
					})
				},
				{
					key: "items",
					header: "Items",
					align: "right",
					render: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: s.items
					})
				},
				{
					key: "subtotal",
					header: "Subtotal",
					align: "right",
					render: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums text-muted-foreground",
						children: fmtCurrency(s.subtotal)
					})
				},
				{
					key: "gst",
					header: "GST",
					align: "right",
					render: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums text-muted-foreground",
						children: fmtCurrency(s.gst)
					})
				},
				{
					key: "total",
					header: "Total",
					align: "right",
					render: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold tabular-nums",
						children: fmtCurrency(s.total)
					})
				},
				{
					key: "payment",
					header: "Payment",
					render: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: s.payment })
				},
				{
					key: "status",
					header: "Status",
					render: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: s.status })
				}
			],
			rows: sales,
			empty: "No invoices yet. Add customers, then create your first invoice."
		})
	] });
}
//#endregion
export { SalesPage as component };
