"use client";

import { useState } from "react";
import { Plus, Rows3 } from "lucide-react";

const initialColumns = {
  backlog: ["Finalize scope", "Prepare UAT scripts"],
  progress: ["Configure ERP workflows", "Map finance approvals"],
  review: ["Validate integrations"],
  done: ["Kickoff completed"],
};

export default function ProjectKanbanPage() {
  const [columns, setColumns] = useState(initialColumns);
  const [message, setMessage] = useState("Kanban board is ready.");

  function moveFirstTask(from: keyof typeof initialColumns, to: keyof typeof initialColumns) {
    const task = columns[from][0];
    if (!task) {
      setMessage("No task available to move from this column.");
      return;
    }

    setColumns({
      ...columns,
      [from]: columns[from].slice(1),
      [to]: [task, ...columns[to]],
    });
    setMessage(`Moved "${task}" to ${to.replace("progress", "in progress")}.`);
  }

  function addTask() {
    setColumns({ ...columns, backlog: [`New delivery task ${columns.backlog.length + 1}`, ...columns.backlog] });
    setMessage("New task added to backlog.");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-semibold text-white">
          <Rows3 className="h-7 w-7 text-cyan-300" /> Kanban board
        </h1>
        <p className="mt-2 text-slate-300">Track project execution from backlog to done.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button onClick={addTask} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500">
          <Plus className="h-4 w-4" /> Add task
        </button>
        <span className="text-sm text-cyan-200">{message}</span>
      </div>

      <section className="grid gap-4 lg:grid-cols-4">
        {([
          ["backlog", "Backlog"],
          ["progress", "In progress"],
          ["review", "Review"],
          ["done", "Done"],
        ] as const).map(([key, title]) => (
          <article key={key} className="rounded-lg border border-slate-700 bg-slate-900/70 p-4">
            <h2 className="font-semibold text-white">{title}</h2>
            <div className="mt-4 space-y-3">
              {columns[key].map((task) => (
                <div key={task} className="rounded-lg border border-slate-800 bg-slate-950/70 p-3 text-sm text-slate-100">{task}</div>
              ))}
            </div>
            {key !== "done" && (
              <button
                onClick={() => moveFirstTask(key, key === "backlog" ? "progress" : key === "progress" ? "review" : "done")}
                className="mt-4 w-full rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-100 hover:border-cyan-400"
              >
                Move next
              </button>
            )}
          </article>
        ))}
      </section>
    </div>
  );
}
