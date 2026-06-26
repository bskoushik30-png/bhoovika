import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings - PureHarvest ERP" }] }),
  component: SettingsPage,
});

function Section({ title, desc, children }: any) {
  return <div className="rounded-2xl border border-border bg-card p-6 shadow-soft"><div className="mb-5"><h3 className="text-base font-semibold">{title}</h3><p className="text-xs text-muted-foreground mt-0.5">{desc}</p></div><div className="space-y-4">{children}</div></div>;
}

function Row({ label, children }: any) {
  return <div className="grid sm:grid-cols-3 gap-3 items-center"><Label className="text-sm">{label}</Label><div className="sm:col-span-2">{children}</div></div>;
}

function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Company details, invoice setup, taxes, and notifications." />
      <div className="grid gap-5 lg:grid-cols-2">
        <Section title="Company" desc="Shown on invoices and POs.">
          <div className="flex items-center gap-4"><div className="h-14 w-14 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-glow"><Leaf className="h-6 w-6" /></div><Button variant="outline" size="sm" disabled>Upload logo</Button></div>
          <Row label="Company name"><Input placeholder="Your company name" /></Row>
          <Row label="GST number"><Input placeholder="GST number" /></Row>
          <Row label="Address"><Input placeholder="Registered address" /></Row>
        </Section>
        <Section title="Invoice & Tax" desc="Defaults applied to new invoices.">
          <Row label="Invoice prefix"><Input placeholder="INV-" /></Row>
          <Row label="Next invoice #"><Input placeholder="1" /></Row>
          <Row label="Default GST %"><Input placeholder="5" /></Row>
          <Row label="Currency"><Input placeholder="INR" /></Row>
        </Section>
        <Section title="Notifications" desc="Choose which alerts you want to receive.">
          <Row label="Low stock alerts"><Switch /></Row>
          <Row label="Expiry warnings"><Switch /></Row>
          <Row label="Production complete"><Switch /></Row>
          <Row label="Payment reminders"><Switch /></Row>
        </Section>
        <Section title="Appearance" desc="Theme and density preferences.">
          <Row label="Dark mode"><Switch /></Row>
          <Row label="Compact tables"><Switch /></Row>
          <Row label="Show product images"><Switch /></Row>
        </Section>
      </div>
      <div className="flex justify-end gap-2 mt-6"><Button variant="outline" disabled>Cancel</Button><Button disabled>Save changes</Button></div>
    </>
  );
}
