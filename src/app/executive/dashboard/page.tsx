import Link from "next/link";
import { AiInsightPanel, KpiGrid, ModuleHealthPanel, TrendPanel } from "@/components/analytics/AnalyticsWidgets";

export default function ExecutiveDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Executive dashboard</h1>
          <p className="mt-2 text-slate-300">Board-ready performance overview for the enterprise ERP estate.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/executive/reports" className="rounded-lg bg-blue-600 px-4 py-2 font-semibold">Reports</Link>
          <Link href="/executive/insights" className="rounded-lg border border-slate-700 px-4 py-2 font-semibold">Insights</Link>
        </div>
      </div>
      <KpiGrid />
      <TrendPanel />
      <div className="grid gap-6 xl:grid-cols-2"><ModuleHealthPanel /><AiInsightPanel /></div>
    </div>
  );
}
