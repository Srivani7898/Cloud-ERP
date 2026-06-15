import { ModuleHealthPanel, TrendPanel } from "@/components/analytics/AnalyticsWidgets";

export default function AnalyticsChartsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Interactive charts</h1>
        <p className="mt-2 text-slate-300">Executive visualizations for trend, variance, and health analysis.</p>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <TrendPanel />
        <ModuleHealthPanel />
      </div>
    </div>
  );
}
