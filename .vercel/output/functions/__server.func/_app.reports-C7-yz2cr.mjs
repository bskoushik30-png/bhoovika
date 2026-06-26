import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { N as Boxes, R as TriangleAlert, T as Factory, W as ChartColumn, a as Truck, f as Receipt, h as Package, i as Users, l as ShoppingCart, o as TrendingUp, r as Wallet, w as FileText } from "./_libs/lucide-react.mjs";
import { t as PageHeader } from "./_ssr/page-header-BjVR05eH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.reports-C7-yz2cr.js
var import_jsx_runtime = require_jsx_runtime();
var reports = [
	{
		name: "Sales Report",
		desc: "Revenue, invoices, GST collected",
		icon: Receipt,
		color: "#2E7D32"
	},
	{
		name: "Purchase Report",
		desc: "POs raised, materials received",
		icon: ShoppingCart,
		color: "#06B6D4"
	},
	{
		name: "Production Report",
		desc: "Batches, yield, downtime",
		icon: Factory,
		color: "#8B5CF6"
	},
	{
		name: "Inventory Report",
		desc: "Stock on hand by location",
		icon: Boxes,
		color: "#F59E0B"
	},
	{
		name: "Manufacturing Cost",
		desc: "Cost per batch and per unit",
		icon: ChartColumn,
		color: "#EF4444"
	},
	{
		name: "Profit & Loss",
		desc: "Revenue vs expenses with margin",
		icon: TrendingUp,
		color: "#2E7D32"
	},
	{
		name: "Inventory Valuation",
		desc: "FIFO valuation across SKUs",
		icon: Package,
		color: "#06B6D4"
	},
	{
		name: "Expense Report",
		desc: "Category-wise expense ledger",
		icon: Wallet,
		color: "#F59E0B"
	},
	{
		name: "Customer Report",
		desc: "Top buyers, outstanding, history",
		icon: Users,
		color: "#8B5CF6"
	},
	{
		name: "Supplier Report",
		desc: "Vendor purchases & payments",
		icon: Truck,
		color: "#06B6D4"
	},
	{
		name: "Batch Report",
		desc: "Production batch traceability",
		icon: FileText,
		color: "#2E7D32"
	},
	{
		name: "Expiry Report",
		desc: "Stock approaching expiry",
		icon: TriangleAlert,
		color: "#EF4444"
	}
];
function ReportsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Reports",
		description: "Generate and export ready-made reports as PDF, Excel or CSV.",
		showExport: true
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
		children: reports.map((r) => {
			const Icon = r.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "text-left group rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-elegant transition-all hover:-translate-y-0.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-11 w-11 items-center justify-center rounded-xl",
						style: {
							background: r.color + "22",
							color: r.color
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-semibold group-hover:text-primary transition-colors",
							children: r.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: r.desc
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] px-2 py-0.5 rounded-md border border-border text-muted-foreground",
							children: "PDF"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] px-2 py-0.5 rounded-md border border-border text-muted-foreground",
							children: "Excel"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] px-2 py-0.5 rounded-md border border-border text-muted-foreground",
							children: "CSV"
						})
					]
				})]
			}, r.name);
		})
	})] });
}
//#endregion
export { ReportsPage as component };
