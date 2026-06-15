"use client";

import { useEffect, useMemo, useState } from "react";
import { BrainCircuit, CheckCircle2, Download, FileText, RefreshCw, Send, Trash2 } from "lucide-react";

type ForecastReport = {
  id: string;
  name?: string;
  type?: string;
  period?: string;
  owner?: string;
  status?: string;
  model?: string;
  accuracy?: number;
  forecastDemand?: number;
  confidence?: number;
  createdAt?: string;
  updatedAt?: string;
};

const emptyForm = {
  name: "",
  type: "Demand Forecast",
  period: "",
  owner: "",
  model: "LSTM",
};

const reportTypes = ["Demand Forecast", "Forecast Accuracy", "SKU Comparison", "Inventory Forecast", "Model Monitoring"];
const models = ["LSTM", "Prophet", "Ensemble", "XGBoost"];

function valueOf(report: ForecastReport, key: keyof ForecastReport, fallback = "Not set") {
  const value = report[key];
  return value === undefined || value === null || value === "" ? fallback : String(value);
}

function reportHtml(report: ForecastReport) {
  const name = valueOf(report, "name", "AI Demand Forecast Report");
  const type = valueOf(report, "type", "Demand Forecast");
  const period = valueOf(report, "period", "July 2026");
  const owner = valueOf(report, "owner", "AI Forecast CoE");
  const status = valueOf(report, "status", "Ready");
  const model = valueOf(report, "model", "LSTM");
  const accuracy = Number(report.accuracy ?? 92);
  const demand = Number(report.forecastDemand ?? 1240);
  const confidence = Number(report.confidence ?? 91);

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
    .badge { align-self: start; border: 1px solid #ddd6fe; border-radius: 999px; background: #f5f3ff; color: #6d28d9; padding: 8px 14px; font-weight: 700; font-size: 12px; }
    .metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 26px 0; }
    .metric { border: 1px solid #dbe7f5; border-radius: 14px; background: #f8fbff; padding: 14px; }
    .metric span { display: block; color: #64748b; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; }
    .metric strong { display: block; color: #0f172a; font-size: 21px; margin-top: 8px; }
    .section { margin-top: 26px; }
    .section h2 { margin: 0 0 12px; font-size: 17px; color: #0f172a; }
    table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
    th { background: #0f172a; color: #fff; text-align: left; padding: 11px; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; }
    td { border: 1px solid #e2e8f0; padding: 11px; }
    .note { margin-top: 14px; border-left: 4px solid #8b5cf6; background: #f5f3ff; color: #5b21b6; padding: 13px 15px; line-height: 1.55; }
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
        <div class="brand">Northstar Manufacturing · AI Demand Forecasting</div>
        <h1>${name}</h1>
        <p class="muted">AI-generated demand forecasting report for inventory planning, reorder strategy, model monitoring, and executive supply chain review.</p>
      </div>
      <div class="badge">${status}</div>
    </section>
    <section class="metrics">
      <div class="metric"><span>Report Type</span><strong>${type}</strong></div>
      <div class="metric"><span>Period</span><strong>${period}</strong></div>
      <div class="metric"><span>AI Model</span><strong>${model}</strong></div>
      <div class="metric"><span>Accuracy</span><strong>${accuracy}%</strong></div>
    </section>
    <section class="section">
      <h2>Forecast Executive Summary</h2>
      <table>
        <thead><tr><th>Forecast Area</th><th>Current Signal</th><th>AI Forecast</th><th>Confidence</th><th>Decision Guidance</th></tr></thead>
        <tbody>
          <tr><td>Industrial Battery Pack</td><td>420 units demand</td><td>${demand} units</td><td>${confidence}%</td><td>Increase safety stock and secure vendor capacity.</td></tr>
          <tr><td>AI Edge Controller</td><td>APAC demand spike</td><td>780 units</td><td>87%</td><td>Prioritize Bengaluru DC replenishment.</td></tr>
          <tr><td>Plant Network Router</td><td>Stockout risk</td><td>360 units</td><td>84%</td><td>Trigger emergency procurement review.</td></tr>
          <tr><td>Seasonal variance</td><td>Above baseline</td><td>+14.2%</td><td>89%</td><td>Monitor weekly model drift.</td></tr>
        </tbody>
      </table>
    </section>
    <section class="section">
      <h2>Model Monitoring and Risk Controls</h2>
      <table>
        <thead><tr><th>Control</th><th>Value</th><th>Status</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>Forecast accuracy</td><td>${accuracy}%</td><td>Healthy</td><td>Above enterprise model threshold.</td></tr>
          <tr><td>Model drift</td><td>2.8%</td><td>Controlled</td><td>No retraining required this cycle.</td></tr>
          <tr><td>Data freshness</td><td>Daily ERP sync</td><td>Healthy</td><td>Inventory and sales history are current.</td></tr>
          <tr><td>Recommendation priority</td><td>High</td><td>Open</td><td>Safety stock adjustment pending SCM approval.</td></tr>
        </tbody>
      </table>
      <p class="note">AI recommendation: Increase safety stock for high-confidence demand spikes while monitoring model drift weekly. Reorder recommendations should be reviewed with SCM before purchase order release.</p>
    </section>
    <div class="signatures">
      <div class="signature"><strong>${owner}</strong><br />Prepared by</div>
      <div class="signature"><strong>Supply Chain Analytics Lead</strong><br />Reviewed by</div>
    </div>
    <div class="footer"><span>Confidential AI forecast report · Tenant scoped</span><span>Report ID: ${valueOf(report, "id", "FOR-RPT-DRAFT")}</span></div>
  </main>
  <script>window.onload = () => setTimeout(() => window.print(), 250);</script>
</body>
</html>`;
}

export default function ForecastReportsPage() {
  const [reports, setReports] = useState<ForecastReport[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Forecast reports are connected to /api/forecast/reports.");

  const summary = useMemo(() => {
    const ready = reports.filter((report) => ["Ready", "Published", "Approved"].includes(valueOf(report, "status", ""))).length;
    return [
      { label: "Reports", value: reports.length, note: "AI report records" },
      { label: "Ready", value: ready, note: "Executive ready" },
      { label: "Model accuracy", value: "92%", note: "LSTM baseline" },
      { label: "Demand signal", value: "+14.2%", note: "APAC spike" },
    ];
  }, [reports]);

  async function loadReports() {
    setLoading(true);
    try {
      const response = await fetch("/api/forecast/reports", { cache: "no-store" });
      const json = await response.json();
      setReports(json?.data?.data ?? []);
      setMessage("Latest forecast reports loaded from the backend.");
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
      const response = await fetch("/api/forecast/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status: "Draft", accuracy: 92, forecastDemand: 1240, confidence: 91 }),
      });
      const json = await response.json();
      if (json?.success) {
        setMessage(`${form.name || "Forecast report"} created.`);
        setForm(emptyForm);
        await loadReports();
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(report: ForecastReport, status: string) {
    await fetch(`/api/forecast/reports/${report.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setMessage(`${valueOf(report, "name", "Report")} moved to ${status}.`);
    await loadReports();
  }

  async function deleteReport(report: ForecastReport) {
    await fetch(`/api/forecast/reports/${report.id}`, { method: "DELETE" });
    setMessage(`${valueOf(report, "name", "Report")} deleted.`);
    await loadReports();
  }

  function downloadPdf(report: ForecastReport) {
    const blob = new Blob([reportHtml(report)], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(url), 15000);
    setMessage("Forecast PDF preview opened. Choose Save as PDF in the print dialog.");
  }

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">AI Demand Forecasting</p>
          <h1 className="mt-3 flex items-center gap-3 text-4xl font-bold text-white">
            <BrainCircuit className="h-9 w-9 text-cyan-300" />
            Forecast reports
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-300">Create executive AI forecasting reports for SKU demand, model health, recommendations, and inventory planning.</p>
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
        <h2 className="text-2xl font-bold text-white">Create forecast report</h2>
        <p className="mt-2 text-slate-300">Generate an AI forecast report and export it as a realistic PDF.</p>
        <div className="mt-7 grid gap-5 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr_auto]">
          <label className="space-y-2">
            <span className="font-semibold text-white">Report name</span>
            <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="AI Demand Forecast Report" className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300" />
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-white">Type</span>
            <select value={form.type} onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))} className="h-14 w-full rounded-xl border border-white/10 bg-slate-900 px-5 text-white outline-none focus:border-cyan-300 [&>option]:bg-slate-950 [&>option]:text-white">
              {reportTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-white">Model</span>
            <select value={form.model} onChange={(event) => setForm((current) => ({ ...current, model: event.target.value }))} className="h-14 w-full rounded-xl border border-white/10 bg-slate-900 px-5 text-white outline-none focus:border-cyan-300 [&>option]:bg-slate-950 [&>option]:text-white">
              {models.map((model) => <option key={model}>{model}</option>)}
            </select>
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-white">Period</span>
            <input value={form.period} onChange={(event) => setForm((current) => ({ ...current, period: event.target.value }))} placeholder="July 2026" className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300" />
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-white">Owner</span>
            <input value={form.owner} onChange={(event) => setForm((current) => ({ ...current, owner: event.target.value }))} placeholder="AI Forecast CoE" className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300" />
          </label>
          <button onClick={createReport} disabled={loading} className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 px-8 font-bold text-white shadow-[0_0_35px_rgba(236,72,153,0.35)] transition hover:scale-[1.02] disabled:opacity-60">
            <Send className="h-5 w-5" />
            Create
          </button>
        </div>
        <p className="mt-5 rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-100">{message}</p>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_0_70px_rgba(124,58,237,0.14)] backdrop-blur-xl">
        <h2 className="flex items-center gap-3 text-2xl font-bold text-white"><FileText className="h-6 w-6 text-cyan-300" />Report library</h2>
        <p className="mt-2 text-slate-300">Live forecast report records from the backend API.</p>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[1120px] text-left">
            <thead>
              <tr className="border-b border-white/10 text-sm uppercase tracking-[0.28em] text-cyan-300">
                <th className="px-4 py-4">Report</th>
                <th className="px-4 py-4">Type</th>
                <th className="px-4 py-4">Model</th>
                <th className="px-4 py-4">Period</th>
                <th className="px-4 py-4">Owner</th>
                <th className="px-4 py-4">Status</th>
                <th className="w-[360px] px-4 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-white/10 text-white even:bg-white/[0.03]">
                  <td className="px-4 py-5"><div className="font-semibold">{valueOf(report, "name", "Forecast report")}</div><div className="text-sm text-slate-400">{report.id}</div></td>
                  <td className="px-4 py-5">{valueOf(report, "type", "Demand Forecast")}</td>
                  <td className="px-4 py-5">{valueOf(report, "model", "LSTM")}</td>
                  <td className="px-4 py-5">{valueOf(report, "period", "July 2026")}</td>
                  <td className="px-4 py-5">{valueOf(report, "owner", "AI Forecast CoE")}</td>
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
