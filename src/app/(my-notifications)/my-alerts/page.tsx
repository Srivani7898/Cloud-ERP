"use client";

import { useState } from "react";
import { BellRing } from "lucide-react";

const seed = [
  { id: "a-1", title: "Timesheet due today", severity: "Warning", acknowledged: false },
  { id: "a-2", title: "MFA device verification required", severity: "Critical", acknowledged: false },
  { id: "a-3", title: "Expense policy updated", severity: "Info", acknowledged: true },
];

export default function MyAlertsPage() {
  const [alerts, setAlerts] = useState(seed);
  return (
    <div className="space-y-6">
      <h1 className="flex items-center gap-2 text-3xl font-semibold"><BellRing className="h-7 w-7 text-cyan-300" /> My alerts</h1>
      <section className="grid gap-4 md:grid-cols-3">
        {alerts.map((alert) => <article key={alert.id} className="rounded-lg border border-slate-700 bg-slate-900/70 p-5"><p className="text-lg font-semibold">{alert.title}</p><p className="mt-2 text-slate-400">{alert.severity}</p><button onClick={() => setAlerts(alerts.map((item) => item.id === alert.id ? { ...item, acknowledged: true } : item))} className="mt-5 rounded-lg bg-blue-600 px-4 py-2 font-semibold">{alert.acknowledged ? "Acknowledged" : "Acknowledge"}</button></article>)}
      </section>
    </div>
  );
}
