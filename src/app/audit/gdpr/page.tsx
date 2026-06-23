"use client";

import { useState } from "react";
import {
  FileCheck2,
  Plus,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

type GdprRequest = {
  id: string;
  subject: string;
  request: string;
  status:
    | "Review"
    | "Approved"
    | "Escalated";
};

const initialRequests: GdprRequest[] = [
  {
    id: "GDPR-1021",
    subject: "anika.rao@northstar.example",
    request: "Data Export",
    status: "Review",
  },
  {
    id: "GDPR-1020",
    subject: "rohan.mehta@northstar.example",
    request: "Rectification",
    status: "Approved",
  },
  {
    id: "GDPR-1019",
    subject: "maya.chen@northstar.example",
    request: "Access Review",
    status: "Escalated",
  },
];

export default function AuditGdprPage() {
  const [rows, setRows] =
    useState<GdprRequest[]>(
      initialRequests
    );

  function addRequest() {
    const templates = [
      "Data Export",
      "Right To Erasure",
      "Consent Review",
      "Rectification",
      "Access Review",
    ];

    const next =
      templates[
        Math.floor(
          Math.random() *
            templates.length
        )
      ];

    setRows((current) => [
      {
        id: `GDPR-${Date.now()}`,
        subject:
          "new.request@northstar.example",
        request: next,
        status: "Review",
      },
      ...current,
    ]);
  }

  function refreshRequests() {
    setRows((current) =>
      current.map((item) => ({
        ...item,
        status:
          Math.random() > 0.7
            ? "Escalated"
            : Math.random() > 0.4
            ? "Approved"
            : "Review",
      }))
    );
  }

  function toggleStatus(id: string) {
    setRows((current) =>
      current.map((item) => {
        if (item.id !== id)
          return item;

        return {
          ...item,
          status:
            item.status ===
            "Review"
              ? "Approved"
              : item.status ===
                "Approved"
              ? "Escalated"
              : "Review",
        };
      })
    );
  }

  const review =
    rows.filter(
      (r) => r.status === "Review"
    ).length;

  const approved =
    rows.filter(
      (r) =>
        r.status === "Approved"
    ).length;

  const escalated =
    rows.filter(
      (r) =>
        r.status === "Escalated"
    ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-semibold">
            <FileCheck2 className="h-7 w-7 text-cyan-300" />
            GDPR Management
          </h1>

          <p className="mt-2 text-slate-300">
            Manage GDPR requests,
            approvals, and escalations.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={refreshRequests}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 font-semibold text-white"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>

          <button
            onClick={addRequest}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white"
          >
            <Plus className="h-4 w-4" />
            Add Request
          </button>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            Total Requests
          </p>
          <p className="mt-2 text-3xl font-bold text-white">
            {rows.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            Under Review
          </p>
          <p className="mt-2 text-3xl font-bold text-cyan-400">
            {review}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            Approved
          </p>
          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {approved}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">
            Escalated
          </p>
          <p className="mt-2 text-3xl font-bold text-red-400">
            {escalated}
          </p>
        </div>
      </section>

      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <table className="w-full text-left">
          <thead className="text-xs uppercase tracking-[0.22em] text-slate-400">
            <tr>
              <th className="py-3">
                Request
              </th>
              <th>Subject</th>
              <th>Type</th>
              <th>Status</th>
              <th className="text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="py-4 font-medium whitespace-nowrap">
                  {row.id}
                </td>

                <td>{row.subject}</td>

                <td>{row.request}</td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      row.status ===
                      "Approved"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : row.status ===
                          "Escalated"
                        ? "bg-red-500/20 text-red-300"
                        : "bg-cyan-500/20 text-cyan-300"
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
          <ShieldCheck className="h-5 w-5 text-cyan-300" />
          <span className="font-semibold">
            Latest GDPR Request
          </span>
        </div>

        <p className="mt-3 text-slate-300">
          {rows[0]?.id} •{" "}
          {rows[0]?.request}
        </p>
      </div>
    </div>
  );
}