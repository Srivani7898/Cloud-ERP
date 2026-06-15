"use client";

import { ForecastTrendChart } from "@/components/forecast/ForecastTrendChart";
import { ForecastTable } from "@/components/forecast/ForecastTable";
import { useForecastStore } from "@/store/forecast-store";

export default function ForecastTrendsPage() {
  const trends = useForecastStore((state) => state.trends);
  return <div className="space-y-6"><div><h2 className="text-2xl font-semibold">Trend analysis</h2><p className="text-sm text-slate-500">Historical demand vs forecast trajectory.</p></div><ForecastTrendChart trends={trends} /><ForecastTable title="Trend data" description="Monthly trend values." headers={["Month", "Historical", "Forecast", "Variance"]} rows={trends.map((trend) => [trend.month, trend.historical, trend.forecast, trend.forecast - trend.historical])} /></div>;
}
