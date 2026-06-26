import { t as cn } from "./utils-C_uf36nf.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { F as ArrowUp, I as ArrowDown } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stat-card-VW4cLc1_.js
var import_jsx_runtime = require_jsx_runtime();
function StatCard({ label, value, delta, hint, icon: Icon, tone = "default" }) {
	const toneBg = {
		default: "bg-muted/60 text-foreground",
		primary: "bg-primary/10 text-primary",
		warning: "bg-warning/15 text-warning-foreground",
		info: "bg-info/10 text-info"
	}[tone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-elegant transition-shadow",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 text-2xl font-semibold tracking-tight",
				children: value
			})] }), Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("flex h-10 w-10 items-center justify-center rounded-xl", toneBg),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
			})]
		}), (delta !== void 0 || hint) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex items-center gap-1.5 text-xs",
			children: [delta !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: cn("inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-medium", delta >= 0 ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"),
				children: [
					delta >= 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "h-3 w-3" }),
					Math.abs(delta),
					"%"
				]
			}), hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground",
				children: hint
			})]
		})]
	});
}
//#endregion
export { StatCard as t };
