"use client";

import { ForecastTable } from "@/components/forecast/ForecastTable";
import { useForecastStore } from "@/store/forecast-store";

function money(value: number) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value); }

export default function ForecastProductsPage() {
  const products = useForecastStore((state) => state.products);
  return <div className="space-y-6"><div><h2 className="text-2xl font-semibold">Product demand analytics</h2><p className="text-sm text-slate-500">Revenue impact and service level by forecasted product.</p></div><ForecastTable title="Products" description="Product demand analytics." headers={["Product", "Category", "Revenue Impact", "Service Level"]} rows={products.map((product) => [product.name, product.category, money(product.revenueImpact), `${product.serviceLevel}%`])} /></div>;
}
