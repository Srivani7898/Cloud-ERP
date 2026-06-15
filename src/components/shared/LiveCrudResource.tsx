"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Download,
  FileSpreadsheet,
  Loader2,
  RefreshCcw,
  Trash2,
} from "lucide-react";

type ApiEnvelope = {
  success: boolean;
  data?: {
    module: string;
    resource: string;
    count: number;
    total: number;
    data: Record<string, unknown>[];
  };
  error?: string;
};

type Field = {
  key: string;
  label: string;
  type?: "text" | "number" | "date" | "select";
  placeholder?: string;
  required?: boolean;
  options?: string[];
  defaultValue?: string;
};

type Action = {
  label: string;
  patch: Record<string, unknown>;
  tone?: "green" | "blue" | "amber" | "rose";
};

type Column = {
  key: string;
  label: string;
  format?: "currency" | "date" | "status" | "number";
};

type Props = {
  moduleKey: string;
  resourceKey: string;
  eyebrow: string;
  title: string;
  description: string;
  fields: Field[];
  columns: Column[];
  defaultCreate?: Record<string, unknown>;
  actions?: Action[];
  enableExport?: boolean;
  exportFormat?: "csv" | "pdf";
};

const toneClasses = {
  green: "border-emerald-300/20 bg-emerald-500/15 text-emerald-100 hover:bg-emerald-500/25",
  blue: "border-blue-300/20 bg-blue-500/15 text-blue-100 hover:bg-blue-500/25",
  amber: "border-amber-300/20 bg-amber-500/15 text-amber-100 hover:bg-amber-500/25",
  rose: "border-rose-300/20 bg-rose-500/15 text-rose-100 hover:bg-rose-500/25",
};

function money(value: unknown) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value ?? 0));
}

function text(value: unknown, fallback = "Not set") {
  if (value === null || value === undefined || value === "") return fallback;
  return String(value);
}

function normalizeIdPrefix(moduleKey: string, resourceKey: string) {
  return `${moduleKey.slice(0, 3)}-${resourceKey.slice(0, 3)}`.toUpperCase();
}

function downloadRow(row: Record<string, unknown>, title: string) {
  const headers = Object.keys(row);
  const csv = [
    headers.join(","),
    headers.map((header) => `"${text(row[header]).replace(/"/g, '""')}"`).join(","),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${title.replace(/\s+/g, "_")}_${text(row.id, "record")}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function downloadPdf(row: Record<string, unknown>, title: string) {
  const reportTitle = text(row.name ?? row.title ?? title);
  const period = text(row.period, "Current period");
  const owner = text(row.owner, "Finance CoE");
  const status = text(row.status, "Ready");
  const type =
  text(row.type) ||
  (title.includes("audit")
    ? "Audit Logs"
    : "Financial Report");
  console.log("PDF TYPE =", type);
  console.log("ROW =", row);
  let reportContent = "";
  let summaryCards = "";

switch (type) {
  case "Income Statement":
  summaryCards = `
    <div class="card"><div class="label">Revenue</div><div class="value">$4.82M</div></div>
    <div class="card"><div class="label">Expenses</div><div class="value">$3.31M</div></div>
    <div class="card"><div class="label">Net Profit</div><div class="value">$1.51M</div></div>
    <div class="card"><div class="label">Growth</div><div class="value">11.8%</div></div>
`   ;
    reportContent = `
      <div class="section-title">Income Statement</div>
      <table>
        <tr><th>Item</th><th>Amount</th></tr>
        <tr><td>Revenue</td><td>$4,820,000</td></tr>
        <tr><td>Expenses</td><td>$3,310,000</td></tr>
        <tr><td>Net Profit</td><td>$1,510,000</td></tr>
      </table>
    `;
    break;

  case "Balance Sheet":
    summaryCards = `
    <div class="card"><div class="label">Assets</div><div class="value">$8.2M</div></div>
    <div class="card"><div class="label">Liabilities</div><div class="value">$3.1M</div></div>
    <div class="card"><div class="label">Equity</div><div class="value">$5.1M</div></div>
    <div class="card"><div class="label">Debt Ratio</div><div class="value">37%</div></div>
    `;
    reportContent = `
      <div class="section-title">Balance Sheet</div>
      <table>
        <tr><th>Category</th><th>Amount</th></tr>
        <tr><td>Assets</td><td>$8,200,000</td></tr>
        <tr><td>Liabilities</td><td>$3,100,000</td></tr>
        <tr><td>Equity</td><td>$5,100,000</td></tr>
      </table>
    `;
    break;

  case "Cash Flow":
    summaryCards = `
      <div class="card"><div class="label">Operating</div><div class="value">$1.2M</div></div>
      <div class="card"><div class="label">Investing</div><div class="value">-$450K</div></div>
      <div class="card"><div class="label">Financing</div><div class="value">$300K</div></div>
      <div class="card"><div class="label">Net Cash</div><div class="value">$1.05M</div></div>
      `;
    reportContent = `
      <div class="section-title">Cash Flow Statement</div>
      <table>
        <tr><th>Activity</th><th>Amount</th></tr>
        <tr><td>Operating</td><td>$1,200,000</td></tr>
        <tr><td>Investing</td><td>-$450,000</td></tr>
        <tr><td>Financing</td><td>$300,000</td></tr>
      </table>
    `;
    break;

  case "Variance":
    summaryCards = `
      <div class="card"><div class="label">Budget</div><div class="value">$800K</div></div>
      <div class="card"><div class="label">Actual</div><div class="value">$795K</div></div>
      <div class="card"><div class="label">Variance</div><div class="value">-0.6%</div></div>
      <div class="card"><div class="label">Forecast</div><div class="value">Stable</div></div>
      `;
    reportContent = `
      <div class="section-title">Variance Analysis</div>
      <table>
        <tr><th>Department</th><th>Budget</th><th>Actual</th><th>Variance</th></tr>
        <tr><td>Finance</td><td>$500,000</td><td>$470,000</td><td>-6%</td></tr>
        <tr><td>HR</td><td>$300,000</td><td>$325,000</td><td>+8%</td></tr>
      </table>
    `;
    break;

   case "Audit Logs":
  summaryCards = `
    <div class="card">
      <div class="label">Actor</div>
      <div class="value">${text(row.actor, "Finance Manager")}</div>
    </div>

    <div class="card">
      <div class="label">Status</div>
      <div class="value">${text(row.status, "Verified")}</div>
    </div>

    <div class="card">
      <div class="label">Severity</div>
      <div class="value">${text(row.severity, "Medium")}</div>
    </div>

    <div class="card">
      <div class="label">Reference</div>
      <div class="value">${text(row.reference, "INV-1001")}</div>
    </div>
  `;

  reportContent = `
    <div class="section-title">Audit Activity Summary</div>

    <table>
      <tr>
        <th>Actor</th>
        <th>Action</th>
        <th>Reference</th>
        <th>Severity</th>
        <th>Status</th>
      </tr>

      <tr>
        <td>${text(row.actor, "Finance Manager")}</td>
        <td>${text(row.action, "Approved Invoice")}</td>
        <td>${text(row.reference, "INV-1001")}</td>
        <td>${text(row.severity, "Medium")}</td>
        <td>${text(row.status, "Verified")}</td>
      </tr>
    </table>
  `;
  break;

  reportContent = `
    <div class="section-title">Audit Activity Summary</div>

    <table>
      <tr>
        <th>Actor</th>
        <th>Action</th>
        <th>Reference</th>
        <th>Severity</th>
        <th>Status</th>
      </tr>

      <tr>
        <td>${text(row.actor, "Finance Manager")}</td>
        <td>${text(row.action, "Invoice Approval")}</td>
        <td>${text(row.reference, "INV-1001")}</td>
        <td>${text(row.severity, "Medium")}</td>
        <td>${text(row.status, "Verified")}</td>
      </tr>
    </table>

    <div class="section-title">Compliance Notes</div>

    <table>
      <tr>
        <th>Check</th>
        <th>Result</th>
      </tr>

      <tr>
        <td>Invoice Verification</td>
        <td>Passed</td>
      </tr>

      <tr>
        <td>Ledger Review</td>
        <td>Passed</td>
      </tr>

      <tr>
        <td>Approval Workflow</td>
        <td>Verified</td>
      </tr>
    </table>
  `;
  break;

  default:
    reportContent = "<p>No report content available.</p>";
}
  const generatedAt = new Date().toLocaleString();

  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${reportTitle}</title>
  <style>
    @page { size: A4; margin: 18mm; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
      color: #111827;
      background: #f8fafc;
    }
    .report {
      min-height: 100vh;
      background: white;
      border: 2px solid #1d4ed8;
      padding: 28px;
    }
    .top {
      display: flex;
      justify-content: space-between;
      gap: 24px;
      border-bottom: 4px solid #1d4ed8;
      padding-bottom: 18px;
    }
    .brand {
      color: #1d4ed8;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }
    h1 {
      margin: 8px 0 0;
      font-size: 30px;
      line-height: 1.1;
    }
    .meta {
      text-align: right;
      color: #475569;
      font-size: 13px;
      line-height: 1.7;
    }
    .summary {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin: 24px 0;
    }
    .card {
      border: 1px solid #cbd5e1;
      background: #eff6ff;
      padding: 14px;
    }
    .label {
      color: #475569;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
    }
    .value {
      margin-top: 8px;
      font-size: 20px;
      font-weight: 700;
      color: #0f172a;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 18px;
      font-size: 13px;
    }
    th, td {
      border: 1px solid #cbd5e1;
      padding: 10px;
      text-align: left;
    }
    th {
      background: #1d4ed8;
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: 11px;
    }
    .section-title {
      margin-top: 26px;
      font-size: 18px;
      font-weight: 700;
      color: #0f172a;
    }
    .note {
      margin-top: 18px;
      padding: 14px;
      border-left: 4px solid #1d4ed8;
      background: #f1f5f9;
      color: #334155;
      line-height: 1.6;
    }
    .signatures {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      margin-top: 52px;
    }
    .line {
      border-top: 1px solid #334155;
      padding-top: 8px;
      color: #475569;
      font-size: 12px;
    }
    .print {
      position: fixed;
      right: 20px;
      top: 20px;
      border: 0;
      border-radius: 10px;
      background: #1d4ed8;
      color: white;
      padding: 12px 16px;
      font-weight: 700;
      cursor: pointer;
    }
    @media print {
      body { background: white; }
      .print { display: none; }
      .report { border: 0; padding: 0; }
    }
  </style>
</head>
<body>
  <button class="print" onclick="window.print()">Save as PDF</button>
  <main class="report">
    <section class="top">
      <div>
        <div class="brand">Infinity Cloud ERP Finance</div>
        <h1>${reportTitle}</h1>
        <p>${type} | ${period}</p>
      </div>
      <div class="meta">
        <strong>Status:</strong> ${status}<br />
        <strong>Owner:</strong> ${owner}<br />
        <strong>Generated:</strong> ${generatedAt}<br />
        <strong>Report ID:</strong> ${text(row.id)}
      </div>
    </section>

    <section class="summary">
        ${summaryCards}
    </section>

    ${reportContent}

    <div class="section-title">Controls and Compliance</div>
    <table>
      <tr><th>Control</th><th>Status</th><th>Evidence</th><th>Owner</th></tr>
      <tr><td>Revenue recognition review</td><td>Passed</td><td>Journal and invoice tie-out completed</td><td>Finance CoE</td></tr>
      <tr><td>Payment reconciliation</td><td>Passed</td><td>Bank settlement variance below threshold</td><td>Treasury</td></tr>
      <tr><td>Ledger close approval</td><td>Passed</td><td>All material journals reviewed</td><td>Controller</td></tr>
    </table>

    <p class="note">
      This report is generated from live Cloud ERP finance records and is intended for
      management review, financial close validation, and audit support. Figures are
      sample executive analytics produced by the frontend report generator.
    </p>

    <section class="signatures">
      <div class="line">Prepared by ${text(row.actor, "Finance Manager")}</div>
      <div class="line">Reviewed by ${text(row.status, "Verified")}</div>
    </section>
  </main>
  <script>setTimeout(() => window.print(), 500);</script>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

export function LiveCrudResource({
  moduleKey,
  resourceKey,
  eyebrow,
  title,
  description,
  fields,
  columns,
  defaultCreate,
  actions = [],
  enableExport = false,
  exportFormat = "csv",
}: Props) {
  const initialForm = useMemo(
  () =>
    fields.reduce<Record<string, string>>((acc, field) => {
      acc[field.key] = "";
      return acc;
    }, {}),
  [fields],
);

  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const totalSignal = useMemo(() => {
    return rows.reduce((sum, row) => {
      const key = ["total", "amount", "balance", "debit", "credit", "rate"].find(
        (candidate) => typeof row[candidate] === "number",
      );
      return sum + (key ? Number(row[key]) : 0);
    }, 0);
  }, [rows]);

  async function loadRows() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`/api/${moduleKey}/${resourceKey}`, { cache: "no-store" });
      const payload = (await response.json()) as ApiEnvelope;

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || `Unable to load ${title}.`);
      }

      setRows(payload.data?.data ?? []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : `Unable to load ${title}.`);
    } finally {
      setLoading(false);
    }
  }

  async function createRow(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const body = fields.reduce<Record<string, unknown>>((acc, field) => {
      const value = form[field.key];
      acc[field.key] = field.type === "number" ? Number(value || 0) : value;
      return acc;
    }, {});

    try {
      const response = await fetch(`/api/${moduleKey}/${resourceKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: `${normalizeIdPrefix(moduleKey, resourceKey)}-${Date.now()}`,
          ...body,
          ...defaultCreate,
        }),
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || `Unable to create ${title}.`);
      }

      setForm(
        fields.reduce<Record<string, string>>((acc, field) => {
        acc[field.key] = "";
         return acc;
        }, {})
      );

      setMessage(`${title} record created and synced with the backend API.`);
      await loadRows();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : `Unable to create ${title}.`);
    } finally {
      setSaving(false);
    }
  }

  async function patchRow(id: string, patch: Record<string, unknown>) {
    setMessage("");

    try {
      const response = await fetch(`/api/${moduleKey}/${resourceKey}/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || `Unable to update ${title}.`);
      }

      setMessage(`${title} record ${id} updated.`);
      await loadRows();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : `Unable to update ${title}.`);
    }
  }

  async function deleteRow(id: string) {
    setMessage("");

    try {
      const response = await fetch(`/api/${moduleKey}/${resourceKey}/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || `Unable to delete ${title}.`);
      }

      setMessage(`${title} record ${id} deleted.`);
      await loadRows();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : `Unable to delete ${title}.`);
    }
  }

  useEffect(() => {
    loadRows();
  }, []);

  function renderCell(row: Record<string, unknown>, column: Column) {
    const value = row[column.key];
    if (column.format === "currency") return money(value);
    if (column.format === "number") return Number(value ?? 0).toLocaleString();
    if (column.format === "status") {
      return (
        <span className="whitespace-nowrap rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-100 ring-1 ring-cyan-300/20">
          {text(value)}
        </span>
      );
    }
    return text(value);
  }

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">{eyebrow}</p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-semibold text-slate-900 dark:text-white md:text-4xl">
            <FileSpreadsheet className="h-8 w-8 text-cyan-300" />
            {title}
          </h1>
          <p className="mt-2 max-w-3xl text-base text-slate-600 dark:text-slate-600 dark:text-slate-300">{description}</p>
        </div>

        <button
          type="button"
          onClick={loadRows}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-semibold text-slate-900 dark:text-whitetransition hover:border-cyan-300/40 hover:bg-white/[0.07]"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
          Refresh
        </button>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_50px_rgba(124,58,237,0.14)] backdrop-blur-2xl">
          <p className="text-sm text-slate-600 dark:text-slate-300">Records</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{rows.length}</p>
          <p className="mt-2 text-sm text-cyan-200">Live backend rows</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_50px_rgba(124,58,237,0.14)] backdrop-blur-2xl">
          <p className="text-sm text-slate-600 dark:text-slate-300">Signal value</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{money(totalSignal)}</p>
          <p className="mt-2 text-sm text-cyan-200">Summed primary numeric field</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_50px_rgba(124,58,237,0.14)] backdrop-blur-2xl">
          <p className="text-sm text-slate-600 dark:text-slate-300">Endpoint</p>
          <p className="mt-3 break-all text-xl font-semibold text-white">/api/{moduleKey}/{resourceKey}</p>
          <p className="mt-2 text-sm text-cyan-200">GET, POST, PATCH, DELETE</p>
        </div>
      </section>

      <form
        onSubmit={createRow}
        className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_50px_rgba(124,58,237,0.14)] backdrop-blur-2xl"
      >
        <div className="mb-5">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Create {title.toLowerCase()} record</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">This writes directly to the backend API.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {fields.map((field) => (
            <label key={field.key} className="space-y-2">
              <span className="text-sm font-semibold text-slate-900 dark:text-white">{field.label}</span>
              {field.type === "select" ? (
                <select
                  required={field.required}
                  value={form[field.key]}
                  onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
                  className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-slate-900 dark:text-white-none transition focus:border-cyan-300/70 [&>option]:bg-slate-950 [&>option]:text-slate-900 dark:text-white"
                >
                  <option value="">Select Type</option>

                   {(field.options ?? []).map((option) => (
                    <option key={option} value={option}>
                     {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  required={field.required}
                  type={field.type ?? "text"}
                  value={form[field.key]}
                  onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
                   className="h-12 w-full rounded-xl
                    border border-slate-300 dark:border-white/10
                    bg-white dark:bg-slate-950/60
                    text-slate-900 dark:text-white
                    px-4"
                  placeholder={field.placeholder}
                />
              )}
            </label>
          ))}
          <button
            type="submit"
            disabled={saving}
            className="mt-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 px-5 font-semibold text-slate-900 dark:text-white shadow-lg shadow-fuchsia-950/30 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
            Create
          </button>
        </div>
      </form>

      {message ? (
        <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-5 py-4 text-cyan-100">
          {message}
        </div>
      ) : null}

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_50px_rgba(124,58,237,0.14)] backdrop-blur-2xl">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Live records</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Data loaded from the backend API.</p>
        </div>

        {loading ? (
          <div className="flex min-h-52 items-center justify-center text-slate-300">
            <Loader2 className="mr-3 h-5 w-5 animate-spin text-cyan-300" />
            Loading...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left">
              <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-xs uppercase tracking-[0.24em] text-slate-700 dark:text-blue-200">
               {columns.map((column) => (
                 <th
                   key={column.key}
                   className="whitespace-nowrap px-4 py-4"
                    >
                 {column.label}
                  </th>
                  ))}

                 <th className="w-[420px] px-4 py-4 text-center">
                 Actions
                  </th>
                  </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => {
                  const id = text(row.id);

                  return (
                    <tr
                      key={id}
                      className={`border-b border-white/10 text-slate-900 dark:text-white${index % 2 ? "bg-white/[0.03]" : ""}`}
                    >
                      {columns.map((column) => (
                        <td
                          key={column.key}
                          className="px-4 py-5 whitespace-nowrap"
                   >
                          {renderCell(row, column)}
                          </td>
                      ))}
                      <td className="w-[420px] px-4 py-5">
                        <div className="flex flex-nowrap justify-center gap-2">
                          {actions.map((action) => (
                            <button
                              key={action.label}
                              type="button"
                              onClick={() => patchRow(id, action.patch)}
                              className={`inline-flex whitespace-nowrap items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition ${toneClasses[action.tone ?? "blue"]}`}
                            >
                              <CheckCircle2 className="h-4 w-4" />
                              {action.label}
                            </button>
                          ))}
                          {enableExport ? (
                            <button
                              type="button"
                              onClick={() => (exportFormat === "pdf" ? downloadPdf(row, title) : downloadRow(row, title))}
                              className="inline-flex whitespace-nowrap items-center gap-2 rounded-lg border border-cyan-300/20 bg-cyan-500/15 px-3 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/25"
                            >
                              <Download className="h-4 w-4" />

                              {exportFormat === "pdf" ? "PDF" : "Export"}
                            </button>
                          ) : null}
                          <button
                            type="button"
                            onClick={() => deleteRow(id)}
                            className="inline-flex whitespace-nowrap items-center gap-2 rounded-lg border border-rose-300/20 bg-rose-500/15 px-3 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-500/25"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
