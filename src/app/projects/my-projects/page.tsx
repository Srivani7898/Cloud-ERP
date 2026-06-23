"use client";

import Link from "next/link";
import {
  BriefcaseBusiness,
  CalendarDays,
  Gauge,
  ArrowRight,
} from "lucide-react";
import { useProjectsStore } from "@/store/projects-store";

export default function MyProjectsPage() {
  const projects = useProjectsStore((state) => state.projects);
  console.log("MY PROJECTS PAGE");
  console.log(projects);
  console.log(projects.length);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">
          Employee Workspace
        </p>

        <h1 className="mt-2 text-3xl font-semibold">
          My Projects
        </h1>

        <p className="mt-2 text-slate-400">
          Assigned projects, upcoming deadlines, and personal delivery progress.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <h3 className="text-xl font-semibold">
            No Projects Available
          </h3>

          <p className="mt-2 text-slate-400">
            Create a project from the Projects page.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 text-cyan-300">
                    <BriefcaseBusiness className="h-4 w-4" />

                    <span className="text-xs uppercase tracking-[0.2em]">
                      {project.status}
                    </span>
                  </div>

                  <h2 className="mt-3 text-2xl font-semibold">
                    {project.name}
                  </h2>

                  <p className="mt-1 text-slate-400">
                    {project.client}
                  </p>

                  <p className="text-sm text-cyan-300">
                    Owner: {project.owner}
                  </p>
                </div>

                <Link
                  href={`/projects/${project.id}/overview`}
                  className="rounded-lg border border-white/10 p-2 hover:bg-white/10"
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-white/10 p-4">
                  <p className="flex items-center gap-2 text-sm text-slate-400">
                    <Gauge className="h-4 w-4" />
                    Progress
                  </p>

                  <p className="mt-2 text-xl font-semibold">
                    {project.progress ?? 0}%
                  </p>
                </div>

                <div className="rounded-lg border border-white/10 p-4">
                  <p className="flex items-center gap-2 text-sm text-slate-400">
                    <CalendarDays className="h-4 w-4" />
                    Due Date
                  </p>

                  <p className="mt-2 text-xl font-semibold">
                    {project.endDate}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-400">
                    Project Progress
                  </span>

                  <span>
                    {project.progress ?? 0}%
                  </span>
                </div>

                <div className="h-2 rounded-full bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                    style={{
                      width: `${project.progress ?? 0}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}