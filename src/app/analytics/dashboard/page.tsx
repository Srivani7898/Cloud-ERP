import { LiveModuleDashboard } from "@/components/shared/LiveModuleDashboard";

export default function AnalyticsDashboardPage() {
  return (
    <LiveModuleDashboard
      eyebrow="Business Intelligence"
      title="Enterprise analytics command center"
      description="Live report, KPI, widget, chart, and AI insight summaries from analytics backend APIs."
      moduleKey="analytics"
      resources={[
        { resource: "reports", label: "Reports", description: "Executive reports and cross-module exports." },
        { resource: "kpis", label: "KPIs", description: "Key performance indicators and targets." },
        { resource: "widgets", label: "Widgets", description: "Dashboard builder widgets and saved components." },
        { resource: "insights", label: "AI Insights", description: "AI-generated executive recommendations." },
      ]}
    />
  );
}
