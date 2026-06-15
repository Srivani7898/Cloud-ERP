"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ForecastTrend } from "@/types/forecast";

export function ForecastTrendChart({ trends }: { trends: ForecastTrend[] }) {
  const max = Math.max(...trends.flatMap((trend) => [trend.historical, trend.forecast]), 1);
  return (
    <Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]">
      <CardHeader><CardTitle>Historical vs forecast</CardTitle><CardDescription>Demand comparison by month.</CardDescription></CardHeader>
      <CardContent>
        <div className="grid h-72 grid-cols-6 items-end gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/40">
          {trends.map((trend) => <div key={trend.month} className="flex h-full flex-col justify-end gap-3"><div className="flex flex-1 items-end justify-center gap-2"><div className="w-5 rounded-t-md bg-blue-600" style={{ height: `${(trend.historical / max) * 100}%` }} /><div className="w-5 rounded-t-md bg-cyan-400" style={{ height: `${(trend.forecast / max) * 100}%` }} /></div><span className="text-center text-xs text-slate-500 dark:text-slate-400">{trend.month}</span></div>)}
        </div>
        <div className="mt-3 flex gap-4 text-xs text-slate-500 dark:text-slate-400"><span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-blue-600" />Historical</span><span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />Forecast</span></div>
      </CardContent>
    </Card>
  );
}
