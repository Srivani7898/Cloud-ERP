"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Download, FileText, RefreshCw, Send, Trash2 } from "lucide-react";

type PayrollReport = {
  id: string;
  name?: string;
  type?: string;
  period?: string;
  owner?: string;
  status?: string;
  grossPayroll?: number;
  netPayroll?: number;
  deductions?: number;
  createdAt?: string;
  updatedAt?: string;
};

const defaultForm = {
  name: "",
  type: "Payroll Register",
  period: "",
  owner: "",
};

const reportTypes = ["Payroll Register", "Tax Summary", "Deduction Register", "Bank Transfer File", "Variance Analysis"];

function valueOf(report: PayrollReport, key: keyof PayrollReport, fallback = "Not set") {
  const value = report[key];
  return value === undefined || value === null || value === "" ? fallback : String(value);
}

function money(value?: number) {
  return `$${Number(value ?? 0).toLocaleString("en-US")}`;
}

function reportHtml(report: PayrollReport) {
  const name = valueOf(report, "name", "Monthly Payroll Report");
  const type = valueOf(report, "type", "Payroll Register");
  const period = valueOf(report, "period", "June 2026");
  const owner = valueOf(report, "owner", "Payroll CoE");
  const status = valueOf(report, "status", "Ready");
  const gross = Number(report.grossPayroll ?? 6240000);
  const deductions = Number(report.deductions ?? 912000);
  const net = Number(report.netPayroll ?? gross - deductions);

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${name}</title>
  <style>
    @page { size: A4; margin: 18mm; }
    body { margin: 0; background: #eef3f8; color: #172033; font-family: Arial, Helvetica, sans-serif; }
    .sheet { min-height: 980px; background: #fff; border: 1px solid #d7e1ee; padding: 34px; position: relative; }
    .stripe { height: 8px; margin: -34px -34px 28px; background: linear-gradient(90deg, #7c3aed, #06b6d4, #ec4899); }
    .header { display: flex; justify-content: space-between; gap: 24px; border-bottom: 2px solid #e5edf6; padding-bottom: 22px; }
    .brand { color: #0891b2; font-size: 12px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; }
    h1 { margin: 8px 0 8px; font-size: 30px; color: #0f172a; }
    .muted { color: #64748b; line-height: 1.5; font-size: 14px; }
    .badge { align-self: start; border: 1px solid #bfdbfe; border-radius: 999px; background: #eff6ff; color: #1d4ed8; padding: 8px 14px; font-weight: 700; font-size: 12px; }
    .metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 26px 0; }
    .metric { border: 1px solid #dbe7f5; border-radius: 14px; background: #f8fbff; padding: 14px; }
    .metric span { display: block; color: #64748b; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; }
    .metric strong { display: block; color: #0f172a; font-size: 21px; margin-top: 8px; }
    .section { margin-top: 26px; }
    .section h2 { margin: 0 0 12px; font-size: 17px; color: #0f172a; }
    table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
    th { background: #0f172a; color: #fff; text-align: left; padding: 11px; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; }
    td { border: 1px solid #e2e8f0; padding: 11px; }
    .note { margin-top: 14px; border-left: 4px solid #06b6d4; background: #ecfeff; color: #155e75; padding: 13px 15px; line-height: 1.55; }
    .signatures { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-top: 58px; }
    .signature { border-top: 1px solid #94a3b8; padding-top: 10px; font-size: 12px; color: #334155; }
    .footer { position: absolute; bottom: 24px; left: 34px; right: 34px; border-top: 1px solid #e2e8f0; padding-top: 12px; color: #94a3b8; display: flex; justify-content: space-between; font-size: 11px; }
    @media print { body { background: #fff; } .sheet { border: 0; } }
  </style>
</head>
<body>
  <main class="sheet">
    <div class="stripe"></div>
    <section class="header">
      <div>
        <div class="brand">Northstar Manufacturing · Payroll Engine</div>
        <h1>${name}</h1>
        <p class="muted">Formal payroll report for finance review, statutory reconciliation, bank file validation, and executive approval.</p>
      </div>
      <div class="badge">${status}</div>
    </section>
    <section class="metrics">
      <div class="metric"><span>Report Type</span><strong>${type}</strong></div>
      <div class="metric"><span>Period</span><strong>${period}</strong></div>
      <div class="metric"><span>Gross Payroll</span><strong>${money(gross)}</strong></div>
      <div class="metric"><span>Net Payable</span><strong>${money(net)}</strong></div>
    </section>
    <section class="section">
      <h2>Payroll Control Summary</h2>
      <table>
        <thead><tr><th>Control</th><th>Amount</th><th>Status</th><th>Reviewer Note</th></tr></thead>
        <tbody>
          <tr><td>Gross earnings</td><td>${money(gross)}</td><td>Balanced</td><td>Matches active employee payroll population.</td></tr>
          <tr><td>Employee deductions</td><td>${money(deductions)}</td><td>Validated</td><td>Includes tax, insurance, and retirement deductions.</td></tr>
          <tr><td>Net salary payable</td><td>${money(net)}</td><td>Ready</td><td>Prepared for bank transfer approval.</td></tr>
          <tr><td>Variance vs prior month</td><td>${money(84200)}</td><td>Reviewed</td><td>Variance driven by new hires and incentives.</td></tr>
        </tbody>
      </table>
    </section>
    <section class="section">
      <h2>Department Payroll Breakdown</h2>
      <table>
        <thead><tr><th>Department</th><th>Employees</th><th>Gross</th><th>Deductions</th><th>Net Pay</th></tr></thead>
        <tbody>
          <tr><td>Finance</td><td>42</td><td>${money(512400)}</td><td>${money(74400)}</td><td>${money(438000)}</td></tr>
          <tr><td>Human Resources</td><td>18</td><td>${money(214800)}</td><td>${money(31800)}</td><td>${money(183000)}</td></tr>
          <tr><td>Engineering</td><td>112</td><td>${money(1624000)}</td><td>${money(244000)}</td><td>${money(1380000)}</td></tr>
          <tr><td>Operations</td><td>64</td><td>${money(768000)}</td><td>${money(112000)}</td><td>${money(656000)}</td></tr>
        </tbody>
      </table>
      <p class="note">Payroll controls are ready for final finance approval. No duplicate bank accounts, inactive employees, or negative net pay exceptions were detected for this cycle.</p>
    </section>
    <div class="signatures">
      <div class="signature"><strong>${owner}</strong><br />Prepared by</div>
      <div class="signature"><strong>Finance Controller</strong><br />Approved by</div>
    </div>
    <div class="footer"><span>Confidential payroll report · Tenant scoped</span><span>Report ID: ${valueOf(report, "id", "PAY-RPT-DRAFT")}</span></div>
  </main>
  <script>window.onload = () => setTimeout(() => window.print(), 250);</script>
</body>
</html>`;
}

export default function PayrollReportsPage() {
  const [reports, setReports] = useState<PayrollReport[]>([]);
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Payroll reports are connected to /api/payroll/reports.");

  const summary = useMemo(() => {
    const ready = reports.filter((report) => ["Ready", "Published", "Approved"].includes(valueOf(report, "status", ""))).length;
    return [
      { label: "Reports", value: reports.length, note: "Payroll documents" },
      { label: "Ready", value: ready, note: "Finance review ready" },
      { label: "Gross payroll", value: "$6.24M", note: "Current cycle" },
      { label: "Net payable", value: "$5.33M", note: "After deductions" },
    ];
  }, [reports]);

  async function loadReports() {
    setLoading(true);
    try {
      const response = await fetch("/api/payroll/reports", { cache: "no-store" });
      const json = await response.json();
      setReports(json?.data?.data ?? []);
      setMessage("Latest payroll reports loaded from the backend.");
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
      const response = await fetch("/api/payroll/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status: "Draft", grossPayroll: 6240000, deductions: 912000, netPayroll: 5328000 }),
      });
      const json = await response.json();
      if (json?.success) {
        setMessage(`${form.name} created.`);
        setForm(defaultForm);
        await loadReports();
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(report: PayrollReport, status: string) {
    await fetch(`/api/payroll/reports/${report.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setMessage(`${valueOf(report, "name", "Report")} moved to ${status}.`);
    await loadReports();
  }

  async function deleteReport(report: PayrollReport) {
    await fetch(`/api/payroll/reports/${report.id}`, { method: "DELETE" });
    setMessage(`${valueOf(report, "name", "Report")} deleted.`);
    await loadReports();
  }

  function downloadPdf(report: PayrollReport) {
    const blob = new Blob([reportHtml(report)], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(url), 15000);
    setMessage("Payroll PDF preview opened. Choose Save as PDF in the print dialog.");
  }

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">Payroll Engine</p>
          <h1 className="mt-3 flex items-center gap-3 text-4xl font-bold text-white">
            <FileText className="h-9 w-9 text-cyan-300" />
            Payroll reports
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-300">Create payroll registers, tax summaries, deduction reports, and approval-ready payroll PDFs.</p>
        </div>
        <button onClick={loadReports} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:border-cyan-300/60 hover:bg-white/10">
          <RefreshCw className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
          Refresh reports
        </button>
      </section>

      <section className="grid gap-5 md:grid-cols-4">
        {summary.map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_50px_rgba(124,58,237,0.12)] backdrop-blur-xl">
            <p className="text-slate-300">{item.label}</p>
            <p className="mt-5 text-3xl font-bold text-white">{item.value}</p>
            <p className="mt-3 text-cyan-300">{item.note}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_0_70px_rgba(124,58,237,0.16)] backdrop-blur-xl">
        <h2 className="text-2xl font-bold text-white">Create payroll report</h2>
        <p className="mt-2 text-slate-300">Generate a payroll report record and export it as a realistic PDF.</p>
        <div className="mt-7 grid gap-5 lg:grid-cols-[1.2fr_1fr_1fr_1fr_auto]">
          <label className="space-y-2">
            <span className="font-semibold text-white">Report name</span>
            <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="Monthly Payroll Register" className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300" />
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-white">Type</span>
            <select value={form.type} onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))} className="h-14 w-full rounded-xl border border-white/10 bg-slate-900 px-5 text-white outline-none focus:border-cyan-300 [&>option]:bg-slate-950 [&>option]:text-white">
              {reportTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-white">Period</span>
            <input value={form.period} onChange={(event) => setForm((current) => ({ ...current, period: event.target.value }))} placeholder="June 2026" className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300" />
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-white">Owner</span>
            <input value={form.owner} onChange={(event) => setForm((current) => ({ ...current, owner: event.target.value }))} placeholder="Payroll CoE" className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300" />
          </label>
          <button onClick={createReport} disabled={loading} className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 px-8 font-bold text-white shadow-[0_0_35px_rgba(236,72,153,0.35)] transition hover:scale-[1.02] disabled:opacity-60">
            <Send className="h-5 w-5" />
            Create
          </button>
        </div>
        <p className="mt-5 rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-100">{message}</p>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_0_70px_rgba(124,58,237,0.14)] backdrop-blur-xl">
        <h2 className="text-2xl font-bold text-white">Report library</h2>
        <p className="mt-2 text-slate-300">Live payroll report records from the backend API.</p>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left">
            <thead>
              <tr className="border-b border-white/10 text-sm uppercase tracking-[0.28em] text-cyan-300">
                <th className="px-4 py-4">Report</th>
                <th className="px-4 py-4">Type</th>
                <th className="px-4 py-4">Period</th>
                <th className="px-4 py-4">Owner</th>
                <th className="px-4 py-4">Status</th>
                <th className="w-[360px] px-4 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-white/10 text-white even:bg-white/[0.03]">
                  <td className="px-4 py-5"><div className="font-semibold">{valueOf(report, "name", "Payroll report")}</div><div className="text-sm text-slate-400">{report.id}</div></td>
                  <td className="px-4 py-5">{valueOf(report, "type", "Payroll Register")}</td>
                  <td className="px-4 py-5">{valueOf(report, "period", "June 2026")}</td>
                  <td className="px-4 py-5">{valueOf(report, "owner", "Payroll CoE")}</td>
                  <td className="px-4 py-5"><span className="inline-flex min-w-[92px] justify-center whitespace-nowrap rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-100">{valueOf(report, "status", "Ready")}</span></td>
                  <td className="px-4 py-5">
                    <div className="flex min-w-[320px] flex-nowrap justify-end gap-3">
                      <button onClick={() => updateStatus(report, "Approved")} className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-emerald-300/20 bg-emerald-400/15 px-4 py-3 font-semibold text-emerald-100"><CheckCircle2 className="h-4 w-4" />Approve</button>
                      <button onClick={() => downloadPdf(report)} className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-violet-300/20 bg-violet-400/15 px-4 py-3 font-semibold text-violet-100"><Download className="h-4 w-4" />PDF</button>
                      <button onClick={() => deleteReport(report)} className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-rose-300/20 bg-rose-400/15 px-4 py-3 font-semibold text-rose-100"><Trash2 className="h-4 w-4" />Delete</button>
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
