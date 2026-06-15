"use client";

import { useState } from "react";
import { ShieldAlert, ShieldCheck } from "lucide-react";

const seedRisks = [
  { id: "risk-1", title: "Integration testing delay", impact: "High", owner: "QA Lead", status: "Open" },
  { id: "risk-2", title: "Finance approval dependency", impact: "Medium", owner: "Finance PM", status: "Monitoring" },
  { id: "risk-3", title: "Resource overload", impact: "Medium", owner: "PMO", status: "Open" },
];

export default function ProjectRisksPage() {
  const [risks, setRisks] = useState(seedRisks);
  const [message, setMessage] = useState("Risk register is active.");

  function mitigate(id: string) {
    setRisks(risks.map((risk) => risk.id === id ? { ...risk, status: "Mitigated" } : risk));
    setMessage("Risk mitigation recorded.");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-semibold text-white"><ShieldAlert className="h-7 w-7 text-cyan-300" /> Risk management</h1>
        <p className="mt-2 text-slate-300">Delivery risks, owners, and mitigation status.</p>
      </div>
      <p className="text-sm text-cyan-200">{message}</p>
      <section className="grid gap-4 md:grid-cols-3">
        {risks.map((risk) => (
          <article key={risk.id} className="rounded-lg border border-slate-700 bg-slate-900/70 p-5">
            <p className="text-lg font-semibold text-white">{risk.title}</p>
            <p className="mt-2 text-sm text-slate-400">Owner: {risk.owner}</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="rounded-full bg-amber-500/15 px-3 py-1 text-sm font-semibold text-amber-200">{risk.impact}</span>
              <span className="rounded-full bg-blue-500/15 px-3 py-1 text-sm font-semibold text-blue-200">{risk.status}</span>
            </div>
            <button onClick={() => mitigate(risk.id)} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500"><ShieldCheck className="h-4 w-4" /> Mark mitigated</button>
          </article>
        ))}
      </section>
    </div>
  );
}
