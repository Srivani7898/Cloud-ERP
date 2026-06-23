"use client";

import { useState } from "react";
import {
  Download,
  Plus,
  RefreshCw,
  FileText,
} from "lucide-react";
import { downloadProjectPdf } from "@/utils/project-pdf";

type Report = {
  id: number;
  name: string;
  type:
  | "SOC2"
  | "GDPR"
  | "SOX"
  | "Security";
  status:
  | "Draft"
  | "Ready"
  | "Published";
};

const initialReports: Report[] = [
  {
    id: 1,
    name: "SOC 2 Evidence Pack",
    type: "SOC2",
    status: "Ready",
  },
  {
    id: 2,
    name: "GDPR Compliance Report",
    type: "GDPR",
    status: "Published",
  },
  {
    id: 3,
    name: "SOX Audit Trail",
    type: "SOX",
    status: "Draft",
  },
  {
    id: 4,
    name: "Security Event Summary",
    type: "Security",
    status: "Ready",
  },
];

export default function AuditReportsPage() {
  const [reports, setReports] =
    useState(initialReports);

  function refreshReports() {
    setReports((current) =>
      current.map((item) => ({
        ...item,
        status:
          item.status === "Draft"
            ? "Ready"
            : item.status === "Ready"
              ? "Published"
              : "Draft",
      }))
    );
  }

  function addReport() {
    const templates = [
      {
        name: "Vendor Compliance Audit",
        type: "SOC2" as const,
      },
      {
        name: "Privacy Assessment",
        type: "GDPR" as const,
      },
      {
        name: "Financial Control Audit",
        type: "SOX" as const,
      },
      {
        name: "Cyber Security Review",
        type: "Security" as const,
      },
    ];

    const selected =
      templates[
      Math.floor(
        Math.random() *
        templates.length
      )
      ];

    setReports((current) => [
      {
        id: Date.now(),
        ...selected,
        status: "Draft",
      },
      ...current,
    ]);
  }

  function toggleStatus(id: number) {
    setReports((current) =>
      current.map((item) => {
        if (item.id !== id)
          return item;

        return {
          ...item,
          status:
            item.status === "Draft"
              ? "Ready"
              : item.status ===
                "Ready"
                ? "Published"
                : "Draft",
        };
      })
    );
  }

  function getReportContent(report: Report) {
    switch (report.type) {
      case "SOC2":
        return [
          { metric: "Controls Tested", value: "124" },
          { metric: "Controls Passed", value: "118" },
          { metric: "Critical Findings", value: "1" },
          { metric: "Vendor Reviews", value: "27" },
          { metric: "Compliance Score", value: "95%" },
        ];

      case "GDPR":
        return [
          { metric: "DSR Requests", value: "86" },
          { metric: "Access Requests", value: "42" },
          { metric: "Rectifications", value: "18" },
          { metric: "Erasure Requests", value: "12" },
          { metric: "Compliance Score", value: "97%" },
        ];

      case "SOX":
        return [
          { metric: "Controls Reviewed", value: "73" },
          { metric: "Journal Entries", value: "1,248" },
          { metric: "Audit Findings", value: "4" },
          { metric: "Exceptions", value: "2" },
          { metric: "Effectiveness", value: "96%" },
        ];

      case "Security":
        return [
          { metric: "Security Incidents", value: "14" },
          { metric: "Resolved", value: "12" },
          { metric: "Critical", value: "2" },
          { metric: "Failed Logins", value: "428" },
          { metric: "Security Score", value: "92%" },
        ];

      default:
        return [];
    }
  }
  const ready = reports.filter(
    (r) => r.status === "Ready"
  ).length;

  const draft = reports.filter(
    (r) => r.status === "Draft"
  ).length;

  const published = reports.filter(
    (r) => r.status === "Published"
  ).length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">
        Compliance Reports
      </h1>

      <div className="flex gap-3">
        <button
          onClick={refreshReports}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          <RefreshCw className="h-4 w-4 inline mr-2" />
          Refresh
        </button>

        <button
          onClick={addReport}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-white"
        >
          <Plus className="h-4 w-4 inline mr-2" />
          Add Report
        </button>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-4">
          <p>Total Reports</p>
          <p className="text-2xl font-bold">{reports.length}</p>
        </div>

        <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-4">
          <p>Draft</p>
          <p className="text-2xl font-bold text-yellow-400">
            {draft}
          </p>
        </div>

        <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-4">
          <p>Ready</p>
          <p className="text-2xl font-bold text-cyan-400">
            {ready}
          </p>
        </div>

        <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-4">
          <p>Published</p>
          <p className="text-2xl font-bold text-emerald-400">
            {published}
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {reports.map((report) => (
          <article
            key={report.id}
            className="rounded-lg border border-slate-700 bg-slate-900/70 p-5"
          >
            <div className="flex items-center justify-between">
              <FileText className="h-5 w-5 text-cyan-300" />

              <span className="rounded-full px-3 py-1 text-xs font-semibold">
                {report.status}
              </span>
            </div>

            <h2 className="mt-4 text-lg font-semibold">
              {report.name}
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {getReportContent(report).map((item) => (
                <div
                  key={item.metric}
                  className="rounded-lg border border-slate-700 p-2"
                >
                  <p className="text-xs text-slate-400">
                    {item.metric}
                  </p>

                  <p className="font-semibold">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() =>
                  downloadProjectPdf(
                    `${report.name}.pdf`,
                    report.name,
                    getReportContent(report).map(
                      (item) =>
                        `${item.metric}: ${item.value}`
                    )
                  )
                }
                className="rounded-lg bg-blue-600 px-4 py-2 text-white"
              >
                <Download className="mr-2 inline h-4 w-4" />
                PDF
              </button>

              <button
                onClick={() =>
                  toggleStatus(report.id)
                }
                className="rounded-lg border border-slate-600 px-4 py-2"
              >
                Status
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}