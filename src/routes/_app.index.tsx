import { createFileRoute } from "@tanstack/react-router";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DollarSign, TrendingUp, Package, Wheat, Users, Truck, Factory, AlertTriangle, Clock, Receipt, Boxes } from "lucide-react";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { EmptyState } from "@/components/empty-state";
import { fmtCurrency, getExpenseBreakdown, getMonthlySales, todayIso, useErpData } from "@/lib/erp-store";

export const Route = createFileRoute("/_app/")({
  head: () => ({ meta: [{ title: "Dashboard - PureHarvest ERP" }] }),
  component: Dashboard,
});

function ChartCard({ title, subtitle, children }: any) {
  return <div className="rounded-2xl border border-border bg-card p-5 shadow-soft"><div className="mb-4"><h3 className="text-sm font-semibold">{title}</h3>{subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}</div>{children}</div>;
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
  const productionTrend = productionBatches.reduce<Record<string, { day: string; units: number }>>((acc, batch) => {
    const day = new Date(batch.mfgDate).toLocaleString("en-IN", { weekday: "short" });
    acc[day] = acc[day] ?? { day, units: 0 };
    acc[day].units += batch.quantity;
    return acc;
  }, {});
  const topProducts = products.map((product) => ({ name: product.name, units: sales.filter((sale) => sale.status !== "Cancelled").reduce((sum, sale) => sum + sale.items, 0), revenue: sales.filter((sale) => sale.customer).reduce((sum, sale) => sum + sale.total, 0) })).slice(0, 5);
  const hasAnyData = products.length + rawMaterials.length + customers.length + suppliers.length + sales.length + purchaseOrders.length + productionBatches.length + expenses.length > 0;

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1><p className="text-sm text-muted-foreground mt-1">Your live ERP snapshot, built from records you add.</p></div>
      {!hasAnyData && <EmptyState title="Start by adding your real records" description="Use Products, Raw Materials, Customers, Suppliers, Sales, Purchase Orders, Production, and Expenses to fill this dashboard." />}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <StatCard label="Today's Revenue" value={fmtCurrency(todayRevenue)} icon={DollarSign} tone="primary" />
        <StatCard label="Monthly Profit" value={fmtCurrency(monthlyProfit)} hint="revenue minus expenses" icon={TrendingUp} tone="primary" />
        <StatCard label="Monthly Revenue" value={fmtCurrency(monthlyRevenue)} icon={Receipt} />
        <StatCard label="Monthly Expenses" value={fmtCurrency(monthlyExpenses)} icon={DollarSign} tone="warning" />
      </div>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <StatCard label="Inventory Value" value={fmtCurrency(finishedValue + rawValue)} icon={Boxes} tone="info" />
        <StatCard label="Finished Goods" value={fmtCurrency(finishedValue)} icon={Package} />
        <StatCard label="Raw Material Value" value={fmtCurrency(rawValue)} icon={Wheat} />
        <StatCard label="Open Purchase Orders" value={String(purchaseOrders.filter((p) => p.status !== "Cancelled" && p.receiving !== "Received").length)} icon={Clock} tone="warning" />
      </div>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {[{ label: "Products", value: products.length, icon: Package }, { label: "Raw Materials", value: rawMaterials.length, icon: Wheat }, { label: "Customers", value: customers.length, icon: Users }, { label: "Suppliers", value: suppliers.length, icon: Truck }, { label: "Pending Orders", value: purchaseOrders.filter((p) => p.receiving !== "Received").length, icon: Clock }, { label: "Production Today", value: productionBatches.filter((b) => b.mfgDate === today).reduce((sum, b) => sum + b.quantity, 0), icon: Factory }].map((s) => { const Icon = s.icon; return <div key={s.label} className="rounded-xl border border-border bg-card p-4 shadow-soft"><div className="flex items-center gap-2 text-xs text-muted-foreground"><Icon className="h-3.5 w-3.5" /> {s.label}</div><div className="mt-1.5 text-xl font-semibold">{s.value}</div></div>; })}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Revenue Trend" subtitle="By month">
          {monthlySales.length === 0 ? <div className="flex h-[260px] items-center justify-center text-sm text-muted-foreground">No sales yet</div> : <ResponsiveContainer width="100%" height={260}><AreaChart data={monthlySales}><CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} /><XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => "Rs. " + (Number(v) / 1000) + "k"} /><Tooltip contentStyle={{ borderRadius: 10, border: "1px solid var(--color-border)", background: "var(--color-popover)", fontSize: 12 }} /><Area type="monotone" dataKey="sales" stroke="var(--color-primary)" strokeWidth={2.5} fill="var(--color-primary)" fillOpacity={0.15} /></AreaChart></ResponsiveContainer>}
        </ChartCard>
        <ChartCard title="Monthly Profit" subtitle="Revenue minus expenses">
          {monthlySales.length === 0 ? <div className="flex h-[260px] items-center justify-center text-sm text-muted-foreground">No profit data yet</div> : <ResponsiveContainer width="100%" height={260}><BarChart data={monthlySales}><CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} /><XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ borderRadius: 10, border: "1px solid var(--color-border)", background: "var(--color-popover)", fontSize: 12 }} /><Bar dataKey="profit" fill="var(--color-primary)" radius={[8, 8, 0, 0]} /></BarChart></ResponsiveContainer>}
        </ChartCard>
        <ChartCard title="Expense Breakdown" subtitle="By category">
          {expenseBreakdown.length === 0 ? <div className="flex h-[260px] items-center justify-center text-sm text-muted-foreground">No expenses yet</div> : <ResponsiveContainer width="100%" height={260}><PieChart><Pie data={expenseBreakdown} dataKey="value" innerRadius={55} outerRadius={90} paddingAngle={3}>{expenseBreakdown.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip contentStyle={{ borderRadius: 10, border: "1px solid var(--color-border)", background: "var(--color-popover)", fontSize: 12 }} /></PieChart></ResponsiveContainer>}
        </ChartCard>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Production Trend" subtitle="Units by day">
          {Object.values(productionTrend).length === 0 ? <div className="flex h-[220px] items-center justify-center text-sm text-muted-foreground">No production yet</div> : <ResponsiveContainer width="100%" height={220}><BarChart data={Object.values(productionTrend)}><CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} /><XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ borderRadius: 10, border: "1px solid var(--color-border)", background: "var(--color-popover)", fontSize: 12 }} /><Bar dataKey="units" fill="var(--color-primary)" radius={[8, 8, 0, 0]} /></BarChart></ResponsiveContainer>}
        </ChartCard>
        <ChartCard title="Recent Activity" subtitle="Across the plant"><div className="space-y-3 max-h-[240px] overflow-y-auto">{activities.length === 0 ? <div className="text-sm text-muted-foreground">No activity yet</div> : activities.slice(0, 6).map((a) => <div key={a.id} className="flex gap-3"><div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" /><div className="flex-1 min-w-0"><div className="text-sm leading-snug">{a.message}</div><div className="text-xs text-muted-foreground mt-0.5">{a.user} - {a.time}</div></div></div>)}</div></ChartCard>
        <ChartCard title="Low Stock Alerts" subtitle="Below minimum threshold"><div className="space-y-3">{lowStock.length === 0 ? <div className="text-sm text-muted-foreground">No low stock alerts</div> : lowStock.map((item: any) => <div key={item.id} className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/15 text-warning-foreground"><AlertTriangle className="h-4 w-4" /></div><div className="flex-1 min-w-0"><div className="text-sm font-medium truncate">{item.name}</div><div className="text-xs text-muted-foreground">{item.stock ?? item.quantity} / {item.minStock} min</div></div><StatusBadge status={item.status ?? "Low Stock"} /></div>)}</div></ChartCard>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Recent Sales" subtitle="Latest invoices"><div className="divide-y divide-border -mx-1">{sales.length === 0 ? <div className="px-1 py-3 text-sm text-muted-foreground">No invoices yet</div> : sales.slice(0, 5).map((s) => <div key={s.id} className="flex items-center justify-between px-1 py-2.5"><div><div className="text-sm font-medium">{s.id}</div><div className="text-xs text-muted-foreground">{s.customer} - {s.date}</div></div><div className="flex items-center gap-2"><span className="text-sm font-semibold tabular-nums">{fmtCurrency(s.total)}</span><StatusBadge status={s.payment} /></div></div>)}</div></ChartCard>
        <ChartCard title="Recent Purchases" subtitle="Latest POs"><div className="divide-y divide-border -mx-1">{purchaseOrders.length === 0 ? <div className="px-1 py-3 text-sm text-muted-foreground">No purchase orders yet</div> : purchaseOrders.slice(0, 5).map((p) => <div key={p.id} className="flex items-center justify-between px-1 py-2.5"><div><div className="text-sm font-medium">{p.id}</div><div className="text-xs text-muted-foreground">{p.supplier} - {p.date}</div></div><div className="flex items-center gap-2"><span className="text-sm font-semibold tabular-nums">{fmtCurrency(p.total)}</span><StatusBadge status={p.status} /></div></div>)}</div></ChartCard>
      </div>
    </div>
  );
}
