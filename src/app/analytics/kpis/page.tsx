import { KpiGrid, ModuleHealthPanel } from "@/components/analytics/AnalyticsWidgets";

export default function AnalyticsKpisPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">KPI monitoring</h1>
        <p className="mt-2 text-slate-300">Board-level operating metrics and module scorecards.</p>
      </div>
      <KpiGrid />
      <ModuleHealthPanel />
    </div>
  );
}
