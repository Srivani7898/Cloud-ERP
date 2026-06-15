"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";

const seed = [
  { id: "RSK-301", title: "Privileged access spike", severity: "High", owner: "Security Ops", status: "Open" },
  { id: "RSK-302", title: "GDPR request SLA at risk", severity: "Medium", owner: "Compliance", status: "Open" },
  { id: "RSK-303", title: "Webhook evidence gap", severity: "Medium", owner: "Integration", status: "Monitoring" },
];

export default function RiskMonitoringPage() {
  const [risks, setRisks] = useState(seed);
  return (
    <div className="space-y-6">
      <h1 className="flex items-center gap-2 text-3xl font-semibold"><AlertTriangle className="h-7 w-7 text-cyan-300" /> Risk monitoring</h1>
      <section className="grid gap-4 md:grid-cols-3">
        {risks.map((risk) => <article key={risk.id} className="rounded-lg border border-slate-700 bg-slate-900/70 p-5"><p className="text-sm text-slate-400">{risk.id}</p><h2 className="mt-2 text-xl font-semibold">{risk.title}</h2><p className="mt-2 text-slate-400">Owner: {risk.owner}</p><div className="mt-5 flex items-center justify-between"><span className="rounded-full bg-amber-500/15 px-3 py-1 text-sm font-semibold text-amber-300">{risk.severity}</span><span>{risk.status}</span></div><button onClick={() => setRisks(risks.map((item) => item.id === risk.id ? { ...item, status: "Closed" } : item))} className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold">Close risk</button></article>)}
      </section>
    </div>
  );
}
