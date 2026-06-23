"use client";

import { useState } from "react";
import { Layers3, Plus, TableProperties } from "lucide-react";

type WidgetItem = {
  id: number;
  name: string;
  type: string;
  source: string;
  status: "Active" | "Paused" | "Draft";
};

const initialWidgets: WidgetItem[] = [
  {
    id: 1,
    name: "Revenue Trend",
    type: "Line Chart",
    source: "Finance",
    status: "Active",
  },
  {
    id: 2,
    name: "Headcount Movement",
    type: "Bar Chart",
    source: "HR",
    status: "Active",
  },
  {
    id: 3,
    name: "Inventory Risk",
    type: "Heatmap",
    source: "SCM",
    status: "Active",
  },
  {
    id: 4,
    name: "Project Variance",
    type: "Variance Card",
    source: "Projects",
    status: "Draft",
  },
];

const widgetTemplates = [
  {
    name: "Payroll Cost Analysis",
    type: "Area Chart",
    source: "Payroll",
  },
  {
    name: "CRM Lead Pipeline",
    type: "Funnel Chart",
    source: "CRM",
  },
  {
    name: "Employee Attendance",
    type: "Bar Chart",
    source: "HR",
  },
  {
    name: "Sales Performance",
    type: "Line Chart",
    source: "Sales",
  },
  {
    name: "Procurement Spend",
    type: "Donut Chart",
    source: "Procurement",
  },
  {
    name: "Notification Activity",
    type: "KPI Card",
    source: "Notifications",
  },
  {
    name: "Asset Utilization",
    type: "Gauge Chart",
    source: "Assets",
  },
  {
    name: "Helpdesk Resolution",
    type: "Radar Chart",
    source: "Helpdesk",
  },
];

export default function AnalyticsWidgetsPage() {
  const [widgets, setWidgets] = useState(initialWidgets);

  const activeCount = widgets.filter(
    (widget) => widget.status === "Active"
  ).length;

  const pausedCount = widgets.filter(
    (widget) => widget.status === "Paused"
  ).length;

  const draftCount = widgets.filter(
    (widget) => widget.status === "Draft"
  ).length;

  function addWidget() {
    const nextId =
      widgets.length > 0
        ? Math.max(...widgets.map((widget) => widget.id)) + 1
        : 1;

    const randomWidget =
      widgetTemplates[
        Math.floor(
          Math.random() * widgetTemplates.length
        )
      ];

    setWidgets((current) => [
      ...current,
      {
        id: nextId,
        ...randomWidget,
        status: "Active",
      },
    ]);
  }

  function toggleStatus(id: number) {
    setWidgets((current) =>
      current.map((widget) =>
        widget.id === id
          ? {
              ...widget,
              status:
                widget.status === "Active"
                  ? "Paused"
                  : "Active",
            }
          : widget
      )
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-3xl font-semibold">
          <TableProperties className="h-7 w-7 text-cyan-300" />
          Widget Library
        </h1>

        <button
          onClick={addWidget}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white"
        >
          <Plus className="h-4 w-4" />
          Add Widget
        </button>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
          <p className="text-sm text-slate-400">
            Total Widgets
          </p>
          <p className="mt-2 text-3xl font-bold text-white">
            {widgets.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
          <p className="text-sm text-slate-400">
            Active Widgets
          </p>
          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {activeCount}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
          <p className="text-sm text-slate-400">
            Paused Widgets
          </p>
          <p className="mt-2 text-3xl font-bold text-amber-400">
            {pausedCount}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
          <p className="text-sm text-slate-400">
            Draft Widgets
          </p>
          <p className="mt-2 text-3xl font-bold text-cyan-400">
            {draftCount}
          </p>
        </div>
      </section>

      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <table className="w-full text-left">
          <thead className="text-xs uppercase tracking-[0.22em] text-slate-400">
            <tr>
              <th className="py-3">Widget</th>
              <th>Type</th>
              <th>Source</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {widgets.map((widget) => (
              <tr key={widget.id}>
                <td className="py-4 font-medium text-white">
                  {widget.name}
                </td>

                <td>{widget.type}</td>

                <td>{widget.source}</td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      widget.status === "Active"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : widget.status === "Paused"
                        ? "bg-amber-500/20 text-amber-300"
                        : "bg-cyan-500/20 text-cyan-300"
                    }`}
                  >
                    {widget.status}
                  </span>
                </td>

                <td className="text-center">
                  <button
                    onClick={() =>
                      toggleStatus(widget.id)
                    }
                    className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white"
                  >
                    {widget.status === "Active"
                      ? "Pause"
                      : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
        <div className="mb-4 flex items-center gap-2">
          <Layers3 className="h-5 w-5 text-cyan-300" />
          <h2 className="text-lg font-semibold">
            Widget Statistics
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm text-slate-400">
              Most Used Source
            </p>
            <p className="text-xl font-semibold text-white">
              Finance
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Latest Widget
            </p>
            <p className="text-xl font-semibold text-white">
              {widgets[widgets.length - 1]?.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Library Health
            </p>
            <p className="text-xl font-semibold text-emerald-400">
              Healthy
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}