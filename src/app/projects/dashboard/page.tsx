"use client";

import {
  BarChart3,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ClipboardList,
  Activity,
} from "lucide-react";

import { useProjectsStore } from "@/store/projects-store";

export default function ProjectsDashboardPage() {
  const projects = useProjectsStore(
    (state) => state.projects
  );

  const tasks = useProjectsStore(
    (state) => state.tasks
  );

  const milestones = useProjectsStore(
    (state) => state.milestones
  );

  const risks = useProjectsStore(
    (state) => state.risks
  );

  const timeEntries = useProjectsStore(
    (state) => state.timeEntries
  );

  const completedTasks = tasks.filter(
    (task) => task.status === "done"
  ).length;

  const completedMilestones = milestones.filter(
    (milestone) => milestone.completed
  ).length;

  const totalHours = timeEntries.reduce(
    (sum, entry) => sum + entry.hours,
    0
  );

  const todoTasks = tasks.filter(
    (task) => task.status === "todo"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in_progress"
  ).length;

  const reviewTasks = tasks.filter(
    (task) => task.status === "review"
  ).length;

  const activeProjects = projects.filter(
    (project) => project.status === "active"
  ).length;

  const planningProjects = projects.filter(
    (project) => project.status === "planning"
  ).length;

  const atRiskProjects = projects.filter(
    (project) => project.status === "at_risk"
  ).length;

  const getProjectName = (
    projectId: string
  ) => {
    const project = projects.find(
      (item) => item.id === projectId
    );

    return project?.name || projectId;
  };

  return (
    <div className="space-y-6">
      {/* Metrics */}

      <div className="grid gap-4 md:grid-cols-5">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">
              Projects
            </span>

            <BarChart3 className="h-5 w-5 text-cyan-400" />
          </div>

          <p className="mt-3 text-4xl font-bold">
            {projects.length}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">
              Tasks
            </span>

            <ClipboardList className="h-5 w-5 text-cyan-400" />
          </div>

          <p className="mt-3 text-4xl font-bold">
            {tasks.length}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">
              Completed Tasks
            </span>

            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          </div>

          <p className="mt-3 text-4xl font-bold">
            {completedTasks}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">
              Milestones
            </span>

            <CheckCircle2 className="h-5 w-5 text-violet-400" />
          </div>

          <p className="mt-3 text-4xl font-bold">
            {completedMilestones}/
            {milestones.length}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">
              Hours Logged
            </span>

            <Clock className="h-5 w-5 text-amber-400" />
          </div>

          <p className="mt-3 text-4xl font-bold">
            {totalHours}
          </p>
        </div>
      </div>

      {/* Project Health */}

      <section className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
          <Activity className="h-6 w-6 text-cyan-400" />
          Project Health
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
            <p className="text-sm text-slate-400">
              Active
            </p>

            <p className="mt-2 text-3xl font-bold text-emerald-400">
              {activeProjects}
            </p>
          </div>

          <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
            <p className="text-sm text-slate-400">
              Planning
            </p>

            <p className="mt-2 text-3xl font-bold text-yellow-400">
              {planningProjects}
            </p>
          </div>

          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
            <p className="text-sm text-slate-400">
              At Risk
            </p>

            <p className="mt-2 text-3xl font-bold text-red-400">
              {atRiskProjects}
            </p>
          </div>
        </div>
      </section>

      {/* Task Status */}

      <section className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="mb-4 text-2xl font-semibold">
          Task Status Overview
        </h2>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-white/10 p-4">
            <p className="text-slate-400">
              Todo
            </p>
            <p className="mt-2 text-3xl font-bold">
              {todoTasks}
            </p>
          </div>

          <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
            <p className="text-slate-400">
              In Progress
            </p>
            <p className="mt-2 text-3xl font-bold text-blue-400">
              {inProgressTasks}
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
            <p className="text-slate-400">
              Review
            </p>
            <p className="mt-2 text-3xl font-bold text-amber-400">
              {reviewTasks}
            </p>
          </div>

          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
            <p className="text-slate-400">
              Done
            </p>
            <p className="mt-2 text-3xl font-bold text-emerald-400">
              {completedTasks}
            </p>
          </div>
        </div>
      </section>

      {/* Active Projects */}

      <section className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="mb-6 text-2xl font-semibold">
          Active Projects
        </h2>

        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-lg border border-white/10 p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">
                    {project.name}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {project.owner}
                  </p>
                </div>

                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-cyan-400">
                  {project.progress}%
                </span>
              </div>

              <div className="mt-3 h-2 rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500"
                  style={{
                    width: `${project.progress}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}

      <section className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="mb-6 text-2xl font-semibold">
          Recent Activity
        </h2>

        <div className="space-y-3">
          {timeEntries.slice(0, 5).map((entry) => (
            <div
              key={entry.id}
              className="rounded-lg border border-white/10 p-4"
            >
              <p className="font-medium">
                {entry.employee}
              </p>

              <p className="text-slate-400">
                Logged {entry.hours} hrs on{" "}
                {getProjectName(
                  entry.projectId
                )}
              </p>

              <p className="text-xs text-slate-500">
                {entry.date}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Risk Alerts */}

      <section className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold">
          <AlertTriangle className="h-6 w-6 text-red-400" />
          Risk Alerts
        </h2>

        <div className="space-y-4">
          {risks.length === 0 ? (
            <p className="text-slate-400">
              No active risks found.
            </p>
          ) : (
            risks.map((risk) => (
              <div
                key={risk.id}
                className="rounded-lg border border-red-500/20 bg-red-500/5 p-4"
              >
                <h3 className="font-semibold text-red-300">
                  {risk.title}
                </h3>

                <p className="mt-1 text-sm text-slate-300">
                  Owner: {risk.owner}
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  {risk.mitigation}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}