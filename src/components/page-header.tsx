import { Button } from "@/components/ui/button";
import { Download, Plus, Filter } from "lucide-react";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  primaryLabel?: string;
  showExport?: boolean;
  showFilter?: boolean;
  children?: ReactNode;
}

export function PageHeader({ title, description, primaryLabel, showExport, showFilter, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{description}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {children}
        {showFilter && (
          <Button variant="outline" size="sm" className="h-9 gap-1.5">
            <Filter className="h-4 w-4" /> Filter
          </Button>
        )}
        {showExport && (
          <Button variant="outline" size="sm" className="h-9 gap-1.5">
            <Download className="h-4 w-4" /> Export
          </Button>
        )}
        {primaryLabel && (
          <Button size="sm" className="h-9 gap-1.5 shadow-soft">
            <Plus className="h-4 w-4" /> {primaryLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
