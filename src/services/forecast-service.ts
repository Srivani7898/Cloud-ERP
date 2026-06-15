import type { ForecastModel, ForecastProduct, ForecastRecommendation, ForecastSku, ForecastTrend, Prediction } from "@/types/forecast";

export const forecastSkus: ForecastSku[] = [
  { id: "fsku-1", sku: "ERP-AI-CHIP", productName: "AI Edge Controller", category: "Electronics", warehouse: "Bengaluru DC", currentStock: 42, avgDemand: 88 },
  { id: "fsku-2", sku: "ERP-SENSOR-X", productName: "Industrial Sensor X", category: "IoT", warehouse: "Dallas DC", currentStock: 480, avgDemand: 210 },
  { id: "fsku-3", sku: "ERP-ROUTER-PRO", productName: "Plant Network Router", category: "Networking", warehouse: "Singapore Hub", currentStock: 0, avgDemand: 52 }
];

export const forecastProducts: ForecastProduct[] = [
  { id: "fp-1", name: "AI Edge Controller", category: "Electronics", revenueImpact: 1840000, serviceLevel: 82 },
  { id: "fp-2", name: "Industrial Sensor X", category: "IoT", revenueImpact: 960000, serviceLevel: 96 },
  { id: "fp-3", name: "Plant Network Router", category: "Networking", revenueImpact: 720000, serviceLevel: 64 }
];

export const predictions: Prediction[] = [
  { id: "pred-1", sku: "ERP-AI-CHIP", period: "Jul 2026", historicalDemand: 78, forecastDemand: 126, confidence: "high", model: "Hybrid" },
  { id: "pred-2", sku: "ERP-SENSOR-X", period: "Jul 2026", historicalDemand: 205, forecastDemand: 232, confidence: "medium", model: "Prophet" },
  { id: "pred-3", sku: "ERP-ROUTER-PRO", period: "Jul 2026", historicalDemand: 44, forecastDemand: 71, confidence: "high", model: "LSTM" }
];

export const trends: ForecastTrend[] = [
  { month: "Jan", historical: 420, forecast: 430 },
  { month: "Feb", historical: 460, forecast: 455 },
  { month: "Mar", historical: 510, forecast: 525 },
  { month: "Apr", historical: 535, forecast: 560 },
  { month: "May", historical: 590, forecast: 620 },
  { month: "Jun", historical: 640, forecast: 690 }
];

export const recommendations: ForecastRecommendation[] = [
  { id: "rec-1", sku: "ERP-ROUTER-PRO", action: "Create urgent replenishment order", priority: "critical", impact: "Avoid projected 14-day stockout" },
  { id: "rec-2", sku: "ERP-AI-CHIP", action: "Increase safety stock by 35%", priority: "high", impact: "Protect $1.8M revenue pipeline" },
  { id: "rec-3", sku: "ERP-SENSOR-X", action: "Shift inventory to Bengaluru DC", priority: "medium", impact: "Reduce transfer lead time by 3 days" }
];

export const models: ForecastModel[] = [
  { id: "mdl-1", name: "Hybrid Demand Engine", algorithm: "Hybrid", accuracy: 94.2, mape: 5.8, lastRun: "2026-06-01 10:00", status: "healthy" },
  { id: "mdl-2", name: "Seasonal Prophet", algorithm: "Prophet", accuracy: 89.6, mape: 10.4, lastRun: "2026-06-01 09:20", status: "healthy" },
  { id: "mdl-3", name: "SKU LSTM Deep Forecast", algorithm: "LSTM", accuracy: 91.8, mape: 8.2, lastRun: "2026-06-01 08:45", status: "training" }
];
