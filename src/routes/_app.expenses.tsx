import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { DataTable, type Column } from "@/components/data-table";
import { RecordDialog } from "@/components/record-dialog";
import { StatCard } from "@/components/stat-card";
import { createId, fmtCurrency, getExpenseBreakdown, todayIso, useErpData, type Expense } from "@/lib/erp-store";
import { Wallet, TrendingDown, Receipt } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export const Route = createFileRoute("/_app/expenses")({
  head: () => ({ meta: [{ title: "Expenses - PureHarvest ERP" }] }),
  component: ExpensesPage,
});

function ExpensesPage() {
  const { expenses, addExpense, addActivity } = useErpData();
  const breakdown = getExpenseBreakdown(expenses);
  const monthKey = todayIso().slice(0, 7);
  const thisMonth = expenses.filter((e) => e.date.slice(0, 7) === monthKey).reduce((sum, e) => sum + e.amount, 0);
  const avgDay = expenses.length ? thisMonth / Math.max(new Date().getDate(), 1) : 0;
  const cols: Column<Expense>[] = [
    { key: "date", header: "Date", render: (e) => <span className="text-muted-foreground">{e.date}</span> },
    { key: "category", header: "Category", render: (e) => <span className="font-medium">{e.category}</span> },
    { key: "description", header: "Description", render: (e) => <span className="text-muted-foreground">{e.description}</span> },
    { key: "paidBy", header: "Paid via", render: (e) => <span className="text-muted-foreground">{e.paidBy}</span> },
    { key: "amount", header: "Amount", align: "right", render: (e) => <span className="font-semibold tabular-nums">{fmtCurrency(e.amount)}</span> },
  ];

  return (
    <>
      <PageHeader title="Expenses" description="Every cost that touches the plant, packaging, labour, utilities, and more." showFilter showExport>
        <RecordDialog
          title="Log expense"
          triggerLabel="Log expense"
          fields={[
            { name: "date", label: "Date", type: "date", defaultValue: todayIso(), required: true },
            { name: "category", label: "Category", type: "select", required: true, options: ["Packaging", "Labour", "Electricity", "Rent", "Transport", "Machine Maintenance", "Marketing", "Fuel", "Other"] },
            { name: "paidBy", label: "Paid via", type: "select", defaultValue: "Bank", options: ["Bank", "Cash", "UPI", "Card"] },
            { name: "amount", label: "Amount", type: "number", required: true },
            { name: "description", label: "Description", type: "textarea" },
          ]}
          onSubmit={(values) => {
            const expense: Expense = { id: createId("EXP"), date: String(values.date), category: String(values.category), description: String(values.description), amount: Number(values.amount), paidBy: String(values.paidBy || "Bank") };
            addExpense(expense);
            addActivity("Expense", `${expense.category} expense logged`);
          }}
        />
      </PageHeader>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 mb-6">
        <StatCard label="This month" value={fmtCurrency(thisMonth)} icon={Wallet} tone="warning" />
        <StatCard label="Entries" value={String(expenses.length)} icon={Receipt} />
        <StatCard label="Avg / day" value={fmtCurrency(avgDay)} icon={TrendingDown} />
      </div>
      <div className="grid gap-4 lg:grid-cols-3 mb-6">
        <div className="lg:col-span-2"><DataTable columns={cols} rows={expenses} empty="No expenses logged yet." /></div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h3 className="text-sm font-semibold mb-3">By category</h3>
          {breakdown.length === 0 ? (
            <div className="flex h-[220px] items-center justify-center text-sm text-muted-foreground">No expense data yet</div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={breakdown} dataKey="value" innerRadius={50} outerRadius={85} paddingAngle={3}>
                    {breakdown.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid var(--color-border)", background: "var(--color-popover)", fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 mt-2">
                {breakdown.map((e) => <div key={e.name} className="flex items-center justify-between text-xs"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: e.color }} />{e.name}</span><span className="tabular-nums font-medium">{fmtCurrency(e.value)}</span></div>)}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
