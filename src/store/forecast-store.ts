"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { forecastProducts, forecastSkus, models, predictions, recommendations, trends } from "@/services/forecast-service";
import type { ForecastModel, ForecastProduct, ForecastRecommendation, ForecastSku, ForecastTrend, Prediction } from "@/types/forecast";

type ForecastState = {
  skus: ForecastSku[];
  products: ForecastProduct[];
  predictions: Prediction[];
  trends: ForecastTrend[];
  recommendations: ForecastRecommendation[];
  models: ForecastModel[];
  selectedModel: string;
  lastRunAt: string | null;
  runForecast: () => void;
  applyRecommendation: (id: string) => void;
  setSelectedModel: (model: string) => void;
};

export const useForecastStore = create<ForecastState>()(
  persist(
    (set) => ({
      skus: forecastSkus,
      products: forecastProducts,
      predictions,
      trends,
      recommendations,
      models,
      selectedModel: "Hybrid Demand Engine",
      lastRunAt: null,
      setSelectedModel: (model) => set({ selectedModel: model }),
      runForecast: () =>
        set((state) => {
          const stamp = new Date().toISOString().slice(0, 16).replace("T", " ");
          return {
            predictions: state.predictions.map((prediction, index) => ({
            ...prediction,
            forecastDemand: prediction.forecastDemand + 8 + index * 4,
            confidence: "high"
          })),
            trends: state.trends.map((trend, index) => ({
              ...trend,
              forecast: trend.forecast + 10 + index * 3
            })),
            recommendations:
              state.recommendations.length > 0
                ? state.recommendations
                : [
                    {
                      id: `rec-${Date.now()}`,
                      sku: "ERP-AI-CHIP",
                      action: "Recalculate safety stock after latest model run",
                      priority: "high",
                      impact: "Forecast refresh detected upward demand movement"
                    }
                  ],
            models: state.models.map((model) =>
              model.name === state.selectedModel ? { ...model, lastRun: stamp, status: "healthy", accuracy: Math.min(model.accuracy + 0.3, 99) } : model
            ),
            lastRunAt: stamp
          };
        }),
      applyRecommendation: (id) =>
        set((state) => ({
          recommendations: state.recommendations.filter((recommendation) => recommendation.id !== id)
        }))
    }),
    { name: "cloud-erp-forecast" }
  )
);
