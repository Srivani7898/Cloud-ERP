"use client";

import { useState } from "react";
import {
  Activity,
  Plus,
  RefreshCw,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";

type ActivityRecord = {
  id: number;
  user: string;
  activity: string;
  module: string;
  risk: "Low" | "Medium" | "High";
  status: "Review" | "Approved" | "Escalated";
};

const initialRows: ActivityRecord[] = [
  {
    id: 1,
    user: "Avery Stone",
    activity: "Granted finance manager role",
    module: "Identity",
    risk: "Medium",
    status: "Review",
  },
  {
    id: 2,
    user: "Anika Rao",
    activity: "Downloaded payslip",
    module: "Employee",
    risk: "Low",
    status: "Review",
  },
  {
    id: 3,
    user: "Maya Chen",
    activity: "Viewed salary data",
    module: "Payroll",
    risk: "High",
    status: "Review",
  },
  {
    id: 4,
    user: "SCM Bot",
    activity: "Triggered reorder webhook",
    module: "SCM",
    risk: "Medium",
    status: "Review",
  },
];

export default function AuditActivityPage() {
  const [filter, setFilter] = useState("All");
  const [rows, setRows] =
    useState<ActivityRecord[]>(initialRows);

  const filtered =
    filter === "All"
      ? rows
      : rows.filter(
          (row) => row.risk === filter
        );

  function refreshActivities() {
    setRows((current) =>
      current.map((item) => ({
        ...item,
        risk:
          Math.random() > 0.7
            ? "High"
            : Math.random() > 0.4
            ? "Medium"
            : "Low",
      }))
    );
  }

  function addActivity() {
    const templates = [
      {
        user: "Finance Admin",
        activity: "Updated GL Settings",
        module: "Finance",
        risk: "Low" as const,
      },
      {
        user: "HR Manager",
        activity: "Modified Employee Record",
        module: "HR",
        risk: "Medium" as const,
      },
      {
        user: "Payroll Admin",
        activity: "Approved Payroll Run",
        module: "Payroll",
        risk: "High" as const,
      },
      {
        user: "Compliance Bot",
        activity: "Generated Audit Report",
        module: "Audit",
        risk: "Low" as const,
      },
    ];

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
        status: "Review",
      },
      ...current,
    ]);
  }

  function toggleStatus(id: number) {
    setRows((current) =>
      current.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          status:
            item.status === "Review"
              ? "Approved"
              : item.status ===
                "Approved"
              ? "Escalated"
              : "Review",
        };
      })
    );
  }

  const total = rows.length;

  const low = rows.filter(
    (r) => r.risk === "Low"
  ).length;

  const medium = rows.filter(
    (r) => r.risk === "Medium"
  ).length;

  const high = rows.filter(
    (r) => r.risk === "High"
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-semibold">
            <Activity className="h-8 w-8 text-cyan-300" />
            Activity Tracking
          </h1>

          <p className="mt-2 text-slate-300">
            Monitor user activities and
            compliance events across ERP
            modules.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={refreshActivities}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 font-semibold text-white"
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
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            Total Activities
          </p>
          <p className="mt-2 text-3xl font-bold text-white">
            {total}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            Low Risk
          </p>
          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {low}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            Medium Risk
          </p>
          <p className="mt-2 text-3xl font-bold text-yellow-400">
            {medium}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            High Risk
          </p>
          <p className="mt-2 text-3xl font-bold text-red-400">
            {high}
          </p>
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        {["All", "Low", "Medium", "High"].map(
          (item) => (
            <button
              key={item}
              onClick={() =>
                setFilter(item)
              }
              className={`rounded-lg px-4 py-2 font-semibold ${
                filter === item
                  ? "bg-blue-600 text-white"
                  : "border border-slate-700 bg-slate-900 text-slate-200"
              }`}
            >
              {item}
            </button>
          )
        )}
      </div>

      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <table className="w-full text-left">
          <thead className="text-xs uppercase tracking-[0.22em] text-slate-400">
            <tr>
              <th className="py-3">
                User
              </th>
              <th>
                Activity Details
              </th>
              <th>Module</th>
              <th>Risk</th>
              <th className="text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {filtered.map((row) => (
              <tr key={row.id}>
                <td className="py-4 font-medium">
                  {row.user}
                </td>

                <td className="whitespace-nowrap">
                  {row.activity}
                </td>

                <td>{row.module}</td>

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

                <td>
                  <div className="flex justify-center">
                    <button
                      onClick={() =>
                        toggleStatus(
                          row.id
                        )
                      }
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
                    >
                      {row.status}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-5">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          <span className="font-semibold">
            Latest Activity
          </span>
        </div>

        <p className="mt-3 text-slate-300">
          {rows[0]?.user} -
          {" "}
          {rows[0]?.activity}
        </p>
      </div>
    </div>
  );
}