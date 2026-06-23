"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Plus,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { CompliancePanel } from "@/components/audit/AuditWidgets";

type ComplianceRecord = {
  id: number;
  policy: string;
  owner: string;
  framework: string;
  status:
    | "Compliant"
    | "Pending"
    | "Violation";
};

const initialRecords: ComplianceRecord[] = [
  {
    id: 1,
    policy: "Access Control Policy",
    owner: "Security Team",
    framework: "ISO 27001",
    status: "Compliant",
  },
  {
    id: 2,
    policy: "Payroll Data Protection",
    owner: "HR",
    framework: "GDPR",
    status: "Pending",
  },
  {
    id: 3,
    policy: "Vendor Security Review",
    owner: "SCM",
    framework: "SOC 2",
    status: "Violation",
  },
];

export default function AuditCompliancePage() {
  const [records, setRecords] =
    useState(initialRecords);

  function addCompliance() {
    const templates = [
      {
        policy: "Finance Audit Policy",
        owner: "Finance",
        framework: "SOX",
      },
      {
        policy: "Employee Privacy Policy",
        owner: "HR",
        framework: "GDPR",
      },
      {
        policy: "Inventory Control Policy",
        owner: "SCM",
        framework: "ISO 27001",
      },
      {
        policy: "Notification Security",
        owner: "IT",
        framework: "SOC 2",
      },
    ];

    const selected =
      templates[
        Math.floor(
          Math.random() *
            templates.length
        )
      ];

    setRecords((current) => [
      {
        id: Date.now(),
        ...selected,
        status: "Pending",
      },
      ...current,
    ]);
  }

  function refreshCompliance() {
    setRecords((current) =>
      current.map((item) => ({
        ...item,
        status:
          Math.random() > 0.7
            ? "Violation"
            : Math.random() > 0.4
            ? "Pending"
            : "Compliant",
      }))
    );
  }

  function toggleStatus(id: number) {
    setRecords((current) =>
      current.map((item) => {
        if (item.id !== id)
          return item;

        return {
          ...item,
          status:
            item.status ===
            "Compliant"
              ? "Pending"
              : item.status ===
                "Pending"
              ? "Violation"
              : "Compliant",
        };
      })
    );
  }

  const compliant =
    records.filter(
      (r) => r.status === "Compliant"
    ).length;

  const pending =
    records.filter(
      (r) => r.status === "Pending"
    ).length;

  const violations =
    records.filter(
      (r) => r.status === "Violation"
    ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-semibold">
            <ShieldCheck className="h-8 w-8 text-cyan-300" />
            Compliance Monitoring
          </h1>

          <p className="mt-2 text-slate-300">
            Track enterprise compliance
            status across policies and
            frameworks.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={refreshCompliance}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 font-semibold text-white"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>

          <button
            onClick={addCompliance}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white"
          >
            <Plus className="h-4 w-4" />
            Add Compliance
          </button>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            Total Records
          </p>
          <p className="mt-2 text-3xl font-bold text-white">
            {records.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            Compliant
          </p>
          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {compliant}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            Pending
          </p>
          <p className="mt-2 text-3xl font-bold text-yellow-400">
            {pending}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            Violations
          </p>
          <p className="mt-2 text-3xl font-bold text-red-400">
            {violations}
          </p>
        </div>
      </section>

      <CompliancePanel />

      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <table className="w-full text-left">
          <thead className="text-xs uppercase tracking-[0.22em] text-slate-400">
            <tr>
              <th className="py-3">
                Policy
              </th>
              <th>Owner</th>
              <th>Framework</th>
              <th>Status</th>
              <th className="text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {records.map((row) => (
              <tr key={row.id}>
                <td className="py-4 font-medium whitespace-nowrap">
                  {row.policy}
                </td>

                <td>{row.owner}</td>

                <td>{row.framework}</td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      row.status ===
                      "Compliant"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : row.status ===
                          "Pending"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {row.status}
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
                      Change Status
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
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
          <span className="font-semibold">
            Latest Compliance Record
          </span>
        </div>

        <p className="mt-3 text-slate-300">
          {records[0]?.policy}
        </p>
      </div>
    </div>
  );
}