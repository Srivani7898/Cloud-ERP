"use client";

import { useState } from "react";
import { Activity, Plus } from "lucide-react";
import {
  KpiGrid,
  ModuleHealthPanel,
} from "@/components/analytics/AnalyticsWidgets";

export default function AnalyticsKpisPage() {
  const [kpiCount, setKpiCount] = useState(4);

  function addKpi() {
    setKpiCount((current) => current + 1);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-semibold">
            <Activity className="h-7 w-7 text-cyan-300" />
            KPI Monitoring
          </h1>

          <p className="mt-2 text-slate-300">
            Board-level operating metrics and module
            scorecards.
          </p>
        </div>

        <button
          onClick={addKpi}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white"
        >
          <Plus className="h-4 w-4" />
          Add KPI
        </button>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
          <p className="text-sm text-slate-400">
            Total KPIs
          </p>
          <p className="mt-2 text-3xl font-bold text-white">
            {kpiCount}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
          <p className="text-sm text-slate-400">
            Healthy KPIs
          </p>
          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {Math.max(kpiCount - 1, 0)}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
          <p className="text-sm text-slate-400">
            Warning KPIs
          </p>
          <p className="mt-2 text-3xl font-bold text-amber-400">
            1
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
          <p className="text-sm text-slate-400">
            Monitoring Status
          </p>
          <p className="mt-2 text-3xl font-bold text-cyan-400">
            Active
          </p>
        </div>
      </section>

      <KpiGrid />

      <ModuleHealthPanel />
    </div>
  );
}