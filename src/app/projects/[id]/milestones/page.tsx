"use client";

import { useState } from "react";
import { CheckCircle2, Flag, Plus } from "lucide-react";

const seedMilestones = [
  { title: "Charter approved", date: "2026-06-05", owner: "PMO", status: "Complete" },
  { title: "Core ERP workflows configured", date: "2026-06-21", owner: "ERP Team", status: "On track" },
  { title: "User acceptance testing", date: "2026-07-03", owner: "Business Leads", status: "At risk" },
];

export default function ProjectMilestonesPage() {
  const [milestones, setMilestones] = useState(seedMilestones);
  const [message, setMessage] = useState("Milestone plan is active.");

  function completeNext() {
    let done = false;
    setMilestones(milestones.map((item) => {
      if (!done && item.status !== "Complete") {
        done = true;
        return { ...item, status: "Complete" };
      }
      return item;
    }));
    setMessage(done ? "Next milestone marked complete." : "All milestones are complete.");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-semibold text-white"><Flag className="h-7 w-7 text-cyan-300" /> Milestones</h1>
        <p className="mt-2 text-slate-300">Delivery checkpoints and executive commitments.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={() => { setMilestones([...milestones, { title: "Steering committee review", date: "2026-07-22", owner: "Executive Sponsor", status: "Planned" }]); setMessage("New milestone added."); }} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500"><Plus className="h-4 w-4" /> Add milestone</button>
        <button onClick={completeNext} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 font-semibold text-white hover:border-cyan-400"><CheckCircle2 className="h-4 w-4" /> Mark next complete</button>
        <span className="text-sm text-cyan-200">{message}</span>
      </div>
      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <div className="space-y-4">{milestones.map((item) => <article key={`${item.title}-${item.date}`} className="rounded-lg border border-slate-800 bg-slate-950/60 p-4"><p className="text-lg font-semibold text-white">{item.title}</p><p className="text-sm text-slate-400">{item.date} · {item.owner}</p><span className="mt-3 inline-flex rounded-full bg-blue-500/15 px-3 py-1 text-sm font-semibold text-blue-200">{item.status}</span></article>)}</div>
      </section>
    </div>
  );
}
