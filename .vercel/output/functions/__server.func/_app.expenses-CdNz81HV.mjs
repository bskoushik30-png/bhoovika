import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { c as useErpData, n as fmtCurrency, r as getExpenseBreakdown, s as todayIso, t as createId } from "./_ssr/erp-store-CE9bb68C.mjs";
import { f as Receipt, r as Wallet, s as TrendingDown } from "./_libs/lucide-react.mjs";
import { t as PageHeader } from "./_ssr/page-header-BjVR05eH.mjs";
import { t as RecordDialog } from "./_ssr/record-dialog-DFVuCVPe.mjs";
import { t as DataTable } from "./_ssr/data-table-Dtd-v00R.mjs";
import { t as StatCard } from "./_ssr/stat-card-VW4cLc1_.mjs";
import { d as ResponsiveContainer, f as Tooltip, l as Pie, n as PieChart, u as Cell } from "./_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.expenses-CdNz81HV.js
var import_jsx_runtime = require_jsx_runtime();
function ExpensesPage() {
	const { expenses, addExpense, addActivity } = useErpData();
	const breakdown = getExpenseBreakdown(expenses);
	const monthKey = todayIso().slice(0, 7);
	const thisMonth = expenses.filter((e) => e.date.slice(0, 7) === monthKey).reduce((sum, e) => sum + e.amount, 0);
	const avgDay = expenses.length ? thisMonth / Math.max((/* @__PURE__ */ new Date()).getDate(), 1) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Expenses",
			description: "Every cost that touches the plant, packaging, labour, utilities, and more.",
			showFilter: true,
			showExport: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordDialog, {
				title: "Log expense",
				triggerLabel: "Log expense",
				fields: [
					{
						name: "date",
						label: "Date",
						type: "date",
						defaultValue: todayIso(),
						required: true
					},
					{
						name: "category",
						label: "Category",
						type: "select",
						required: true,
						options: [
							"Packaging",
							"Labour",
							"Electricity",
							"Rent",
							"Transport",
							"Machine Maintenance",
							"Marketing",
							"Fuel",
							"Other"
						]
					},
					{
						name: "paidBy",
						label: "Paid via",
						type: "select",
						defaultValue: "Bank",
						options: [
							"Bank",
							"Cash",
							"UPI",
							"Card"
						]
					},
					{
						name: "amount",
						label: "Amount",
						type: "number",
						required: true
					},
					{
						name: "description",
						label: "Description",
						type: "textarea"
					}
				],
				onSubmit: (values) => {
					const expense = {
						id: createId("EXP"),
						date: String(values.date),
						category: String(values.category),
						description: String(values.description),
						amount: Number(values.amount),
						paidBy: String(values.paidBy || "Bank")
					};
					addExpense(expense);
					addActivity("Expense", `${expense.category} expense logged`);
				}
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 grid-cols-2 lg:grid-cols-3 mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "This month",
					value: fmtCurrency(thisMonth),
					icon: Wallet,
					tone: "warning"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Entries",
					value: String(expenses.length),
					icon: Receipt
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Avg / day",
					value: fmtCurrency(avgDay),
					icon: TrendingDown
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-3 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
					columns: [
						{
							key: "date",
							header: "Date",
							render: (e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: e.date
							})
						},
						{
							key: "category",
							header: "Category",
							render: (e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: e.category
							})
						},
						{
							key: "description",
							header: "Description",
							render: (e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: e.description
							})
						},
						{
							key: "paidBy",
							header: "Paid via",
							render: (e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: e.paidBy
							})
						},
						{
							key: "amount",
							header: "Amount",
							align: "right",
							render: (e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold tabular-nums",
								children: fmtCurrency(e.amount)
							})
						}
					],
					rows: expenses,
					empty: "No expenses logged yet."
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-card p-5 shadow-soft",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold mb-3",
					children: "By category"
				}), breakdown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-[220px] items-center justify-center text-sm text-muted-foreground",
					children: "No expense data yet"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 220,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
						data: breakdown,
						dataKey: "value",
						innerRadius: 50,
						outerRadius: 85,
						paddingAngle: 3,
						children: breakdown.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: e.color }, i))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
						borderRadius: 10,
						border: "1px solid var(--color-border)",
						background: "var(--color-popover)",
						fontSize: 12
					} })] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-1.5 mt-2",
					children: breakdown.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "h-2 w-2 rounded-full",
								style: { background: e.color }
							}), e.name]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums font-medium",
							children: fmtCurrency(e.value)
						})]
					}, e.name))
				})] })]
			})]
		})
	] });
}
//#endregion
export { ExpensesPage as component };
