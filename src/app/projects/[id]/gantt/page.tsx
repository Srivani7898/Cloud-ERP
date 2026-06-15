"use client";

import { useState } from "react";
import { CalendarDays, Download, RefreshCw } from "lucide-react";
import { downloadProjectPdf } from "@/utils/project-pdf";

const tasks = [
  { title: "Discovery and scope approval", start: 2, width: 20 },
  { title: "ERP workflow configuration", start: 18, width: 32 },
  { title: "Integration testing", start: 45, width: 28 },
  { title: "Executive rollout", start: 72, width: 18 },
];

export default function ProjectGanttPage() {
  const [boost, setBoost] = useState(0);
  const [message, setMessage] = useState("Timeline generated.");

  function exportPdf() {
    downloadProjectPdf(
      "project-gantt-timeline.pdf",
      "Project Gantt Timeline",
      tasks.map((task) => `${task.title} - starts at week position ${task.start}, duration ${task.width}%`)
    );
    setMessage("Gantt PDF downloaded.");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-semibold text-white"><CalendarDays className="h-7 w-7 text-cyan-300" /> Gantt timeline</h1>
        <p className="mt-2 text-slate-300">Execution schedule and dependency view.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={() => { setBoost((value) => (value + 4) % 16); setMessage("Timeline refreshed."); }} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500"><RefreshCw className="h-4 w-4" /> Refresh timeline</button>
        <button onClick={exportPdf} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 font-semibold text-white hover:border-cyan-400"><Download className="h-4 w-4" /> Export PDF</button>
        <span className="text-sm text-cyan-200">{message}</span>
      </div>
      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <div className="mb-5 grid grid-cols-8 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          {["Jun 1", "Jun 8", "Jun 15", "Jun 22", "Jun 29", "Jul 6", "Jul 13", "Jul 20"].map((label) => <span key={label}>{label}</span>)}
        </div>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.title} className="grid gap-3 md:grid-cols-[280px_1fr] md:items-center">
              <p className="font-medium text-white">{task.title}</p>
              <div className="relative h-12 overflow-hidden rounded-lg border border-slate-700 bg-slate-950">
                <div className="absolute inset-0 grid grid-cols-8 divide-x divide-slate-800" />
                <div className="absolute top-2 h-8 rounded-md bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-500" style={{ left: `${task.start}%`, width: `${Math.min(task.width + boost, 98 - task.start)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
