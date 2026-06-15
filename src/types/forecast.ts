export type ForecastModelStatus = "healthy" | "training" | "degraded" | "failed";
export type ForecastConfidence = "high" | "medium" | "low";

export type ForecastSku = {
  id: string;
  sku: string;
  productName: string;
  category: string;
  warehouse: string;
  currentStock: number;
  avgDemand: number;
};

export type ForecastProduct = {
  id: string;
  name: string;
  category: string;
  revenueImpact: number;
  serviceLevel: number;
};

export type Prediction = {
  id: string;
  sku: string;
  period: string;
  historicalDemand: number;
  forecastDemand: number;
  confidence: ForecastConfidence;
  model: "Prophet" | "LSTM" | "Hybrid";
};

export type ForecastTrend = {
  month: string;
  historical: number;
  forecast: number;
};

export type ForecastRecommendation = {
  id: string;
  sku: string;
  action: string;
  priority: "critical" | "high" | "medium";
  impact: string;
};

export type ForecastModel = {
  id: string;
  name: string;
  algorithm: "Prophet" | "LSTM" | "Hybrid";
  accuracy: number;
  mape: number;
  lastRun: string;
  status: ForecastModelStatus;
};
