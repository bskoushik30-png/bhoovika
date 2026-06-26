import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  delta?: number;
  hint?: string;
  icon?: LucideIcon;
  tone?: "default" | "primary" | "warning" | "info";
}

export function StatCard({ label, value, delta, hint, icon: Icon, tone = "default" }: StatCardProps) {
  const toneBg = {
    default: "bg-muted/60 text-foreground",
    primary: "bg-primary/10 text-primary",
    warning: "bg-warning/15 text-warning-foreground",
    info: "bg-info/10 text-info",
  }[tone];

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-elegant transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</div>
          <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
        </div>
        {Icon && (
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", toneBg)}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
      {(delta !== undefined || hint) && (
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          {delta !== undefined && (
            <span className={cn(
              "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-medium",
              delta >= 0 ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive",
            )}>
              {delta >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              {Math.abs(delta)}%
            </span>
          )}
          {hint && <span className="text-muted-foreground">{hint}</span>}
        </div>
      )}
    </div>
  );
}
