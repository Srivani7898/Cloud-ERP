"use client";

import { useEffect, useMemo, useState } from "react";
import { BarChart3, CheckCircle2, Download, FileText, RefreshCw, Send, Trash2 } from "lucide-react";

type HrReport = {
  id: string;
  name?: string;
  type?: string;
  period?: string;
  owner?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

const reportTypes = ["Workforce Summary", "Attendance", "Leave", "Onboarding", "Compliance"];

const defaultReport = {
  name: "Monthly Workforce Report",
  type: "Workforce Summary",
  period: "June 2026",
  owner: "HR CoE",
};

function fieldValue(report: HrReport, key: keyof HrReport, fallback = "Not set") {
  const value = report[key];
  return value === undefined || value === null || value === "" ? fallback : String(value);
}

function formatDate(value?: string) {
  if (!value) return "June 7, 2026";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function buildHrReportHtml(report: HrReport) {
  const name = fieldValue(report, "name", "HR Workforce Report");
  const type = fieldValue(report, "type", "Workforce Summary");
  const period = fieldValue(report, "period", "June 2026");
  const owner = fieldValue(report, "owner", "HR CoE");
  const status = fieldValue(report, "status", "Ready");
  const generatedOn = formatDate(report.updatedAt ?? report.createdAt);

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${name}</title>
  <style>
    @page { size: A4; margin: 22mm; }
    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
      color: #172033;
      background: #f6f8fb;
    }
    .sheet {
      background: #ffffff;
      border: 1px solid #d9e2ef;
      box-shadow: 0 18px 50px rgba(15, 23, 42, 0.12);
      min-height: 960px;
      padding: 36px;
      position: relative;
    }
    .topbar {
      height: 8px;
      background: linear-gradient(90deg, #7c3aed, #06b6d4, #ec4899);
      margin: -36px -36px 28px;
    }
    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      border-bottom: 2px solid #e5edf8;
      padding-bottom: 22px;
    }
    .brand { font-size: 12px; letter-spacing: 4px; color: #0891b2; font-weight: 700; }
    h1 { margin: 8px 0 6px; font-size: 30px; color: #0f172a; }
    .subtitle { color: #64748b; line-height: 1.5; font-size: 14px; }
    .badge {
      border: 1px solid #bfdbfe;
      background: #eff6ff;
      color: #1d4ed8;
      border-radius: 999px;
      padding: 8px 14px;
      font-weight: 700;
      font-size: 12px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;
      margin: 28px 0;
    }
    .metric {
      border: 1px solid #dbe7f5;
      border-radius: 14px;
      padding: 16px;
      background: #f8fbff;
    }
    .metric span { display: block; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 1.5px; }
    .metric strong { display: block; margin-top: 8px; font-size: 22px; color: #0f172a; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 18px;
      font-size: 13px;
    }
    th {
      background: #0f172a;
      color: #ffffff;
      text-align: left;
      padding: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 11px;
    }
    td {
      border: 1px solid #e2e8f0;
      padding: 12px;
      color: #1e293b;
    }
    .section-title {
      margin-top: 28px;
      color: #0f172a;
      font-size: 18px;
      font-weight: 800;
    }
    .note {
      border-left: 4px solid #06b6d4;
      background: #ecfeff;
      padding: 14px 16px;
      color: #155e75;
      line-height: 1.6;
      margin-top: 16px;
    }
    .signatures {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      margin-top: 64px;
    }
    .signature {
      border-top: 1px solid #94a3b8;
      padding-top: 10px;
      color: #334155;
      font-size: 12px;
    }
    .footer {
      position: absolute;
      bottom: 28px;
      left: 36px;
      right: 36px;
      display: flex;
      justify-content: space-between;
      color: #94a3b8;
      font-size: 11px;
      border-top: 1px solid #e2e8f0;
      padding-top: 14px;
    }
    @media print {
      body { background: #ffffff; }
      .sheet { box-shadow: none; border: 0; }
    }
  </style>
</head>
<body>
  <main class="sheet">
    <div class="topbar"></div>
    <section class="header">
      <div>
        <div class="brand">NORTHSTAR MANUFACTURING · HUMAN RESOURCES</div>
        <h1>${name}</h1>
        <div class="subtitle">Enterprise HR report prepared for leadership review, workforce governance, and operational planning.</div>
      </div>
      <div class="badge">${status}</div>
    </section>

    <section class="grid">
      <div class="metric"><span>Report Type</span><strong>${type}</strong></div>
      <div class="metric"><span>Period</span><strong>${period}</strong></div>
      <div class="metric"><span>Owner</span><strong>${owner}</strong></div>
      <div class="metric"><span>Generated</span><strong>${generatedOn}</strong></div>
    </section>

    <div class="section-title">Executive Summary</div>
    <p class="note">
      Workforce health remains stable for the selected period. HR operations show strong employee coverage,
      controlled leave exposure, and steady onboarding progress. Items requiring follow-up include role backfills,
      manager approval timelines, and department capacity planning.
    </p>

    <div class="section-title">Workforce KPI Snapshot</div>
    <table>
      <thead>
        <tr><th>KPI</th><th>Current</th><th>Target</th><th>Status</th><th>Business Note</th></tr>
      </thead>
      <tbody>
        <tr><td>Total Employees</td><td>248</td><td>260</td><td>On Track</td><td>Hiring pipeline is active for critical roles.</td></tr>
        <tr><td>Attendance Compliance</td><td>96.8%</td><td>95%</td><td>Healthy</td><td>Daily attendance controls are above target.</td></tr>
        <tr><td>Leave Utilization</td><td>12.4%</td><td>15%</td><td>Controlled</td><td>No material capacity risk identified.</td></tr>
        <tr><td>Onboarding Completion</td><td>91%</td><td>90%</td><td>Healthy</td><td>New hire checklist completion remains strong.</td></tr>
      </tbody>
    </table>

    <div class="section-title">Department View</div>
    <table>
      <thead>
        <tr><th>Department</th><th>Head</th><th>Employees</th><th>Open Roles</th><th>Risk</th></tr>
      </thead>
      <tbody>
        <tr><td>Finance</td><td>Avery Stone</td><td>42</td><td>3</td><td>Medium</td></tr>
        <tr><td>Human Resources</td><td>Rohan Mehta</td><td>18</td><td>1</td><td>Low</td></tr>
        <tr><td>Engineering</td><td>Maya Chen</td><td>112</td><td>7</td><td>Medium</td></tr>
        <tr><td>Operations</td><td>Omar Haddad</td><td>64</td><td>4</td><td>Low</td></tr>
      </tbody>
    </table>

    <div class="signatures">
      <div class="signature"><strong>${owner}</strong><br />Prepared by</div>
      <div class="signature"><strong>Chief People Officer</strong><br />Reviewed and approved</div>
    </div>

    <div class="footer">
      <span>Confidential HR report · Tenant scoped</span>
      <span>Report ID: ${fieldValue(report, "id", "HR-RPT-DRAFT")}</span>
    </div>
  </main>
  <script>window.onload = () => setTimeout(() => window.print(), 250);</script>
</body>
</html>`;
}

export default function HrReportsPage() {
  const [reports, setReports] = useState<HrReport[]>([]);
  const [form, setForm] = useState(defaultReport);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Reports are connected to /api/hr/reports.");

  const totals = useMemo(() => {
    const published = reports.filter((report) => ["Published", "Ready"].includes(fieldValue(report, "status", ""))).length;
    return [
      { label: "Reports", value: reports.length, note: "Live HR records" },
      { label: "Published", value: published, note: "Leadership ready" },
      { label: "Drafts", value: Math.max(reports.length - published, 0), note: "Needs review" },
      { label: "Coverage", value: "4", note: "HR domains tracked" },
    ];
  }, [reports]);

  async function loadReports() {
    setLoading(true);
    try {
      const response = await fetch("/api/hr/reports", { cache: "no-store" });
      const json = await response.json();
      setReports(json?.data?.data ?? []);
      setMessage("Latest HR reports loaded from the backend.");
    } catch {
      setMessage("Unable to load HR reports. Check the dev server and API route.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReports();
  }, []);

  async function createReport() {
    setLoading(true);
    try {
      const response = await fetch("/api/hr/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status: "Draft" }),
      });
      const json = await response.json();
      if (json?.success) {
        setForm(defaultReport);
        setMessage("HR report created and synced to the API.");
        await loadReports();
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateReport(report: HrReport, status: string) {
    await fetch(`/api/hr/reports/${report.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setMessage(`${fieldValue(report, "name", "Report")} moved to ${status}.`);
    await loadReports();
  }

  async function deleteReport(report: HrReport) {
    await fetch(`/api/hr/reports/${report.id}`, { method: "DELETE" });
    setMessage(`${fieldValue(report, "name", "Report")} deleted.`);
    await loadReports();
  }

  function downloadPdf(report: HrReport) {
    const html = buildHrReportHtml(report);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(url), 15000);
    setMessage("PDF preview opened. Choose Save as PDF in the print dialog.");
  }

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">Human Resources</p>
          <h1 className="mt-3 flex items-center gap-3 text-4xl font-bold text-white">
            <FileText className="h-9 w-9 text-cyan-300" />
            HR reports
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-300">
            Build realistic workforce, attendance, leave, and onboarding reports from the live HR backend.
          </p>
        </div>
        <button
          onClick={loadReports}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:border-cyan-300/60 hover:bg-white/10"
        >
          <RefreshCw className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
          Refresh reports
        </button>
      </section>

      <section className="grid gap-5 md:grid-cols-4">
        {totals.map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_50px_rgba(124,58,237,0.12)] backdrop-blur-xl">
            <p className="text-slate-300">{item.label}</p>
            <p className="mt-5 text-4xl font-bold text-white">{item.value}</p>
            <p className="mt-3 text-cyan-300">{item.note}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_0_70px_rgba(124,58,237,0.16)] backdrop-blur-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Create HR report</h2>
            <p className="mt-2 text-slate-300">Report records are saved to the HR API and can be exported as realistic PDFs.</p>
          </div>
          <BarChart3 className="h-7 w-7 text-cyan-300" />
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-[1.2fr_1fr_1fr_1fr_auto]">
          <label className="space-y-2">
            <span className="font-semibold text-white">Report name</span>
            <input
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
              placeholder="Monthly Workforce Report"
            />
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-white">Type</span>
            <select
              value={form.type}
              onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))}
              className="h-14 w-full rounded-xl border border-white/10 bg-slate-900 px-5 text-white outline-none transition focus:border-cyan-300 [&>option]:bg-slate-950 [&>option]:text-white"
            >
              {reportTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-white">Period</span>
            <input
              value={form.period}
              onChange={(event) => setForm((current) => ({ ...current, period: event.target.value }))}
              className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
            />
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-white">Owner</span>
            <input
              value={form.owner}
              onChange={(event) => setForm((current) => ({ ...current, owner: event.target.value }))}
              className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
            />
          </label>
          <button
            onClick={createReport}
            disabled={loading}
            className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 px-8 font-bold text-white shadow-[0_0_35px_rgba(236,72,153,0.35)] transition hover:scale-[1.02] disabled:opacity-60"
          >
            <Send className="h-5 w-5" />
            Create
          </button>
        </div>
        <p className="mt-5 rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-100">{message}</p>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_0_70px_rgba(124,58,237,0.14)] backdrop-blur-xl">
        <h2 className="text-2xl font-bold text-white">Report library</h2>
        <p className="mt-2 text-slate-300">Live HR report records from the backend API.</p>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <thead>
              <tr className="border-b border-white/10 text-sm uppercase tracking-[0.28em] text-cyan-300">
                <th className="px-4 py-4">Report</th>
                <th className="px-4 py-4">Type</th>
                <th className="px-4 py-4">Period</th>
                <th className="px-4 py-4">Owner</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-white/10 text-white even:bg-white/[0.03]">
                  <td className="px-4 py-5">
                    <div className="font-semibold">{fieldValue(report, "name", "HR report")}</div>
                    <div className="text-sm text-slate-400">{report.id}</div>
                  </td>
                  <td className="px-4 py-5">{fieldValue(report, "type")}</td>
                  <td className="px-4 py-5">{fieldValue(report, "period")}</td>
                  <td className="px-4 py-5">{fieldValue(report, "owner")}</td>
                  <td className="px-4 py-5">
                    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-100">
                      {fieldValue(report, "status", "Ready")}
                    </span>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex flex-nowrap justify-end gap-3">
                      <button
                        onClick={() => updateReport(report, "Published")}
                        className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-emerald-300/20 bg-emerald-400/15 px-4 py-3 font-semibold text-emerald-100 transition hover:bg-emerald-400/25"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Publish
                      </button>
                      <button
                        onClick={() => downloadPdf(report)}
                        className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-violet-300/20 bg-violet-400/15 px-4 py-3 font-semibold text-violet-100 transition hover:bg-violet-400/25"
                      >
                        <Download className="h-4 w-4" />
                        PDF
                      </button>
                      <button
                        onClick={() => deleteReport(report)}
                        className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-rose-300/20 bg-rose-400/15 px-4 py-3 font-semibold text-rose-100 transition hover:bg-rose-400/25"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
