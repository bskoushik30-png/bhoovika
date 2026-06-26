import { t as cn } from "./utils-C_uf36nf.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-badge-fPpqYvzY.js
var import_jsx_runtime = require_jsx_runtime();
var TONES = {
	active: "bg-success/15 text-success border-success/20",
	completed: "bg-success/15 text-success border-success/20",
	paid: "bg-success/15 text-success border-success/20",
	received: "bg-success/15 text-success border-success/20",
	"in stock": "bg-success/15 text-success border-success/20",
	pending: "bg-warning/15 text-warning-foreground border-warning/30",
	partial: "bg-warning/15 text-warning-foreground border-warning/30",
	"low stock": "bg-warning/15 text-warning-foreground border-warning/30",
	"near expiry": "bg-warning/15 text-warning-foreground border-warning/30",
	"quality check": "bg-warning/15 text-warning-foreground border-warning/30",
	draft: "bg-muted text-muted-foreground border-border",
	sent: "bg-info/10 text-info border-info/20",
	"in progress": "bg-info/10 text-info border-info/20",
	confirmed: "bg-info/10 text-info border-info/20",
	"out of stock": "bg-destructive/15 text-destructive border-destructive/25",
	expired: "bg-destructive/15 text-destructive border-destructive/25"
};
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium", TONES[status.toLowerCase()] ?? "bg-muted text-foreground border-border"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-current opacity-70" }), status]
	});
}
//#endregion
export { StatusBadge as t };
