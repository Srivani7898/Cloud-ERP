"use client";

import { useState } from "react";

const rows = [
  { user: "Avery Stone", sessions: 4, actions: 182, risk: "Medium" },
  { user: "Anika Rao", sessions: 2, actions: 42, risk: "Low" },
  { user: "Maya Chen", sessions: 6, actions: 311, risk: "High" },
];

export default function UserActivityPage() {
  const [sortHigh, setSortHigh] = useState(false);
  const sorted = sortHigh ? [...rows].sort((a, b) => b.actions - a.actions) : rows;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-3xl font-semibold">User activity monitoring</h1><button onClick={() => setSortHigh(!sortHigh)} className="rounded-lg bg-blue-600 px-4 py-2 font-semibold">Sort by actions</button></div>
      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <table className="w-full text-left"><thead className="text-xs uppercase tracking-[0.22em] text-slate-400"><tr><th className="py-3">User</th><th>Sessions</th><th>Actions</th><th>Risk</th></tr></thead><tbody className="divide-y divide-slate-800">{sorted.map((row) => <tr key={row.user}><td className="py-4 font-medium">{row.user}</td><td>{row.sessions}</td><td>{row.actions}</td><td>{row.risk}</td></tr>)}</tbody></table>
      </section>
    </div>
  );
}
