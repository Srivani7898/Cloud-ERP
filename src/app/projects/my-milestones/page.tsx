"use client";

import {
  BarChart3,
  CheckCircle2,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";

import { useProjectsStore } from "@/store/projects-store";

export default function MyMilestonesPage() {
  const milestones = useProjectsStore(
    (state) => state.milestones
  );

  const projects = useProjectsStore(
    (state) => state.projects
  );

  const toggleMilestone = useProjectsStore(
    (state) => state.toggleMilestone
  );

  const completedCount = milestones.filter(
    (item) => item.completed
  ).length;

  const completionPercentage =
    milestones.length > 0
      ? Math.round(
          (completedCount / milestones.length) * 100
        )
      : 0;

  const getProjectName = (projectId: string) => {
    return (
      projects.find(
        (project) => project.id === projectId
      )?.name || projectId
    );
  };

  const isOverdue = (
    dueDate: string,
    completed: boolean
  ) => {
    return (
      !completed &&
      new Date(dueDate) < new Date()
    );
  };

  const sortedMilestones = [...milestones].sort(
    (a, b) => {
      const aOverdue = isOverdue(
        a.dueDate,
        a.completed
      );
      const bOverdue = isOverdue(
        b.dueDate,
        b.completed
      );

      if (aOverdue && !bOverdue) return -1;
      if (!aOverdue && bOverdue) return 1;

      return 0;
    }
  );

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-3xl font-semibold text-white">
              <BarChart3 className="h-7 w-7 text-cyan-300" />
              My Milestones
            </h1>

            <p className="mt-2 text-slate-300">
              Track project milestone completion and delivery progress.
            </p>
          </div>

          <div className="flex gap-3">
            <div className="rounded-lg border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
              Completed
              <div className="mt-1 text-2xl font-bold text-white">
                {completedCount}/{milestones.length}
              </div>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
              Progress
              <div className="mt-1 text-2xl font-bold text-cyan-300">
                {completionPercentage}%
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}

        <div className="mt-6">
          <div className="mb-2 flex justify-between text-sm text-slate-300">
            <span>Completion Progress</span>
            <span>{completionPercentage}%</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-500"
              style={{
                width: `${completionPercentage}%`,
              }}
            />
          </div>
        </div>

        {/* Empty State */}

        {sortedMilestones.length === 0 ? (
          <div className="mt-8 rounded-lg border border-dashed border-slate-700 p-10 text-center text-slate-400">
            No milestones available.
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="text-xs uppercase tracking-[0.22em] text-slate-400">
                <tr>
                  <th className="py-3">
                    Project
                  </th>

                  <th className="py-3">
                    Milestone
                  </th>

                  <th className="py-3">
                    Due Date
                  </th>

                  <th className="py-3">
                    Status
                  </th>

                  <th className="py-3 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800 text-white">
                {sortedMilestones.map((item) => {
                  const overdue =
                    isOverdue(
                      item.dueDate,
                      item.completed
                    );

                  return (
                    <tr
                      key={item.id}
                      className={
                        item.completed
                          ? "bg-emerald-500/5"
                          : overdue
                          ? "bg-red-500/5"
                          : ""
                      }
                    >
                      <td className="py-4">
                        {getProjectName(
                          item.projectId
                        )}
                      </td>

                      <td className="py-4 font-medium">
                        {item.name}
                      </td>

                      <td className="py-4">
                        {item.dueDate}
                      </td>

                      <td className="py-4">
                        {item.completed ? (
                          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-300">
                            <CheckCircle2 className="h-4 w-4" />
                            Completed on Time
                          </span>
                        ) : overdue ? (
                          <span className="inline-flex items-center gap-2 rounded-full bg-red-500/15 px-3 py-1 text-sm font-semibold text-red-300">
                            <AlertTriangle className="h-4 w-4" />
                            Overdue
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-3 py-1 text-sm font-semibold text-amber-200">
                            <RotateCcw className="h-4 w-4" />
                            Pending
                          </span>
                        )}
                      </td>

                      <td className="py-4 text-center">
                        <button
                          type="button"
                          onClick={() =>
                            toggleMilestone(
                              item.id
                            )
                          }
                          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-white transition ${
                            item.completed
                              ? "border border-slate-700 bg-slate-900 hover:border-cyan-400"
                              : "bg-blue-600 hover:bg-blue-500"
                          }`}
                        >
                          {item.completed ? (
                            <>
                              <RotateCcw className="h-4 w-4" />
                              Mark Pending
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="h-4 w-4" />
                              Mark Complete
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}