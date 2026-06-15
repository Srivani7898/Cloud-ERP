"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowRight, BriefcaseBusiness, CalendarDays, Gauge } from "lucide-react";
import { useProjectsStore } from "@/store/projects-store";

const fallbackProjects = [
  {
    id: "erp-finance-rollout",
    name: "Finance ERP rollout",
    client: "Northstar Manufacturing",
    status: "In progress",
    progress: 68,
    dueDate: "2026-07-15",
    role: "Implementation Analyst",
  },
  {
    id: "ai-demand-planning",
    name: "AI demand planning launch",
    client: "Global Inventory Operations",
    status: "On track",
    progress: 52,
    dueDate: "2026-08-02",
    role: "Forecast SME",
  },
];

export default function MyProjectsPage() {
  const projects = useProjectsStore((state: any) => state.projects ?? []);

  const myProjects = useMemo(() => {
    const normalized = projects.map((project: any) => ({
      id: project.id,
      name: project.name ?? project.title ?? "ERP transformation project",
      client: project.client ?? project.tenant ?? "Northstar Manufacturing",
      status: project.status ?? "In progress",
      progress: Number(project.progress ?? project.completion ?? 45),
      dueDate: project.dueDate ?? project.endDate ?? "2026-07-15",
      role: project.role ?? "Project contributor",
    }));

    return normalized.length ? normalized.slice(0, 4) : fallbackProjects;
  }, [projects]);

  return (
    <div className="min-h-screen bg-[#020617] px-6 py-8 text-white md:px-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">Employee workspace</p>
          <h1 className="mt-2 text-3xl font-semibold">My projects</h1>
          <p className="mt-2 max-w-2xl text-slate-300">Assigned projects, upcoming deadlines, and personal delivery progress.</p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {myProjects.map((project: any) => (
            <article key={project.id} className="rounded-lg border border-slate-700 bg-slate-900/80 p-5 shadow-2xl shadow-blue-950/20">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-cyan-200">
                    <BriefcaseBusiness className="h-5 w-5" />
                    <span className="text-sm font-semibold uppercase tracking-[0.2em]">{project.status}</span>
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold">{project.name}</h2>
                  <p className="mt-1 text-slate-400">{project.client}</p>
                </div>
                <Link
                  href={`/projects/${project.id}/overview`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-950 text-slate-200 transition hover:border-blue-400 hover:text-white"
                  aria-label={`Open ${project.name}`}
                >
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
                  <p className="flex items-center gap-2 text-sm text-slate-400"><Gauge className="h-4 w-4" /> Progress</p>
                  <p className="mt-2 text-xl font-semibold">{project.progress}%</p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
                  <p className="flex items-center gap-2 text-sm text-slate-400"><CalendarDays className="h-4 w-4" /> Due date</p>
                  <p className="mt-2 text-xl font-semibold">{project.dueDate}</p>
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-400">{project.role}</span>
                  <span className="font-semibold text-white">{project.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div className="h-2 rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-500" style={{ width: `${Math.min(project.progress, 100)}%` }} />
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
