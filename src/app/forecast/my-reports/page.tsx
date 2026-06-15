"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForecastStore } from "@/store/forecast-store";
import { downloadSimplePdf } from "@/utils/pdf";

export default function MyForecastReportsPage() {
  const forecast = useForecastStore();
  function downloadMyReport() {
    const lines = [
      "Assigned Product Forecast",
      ...forecast.products.slice(0, 2).map((product) => `${product.name} | Service Level ${product.serviceLevel}% | Impact ${product.revenueImpact}`),
      "",
      "Assigned Recommendations",
      ...forecast.recommendations.slice(0, 2).map((rec) => `${rec.sku} | ${rec.action} | ${rec.priority}`)
    ];
    downloadSimplePdf("my-forecast-report.pdf", "My Forecast Report", lines);
  }
  return <div className="space-y-6"><div><h2 className="text-2xl font-semibold">My forecast reports</h2><p className="text-sm text-slate-500">Manager-scoped demand forecast reports.</p></div><Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]"><CardHeader><CardTitle>My Forecast Report</CardTitle><CardDescription>Assigned products and recommendations.</CardDescription></CardHeader><CardContent><Button onClick={downloadMyReport}><Download className="h-4 w-4" />Download PDF</Button></CardContent></Card></div>;
}
