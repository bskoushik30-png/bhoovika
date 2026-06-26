import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { DataTable, type Column } from "@/components/data-table";
import { RecordDialog } from "@/components/record-dialog";
import { createId, fmtCurrency, useErpData, type Customer } from "@/lib/erp-store";
import { Mail, Phone } from "lucide-react";

export const Route = createFileRoute("/_app/customers")({
  head: () => ({ meta: [{ title: "Customers - PureHarvest ERP" }] }),
  component: CustomersPage,
});

function initials(name: string) {
  return name.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
}

function CustomersPage() {
  const { customers, addCustomer, addActivity } = useErpData();
  const cols: Column<Customer>[] = [
    {
      key: "name", header: "Customer",
      render: (c) => (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-primary-foreground text-xs font-semibold">
            {initials(c.name)}
          </div>
          <div>
            <div className="font-medium">{c.name}</div>
            <div className="text-xs text-muted-foreground">{c.address}</div>
          </div>
        </div>
      ),
    },
    { key: "contact", header: "Contact", render: (c) => <div className="space-y-0.5 text-xs text-muted-foreground"><div className="flex items-center gap-1.5"><Phone className="h-3 w-3" />{c.phone}</div><div className="flex items-center gap-1.5"><Mail className="h-3 w-3" />{c.email}</div></div> },
    { key: "gst", header: "GST", render: (c) => <span className="font-mono text-xs">{c.gst}</span> },
    { key: "purchases", header: "Purchases", align: "right", render: (c) => <span className="font-medium tabular-nums">{fmtCurrency(c.purchases)}</span> },
    { key: "outstanding", header: "Outstanding", align: "right", render: (c) => <span className={c.outstanding > 0 ? "text-warning-foreground tabular-nums" : "text-muted-foreground tabular-nums"}>{fmtCurrency(c.outstanding)}</span> },
    { key: "credit", header: "Credit Limit", align: "right", render: (c) => <span className="text-muted-foreground tabular-nums">{fmtCurrency(c.credit)}</span> },
  ];

  return (
    <>
      <PageHeader title="Customers" description="Buyers, outstanding balances, and purchase history." showFilter showExport>
        <RecordDialog
          title="Add customer"
          triggerLabel="Add customer"
          fields={[
            { name: "name", label: "Customer name", required: true },
            { name: "phone", label: "Phone", type: "tel" },
            { name: "email", label: "Email", type: "email" },
            { name: "gst", label: "GST number" },
            { name: "address", label: "Address", type: "textarea" },
            { name: "credit", label: "Credit limit", type: "number", defaultValue: 0 },
          ]}
          onSubmit={(values) => {
            const customer: Customer = { id: createId("CUS"), name: String(values.name), phone: String(values.phone), email: String(values.email), gst: String(values.gst), address: String(values.address), purchases: 0, outstanding: 0, credit: Number(values.credit) };
            addCustomer(customer);
            addActivity("Sale", `${customer.name} added as customer`);
          }}
        />
      </PageHeader>
      <DataTable columns={cols} rows={customers} empty="No customers yet. Add customers before creating invoices." />
    </>
  );
}
