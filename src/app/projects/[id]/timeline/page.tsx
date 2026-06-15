"use client";

import { useState } from "react";
import { Clock3, Plus } from "lucide-react";

const seedEvents = [
  { date: "2026-06-01", title: "Project kickoff completed", owner: "PMO" },
  { date: "2026-06-08", title: "Resources assigned", owner: "Delivery Office" },
  { date: "2026-06-18", title: "Integration test window opened", owner: "QA Lead" },
];

export default function ProjectTimelinePage() {
  const [events, setEvents] = useState(seedEvents);
  const [message, setMessage] = useState("Timeline is current.");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-semibold text-white"><Clock3 className="h-7 w-7 text-cyan-300" /> Project timeline</h1>
        <p className="mt-2 text-slate-300">Chronological delivery events.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={() => { setEvents([...events, { date: "2026-07-01", title: "Executive checkpoint added", owner: "Sponsor" }]); setMessage("Executive checkpoint added."); }} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500"><Plus className="h-4 w-4" /> Add event</button>
        <span className="text-sm text-cyan-200">{message}</span>
      </div>
      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <div className="space-y-4">{events.map((event) => <article key={`${event.date}-${event.title}`} className="rounded-lg border border-slate-800 bg-slate-950/60 p-4"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{event.date}</p><p className="mt-2 text-lg font-semibold text-white">{event.title}</p><p className="text-sm text-slate-400">Owner: {event.owner}</p></article>)}</div>
      </section>
    </div>
  );
}
