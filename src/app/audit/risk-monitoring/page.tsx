"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Plus,
  RefreshCw,
  ShieldAlert,
} from "lucide-react";

type Risk = {
  id: string;
  title: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  owner: string;
  status: "Open" | "Investigating" | "Mitigated" | "Resolved";
};

const initialRisks: Risk[] = [
  {
    id: "RSK-301",
    title: "Privileged Access Spike",
    severity: "High",
    owner: "Security Ops",
    status: "Open",
  },
  {
    id: "RSK-302",
    title: "GDPR Request SLA At Risk",
    severity: "Medium",
    owner: "Compliance",
    status: "Investigating",
  },
  {
    id: "RSK-303",
    title: "Webhook Evidence Gap",
    severity: "Medium",
    owner: "Integration",
    status: "Mitigated",
  },
];

const riskTemplates = [
  {
    title: "Vendor Compliance Failure",
    severity: "High" as const,
    owner: "Vendor Management",
  },
  {
    title: "Unauthorized Data Access",
    severity: "Critical" as const,
    owner: "Security Team",
  },
  {
    title: "Payroll Approval Gap",
    severity: "Medium" as const,
    owner: "Payroll Team",
  },
  {
    title: "Inventory Fraud Risk",
    severity: "High" as const,
    owner: "SCM Operations",
  },
  {
    title: "GDPR Breach Alert",
    severity: "Critical" as const,
    owner: "Compliance Team",
  },
  {
    title: "Financial Control Exception",
    severity: "Medium" as const,
    owner: "Finance Audit",
  },
];

export default function RiskMonitoringPage() {
  const [risks, setRisks] = useState<Risk[]>(initialRisks);

  function addRisk() {
    const template =
      riskTemplates[
        Math.floor(Math.random() * riskTemplates.length)
      ];

    const nextId = `RSK-${Date.now()
      .toString()
      .slice(-4)}`;

    setRisks((current) => [
      {
        id: nextId,
        title: template.title,
        severity: template.severity,
        owner: template.owner,
        status: "Open",
      },
      ...current,
    ]);
  }

  function updateStatus(id: string) {
    setRisks((current) =>
      current.map((risk) => {
        if (risk.id !== id) return risk;

        let nextStatus: Risk["status"] = "Open";

        switch (risk.status) {
          case "Open":
            nextStatus = "Investigating";
            break;

          case "Investigating":
            nextStatus = "Mitigated";
            break;

          case "Mitigated":
            nextStatus = "Resolved";
            break;

          case "Resolved":
            nextStatus = "Open";
            break;
        }

        return {
          ...risk,
          status: nextStatus,
        };
      })
    );
  }

  function refreshRisks() {
    setRisks((current) =>
      current.map((risk) => ({
        ...risk,
        status:
          risk.status === "Open"
            ? "Investigating"
            : risk.status === "Investigating"
            ? "Mitigated"
            : risk.status === "Mitigated"
            ? "Resolved"
            : "Open",
      }))
    );
  }

  const criticalCount = risks.filter(
    (r) => r.severity === "Critical"
  ).length;

  const mediumCount = risks.filter(
    (r) => r.severity === "Medium"
  ).length;

  const resolvedCount = risks.filter(
    (r) => r.status === "Resolved"
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="flex items-center gap-2 text-3xl font-semibold">
          <AlertTriangle className="h-7 w-7 text-cyan-300" />
          Risk Monitoring
        </h1>

        <div className="flex gap-3">
          <button
            onClick={refreshRisks}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 font-semibold"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>

          <button
            onClick={addRisk}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white"
          >
            <Plus className="h-4 w-4" />
            Add Risk
          </button>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            Total Risks
          </p>
          <p className="mt-2 text-3xl font-bold">
            {risks.length}
          </p>
        </div>

        <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            Critical Risks
          </p>
          <p className="mt-2 text-3xl font-bold text-red-400">
            {criticalCount}
          </p>
        </div>

        <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            Medium Risks
          </p>
          <p className="mt-2 text-3xl font-bold text-yellow-400">
            {mediumCount}
          </p>
        </div>

        <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            Resolved Risks
          </p>
          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {resolvedCount}
          </p>
        </div>
      </section>

      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <table className="w-full text-left">
          <thead className="text-xs uppercase tracking-[0.22em] text-slate-400">
            <tr>
              <th className="py-3">Risk ID</th>
              <th>Risk Name</th>
              <th>Severity</th>
              <th>Owner</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {risks.map((risk) => (
              <tr key={risk.id}>
                <td className="py-4 font-medium">
                  {risk.id}
                </td>

                <td>{risk.title}</td>

                <td>
                  <span className="rounded-full bg-red-500/15 px-3 py-1 text-sm">
                    {risk.severity}
                  </span>
                </td>

                <td>{risk.owner}</td>

                <td>{risk.status}</td>

                <td className="text-center">
                  <button
                    onClick={() =>
                      updateStatus(risk.id)
                    }
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
                  >
                    Update Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {risks.slice(0, 3).map((risk) => (
          <article
            key={`${risk.id}-card`}
            className="rounded-lg border border-slate-700 bg-slate-900/70 p-5"
          >
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-cyan-300" />
              <h2 className="font-semibold">
                {risk.title}
              </h2>
            </div>

            <p className="mt-3 text-slate-400">
              Owner: {risk.owner}
            </p>

            <p className="mt-1 text-slate-400">
              Severity: {risk.severity}
            </p>

            <p className="mt-1 text-slate-400">
              Status: {risk.status}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}