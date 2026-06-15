"use client";

import { ForecastTable } from "@/components/forecast/ForecastTable";
import { forecastProducts } from "@/services/forecast-service";
import { useForecastStore } from "@/store/forecast-store";

function money(value: number) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value); }

export default function MyForecastProductsPage() {
  const allProducts = useForecastStore((state) => state.products ?? []);
  const products = (allProducts.length ? allProducts : forecastProducts).slice(0, 2);
  return <div className="space-y-6"><div><h2 className="text-2xl font-semibold">My forecast products</h2><p className="text-sm text-slate-500">Products assigned to this manager for demand review.</p></div><ForecastTable title="Assigned products" description="Manager-scoped forecast portfolio." headers={["Product", "Category", "Revenue Impact", "Service Level"]} rows={products.map((product) => [product.name, product.category, money(product.revenueImpact), `${product.serviceLevel}%`])} /></div>;
}
