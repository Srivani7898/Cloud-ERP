"use client";

import { useState } from "react";

const rules = ["Invoice overdue > 7 days", "Leave request pending > 24 hours", "Stock below reorder point", "Project budget variance > 10%"];

export default function NotificationRulesPage() {
  const [enabled, setEnabled] = useState(rules);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Notification rules</h1>
      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <div className="space-y-4">
          {rules.map((rule) => {
            const active = enabled.includes(rule);
            return <button key={rule} onClick={() => setEnabled(active ? enabled.filter((item) => item !== rule) : [...enabled, rule])} className="flex w-full items-center justify-between rounded-lg border border-slate-800 bg-slate-950/60 p-4 text-left"><span>{rule}</span><span className={`rounded-full px-3 py-1 text-sm font-semibold ${active ? "bg-blue-600" : "bg-slate-800 text-slate-300"}`}>{active ? "Enabled" : "Disabled"}</span></button>;
          })}
        </div>
      </section>
    </div>
  );
}
