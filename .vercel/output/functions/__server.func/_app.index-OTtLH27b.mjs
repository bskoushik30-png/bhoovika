import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { c as useErpData, i as getMonthlySales, n as fmtCurrency, r as getExpenseBreakdown, s as todayIso } from "./_ssr/erp-store-CE9bb68C.mjs";
import { D as DollarSign, N as Boxes, O as Clock, R as TriangleAlert, T as Factory, a as Truck, f as Receipt, h as Package, i as Users, n as Wheat, o as TrendingUp } from "./_libs/lucide-react.mjs";
import { t as EmptyState } from "./_ssr/empty-state-DTKGFbCP.mjs";
import { t as StatCard } from "./_ssr/stat-card-VW4cLc1_.mjs";
import { a as XAxis, c as Bar, d as ResponsiveContainer, f as Tooltip, i as YAxis, l as Pie, n as PieChart, o as Area, r as BarChart, s as CartesianGrid, t as AreaChart, u as Cell } from "./_libs/recharts+[...].mjs";
import { t as StatusBadge } from "./_ssr/status-badge-fPpqYvzY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.index-OTtLH27b.js
var import_jsx_runtime = require_jsx_runtime();
function ChartCard({ title, subtitle, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-card p-5 shadow-soft",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-semibold",
				children: title
			}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground mt-0.5",
				children: subtitle
			})]
		}), children]
	});
}
function Dashboard() {
	const { products, rawMaterials, customers, suppliers, sales, purchaseOrders, productionBatches, expenses, activities } = useErpData();
	const today = todayIso();
	const month = today.slice(0, 7);
	const todayRevenue = sales.filter((s) => s.date === today).reduce((sum, s) => sum + s.total, 0);
	const monthlyRevenue = sales.filter((s) => s.date.slice(0, 7) === month).reduce((sum, s) => sum + s.total, 0);
	const monthlyExpenses = expenses.filter((e) => e.date.slice(0, 7) === month).reduce((sum, e) => sum + e.amount, 0);
	const monthlyProfit = monthlyRevenue - monthlyExpenses;
	const finishedValue = products.reduce((sum, p) => sum + p.stock * p.cost, 0);
	const rawValue = rawMaterials.reduce((sum, r) => sum + r.quantity * r.avgCost, 0);
	const lowStock = [...products.filter((p) => p.stock < p.minStock), ...rawMaterials.filter((r) => r.quantity < r.minStock)].slice(0, 5);
	const monthlySales = getMonthlySales(sales, expenses);
	const expenseBreakdown = getExpenseBreakdown(expenses);
	const productionTrend = productionBatches.reduce((acc, batch) => {
		const day = new Date(batch.mfgDate).toLocaleString("en-IN", { weekday: "short" });
		acc[day] = acc[day] ?? {
			day,
			units: 0
		};
		acc[day].units += batch.quantity;
		return acc;
	}, {});
	products.map((product) => ({
		name: product.name,
		units: sales.filter((sale) => sale.status !== "Cancelled").reduce((sum, sale) => sum + sale.items, 0),
		revenue: sales.filter((sale) => sale.customer).reduce((sum, sale) => sum + sale.total, 0)
	})).slice(0, 5);
	const hasAnyData = products.length + rawMaterials.length + customers.length + suppliers.length + sales.length + purchaseOrders.length + productionBatches.length + expenses.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: "Dashboard"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground mt-1",
				children: "Your live ERP snapshot, built from records you add."
			})] }),
			!hasAnyData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "Start by adding your real records",
				description: "Use Products, Raw Materials, Customers, Suppliers, Sales, Purchase Orders, Production, and Expenses to fill this dashboard."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Today's Revenue",
						value: fmtCurrency(todayRevenue),
						icon: DollarSign,
						tone: "primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Monthly Profit",
						value: fmtCurrency(monthlyProfit),
						hint: "revenue minus expenses",
						icon: TrendingUp,
						tone: "primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Monthly Revenue",
						value: fmtCurrency(monthlyRevenue),
						icon: Receipt
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Monthly Expenses",
						value: fmtCurrency(monthlyExpenses),
						icon: DollarSign,
						tone: "warning"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Inventory Value",
						value: fmtCurrency(finishedValue + rawValue),
						icon: Boxes,
						tone: "info"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Finished Goods",
						value: fmtCurrency(finishedValue),
						icon: Package
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Raw Material Value",
						value: fmtCurrency(rawValue),
						icon: Wheat
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Open Purchase Orders",
						value: String(purchaseOrders.filter((p) => p.status !== "Cancelled" && p.receiving !== "Received").length),
						icon: Clock,
						tone: "warning"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
				children: [
					{
						label: "Products",
						value: products.length,
						icon: Package
					},
					{
						label: "Raw Materials",
						value: rawMaterials.length,
						icon: Wheat
					},
					{
						label: "Customers",
						value: customers.length,
						icon: Users
					},
					{
						label: "Suppliers",
						value: suppliers.length,
						icon: Truck
					},
					{
						label: "Pending Orders",
						value: purchaseOrders.filter((p) => p.receiving !== "Received").length,
						icon: Clock
					},
					{
						label: "Production Today",
						value: productionBatches.filter((b) => b.mfgDate === today).reduce((sum, b) => sum + b.quantity, 0),
						icon: Factory
					}
				].map((s) => {
					const Icon = s.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }),
								" ",
								s.label
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1.5 text-xl font-semibold",
							children: s.value
						})]
					}, s.label);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
						title: "Revenue Trend",
						subtitle: "By month",
						children: monthlySales.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-[260px] items-center justify-center text-sm text-muted-foreground",
							children: "No sales yet"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: 260,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: monthlySales,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--color-border)",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "month",
										tick: {
											fontSize: 11,
											fill: "var(--color-muted-foreground)"
										},
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tick: {
											fontSize: 11,
											fill: "var(--color-muted-foreground)"
										},
										axisLine: false,
										tickLine: false,
										tickFormatter: (v) => "Rs. " + Number(v) / 1e3 + "k"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										borderRadius: 10,
										border: "1px solid var(--color-border)",
										background: "var(--color-popover)",
										fontSize: 12
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "sales",
										stroke: "var(--color-primary)",
										strokeWidth: 2.5,
										fill: "var(--color-primary)",
										fillOpacity: .15
									})
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
						title: "Monthly Profit",
						subtitle: "Revenue minus expenses",
						children: monthlySales.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-[260px] items-center justify-center text-sm text-muted-foreground",
							children: "No profit data yet"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: 260,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: monthlySales,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--color-border)",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "month",
										tick: {
											fontSize: 11,
											fill: "var(--color-muted-foreground)"
										},
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tick: {
											fontSize: 11,
											fill: "var(--color-muted-foreground)"
										},
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										borderRadius: 10,
										border: "1px solid var(--color-border)",
										background: "var(--color-popover)",
										fontSize: 12
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "profit",
										fill: "var(--color-primary)",
										radius: [
											8,
											8,
											0,
											0
										]
									})
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
						title: "Expense Breakdown",
						subtitle: "By category",
						children: expenseBreakdown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-[260px] items-center justify-center text-sm text-muted-foreground",
							children: "No expenses yet"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: 260,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
								data: expenseBreakdown,
								dataKey: "value",
								innerRadius: 55,
								outerRadius: 90,
								paddingAngle: 3,
								children: expenseBreakdown.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: e.color }, i))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
								borderRadius: 10,
								border: "1px solid var(--color-border)",
								background: "var(--color-popover)",
								fontSize: 12
							} })] })
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
						title: "Production Trend",
						subtitle: "Units by day",
						children: Object.values(productionTrend).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-[220px] items-center justify-center text-sm text-muted-foreground",
							children: "No production yet"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: 220,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: Object.values(productionTrend),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--color-border)",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "day",
										tick: {
											fontSize: 11,
											fill: "var(--color-muted-foreground)"
										},
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tick: {
											fontSize: 11,
											fill: "var(--color-muted-foreground)"
										},
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										borderRadius: 10,
										border: "1px solid var(--color-border)",
										background: "var(--color-popover)",
										fontSize: 12
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "units",
										fill: "var(--color-primary)",
										radius: [
											8,
											8,
											0,
											0
										]
									})
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
						title: "Recent Activity",
						subtitle: "Across the plant",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3 max-h-[240px] overflow-y-auto",
							children: activities.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-muted-foreground",
								children: "No activity yet"
							}) : activities.slice(0, 6).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm leading-snug",
										children: a.message
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground mt-0.5",
										children: [
											a.user,
											" - ",
											a.time
										]
									})]
								})]
							}, a.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
						title: "Low Stock Alerts",
						subtitle: "Below minimum threshold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: lowStock.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-muted-foreground",
								children: "No low stock alerts"
							}) : lowStock.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-8 w-8 items-center justify-center rounded-lg bg-warning/15 text-warning-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-medium truncate",
											children: item.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs text-muted-foreground",
											children: [
												item.stock ?? item.quantity,
												" / ",
												item.minStock,
												" min"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: item.status ?? "Low Stock" })
								]
							}, item.id))
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: "Recent Sales",
					subtitle: "Latest invoices",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y divide-border -mx-1",
						children: sales.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-1 py-3 text-sm text-muted-foreground",
							children: "No invoices yet"
						}) : sales.slice(0, 5).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between px-1 py-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium",
								children: s.id
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground",
								children: [
									s.customer,
									" - ",
									s.date
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-semibold tabular-nums",
									children: fmtCurrency(s.total)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: s.payment })]
							})]
						}, s.id))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: "Recent Purchases",
					subtitle: "Latest POs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y divide-border -mx-1",
						children: purchaseOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-1 py-3 text-sm text-muted-foreground",
							children: "No purchase orders yet"
						}) : purchaseOrders.slice(0, 5).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between px-1 py-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium",
								children: p.id
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground",
								children: [
									p.supplier,
									" - ",
									p.date
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-semibold tabular-nums",
									children: fmtCurrency(p.total)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: p.status })]
							})]
						}, p.id))
					})
				})]
			})
		]
	});
}
//#endregion
export { Dashboard as component };
