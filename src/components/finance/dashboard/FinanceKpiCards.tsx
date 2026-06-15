import { ArrowDownRight, ArrowUpRight, WalletCards } from "lucide-react";
import type { FinanceKpi } from "@/types/finance";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function FinanceKpiCards({ kpis }: { kpis: FinanceKpi[] }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => {
        const positive = kpi.tone === "positive";
        return (
          <Card key={kpi.label} className="border-slate-200 bg-white/90 shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500 dark:text-slate-400">{kpi.label}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-500/10 text-blue-600 dark:text-cyan-300">
                  <WalletCards className="h-4 w-4" />
                </span>
              </div>
              <div className="mt-5 text-2xl font-semibold">{kpi.value}</div>
              <p className={cn("mt-2 flex items-center gap-1 text-sm", positive ? "text-emerald-600 dark:text-emerald-300" : "text-amber-600 dark:text-amber-300")}>
                {positive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                {kpi.change} vs prior period
              </p>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
