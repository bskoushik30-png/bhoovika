import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./_ssr/button-Bq5vK6RO.mjs";
import { c as useErpData, t as createId } from "./_ssr/erp-store-CE9bb68C.mjs";
import { B as Ellipsis, C as FolderTree } from "./_libs/lucide-react.mjs";
import { t as PageHeader } from "./_ssr/page-header-BjVR05eH.mjs";
import { t as EmptyState } from "./_ssr/empty-state-DTKGFbCP.mjs";
import { t as RecordDialog } from "./_ssr/record-dialog-DFVuCVPe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.categories-DXzOJoWU.js
var import_jsx_runtime = require_jsx_runtime();
function CategoriesPage() {
	const { categories, addCategory, addActivity } = useErpData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Categories",
		description: "Group products into meaningful catalog buckets.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordDialog, {
			title: "New category",
			triggerLabel: "New category",
			fields: [{
				name: "name",
				label: "Category name",
				required: true
			}, {
				name: "color",
				label: "Color",
				type: "select",
				defaultValue: "#2E7D32",
				options: [
					"#2E7D32",
					"#F59E0B",
					"#06B6D4",
					"#8B5CF6",
					"#EF4444",
					"#84CC16"
				]
			}],
			onSubmit: (values) => {
				const category = {
					id: createId("CAT"),
					name: String(values.name),
					products: 0,
					color: String(values.color || "#2E7D32")
				};
				addCategory(category);
				addActivity("Stock", `${category.name} category created`);
			}
		})
	}), categories.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "No categories yet",
		description: "Create categories first, then assign products to them."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
		children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "group rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-elegant transition-shadow",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-12 w-12 items-center justify-center rounded-xl",
					style: {
						background: c.color + "22",
						color: c.color
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderTree, { className: "h-6 w-6" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "h-4 w-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-base font-semibold",
					children: c.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-sm text-muted-foreground mt-0.5",
					children: [c.products, " products"]
				})]
			})]
		}, c.id))
	})] });
}
//#endregion
export { CategoriesPage as component };
