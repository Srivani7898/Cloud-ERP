"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Loader2,
  Plus,
  RefreshCcw,
  Trash2,
  TriangleAlert,
} from "lucide-react";

type ApiEnvelope<T> = {
  success: boolean;
  data?: {
    module: string;
    resource: string;
    count: number;
    total: number;
    data: T[];
  };
  error?: string;
};

type Project = {
  id: string;
  name: string;
  methodology?: string;
  status: string;
  progress?: number;
  budget?: number;
  owner?: string;
  risk?: string;
  createdAt?: string;
  updatedAt?: string;
};

const emptyProject = {
  name: "",
  methodology: "Agile",
  owner: "",
  budget: "250000",
};

const statusStyles: Record<string, string> = {
  Active: "bg-blue-500/15 text-blue-200 ring-blue-400/25",
  "In progress": "bg-blue-500/15 text-blue-200 ring-blue-400/25",
  "On track": "bg-emerald-500/15 text-emerald-200 ring-emerald-400/25",
  "At Risk": "bg-amber-500/15 text-amber-200 ring-amber-400/25",
  Complete: "bg-emerald-500/15 text-emerald-200 ring-emerald-400/25",
  Blocked: "bg-rose-500/15 text-rose-200 ring-rose-400/25",
};

function money(value?: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value ?? 0);
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState(emptyProject);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const metrics = useMemo(() => {
    const totalBudget = projects.reduce((sum, project) => sum + (project.budget ?? 0), 0);
    const atRisk = projects.filter((project) => project.status === "At Risk" || project.risk === "High").length;
    const avgProgress = projects.length
      ? Math.round(projects.reduce((sum, project) => sum + (project.progress ?? 0), 0) / projects.length)
      : 0;

    return { totalBudget, atRisk, avgProgress, count: projects.length };
  }, [projects]);

  async function loadProjects() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/projects/projects", { cache: "no-store" });
      const payload = (await response.json()) as ApiEnvelope<Project>;

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to load projects.");
      }

      setProjects(payload.data?.data ?? []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load projects.");
    } finally {
      setLoading(false);
    }
  }

  async function createProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/projects/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          methodology: form.methodology,
          owner: form.owner.trim() || "Program Office",
          status: "Active",
          progress: 5,
          budget: Number(form.budget),
          risk: "Medium",
        }),
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to create project.");
      }

      setForm(emptyProject);
      setMessage("Project created and synced with the Projects backend API.");
      await loadProjects();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to create project.");
    } finally {
      setSaving(false);
    }
  }

  async function updateProject(id: string, patch: Partial<Project>) {
    setMessage("");

    try {
      const response = await fetch(`/api/projects/projects/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to update project.");
      }

      setMessage(`Project ${id} updated.`);
      await loadProjects();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to update project.");
    }
  }

  async function deleteProject(id: string) {
    setMessage("");

    try {
      const response = await fetch(`/api/projects/projects/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to delete project.");
      }

      setMessage(`Project ${id} deleted.`);
      await loadProjects();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to delete project.");
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
            Project Management
          </p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-semibold text-white md:text-4xl">
            <BriefcaseBusiness className="h-8 w-8 text-cyan-300" />
            Project portfolio
          </h1>
          <p className="mt-2 max-w-2xl text-base text-slate-300">
            Create and monitor enterprise delivery programs through the live
            `/api/projects/projects` backend.
          </p>
        </div>

        <button
          type="button"
          onClick={loadProjects}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-semibold text-white shadow-lg shadow-purple-950/20 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-white/[0.07]"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
          Refresh projects
        </button>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {[
          ["Projects", metrics.count, "Portfolio records"],
          ["Budget", money(metrics.totalBudget), "Total approved value"],
          ["Average progress", `${metrics.avgProgress}%`, "Delivery completion"],
          ["At risk", metrics.atRisk, "Needs executive attention"],
        ].map(([label, value, helper]) => (
          <div
            key={label}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_50px_rgba(124,58,237,0.14)] backdrop-blur-2xl"
          >
            <p className="text-sm text-slate-300">{label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
            <p className="mt-2 text-sm text-cyan-200">{helper}</p>
          </div>
        ))}
      </section>

      <form
        onSubmit={createProject}
        className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_50px_rgba(124,58,237,0.14)] backdrop-blur-2xl"
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-white">Create project</h2>
            <p className="mt-1 text-sm text-slate-300">
              Create a portfolio record and sync it to the project backend.
            </p>
          </div>
          <Plus className="hidden h-6 w-6 text-cyan-300 sm:block" />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Project name</span>
            <input
              required
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
              placeholder="ERP Finance Modernization"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Methodology</span>
            <select
              value={form.methodology}
              onChange={(event) => setForm((current) => ({ ...current, methodology: event.target.value }))}
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition focus:border-cyan-300/70 [&>option]:bg-slate-950 [&>option]:text-white"
            >
              <option>Agile</option>
              <option>Waterfall</option>
              <option>Hybrid</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Owner</span>
            <input
              value={form.owner}
              onChange={(event) => setForm((current) => ({ ...current, owner: event.target.value }))}
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
              placeholder="Anika Rao"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Budget</span>
            <input
              required
              min="0"
              type="number"
              value={form.budget}
              onChange={(event) => setForm((current) => ({ ...current, budget: event.target.value }))}
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition focus:border-cyan-300/70"
            />
          </label>

          <button
            type="submit"
            disabled={saving}
            className="mt-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 px-5 font-semibold text-white shadow-lg shadow-fuchsia-950/30 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <BriefcaseBusiness className="h-4 w-4" />}
            Create
          </button>
        </div>
      </form>

      {message ? (
        <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-5 py-4 text-cyan-100">
          {message}
        </div>
      ) : null}

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_50px_rgba(124,58,237,0.14)] backdrop-blur-2xl">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white">Projects</h2>
          <p className="mt-1 text-sm text-slate-300">
            Live project records from the Projects API.
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-56 items-center justify-center text-slate-300">
            <Loader2 className="mr-3 h-5 w-5 animate-spin text-cyan-300" />
            Loading projects...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-[0.24em] text-blue-200">
                  <th className="px-4 py-4">Project</th>
                  <th className="px-4 py-4">Owner</th>
                  <th className="px-4 py-4">Method</th>
                  <th className="px-4 py-4">Progress</th>
                  <th className="px-4 py-4">Budget</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Risk</th>
                  <th className="w-[330px] px-4 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => {
                  const style = statusStyles[project.status] ?? statusStyles.Active;

                  return (
                    <tr
                      key={project.id}
                      className={`border-b border-white/10 text-white ${index % 2 ? "bg-white/[0.03]" : ""}`}
                    >
                      <td className="px-4 py-5">
                        <div className="font-semibold">{project.name}</div>
                        <div className="text-xs text-slate-400">{project.id}</div>
                      </td>
                      <td className="px-4 py-5">{project.owner ?? "Program Office"}</td>
                      <td className="px-4 py-5">{project.methodology ?? "Hybrid"}</td>
                      <td className="px-4 py-5">{project.progress ?? 0}%</td>
                      <td className="px-4 py-5">{money(project.budget)}</td>
                      <td className="px-4 py-5">
                        <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ring-1 ${style}`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-4 py-5">{project.risk ?? "Medium"}</td>
                      <td className="w-[330px] px-4 py-5">
                        <div className="flex flex-nowrap justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateProject(project.id, {
                                status: "On track",
                                risk: "Low",
                                progress: Math.max(project.progress ?? 0, 75),
                              })
                            }
                            className="inline-flex whitespace-nowrap items-center gap-2 rounded-lg border border-emerald-300/20 bg-emerald-500/15 px-3 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/25"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            On track
                          </button>
                          <button
                            type="button"
                            onClick={() => updateProject(project.id, { status: "At Risk", risk: "High" })}
                            className="inline-flex whitespace-nowrap items-center gap-2 rounded-lg border border-amber-300/20 bg-amber-500/15 px-3 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-500/25"
                          >
                            <TriangleAlert className="h-4 w-4" />
                            At risk
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteProject(project.id)}
                            className="inline-flex whitespace-nowrap items-center gap-2 rounded-lg border border-rose-300/20 bg-rose-500/15 px-3 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-500/25"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
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
