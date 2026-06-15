"use client";

import { Download, FileSpreadsheet, FileText, RefreshCw, ShieldCheck } from "lucide-react";

const exports = [
  {
    id: "BI-EXP-1",
    report: "Executive ERP Performance",
    format: "PDF",
    owner: "Analytics CoE",
    period: "June 2026",
    generatedAt: "2026-06-08 10:00",
    status: "Generated",
    pages: 18,
  },
  {
    id: "BI-EXP-2",
    report: "Cross Module Variance",
    format: "Excel",
    owner: "Finance BI",
    period: "June 2026",
    generatedAt: "2026-06-08 10:02",
    status: "Generated",
    pages: 6,
  },
];

function downloadPdf(row: (typeof exports)[number]) {
  const html = `
    <html>
      <head>
        <title>${row.report}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; color: #111827; }
          .header { border-bottom: 4px solid #7C3AED; padding-bottom: 16px; margin-bottom: 24px; }
          h1 { margin: 0; font-size: 28px; }
          .meta { color: #475569; margin-top: 8px; }
          table { width: 100%; border-collapse: collapse; margin-top: 24px; }
          th { background: #111827; color: white; text-align: left; padding: 12px; }
          td { border: 1px solid #CBD5E1; padding: 12px; }
          .section { margin-top: 24px; padding: 16px; border: 1px solid #CBD5E1; }
          .badge { display: inline-block; padding: 6px 10px; background: #DCFCE7; color: #166534; border-radius: 999px; font-weight: 700; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${row.report}</h1>
          <div class="meta">Infinity Cloud ERP | ${row.period} | Owner: ${row.owner}</div>
        </div>
        <span class="badge">${row.status}</span>
        <div class="section">
          <strong>Executive Summary</strong>
          <p>This board-ready analytics export consolidates Finance, HR, Payroll, SCM, and Projects performance into a single enterprise view.</p>
        </div>
        <table>
          <thead>
            <tr><th>KPI</th><th>Value</th><th>Trend</th><th>Risk</th></tr>
          </thead>
          <tbody>
            <tr><td>Revenue</td><td>$48.2M</td><td>+12.4%</td><td>Low</td></tr>
            <tr><td>Operating Margin</td><td>28.6%</td><td>+2.1%</td><td>Low</td></tr>
            <tr><td>Workforce Cost</td><td>$6.24M</td><td>-1.8%</td><td>Moderate</td></tr>
            <tr><td>Inventory Health</td><td>94%</td><td>+4.0%</td><td>Low</td></tr>
          </tbody>
        </table>
      </body>
    </html>
  `;
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

function downloadExcel(row: (typeof exports)[number]) {
  const csv = [
    ["Report", "Owner", "Period", "Status", "KPI", "Value", "Trend", "Risk"],
    [row.report, row.owner, row.period, row.status, "Revenue", "$48.2M", "+12.4%", "Low"],
    [row.report, row.owner, row.period, row.status, "Operating Margin", "28.6%", "+2.1%", "Low"],
    [row.report, row.owner, row.period, row.status, "Workforce Cost", "$6.24M", "-1.8%", "Moderate"],
    [row.report, row.owner, row.period, row.status, "Inventory Health", "94%", "+4.0%", "Low"],
  ]
    .map((line) => line.map((cell) => `"${cell}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${row.report.replace(/\s+/g, "-").toLowerCase()}-export.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function AnalyticsExportPage() {
  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center gap-3">
          <Download className="h-8 w-8 text-cyan-300" />
          <h1 className="text-4xl font-semibold tracking-tight text-white">Analytics export center</h1>
        </div>
        <p className="mt-3 max-w-3xl text-lg text-slate-300">
          Generate board-ready PDF packs and spreadsheet extracts from cross-module ERP analytics.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Exports generated", "128", "+18 this month"],
          ["Certified datasets", "42", "Finance, HR, SCM"],
          ["Average generation", "22s", "Last 30 days"],
        ].map(([label, value, note]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-300">{label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
            <p className="mt-2 text-cyan-300">{note}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">Generated exports</h2>
            <p className="mt-1 text-slate-300">Clean executive-ready output with audit-safe metadata.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 font-semibold text-white">
            <RefreshCw className="h-5 w-5" />
            Refresh exports
          </button>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="text-sm uppercase tracking-[0.28em] text-cyan-300">
              <tr>
                <th className="px-4 py-3">Report</th>
                <th className="px-4 py-3">Format</th>
                <th className="px-4 py-3">Period</th>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3">Generated</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {exports.map((row) => (
                <tr key={row.id} className="text-slate-100">
                  <td className="px-4 py-5">
                    <div className="font-semibold">{row.report}</div>
                    <div className="text-sm text-slate-400">{row.pages} pages / sheets</div>
                  </td>
                  <td className="px-4 py-5">
                    <span className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-3 py-1 text-sm font-semibold text-cyan-200">
                      {row.format === "PDF" ? <FileText className="h-4 w-4" /> : <FileSpreadsheet className="h-4 w-4" />}
                      {row.format}
                    </span>
                  </td>
                  <td className="px-4 py-5">{row.period}</td>
                  <td className="px-4 py-5">{row.owner}</td>
                  <td className="px-4 py-5">{row.generatedAt}</td>
                  <td className="px-4 py-5">
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-sm font-semibold text-emerald-200">
                      <ShieldCheck className="h-4 w-4" />
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap">
                    <div className="flex min-w-[160px] items-center gap-2">
                      <button
                        onClick={() => downloadPdf(row)}
                        className="rounded-lg bg-gradient-to-r from-violet-500 to-pink-500 px-4 py-2 font-semibold text-white"
                      >
                        PDF
                      </button>
                      <button
                        onClick={() => downloadExcel(row)}
                        className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 font-semibold text-white"
                      >
                        Excel
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
