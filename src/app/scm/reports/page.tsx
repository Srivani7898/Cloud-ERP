"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Download, FileText, RefreshCw, Send, Trash2 } from "lucide-react";

type ScmReport = {
  id: string;
  name?: string;
  type?: string;
  period?: string;
  owner?: string;
  status?: string;
  inventoryValue?: number;
  openPOs?: number;
  lowStockItems?: number;
  createdAt?: string;
  updatedAt?: string;
};

const emptyForm = {
  name: "",
  type: "Inventory Position",
  period: "",
  owner: "",
};

const reportTypes = ["Inventory Position", "Vendor Performance", "Purchase Order Aging", "Stock Movement", "Warehouse Utilization"];

function valueOf(report: ScmReport, key: keyof ScmReport, fallback = "Not set") {
  const value = report[key];
  return value === undefined || value === null || value === "" ? fallback : String(value);
}

function money(value?: number) {
  return `$${Number(value ?? 0).toLocaleString("en-US")}`;
}

function reportHtml(report: ScmReport) {
  const name = valueOf(report, "name", "SCM Inventory Report");
  const type = valueOf(report, "type", "Inventory Position");
  const period = valueOf(report, "period", "June 2026");
  const owner = valueOf(report, "owner", "SCM CoE");
  const status = valueOf(report, "status", "Ready");
  const inventoryValue = Number(report.inventoryValue ?? 4280000);
  const openPOs = Number(report.openPOs ?? 18);
  const lowStockItems = Number(report.lowStockItems ?? 7);

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
    .badge { align-self: start; border: 1px solid #bbf7d0; border-radius: 999px; background: #f0fdf4; color: #047857; padding: 8px 14px; font-weight: 700; font-size: 12px; }
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
        <div class="brand">Northstar Manufacturing · Supply Chain & Inventory</div>
        <h1>${name}</h1>
        <p class="muted">Operational supply chain report for inventory health, replenishment risk, warehouse capacity, and vendor execution review.</p>
      </div>
      <div class="badge">${status}</div>
    </section>
    <section class="metrics">
      <div class="metric"><span>Report Type</span><strong>${type}</strong></div>
      <div class="metric"><span>Period</span><strong>${period}</strong></div>
      <div class="metric"><span>Inventory Value</span><strong>${money(inventoryValue)}</strong></div>
      <div class="metric"><span>Open POs</span><strong>${openPOs}</strong></div>
    </section>
    <section class="section">
      <h2>Inventory Control Summary</h2>
      <table>
        <thead><tr><th>Control Area</th><th>Current</th><th>Target</th><th>Status</th><th>Business Note</th></tr></thead>
        <tbody>
          <tr><td>Total inventory value</td><td>${money(inventoryValue)}</td><td>${money(4500000)}</td><td>Healthy</td><td>Inventory remains within approved working capital range.</td></tr>
          <tr><td>Low stock items</td><td>${lowStockItems}</td><td>5</td><td>Watch</td><td>Battery and network router stock require replenishment attention.</td></tr>
          <tr><td>Open purchase orders</td><td>${openPOs}</td><td>20</td><td>Controlled</td><td>Open PO volume is within procurement capacity.</td></tr>
          <tr><td>Warehouse utilization</td><td>82%</td><td>85%</td><td>On Track</td><td>Bengaluru DC has sufficient short-term capacity.</td></tr>
        </tbody>
      </table>
    </section>
    <section class="section">
      <h2>Warehouse and Vendor Snapshot</h2>
      <table>
        <thead><tr><th>Location / Vendor</th><th>Category</th><th>Metric</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          <tr><td>Bengaluru DC</td><td>Warehouse</td><td>82% capacity</td><td>Operational</td><td>Monitor inbound PO volume.</td></tr>
          <tr><td>Singapore Hub</td><td>Warehouse</td><td>Router stockout</td><td>Critical</td><td>Prioritize transfer or vendor replenishment.</td></tr>
          <tr><td>VoltEdge Supplies</td><td>Vendor</td><td>4.7 rating</td><td>Preferred</td><td>Continue preferred sourcing.</td></tr>
          <tr><td>Test Global Vendor</td><td>Vendor</td><td>New supplier</td><td>Active</td><td>Complete first-delivery performance review.</td></tr>
        </tbody>
      </table>
      <p class="note">SCM control status is stable. Reorder automation has open purchase order coverage for critical low-stock SKUs, preventing duplicate PO creation.</p>
    </section>
    <div class="signatures">
      <div class="signature"><strong>${owner}</strong><br />Prepared by</div>
      <div class="signature"><strong>Supply Chain Director</strong><br />Reviewed by</div>
    </div>
    <div class="footer"><span>Confidential SCM report · Tenant scoped</span><span>Report ID: ${valueOf(report, "id", "SCM-RPT-DRAFT")}</span></div>
  </main>
  <script>window.onload = () => setTimeout(() => window.print(), 250);</script>
</body>
</html>`;
}

export default function ScmReportsPage() {
  const [reports, setReports] = useState<ScmReport[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("SCM reports are connected to /api/scm/reports.");

  const summary = useMemo(() => {
    const ready = reports.filter((report) => ["Ready", "Published", "Approved"].includes(valueOf(report, "status", ""))).length;
    return [
      { label: "Reports", value: reports.length, note: "SCM report records" },
      { label: "Ready", value: ready, note: "Leadership ready" },
      { label: "Inventory value", value: "$4.28M", note: "Current estimate" },
      { label: "Open POs", value: "18", note: "Procurement workload" },
    ];
  }, [reports]);

  async function loadReports() {
    setLoading(true);
    try {
      const response = await fetch("/api/scm/reports", { cache: "no-store" });
      const json = await response.json();
      setReports(json?.data?.data ?? []);
      setMessage("Latest SCM reports loaded from the backend.");
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
      const response = await fetch("/api/scm/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status: "Draft", inventoryValue: 4280000, openPOs: 18, lowStockItems: 7 }),
      });
      const json = await response.json();
      if (json?.success) {
        setMessage(`${form.name || "SCM report"} created.`);
        setForm(emptyForm);
        await loadReports();
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(report: ScmReport, status: string) {
    await fetch(`/api/scm/reports/${report.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setMessage(`${valueOf(report, "name", "Report")} moved to ${status}.`);
    await loadReports();
  }

  async function deleteReport(report: ScmReport) {
    await fetch(`/api/scm/reports/${report.id}`, { method: "DELETE" });
    setMessage(`${valueOf(report, "name", "Report")} deleted.`);
    await loadReports();
  }

  function downloadPdf(report: ScmReport) {
    const blob = new Blob([reportHtml(report)], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(url), 15000);
    setMessage("SCM PDF preview opened. Choose Save as PDF in the print dialog.");
  }

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">Supply Chain & Inventory</p>
          <h1 className="mt-3 flex items-center gap-3 text-4xl font-bold text-white">
            <FileText className="h-9 w-9 text-cyan-300" />
            SCM reports
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-300">Create inventory, vendor, purchase order, and warehouse performance reports with realistic PDF exports.</p>
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
        <h2 className="text-2xl font-bold text-white">Create SCM report</h2>
        <p className="mt-2 text-slate-300">Generate an operational report and export it as a realistic PDF.</p>
        <div className="mt-7 grid gap-5 lg:grid-cols-[1.2fr_1fr_1fr_1fr_auto]">
          <label className="space-y-2">
            <span className="font-semibold text-white">Report name</span>
            <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="Inventory Health Report" className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300" />
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
            <input value={form.owner} onChange={(event) => setForm((current) => ({ ...current, owner: event.target.value }))} placeholder="SCM CoE" className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300" />
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
        <p className="mt-2 text-slate-300">Live SCM report records from the backend API.</p>
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
                  <td className="px-4 py-5"><div className="font-semibold">{valueOf(report, "name", "SCM report")}</div><div className="text-sm text-slate-400">{report.id}</div></td>
                  <td className="px-4 py-5">{valueOf(report, "type", "Inventory Position")}</td>
                  <td className="px-4 py-5">{valueOf(report, "period", "June 2026")}</td>
                  <td className="px-4 py-5">{valueOf(report, "owner", "SCM CoE")}</td>
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
