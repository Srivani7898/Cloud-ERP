"use client";

import { ForecastTable } from "@/components/forecast/ForecastTable";
import { useForecastStore } from "@/store/forecast-store";

export default function ForecastSkusPage() {
  const skus = useForecastStore((state) => state.skus);
  return <div className="space-y-6"><div><h2 className="text-2xl font-semibold">Forecast SKUs</h2><p className="text-sm text-slate-500">Inventory SKUs monitored by the AI forecast engine.</p></div><ForecastTable title="SKUs" description="Demand prediction SKU master." headers={["SKU", "Product", "Category", "Warehouse", "Current Stock", "Avg Demand"]} rows={skus.map((sku) => [sku.sku, sku.productName, sku.category, sku.warehouse, sku.currentStock, sku.avgDemand])} /></div>;
}
