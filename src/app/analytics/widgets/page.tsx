"use client";

import { useState } from "react";
import { TableProperties } from "lucide-react";

const seed = [
  { name: "Revenue trend", type: "Line chart", source: "Finance", status: "Active" },
  { name: "Headcount movement", type: "Bar chart", source: "HR", status: "Active" },
  { name: "Inventory risk", type: "Heatmap", source: "SCM", status: "Active" },
  { name: "Project variance", type: "Variance card", source: "Projects", status: "Draft" },
];

export default function AnalyticsWidgetsPage() {
  const [widgets, setWidgets] = useState(seed);
  return (
    <div className="space-y-6">
      <h1 className="flex items-center gap-2 text-3xl font-semibold"><TableProperties className="h-7 w-7 text-cyan-300" /> Widget library</h1>
      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <table className="w-full text-left">
          <thead className="text-xs uppercase tracking-[0.22em] text-slate-400"><tr><th className="py-3">Widget</th><th>Type</th><th>Source</th><th>Status</th><th>Action</th></tr></thead>
          <tbody className="divide-y divide-slate-800">{widgets.map((widget) => <tr key={widget.name}><td className="py-4 font-medium">{widget.name}</td><td>{widget.type}</td><td>{widget.source}</td><td>{widget.status}</td><td><button onClick={() => setWidgets(widgets.map((item) => item.name === widget.name ? { ...item, status: item.status === "Active" ? "Paused" : "Active" } : item))} className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold">Toggle</button></td></tr>)}</tbody>
        </table>
      </section>
    </div>
  );
}
