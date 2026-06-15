"use client";

import { useState } from "react";

const settings = ["Enable real-time refresh", "Require approval before report export", "Mask employee PII in executive reports", "Enable AI anomaly notifications"];

export default function AnalyticsSettingsPage() {
  const [enabled, setEnabled] = useState(settings);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Analytics settings</h1>
      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <div className="space-y-4">
          {settings.map((item) => {
            const active = enabled.includes(item);
            return <button key={item} onClick={() => setEnabled(active ? enabled.filter((value) => value !== item) : [...enabled, item])} className="flex w-full items-center justify-between rounded-lg border border-slate-800 bg-slate-950/60 p-4 text-left"><span>{item}</span><span className={`rounded-full px-3 py-1 text-sm font-semibold ${active ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300"}`}>{active ? "On" : "Off"}</span></button>;
          })}
        </div>
      </section>
    </div>
  );
}
