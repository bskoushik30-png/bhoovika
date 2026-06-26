import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { c as useErpData, n as fmtCurrency, s as todayIso, t as createId } from "./_ssr/erp-store-CE9bb68C.mjs";
import { H as CircleCheck, O as Clock, T as Factory, U as CircleAlert } from "./_libs/lucide-react.mjs";
import { t as PageHeader } from "./_ssr/page-header-BjVR05eH.mjs";
import { t as RecordDialog } from "./_ssr/record-dialog-DFVuCVPe.mjs";
import { t as DataTable } from "./_ssr/data-table-Dtd-v00R.mjs";
import { t as StatCard } from "./_ssr/stat-card-VW4cLc1_.mjs";
import { t as StatusBadge } from "./_ssr/status-badge-fPpqYvzY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.production-BdcA85yz.js
var import_jsx_runtime = require_jsx_runtime();
function ProductionPage() {
	const { productionBatches, products, boms, addProductionBatch, addActivity } = useErpData();
	const today = todayIso();
	const todayBatches = productionBatches.filter((b) => b.mfgDate === today);
	const unitsToday = todayBatches.reduce((sum, batch) => sum + batch.quantity, 0);
	const inProgress = productionBatches.filter((b) => b.status === "In Progress" || b.status === "Quality Check").length;
	const costToday = todayBatches.reduce((sum, batch) => sum + batch.cost, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Production",
			description: "Create batches, consume raw materials, and track manufacturing cost.",
			showFilter: true,
			showExport: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordDialog, {
				title: "New batch",
				triggerLabel: "New batch",
				fields: [
					{
						name: "product",
						label: "Product",
						type: "select",
						required: true,
						options: products.map((p) => p.name)
					},
					{
						name: "quantity",
						label: "Quantity",
						type: "number",
						required: true
					},
					{
						name: "bomVersion",
						label: "BOM version",
						type: "select",
						options: boms.map((b) => `${b.product} ${b.version}`)
					},
					{
						name: "mfgDate",
						label: "Manufacturing date",
						type: "date",
						defaultValue: today,
						required: true
					},
					{
						name: "expiry",
						label: "Expiry date",
						type: "date"
					},
					{
						name: "operator",
						label: "Operator"
					},
					{
						name: "cost",
						label: "Batch cost",
						type: "number",
						defaultValue: 0
					},
					{
						name: "status",
						label: "Status",
						type: "select",
						defaultValue: "In Progress",
						options: [
							"In Progress",
							"Quality Check",
							"Completed",
							"Cancelled"
						]
					}
				],
				onSubmit: (values) => {
					const batch = {
						id: createId("PB"),
						product: String(values.product),
						quantity: Number(values.quantity),
						bomVersion: String(values.bomVersion),
						mfgDate: String(values.mfgDate),
						expiry: String(values.expiry),
						operator: String(values.operator),
						status: String(values.status || "In Progress"),
						cost: Number(values.cost)
					};
					addProductionBatch(batch);
					addActivity("Production", `${batch.id} started for ${batch.product}`);
				}
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 grid-cols-2 lg:grid-cols-4 mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Batches today",
					value: String(todayBatches.length),
					icon: Factory,
					tone: "primary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Units produced",
					value: String(unitsToday),
					icon: CircleCheck
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "In progress",
					value: String(inProgress),
					icon: Clock,
					tone: "info"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Mfg cost today",
					value: fmtCurrency(costToday),
					icon: CircleAlert,
					tone: "warning"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			columns: [
				{
					key: "id",
					header: "Batch",
					render: (b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: b.id
					})
				},
				{
					key: "product",
					header: "Product"
				},
				{
					key: "quantity",
					header: "Qty",
					align: "right",
					render: (b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: b.quantity
					})
				},
				{
					key: "bomVersion",
					header: "BOM",
					render: (b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: b.bomVersion
					})
				},
				{
					key: "mfgDate",
					header: "Mfg Date",
					render: (b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: b.mfgDate
					})
				},
				{
					key: "expiry",
					header: "Expiry",
					render: (b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: b.expiry
					})
				},
				{
					key: "operator",
					header: "Operator",
					render: (b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: b.operator
					})
				},
				{
					key: "cost",
					header: "Cost",
					align: "right",
					render: (b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums font-medium",
						children: fmtCurrency(b.cost)
					})
				},
				{
					key: "status",
					header: "Status",
					render: (b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: b.status })
				}
			],
			rows: productionBatches,
			empty: "No production batches yet. Create one when you start manufacturing."
		})
	] });
}
//#endregion
export { ProductionPage as component };
