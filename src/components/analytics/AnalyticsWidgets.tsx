"use client";

import { ArrowDownRight, ArrowUpRight, BrainCircuit, CircleDollarSign, UsersRound, Warehouse } from "lucide-react";

export const kpis = [
  { label: "Revenue YTD", value: "$48.2M", change: "+12.4%", trend: "up", icon: CircleDollarSign },
  { label: "Operating margin", value: "23.8%", change: "+3.1%", trend: "up", icon: ArrowUpRight },
  { label: "Workforce utilization", value: "87%", change: "+5.6%", trend: "up", icon: UsersRound },
  { label: "Inventory risk", value: "14 SKUs", change: "-8 alerts", trend: "down", icon: Warehouse },
];

export const modulePerformance = [
  { module: "Finance", value: 92, color: "bg-blue-500" },
  { module: "HR", value: 84, color: "bg-cyan-400" },
  { module: "Payroll", value: 88, color: "bg-violet-500" },
  { module: "SCM", value: 76, color: "bg-amber-400" },
  { module: "Projects", value: 81, color: "bg-emerald-400" },
];

export const revenueTrend = [62, 68, 74, 71, 82, 88, 94, 91, 98, 104, 112, 121];

export const insights = [
  "Finance margin improved 3.1% after vendor payment cycle optimization.",
  "SCM reorder risk is concentrated in Bengaluru DC industrial components.",
  "Project delivery variance is improving after resource rebalancing.",
  "Payroll completion confidence is high for the June 2026 cycle.",
];

export function KpiGrid() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        const positive = kpi.trend === "up";
        return (
          <article key={kpi.label} className="rounded-lg border border-slate-700 bg-slate-900/70 p-5 shadow-2xl shadow-blue-950/20">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-500/15 text-cyan-200">
                <Icon className="h-5 w-5" />
              </div>
              <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${positive ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-200"}`}>
                {positive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                {kpi.change}
              </span>
            </div>
            <p className="mt-5 text-sm text-slate-400">{kpi.label}</p>
            <p className="mt-1 text-3xl font-semibold text-white">{kpi.value}</p>
          </article>
        );
      })}
    </section>
  );
}

export function TrendPanel() {
  const max = Math.max(...revenueTrend);
  const points = revenueTrend.map((value, index) => `${index * 46},${140 - (value / max) * 110}`).join(" ");

  return (
    <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Revenue and margin trend</h2>
          <p className="mt-1 text-slate-400">Historical vs forecast analytics across ERP modules.</p>
        </div>
        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-300">Forecast +9.2%</span>
      </div>
      <svg viewBox="0 0 506 160" className="mt-6 h-56 w-full overflow-visible">
        <defs>
          <linearGradient id="analyticsLine" x1="0" x2="1">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        {[30, 60, 90, 120].map((y) => <line key={y} x1="0" x2="506" y1={y} y2={y} stroke="#1e293b" />)}
        <polyline points={points} fill="none" stroke="url(#analyticsLine)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        {revenueTrend.map((value, index) => <circle key={index} cx={index * 46} cy={140 - (value / max) * 110} r="4" fill="#F8FAFC" />)}
      </svg>
    </section>
  );
}

export function ModuleHealthPanel() {
  return (
    <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
      <h2 className="text-2xl font-semibold">Module health</h2>
      <p className="mt-1 text-slate-400">Cross-module operational scoring.</p>
      <div className="mt-6 space-y-5">
        {modulePerformance.map((item) => (
          <div key={item.module}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-white">{item.module}</span>
              <span className="text-slate-300">{item.value}%</span>
            </div>
            <div className="h-3 rounded-full bg-slate-800">
              <div className={`h-3 rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AiInsightPanel() {
  return (
    <section className="rounded-lg border border-cyan-400/30 bg-gradient-to-br from-slate-900 via-blue-950/50 to-slate-900 p-6">
      <h2 className="flex items-center gap-2 text-2xl font-semibold"><BrainCircuit className="h-6 w-6 text-cyan-300" /> AI insights</h2>
      <div className="mt-5 space-y-3">
        {insights.map((insight) => (
          <div key={insight} className="rounded-lg border border-slate-700 bg-slate-950/60 p-4 text-slate-200">{insight}</div>
        ))}
      </div>
    </section>
  );
}
