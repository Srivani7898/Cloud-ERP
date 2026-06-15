import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const cashflow = [
  { month: "Jan", inflow: 4.2, outflow: 2.8 },
  { month: "Feb", inflow: 5.1, outflow: 3.2 },
  { month: "Mar", inflow: 6.4, outflow: 3.7 },
  { month: "Apr", inflow: 5.8, outflow: 4.1 },
  { month: "May", inflow: 7.2, outflow: 4.5 },
  { month: "Jun", inflow: 8.1, outflow: 4.8 }
];

const aging = [
  { bucket: "0-30", ar: 1.2, ap: 0.8 },
  { bucket: "31-60", ar: 0.7, ap: 0.5 },
  { bucket: "61-90", ar: 0.4, ap: 0.3 },
  { bucket: "90+", ar: 0.2, ap: 0.1 }
];

export function FinanceCharts() {
  const maxCash = Math.max(...cashflow.flatMap((item) => [item.inflow, item.outflow]));
  const maxAging = Math.max(...aging.flatMap((item) => [item.ar, item.ap]));

  return (
    <section className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
      <Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]">
        <CardHeader>
          <CardTitle>Cash flow forecast</CardTitle>
          <CardDescription>AI-projected inflow and outflow in millions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid h-72 grid-cols-6 items-end gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/40">
            {cashflow.map((item) => (
              <div key={item.month} className="flex h-full flex-col justify-end gap-3">
                <div className="flex flex-1 items-end justify-center gap-1.5">
                  <div
                    className="w-4 rounded-t-md bg-cyan-400 shadow-lg shadow-cyan-500/20"
                    style={{ height: `${(item.inflow / maxCash) * 100}%` }}
                    title={`Inflow $${item.inflow}M`}
                  />
                  <div
                    className="w-4 rounded-t-md bg-violet-500 shadow-lg shadow-violet-500/20"
                    style={{ height: `${(item.outflow / maxCash) * 100}%` }}
                    title={`Outflow $${item.outflow}M`}
                  />
                </div>
                <span className="text-center text-xs text-slate-500 dark:text-slate-400">{item.month}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />Inflow</span>
            <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-violet-500" />Outflow</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]">
        <CardHeader>
          <CardTitle>AP / AR aging</CardTitle>
          <CardDescription>Exposure by aging bucket in millions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {aging.map((item) => (
            <div key={item.bucket}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium">{item.bucket} days</span>
                <span className="text-slate-500 dark:text-slate-400">${(item.ar + item.ap).toFixed(1)}M</span>
              </div>
              <div className="grid gap-2">
                <div className="h-2 rounded-full bg-slate-200 dark:bg-white/10">
                  <div className="h-2 rounded-full bg-blue-600" style={{ width: `${(item.ar / maxAging) * 100}%` }} />
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-white/10">
                  <div className="h-2 rounded-full bg-violet-500" style={{ width: `${(item.ap / maxAging) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
          <div className="flex gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-blue-600" />AR</span>
            <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-violet-500" />AP</span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
