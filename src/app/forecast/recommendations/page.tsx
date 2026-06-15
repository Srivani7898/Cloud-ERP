"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ForecastBadge } from "@/components/forecast/ForecastBadge";
import { ForecastTable } from "@/components/forecast/ForecastTable";
import { useForecastStore } from "@/store/forecast-store";

export default function ForecastRecommendationsPage() {
  const { recommendations, applyRecommendation } = useForecastStore();
  return <div className="space-y-6"><div><h2 className="text-2xl font-semibold">Reorder recommendations</h2><p className="text-sm text-slate-500">AI-generated demand actions for inventory and supply planning.</p></div><ForecastTable title="Recommendations" description="Prioritized reorder and transfer decisions." headers={["SKU", "Action", "Priority", "Impact", "Action"]} rows={recommendations.map((rec) => [rec.sku, rec.action, <ForecastBadge key="priority" value={rec.priority} />, rec.impact, <Button key="apply" size="sm" onClick={() => applyRecommendation(rec.id)}><CheckCircle2 className="h-4 w-4" />Apply</Button>])} /></div>;
}
