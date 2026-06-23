"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  forecastProducts,
  forecastSkus,
  models,
  predictions,
  recommendations,
  trends,
} from "@/services/forecast-service";

import type {
  ForecastModel,
  ForecastProduct,
  ForecastRecommendation,
  ForecastSku,
  ForecastTrend,
  Prediction,
} from "@/types/forecast";

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

  addSku: (
    sku: ForecastSku
  ) => void;

  addProduct: (
    product: ForecastProduct
  ) => void;

  addTrend: (
    demand: number
  ) => void;

  addRecommendation: (
    sku: string,
    demand: number
  ) => void;

  updateModelMetrics: () => void;

  applyRecommendation: (id: string) => void;

  setSelectedModel: (
    model: string
  ) => void;
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

      setSelectedModel: (model) =>
        set({
          selectedModel: model,
        }),
      addSku: (sku) =>
        set((state) => ({
          skus: [
            sku,
            ...state.skus,
          ],
        })),

      addProduct: (product) =>
        set((state) => ({
          products: [
            product,
            ...state.products,
          ],
        })),
      addTrend: (demand) =>
        set((state) => {
          const month = new Date().toLocaleString(
            "default",
            {
              month: "short",
            }
          );

          return {
            trends: [
              {
                month,
                historical: Math.floor(
                  demand * 0.85
                ),
                forecast: demand,
              },
              ...state.trends,
            ],
          };
        }),

      addRecommendation: (
        sku,
        demand
      ) =>
        set((state) => {
          let priority:
            | "critical"
            | "high"
            | "medium";

          let action = "";
          let impact = "";

          if (demand >= 3000) {
            priority = "critical";
            action =
              "Create urgent replenishment order";
            impact =
              "Projected demand exceeds inventory by more than 40%";
          } else if (
            demand >= 1500
          ) {
            priority = "high";
            action =
              "Increase safety stock";
            impact =
              "Demand growth trend detected";
          } else {
            priority = "medium";
            action =
              "Monitor inventory levels";
            impact =
              "Current stock can support forecast demand";
          }

          return {
            recommendations: [
              {
                id: `rec-${Date.now()}`,
                sku,
                action,
                priority,
                impact,
              },
              ...state.recommendations,
            ],
          };
        }),

      updateModelMetrics: () =>
        set((state) => {
          const stamp = new Date()
            .toISOString()
            .slice(0, 16)
            .replace("T", " ");

          return {
            models: state.models.map(
              (model) => ({
                ...model,
                lastRun: stamp,
                accuracy: Math.min(
                  model.accuracy + 0.2,
                  99
                ),
                mape: Math.max(
                  model.mape - 0.1,
                  1
                ),
                status: "healthy",
              })
            ),
          };
        }),

      runForecast: () =>
        set((state) => {
          const stamp = new Date()
            .toISOString()
            .slice(0, 16)
            .replace("T", " ");

          const updatedPredictions = state.predictions.map(
            (prediction, index) => ({
              ...prediction,
              forecastDemand:
                prediction.forecastDemand +
                8 +
                index * 4,
            })
          );

          return {
            predictions: updatedPredictions,

            skus: state.skus.map((sku, index) => ({
              ...sku,
              avgDemand:
                sku.avgDemand +
                10 +
                index * 5,
            })),

            products: state.products.map(
              (product, index) => ({
                ...product,
                revenueImpact:
                  product.revenueImpact +
                  5000 +
                  index * 1000,
              })
            ),

            trends: state.trends.map(
              (trend, index) => {
                const latestDemand =
                  updatedPredictions[
                    updatedPredictions.length - 1
                  ]?.forecastDemand ?? 0;

                return {
                  ...trend,
                  forecast:
                    trend.forecast +
                    Math.floor(
                      latestDemand / 100
                    ) +
                    index * 5,
                };
              }
            ),

            recommendations: [
              {
                id: `rec-${Date.now()}`,
                sku:
                  updatedPredictions[0]?.sku ??
                  "ERP-AI-CHIP",
                action:
                  "Reorder stock immediately",
                priority: "high",
                impact:
                  "Forecasted demand exceeds current inventory levels",
              },
            ],

            models: state.models.map((model) =>
              model.name === state.selectedModel
                ? {
                  ...model,
                  lastRun: stamp,
                  status: "healthy",
                  accuracy: Math.min(
                    model.accuracy + 0.3,
                    99
                  ),
                }
                : model
            ),

            lastRunAt: stamp,
          };
        }),

      applyRecommendation: (id) =>
        set((state) => ({
          recommendations:
            state.recommendations.filter(
              (recommendation) =>
                recommendation.id !== id
            ),
        })),
    }),
    {
      name: "cloud-erp-forecast",
    }
  )
);