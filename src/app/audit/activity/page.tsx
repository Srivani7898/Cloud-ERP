"use client";

import { useState } from "react";

const rows = [
  { user: "Avery Stone", activity: "Granted finance manager role", module: "Identity", risk: "Medium" },
  { user: "Anika Rao", activity: "Downloaded payslip", module: "Employee", risk: "Low" },
  { user: "Maya Chen", activity: "Viewed salary data", module: "Payroll", risk: "High" },
  { user: "SCM Bot", activity: "Triggered reorder webhook", module: "SCM", risk: "Medium" },
];

export default function AuditActivityPage() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? rows : rows.filter((row) => row.risk === filter);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Activity tracking</h1>
      <div className="flex flex-wrap gap-2">{["All", "Low", "Medium", "High"].map((item) => <button key={item} onClick={() => setFilter(item)} className={`rounded-lg px-4 py-2 font-semibold ${filter === item ? "bg-blue-600" : "border border-slate-700 bg-slate-900"}`}>{item}</button>)}</div>
      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <table className="w-full text-left"><thead className="text-xs uppercase tracking-[0.22em] text-slate-400"><tr><th className="py-3">User</th><th>Activity</th><th>Module</th><th>Risk</th></tr></thead><tbody className="divide-y divide-slate-800">{filtered.map((row) => <tr key={`${row.user}-${row.activity}`}><td className="py-4 font-medium">{row.user}</td><td>{row.activity}</td><td>{row.module}</td><td>{row.risk}</td></tr>)}</tbody></table>
      </section>
    </div>
  );
}
