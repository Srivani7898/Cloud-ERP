"use client";

import { useState } from "react";
import {
  Users,
  Plus,
  RefreshCw,
  Activity,
} from "lucide-react";

type UserActivity = {
  id: number;
  user: string;
  sessions: number;
  actions: number;
  risk: "Low" | "Medium" | "High";
  status:
    | "Active"
    | "Monitoring"
    | "Flagged";
};

const initialRows: UserActivity[] = [
  {
    id: 1,
    user: "Avery Stone",
    sessions: 4,
    actions: 182,
    risk: "Medium",
    status: "Monitoring",
  },
  {
    id: 2,
    user: "Anika Rao",
    sessions: 2,
    actions: 42,
    risk: "Low",
    status: "Active",
  },
  {
    id: 3,
    user: "Maya Chen",
    sessions: 6,
    actions: 311,
    risk: "High",
    status: "Flagged",
  },
];

const templates = [
  {
    user: "Finance Admin",
    sessions: 3,
    actions: 145,
    risk: "Low" as const,
  },
  {
    user: "Payroll Manager",
    sessions: 7,
    actions: 288,
    risk: "Medium" as const,
  },
  {
    user: "SCM Supervisor",
    sessions: 5,
    actions: 198,
    risk: "High" as const,
  },
  {
    user: "Compliance Officer",
    sessions: 4,
    actions: 165,
    risk: "Medium" as const,
  },
];

export default function UserActivityPage() {
  const [rows, setRows] =
    useState<UserActivity[]>(initialRows);

  const [sortHigh, setSortHigh] =
    useState(false);

  const sorted = sortHigh
    ? [...rows].sort(
        (a, b) => b.actions - a.actions
      )
    : rows;

  function addActivity() {
    const selected =
      templates[
        Math.floor(
          Math.random() *
            templates.length
        )
      ];

    setRows((current) => [
      {
        id: Date.now(),
        ...selected,
        status: "Active",
      },
      ...current,
    ]);
  }

  function refreshData() {
    setRows((current) =>
      current.map((item) => ({
        ...item,
        actions:
          item.actions +
          Math.floor(
            Math.random() * 20
          ),
        sessions:
          item.sessions +
          Math.floor(
            Math.random() * 3
          ),
      }))
    );
  }

  function toggleStatus(id: number) {
    setRows((current) =>
      current.map((item) => {
        if (item.id !== id)
          return item;

        return {
          ...item,
          status:
            item.status === "Active"
              ? "Monitoring"
              : item.status ===
                "Monitoring"
              ? "Flagged"
              : "Active",
        };
      })
    );
  }

  const totalUsers = rows.length;

  const highRisk = rows.filter(
    (r) => r.risk === "High"
  ).length;

  const activeUsers = rows.filter(
    (r) => r.status === "Active"
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="flex items-center gap-2 text-3xl font-semibold">
          <Users className="h-7 w-7 text-cyan-300" />
          User Activity Monitoring
        </h1>

        <div className="flex gap-3">
          <button
            onClick={refreshData}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 font-semibold"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>

          <button
            onClick={addActivity}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white"
          >
            <Plus className="h-4 w-4" />
            Add Activity
          </button>

          <button
            onClick={() =>
              setSortHigh(!sortHigh)
            }
            className="rounded-lg bg-violet-600 px-4 py-2 font-semibold text-white"
          >
            Sort By Actions
          </button>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            Total Users
          </p>
          <p className="mt-2 text-3xl font-bold">
            {totalUsers}
          </p>
        </div>

        <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            Active Users
          </p>
          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {activeUsers}
          </p>
        </div>

        <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            High Risk Users
          </p>
          <p className="mt-2 text-3xl font-bold text-red-400">
            {highRisk}
          </p>
        </div>
      </section>

      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <table className="w-full text-left">
          <thead className="text-xs uppercase tracking-[0.22em] text-slate-400">
            <tr>
              <th className="py-3">User</th>
              <th>Sessions</th>
              <th>Actions</th>
              <th>Risk</th>
              <th>Status</th>
              <th className="text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {sorted.map((row) => (
              <tr key={row.id}>
                <td className="py-4 font-medium">
                  {row.user}
                </td>

                <td>{row.sessions}</td>

                <td>{row.actions}</td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      row.risk === "High"
                        ? "bg-red-500/20 text-red-300"
                        : row.risk ===
                          "Medium"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-emerald-500/20 text-emerald-300"
                    }`}
                  >
                    {row.risk}
                  </span>
                </td>

                <td>{row.status}</td>

                <td className="text-center">
                  <button
                    onClick={() =>
                      toggleStatus(row.id)
                    }
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-5">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-cyan-300" />
          <span className="font-semibold">
            Latest User Activity
          </span>
        </div>

        <p className="mt-3 text-slate-300">
          {rows[0]?.user} performed{" "}
          {rows[0]?.actions} actions in{" "}
          {rows[0]?.sessions} sessions.
        </p>
      </section>
    </div>
  );
}