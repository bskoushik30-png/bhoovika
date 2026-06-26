import { t as cn } from "./utils-C_uf36nf.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/data-table-Dtd-v00R.js
var import_jsx_runtime = require_jsx_runtime();
function DataTable({ columns, rows, empty = "No records" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden rounded-2xl border border-border bg-card shadow-soft",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-muted/40",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						className: "border-b border-border",
						children: columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: cn("px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground", c.align === "right" && "text-right", c.align === "center" && "text-center", c.className),
							children: c.header
						}, c.key))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: columns.length,
					className: "px-4 py-10 text-center text-muted-foreground",
					children: empty
				}) }) : rows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
					className: "border-b border-border/70 last:border-0 hover:bg-muted/40 transition-colors",
					children: columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: cn("px-4 py-3 align-middle", c.align === "right" && "text-right tabular-nums", c.align === "center" && "text-center", c.className),
						children: c.render ? c.render(row) : row[c.key]
					}, c.key))
				}, i)) })]
			})
		})
	});
}
//#endregion
export { DataTable as t };
