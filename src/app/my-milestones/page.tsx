"use client";

import { useState } from "react";
import { BarChart3, CheckCircle2, RotateCcw } from "lucide-react";

const seedMilestones = [
  { id: "milestone-1", project: "proj-1001", milestone: "Design sign-off", due: "2026-06-15", completed: false },
  { id: "milestone-2", project: "proj-1001", milestone: "UAT complete", due: "2026-08-30", completed: false },
  { id: "milestone-3", project: "proj-1002", milestone: "Warehouse pilot", due: "2026-06-20", completed: true },
  { id: "milestone-4", project: "proj-1003", milestone: "Model baseline", due: "2026-06-25", completed: false },
];

export default function MyMilestonesPage() {
  const [milestones, setMilestones] = useState(seedMilestones);
  const [message, setMessage] = useState("Milestones across assigned projects.");

  function toggleMilestone(id: string) {
    const selected = milestones.find((item) => item.id === id);
    setMilestones((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
    setMessage(
      selected?.completed
        ? `${selected.milestone} marked as not completed.`
        : `${selected?.milestone ?? "Milestone"} marked as completed.`
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-3xl font-semibold text-white">
              <BarChart3 className="h-7 w-7 text-cyan-300" /> My milestones
            </h1>
            <p className="mt-2 text-slate-300">{message}</p>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
            Completed: <span className="font-semibold text-white">{milestones.filter((item) => item.completed).length}</span> / {milestones.length}
          </div>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="text-xs uppercase tracking-[0.22em] text-slate-400">
              <tr>
                <th className="py-3">Project</th>
                <th className="py-3">Milestone</th>
                <th className="py-3">Due</th>
                <th className="py-3">Completed</th>
                <th className="py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-white">
              {milestones.map((item) => (
                <tr key={item.id} className={item.completed ? "bg-emerald-500/5" : ""}>
                  <td className="py-4">{item.project}</td>
                  <td className="py-4 font-medium">{item.milestone}</td>
                  <td className="py-4">{item.due}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${item.completed ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-200"}`}>
                      {item.completed ? <CheckCircle2 className="h-4 w-4" /> : <RotateCcw className="h-4 w-4" />}
                      {item.completed ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="py-4">
                    <button
                      type="button"
                      onClick={() => toggleMilestone(item.id)}
                      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-white transition ${item.completed ? "border border-slate-700 bg-slate-900 hover:border-cyan-400" : "bg-blue-600 hover:bg-blue-500"}`}
                    >
                      {item.completed ? <RotateCcw className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                      {item.completed ? "Mark pending" : "Mark complete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
