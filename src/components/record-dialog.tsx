import { useState, type FormEvent } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type RecordField = {
  name: string;
  label: string;
  type?: "text" | "number" | "date" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  defaultValue?: string | number;
  options?: string[];
};

type RecordDialogProps = {
  title: string;
  description?: string;
  triggerLabel: string;
  fields: RecordField[];
  onSubmit: (values: Record<string, string | number>) => void;
};

export function RecordDialog({ title, description, triggerLabel, fields, onSubmit }: RecordDialogProps) {
  const [open, setOpen] = useState(false);
  const initialValues = () => Object.fromEntries(fields.map((field) => [field.name, field.defaultValue ?? ""]));
  const [values, setValues] = useState<Record<string, string | number>>(initialValues);

  const updateValue = (name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = Object.fromEntries(
      fields.map((field) => {
        const value = values[field.name] ?? "";
        return [field.name, field.type === "number" ? Number(value) || 0 : String(value).trim()];
      }),
    );
    onSubmit(parsed);
    setValues(initialValues());
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-9 gap-1.5 shadow-soft">
          <Plus className="h-4 w-4" /> {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <form className="space-y-4" onSubmit={submit}>
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => {
              const hasOptions = (field.options?.length ?? 0) > 0;
              return (
                <div key={field.name} className={field.type === "textarea" ? "space-y-2 sm:col-span-2" : "space-y-2"}>
                  <Label htmlFor={field.name}>{field.label}</Label>
                  {field.type === "textarea" ? (
                    <Textarea
                      id={field.name}
                      required={field.required}
                      placeholder={field.placeholder}
                      value={String(values[field.name] ?? "")}
                      onChange={(event) => updateValue(field.name, event.target.value)}
                    />
                  ) : field.type === "select" && hasOptions ? (
                    <select
                      id={field.name}
                      required={field.required}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={String(values[field.name] ?? "")}
                      onChange={(event) => updateValue(field.name, event.target.value)}
                    >
                      <option value="">Select</option>
                      {field.options?.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  ) : (
                    <Input
                      id={field.name}
                      type={field.type === "select" ? "text" : field.type ?? "text"}
                      required={field.required}
                      placeholder={field.placeholder ?? (field.type === "select" ? `Enter ${field.label.toLowerCase()}` : undefined)}
                      value={String(values[field.name] ?? "")}
                      onChange={(event) => updateValue(field.name, event.target.value)}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
