"use client";

import { useState } from "react";
import { BarChart3, Eye, Grid2X2, Plus, Save, Sparkles, Trash2 } from "lucide-react";

type BuilderWidget = {
  id: number;
  eyebrow: string;
  title: string;
  type: "revenue" | "health" | "insights" | "kpi";
};

const starterWidgets: BuilderWidget[] = [
  { id: 1, eyebrow: "Widget 1", title: "Revenue trend", type: "revenue" },
  { id: 2, eyebrow: "Widget 2", title: "Module health", type: "health" },
  { id: 3, eyebrow: "Widget 3", title: "AI insights", type: "insights" },
];

function WidgetVisual({ type }: { type: BuilderWidget["type"] }) {
  if (type === "health") {
    return (
      <div className="space-y-4 rounded-xl border border-cyan-400/20 bg-slate-950/45 p-4">
        {[
          ["Finance", 92, "text-emerald-300"],
          ["HR", 86, "text-cyan-300"],
          ["SCM", 78, "text-amber-300"],
        ].map(([label, value, tone]) => (
          <div key={label as string}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-slate-200">{label}</span>
              <span className={tone as string}>{value}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500"
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "insights") {
    return (
      <div className="space-y-3 rounded-xl border border-cyan-400/20 bg-slate-950/45 p-4">
        {["Margin anomaly detected", "Demand spike in APAC", "Payroll variance normalized"].map((insight) => (
          <div key={insight} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
            <span className="text-sm text-slate-100">{insight}</span>
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(16,185,129,0.9)]" />
          </div>
        ))}
      </div>
    );
  }

  if (type === "kpi") {
    return (
      <div className="grid grid-cols-2 gap-3 rounded-xl border border-cyan-400/20 bg-slate-950/45 p-4">
        {[
          ["$12.4M", "Revenue"],
          ["28.6%", "Margin"],
          ["94%", "SLA"],
          ["8.2", "Risk"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
            <p className="text-xl font-semibold text-white">{value}</p>
            <p className="text-xs text-slate-400">{label}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-cyan-400/20 bg-slate-950/45 p-4">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Revenue</p>
          <p className="text-3xl font-semibold text-white">$48.2M</p>
        </div>
        <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">+12.4%</span>
      </div>
      <div className="flex h-24 items-end gap-2">
        {[32, 46, 41, 58, 53, 72, 68, 84, 92].map((height, index) => (
          <span
            key={index}
            className="flex-1 rounded-t-md bg-gradient-to-t from-violet-500 via-pink-500 to-cyan-300 shadow-[0_0_18px_rgba(6,182,212,0.25)]"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function AnalyticsBuilderPage() {
  const [widgets, setWidgets] = useState(starterWidgets);
  const [message, setMessage] = useState("Builder draft is ready.");

  function addWidget() {
    const nextId = widgets.length ? Math.max(...widgets.map((widget) => widget.id)) + 1 : 1;
    setWidgets((current) => [
      ...current,
      {
        id: nextId,
        eyebrow: `Widget ${nextId}`,
        title: "Executive KPI panel",
        type: "kpi",
      },
    ]);
    setMessage("New analytics widget added to the dashboard.");
  }

  function removeWidget(id: number) {
    setWidgets((current) => current.filter((widget) => widget.id !== id));
    setMessage("Widget removed from the builder canvas.");
  }

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center gap-3">
          <Grid2X2 className="h-9 w-9 text-cyan-300" />
          <h1 className="text-4xl font-semibold tracking-tight text-white">Dashboard builder</h1>
        </div>
        <p className="mt-4 max-w-3xl text-lg text-slate-300">
          Compose executive dashboards with reusable ERP analytics widgets.
        </p>
      </section>

      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={addWidget}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 px-6 py-3 font-semibold text-white shadow-[0_0_32px_rgba(236,72,153,0.28)]"
        >
          <Plus className="h-5 w-5" />
          Add widget
        </button>
        <button
          onClick={() => setMessage("Dashboard saved successfully for executive review.")}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 font-semibold text-white"
        >
          <Save className="h-5 w-5" />
          Save dashboard
        </button>
        <button
          onClick={() => setMessage("Preview mode opened for board presentation.")}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 font-semibold text-white"
        >
          <Eye className="h-5 w-5" />
          Preview
        </button>
        <span className="text-cyan-300">{message}</span>
      </div>

      <section className="grid gap-5 xl:grid-cols-3">
        {widgets.map((widget) => (
          <article
            key={widget.id}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_40px_rgba(124,58,237,0.12)]"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-slate-300">{widget.eyebrow}</p>
            <div className="mt-5 flex items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold text-white">{widget.title}</h2>
              {widget.type === "insights" ? <Sparkles className="h-6 w-6 text-cyan-300" /> : <BarChart3 className="h-6 w-6 text-cyan-300" />}
            </div>
            <div className="mt-6">
              <WidgetVisual type={widget.type} />
            </div>
            <button
              onClick={() => removeWidget(widget.id)}
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 font-semibold text-slate-100"
            >
              <Trash2 className="h-4 w-4" />
              Remove
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}
