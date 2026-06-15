"use client";

import { useState } from "react";
import { CheckCircle2, RotateCw, UsersRound } from "lucide-react";

const seedResources = [
  { name: "Anika Rao", role: "Project Manager", allocation: 85, rate: 92, status: "Allocated" },
  { name: "Rohan Mehta", role: "Finance Analyst", allocation: 70, rate: 74, status: "Allocated" },
  { name: "Maya Chen", role: "ERP Consultant", allocation: 95, rate: 118, status: "Critical" },
  { name: "David Kim", role: "QA Lead", allocation: 55, rate: 68, status: "Planned" },
];

export default function ProjectResourcesPage() {
  const [resources, setResources] = useState(seedResources);
  const [message, setMessage] = useState("Resource plan is ready.");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-semibold text-white"><UsersRound className="h-7 w-7 text-cyan-300" /> Resource allocation</h1>
        <p className="mt-2 text-slate-300">Staffing, utilization, and delivery capacity.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={() => { setResources(resources.map((item) => ({ ...item, allocation: item.status === "Critical" ? 82 : Math.min(90, item.allocation + 5), status: item.status === "Critical" ? "Rebalanced" : item.status }))); setMessage("Capacity rebalanced."); }} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500"><RotateCw className="h-4 w-4" /> Rebalance capacity</button>
        <button onClick={() => setMessage("Resource plan approved.")} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 font-semibold text-white hover:border-cyan-400"><CheckCircle2 className="h-4 w-4" /> Approve plan</button>
        <span className="text-sm text-cyan-200">{message}</span>
      </div>
      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <div className="grid gap-4 md:grid-cols-4">
          {resources.map((resource) => (
            <article key={resource.name} className="rounded-lg border border-slate-700 bg-slate-950/60 p-4">
              <p className="text-lg font-semibold text-white">{resource.name}</p>
              <p className="text-sm text-slate-400">{resource.role}</p>
              <div className="mt-5 flex justify-between text-sm"><span>Allocation</span><span>{resource.allocation}%</span></div>
              <div className="mt-2 h-2 rounded-full bg-slate-800"><div className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: `${resource.allocation}%` }} /></div>
              <div className="mt-5 flex justify-between text-sm"><span className="rounded-full bg-blue-500/15 px-3 py-1 text-blue-200">{resource.status}</span><span>${resource.rate}/hr</span></div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
