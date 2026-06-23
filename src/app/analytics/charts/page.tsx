"use client";

import { useState } from "react";
import {
Activity,
BarChart3,
LineChart,
PieChart,
Plus,
} from "lucide-react";

const initialCharts = [
{
id: 1,
title: "Revenue Trend",
type: "Line Chart",
module: "Finance",
},
{
id: 2,
title: "Workforce Analysis",
type: "Bar Chart",
module: "HR",
},
{
id: 3,
title: "Inventory Distribution",
type: "Pie Chart",
module: "SCM",
},
];

const chartTemplates = [
{
title: "Sales Performance",
type: "Line Chart",
module: "CRM",
},
{
title: "Payroll Cost Analysis",
type: "Bar Chart",
module: "Payroll",
},
{
title: "Notification Activity",
type: "Area Chart",
module: "Notifications",
},
{
title: "Asset Utilization",
type: "Donut Chart",
module: "Assets",
},
{
title: "Project Progress",
type: "Radar Chart",
module: "Projects",
},
];

export default function AnalyticsChartsPage() {
const [charts, setCharts] = useState(initialCharts);

function addChart() {
const nextId =
charts.length > 0
? Math.max(...charts.map((c) => c.id)) + 1
: 1;

const randomChart =
  chartTemplates[
    Math.floor(
      Math.random() * chartTemplates.length
    )
  ];

setCharts((current) => [
  ...current,
  {
    id: nextId,
    ...randomChart,
  },
]);

}

return (
<div className="space-y-6">
<div className="flex items-start justify-between">
<div>
<h1 className="text-3xl font-semibold">
Interactive Charts
</h1>

      <p className="mt-2 text-slate-300">
        Executive visualizations for trend,
        variance, and health analysis.
      </p>
    </div>

    <button
      onClick={addChart}
      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white"
    >
      <Plus className="h-4 w-4" />
      Add Chart
    </button>
  </div>

  <section className="grid gap-4 md:grid-cols-4">
    <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
      <p className="text-sm text-slate-400">
        Total Charts
      </p>
      <p className="mt-2 text-3xl font-bold text-white">
        {charts.length}
      </p>
    </div>

    <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
      <p className="text-sm text-slate-400">
        Modules Covered
      </p>
      <p className="mt-2 text-3xl font-bold text-cyan-400">
        {
          new Set(
            charts.map((c) => c.module)
          ).size
        }
      </p>
    </div>

    <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
      <p className="text-sm text-slate-400">
        Health Status
      </p>
      <p className="mt-2 text-3xl font-bold text-emerald-400">
        Healthy
      </p>
    </div>

    <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
      <p className="text-sm text-slate-400">
        Latest Chart
      </p>
      <p className="mt-2 text-lg font-bold text-white">
        {charts[charts.length - 1]?.module}
      </p>
    </div>
  </section>

  <section className="grid gap-6 lg:grid-cols-2">
    {charts.map((chart) => (
      <div
        key={chart.id}
        className="rounded-xl border border-slate-700 bg-slate-900/70 p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              {chart.title}
            </h2>

            <p className="text-sm text-slate-400">
              {chart.module}
            </p>
          </div>

          {chart.type.includes("Line") ? (
            <LineChart className="h-6 w-6 text-cyan-300" />
          ) : chart.type.includes("Pie") ||
            chart.type.includes("Donut") ? (
            <PieChart className="h-6 w-6 text-cyan-300" />
          ) : (
            <BarChart3 className="h-6 w-6 text-cyan-300" />
          )}
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-6">
          <div className="flex h-32 items-end gap-2">
            {[45, 70, 55, 85, 65, 95].map(
              (height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t bg-gradient-to-t from-blue-600 to-cyan-400"
                  style={{
                    height: `${height}%`,
                  }}
                />
              )
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <span>{chart.type}</span>

          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-emerald-300">
            Active
          </span>
        </div>
      </div>
    ))}
  </section>

  <section className="rounded-xl border border-slate-700 bg-slate-900/70 p-6">
    <div className="mb-4 flex items-center gap-2">
      <Activity className="h-5 w-5 text-cyan-300" />
      <h2 className="text-xl font-semibold">
        Module Health Charts
      </h2>
    </div>

    <div className="grid gap-4 md:grid-cols-3">
      {[
        ["Finance", 92],
        ["HR", 84],
        ["Payroll", 88],
        ["SCM", 76],
        ["CRM", 89],
        ["Notifications", 95],
      ].map(([module, score]) => (
        <div
          key={module}
          className="rounded-lg border border-slate-800 bg-slate-950/50 p-4"
        >
          <div className="mb-2 flex justify-between">
            <span>{module}</span>
            <span>{score}%</span>
          </div>

          <div className="h-3 rounded-full bg-slate-800">
            <div
              className="h-3 rounded-full bg-cyan-400"
              style={{
                width: `${score}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  </section>
</div>

);
}