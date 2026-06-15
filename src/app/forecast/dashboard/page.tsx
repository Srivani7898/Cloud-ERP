import { LiveModuleDashboard } from "@/components/shared/LiveModuleDashboard";

export default function ForecastDashboardPage() {
  return (
    <LiveModuleDashboard
      eyebrow="AI Demand Forecasting"
      title="Executive demand intelligence center"
      description="Live predictions, SKUs, recommendations, model, and trend summaries from forecasting APIs."
      moduleKey="forecast"
      resources={[
        { resource: "predictions", label: "Predictions", description: "Demand forecasts, confidence, and approval state." },
        { resource: "skus", label: "SKUs", description: "Forecastable SKU coverage and demand context." },
        { resource: "recommendations", label: "Recommendations", description: "AI reorder and demand planning guidance." },
        { resource: "models", label: "Models", description: "Model monitoring, accuracy, and retraining state." },
      ]}
    />
  );
}
