"use client";

import { useState } from "react";

const prefs = ["In-app notifications", "Email notifications", "SMS critical alerts", "Weekly digest", "Project alerts", "Payroll notifications"];

export default function MyPreferencesPage() {
  const [enabled, setEnabled] = useState(prefs.slice(0, 4));
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">My notification preferences</h1>
      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <div className="space-y-4">
          {prefs.map((pref) => {
            const active = enabled.includes(pref);
            return <button key={pref} onClick={() => setEnabled(active ? enabled.filter((item) => item !== pref) : [...enabled, pref])} className="flex w-full items-center justify-between rounded-lg border border-slate-800 bg-slate-950/60 p-4 text-left"><span>{pref}</span><span className={`rounded-full px-3 py-1 text-sm font-semibold ${active ? "bg-blue-600" : "bg-slate-800 text-slate-300"}`}>{active ? "Enabled" : "Disabled"}</span></button>;
          })}
        </div>
      </section>
    </div>
  );
}
