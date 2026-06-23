"use client";

import { useState } from "react";
import {
  Database,
  Plus,
  RefreshCw,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";

type AccessRecord = {
  id: string;
  dataset: string;
  user: string;
  purpose: string;
  decision: "Allowed" | "Blocked";
  time: string;
};

const initialRows: AccessRecord[] = [
  {
    id: "ACC-001",
    dataset: "Payroll Compensation",
    user: "maya@northstar.example",
    purpose: "Payroll Review",
    decision: "Allowed",
    time: "4m ago",
  },
  {
    id: "ACC-002",
    dataset: "Employee PII",
    user: "hr.admin@northstar.example",
    purpose: "Onboarding",
    decision: "Allowed",
    time: "8m ago",
  },
  {
    id: "ACC-003",
    dataset: "Finance Journal",
    user: "avery@northstar.example",
    purpose: "Close Review",
    decision: "Allowed",
    time: "12m ago",
  },
  {
    id: "ACC-004",
    dataset: "GDPR Export",
    user: "unknown-session",
    purpose: "Export Attempt",
    decision: "Blocked",
    time: "19m ago",
  },
];

const templates = [
  {
    dataset: "Vendor Compliance Records",
    user: "vendor.audit@northstar.example",
    purpose: "Compliance Review",
  },
  {
    dataset: "Customer Contracts",
    user: "legal.team@northstar.example",
    purpose: "Contract Validation",
  },
  {
    dataset: "Inventory Audit Logs",
    user: "scm.audit@northstar.example",
    purpose: "Inventory Audit",
  },
  {
    dataset: "Security Incident Reports",
    user: "security.ops@northstar.example",
    purpose: "Incident Investigation",
  },
  {
    dataset: "Payroll Tax Reports",
    user: "finance.audit@northstar.example",
    purpose: "Tax Verification",
  },
];

export default function DataAccessPage() {
  const [rows, setRows] =
    useState<AccessRecord[]>(initialRows);

  function addAccessRecord() {
    const selected =
      templates[
        Math.floor(
          Math.random() * templates.length
        )
      ];

    setRows((current) => [
      {
        id: `ACC-${Date.now()
          .toString()
          .slice(-4)}`,
        dataset: selected.dataset,
        user: selected.user,
        purpose: selected.purpose,
        decision:
          Math.random() > 0.5
            ? "Allowed"
            : "Blocked",
        time: "Just now",
      },
      ...current,
    ]);
  }

  function toggleDecision(id: string) {
    setRows((current) =>
      current.map((row) =>
        row.id === id
          ? {
              ...row,
              decision:
                row.decision === "Allowed"
                  ? "Blocked"
                  : "Allowed",
            }
          : row
      )
    );
  }

  function refreshData() {
    setRows((current) =>
      current.map((row) => ({
        ...row,
        decision:
          row.decision === "Allowed"
            ? "Blocked"
            : "Allowed",
      }))
    );
  }

  const allowedCount = rows.filter(
    (row) => row.decision === "Allowed"
  ).length;

  const blockedCount = rows.filter(
    (row) => row.decision === "Blocked"
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="flex items-center gap-2 text-3xl font-semibold">
          <Database className="h-7 w-7 text-cyan-300" />
          Data Access Tracking
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
            onClick={addAccessRecord}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white"
          >
            <Plus className="h-4 w-4" />
            Add Entry
          </button>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            Total Records
          </p>
          <p className="mt-2 text-3xl font-bold">
            {rows.length}
          </p>
        </div>

        <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            Allowed
          </p>
          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {allowedCount}
          </p>
        </div>

        <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            Blocked
          </p>
          <p className="mt-2 text-3xl font-bold text-red-400">
            {blockedCount}
          </p>
        </div>
      </section>

      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <table className="w-full text-left">
          <thead className="text-xs uppercase tracking-[0.22em] text-slate-400">
            <tr>
              <th className="py-3">Dataset</th>
              <th>User</th>
              <th>Purpose</th>
              <th>Decision</th>
              <th>Time</th>
              <th className="text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {rows.map((row) => (
              <tr
                key={`${row.id}-${row.user}`}
              >
                <td className="py-4 font-medium">
                  {row.dataset}
                </td>

                <td>{row.user}</td>

                <td>{row.purpose}</td>

                <td>
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
                      row.decision ===
                      "Allowed"
                        ? "bg-emerald-500/15 text-emerald-300"
                        : "bg-red-500/15 text-red-300"
                    }`}
                  >
                    {row.decision ===
                    "Allowed" ? (
                      <ShieldCheck className="h-4 w-4" />
                    ) : (
                      <ShieldAlert className="h-4 w-4" />
                    )}
                    {row.decision}
                  </span>
                </td>

                <td>{row.time}</td>

                <td className="text-center">
                  <button
                    onClick={() =>
                      toggleDecision(row.id)
                    }
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
                  >
                    Toggle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}