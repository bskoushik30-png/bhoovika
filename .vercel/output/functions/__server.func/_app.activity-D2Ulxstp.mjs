import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { c as useErpData } from "./_ssr/erp-store-CE9bb68C.mjs";
import { L as Activity, N as Boxes, R as TriangleAlert, T as Factory, f as Receipt, l as ShoppingCart, r as Wallet } from "./_libs/lucide-react.mjs";
import { t as PageHeader } from "./_ssr/page-header-BjVR05eH.mjs";
import { t as EmptyState } from "./_ssr/empty-state-DTKGFbCP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.activity-D2Ulxstp.js
var import_jsx_runtime = require_jsx_runtime();
var ICON = {
	Sale: Receipt,
	Production: Factory,
	Stock: Boxes,
	Purchase: ShoppingCart,
	Alert: TriangleAlert,
	Expense: Wallet
};
function ActivityPage() {
	const { activities } = useErpData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Activity Logs",
		description: "A trail of actions across the plant.",
		showFilter: true,
		showExport: true
	}), activities.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "No activity yet",
		description: "Actions you take, like creating products or invoices, will appear here."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-2xl border border-border bg-card p-5 shadow-soft",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-4 top-2 bottom-2 w-px bg-border" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-5",
				children: activities.map((a) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex gap-4 pl-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ICON[a.type] ?? Activity, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 pt-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-baseline justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium",
									children: a.message
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: a.time
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground mt-0.5",
								children: [
									a.type,
									" - by ",
									a.user
								]
							})]
						})]
					}, a.id);
				})
			})]
		})
	})] });
}
//#endregion
export { ActivityPage as component };
