import { AiInsightPanel } from "@/components/analytics/AnalyticsWidgets";

export default function AnalyticsInsightsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">AI insights dashboard</h1>
        <p className="mt-2 text-slate-300">Machine-assisted observations, anomalies, and recommended business actions.</p>
      </div>
      <AiInsightPanel />
      <section className="grid gap-4 md:grid-cols-3">
        {["Margin anomaly detection", "Demand risk prediction", "Workforce trend summary"].map((item) => <article key={item} className="rounded-lg border border-slate-700 bg-slate-900/70 p-5"><p className="text-lg font-semibold">{item}</p><p className="mt-2 text-slate-400">Confidence score above enterprise alert threshold.</p><span className="mt-4 inline-flex rounded-full bg-cyan-500/15 px-3 py-1 text-sm font-semibold text-cyan-200">AI monitored</span></article>)}
      </section>
    </div>
  );
}
