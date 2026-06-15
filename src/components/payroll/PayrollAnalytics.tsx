"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { PayrollRun } from "@/types/payroll";

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

export function PayrollAnalytics({ runs }: { runs: PayrollRun[] }) {
  const maxGross = Math.max(...runs.map((run) => run.grossPay), 1);
  const maxNet = Math.max(...runs.map((run) => run.netPay), 1);

  return (
    <section className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
      <Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]">
        <CardHeader>
          <CardTitle>Payroll cost trend</CardTitle>
          <CardDescription>Gross pay, deductions, and net pay by payroll period.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid h-72 grid-cols-3 items-end gap-5 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/40">
            {runs.slice(0, 3).reverse().map((run) => (
              <div key={run.id} className="flex h-full flex-col justify-end gap-3">
                <div className="flex flex-1 items-end justify-center gap-2">
                  <div className="w-5 rounded-t-md bg-blue-600" style={{ height: `${(run.grossPay / maxGross) * 100}%` }} title={`Gross ${money(run.grossPay)}`} />
                  <div className="w-5 rounded-t-md bg-violet-500" style={{ height: `${(run.netPay / maxGross) * 100}%` }} title={`Net ${money(run.netPay)}`} />
                  <div className="w-5 rounded-t-md bg-cyan-400" style={{ height: `${(run.deductions / maxGross) * 100}%` }} title={`Deductions ${money(run.deductions)}`} />
                </div>
                <span className="text-center text-xs text-slate-500 dark:text-slate-400">{run.period}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-blue-600" />Gross</span>
            <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-violet-500" />Net</span>
            <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />Deductions</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]">
        <CardHeader>
          <CardTitle>Payroll readiness</CardTitle>
          <CardDescription>Operational checks before salary release.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {[
            ["HR employee sync", 96],
            ["Bank verification", 88],
            ["Tax validation", 91],
            ["Finance journal sync", 84]
          ].map(([label, value]) => (
            <div key={label as string}>
              <div className="mb-2 flex justify-between text-sm">
                <span>{label as string}</span>
                <span>{value as number}%</span>
              </div>
              <div className="h-3 rounded-full bg-slate-200 dark:bg-white/10">
                <div className="h-3 rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-500" style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
