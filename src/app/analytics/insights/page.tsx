"use client";

import { useState } from "react";
import {
  Brain,
  Plus,
  RefreshCw,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { AiInsightPanel } from "@/components/analytics/AnalyticsWidgets";

type Insight = {
  id: number;
  title: string;
  module: string;
  confidence: number;
  status: string;
};

const initialInsights: Insight[] = [
  {
    id: 1,
    title: "Margin Anomaly Detection",
    module: "Finance",
    confidence: 96,
    status: "AI Monitored",
  },
  {
    id: 2,
    title: "Demand Risk Prediction",
    module: "SCM",
    confidence: 92,
    status: "AI Monitored",
  },
  {
    id: 3,
    title: "Workforce Trend Summary",
    module: "HR",
    confidence: 94,
    status: "AI Monitored",
  },
];

export default function AnalyticsInsightsPage() {
  const [insights, setInsights] =
    useState<Insight[]>(initialInsights);

  const [lastRefresh, setLastRefresh] =
    useState(new Date().toLocaleTimeString());

  function refreshInsights() {
    setInsights((current) =>
      current.map((item) => ({
        ...item,
        confidence:
          Math.floor(Math.random() * 15) + 85,
        status:
          item.status === "AI Monitored"
            ? "Updated"
            : "AI Monitored",
      }))
    );

    setLastRefresh(
      new Date().toLocaleTimeString()
    );
  }

  function addInsight() {
    const nextId = insights.length + 1;

    const templates = [
      {
        title: "Payroll Cost Optimization",
        module: "Payroll",
      },
      {
        title: "CRM Conversion Forecast",
        module: "CRM",
      },
      {
        title: "Inventory Reorder Prediction",
        module: "SCM",
      },
      {
        title: "Notification Delivery Analysis",
        module: "Notifications",
      },
      {
        title: "Asset Utilization Forecast",
        module: "Assets",
      },
      {
        title: "Project Risk Forecast",
        module: "Projects",
      },
    ];

    const selected =
      templates[
        Math.floor(
          Math.random() * templates.length
        )
      ];

    setInsights((current) => [
      ...current,
      {
        id: nextId,
        title: selected.title,
        module: selected.module,
        confidence:
          Math.floor(Math.random() * 15) + 85,
        status: "AI Monitored",
      },
    ]);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-semibold text-white">
            <Brain className="h-8 w-8 text-cyan-300" />
            AI Insights Dashboard
          </h1>

          <p className="mt-2 text-slate-300">
            Machine-assisted observations,
            anomalies, and recommended
            business actions.
          </p>

          <p className="mt-2 text-sm text-cyan-300">
            Last Refresh: {lastRefresh}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={refreshInsights}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 font-semibold text-white"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Insights
          </button>

          <button
            onClick={addInsight}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white"
          >
            <Plus className="h-4 w-4" />
            Add Insight
          </button>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            Total Insights
          </p>
          <p className="mt-2 text-3xl font-bold text-white">
            {insights.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            Average Confidence
          </p>
          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {Math.round(
              insights.reduce(
                (sum, item) =>
                  sum + item.confidence,
                0
              ) / insights.length
            )}
            %
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            Modules Covered
          </p>
          <p className="mt-2 text-3xl font-bold text-cyan-400">
            {
              new Set(
                insights.map(
                  (item) => item.module
                )
              ).size
            }
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            Latest Insight
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {
              insights[
                insights.length - 1
              ]?.module
            }
          </p>
        </div>
      </section>

      <AiInsightPanel />

      <section className="grid gap-4 md:grid-cols-3">
        {insights.map((item) => (
          <article
            key={item.id}
            className="rounded-lg border border-slate-700 bg-slate-900/70 p-5"
          >
            <div className="flex items-center justify-between">
              <Sparkles className="h-5 w-5 text-cyan-300" />

              <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-200">
                {item.confidence}% Confidence
              </span>
            </div>

            <p className="mt-4 text-lg font-semibold text-white">
              {item.title}
            </p>

            <p className="mt-2 text-slate-400">
              Module: {item.module}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  item.status === "Updated"
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "bg-cyan-500/15 text-cyan-300"
                }`}
              >
                {item.status}
              </span>

              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}