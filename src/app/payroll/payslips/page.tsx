"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useHrNotificationStore } from "@/store/notification-store";
import {
  BadgeDollarSign,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  Loader2,
  RefreshCcw,
  Trash2,
} from "lucide-react";

type ApiEnvelope<T> = {
  success: boolean;
  data?: {
    module: string;
    resource: string;
    count: number;
    total: number;
    data: T[];
  };
  error?: string;
};

type Payslip = {
  id: string;
  employee?: string;
  employeeId?: string;
  period?: string;
  month?: string;
  gross?: number;
  deductions?: number;
  net: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

const emptyPayslip = {
  employee: "",
  period: "",
  gross: "",
  deductions: "",
};

const statusStyles: Record<
  string,
  string
> = {
  "Pending Release":
    "bg-amber-500/15 text-amber-200 ring-amber-400/25",

  Generated:
    "bg-blue-500/15 text-blue-200 ring-blue-400/25",

  Released:
    "bg-emerald-500/15 text-emerald-200 ring-emerald-400/25",

  Draft:
    "bg-slate-500/15 text-slate-200 ring-slate-400/25",

  Hold:
    "bg-red-500/15 text-red-200 ring-red-400/25",
};

function money(value?: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value ?? 0);
}

function downloadPayslip(payslip: Payslip) {
  const employee = payslip.employee ?? payslip.employeeId ?? "Employee";
  const period = payslip.period ?? payslip.month ?? "Payroll Period";
  const gross = payslip.gross ?? payslip.net + (payslip.deductions ?? 0);
  const deductions = payslip.deductions ?? Math.max(gross - payslip.net, 0);

  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${employee} Payslip ${period}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 32px; color: #111827; }
    .slip { border: 2px solid #2563eb; max-width: 820px; margin: 0 auto; }
    .header { background: #2563eb; color: white; text-align: center; padding: 14px; }
    .section { padding: 18px 24px; border-top: 1px solid #9ca3af; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    th, td { border: 1px solid #9ca3af; padding: 10px; text-align: left; }
    th { background: #eaf1ff; }
    .net { font-size: 22px; font-weight: 700; color: #065f46; }
    .footer { padding: 14px 24px; font-size: 12px; color: #4b5563; }
  </style>
</head>
<body>
  <div class="slip">
    <div class="header">
      <h1>Salary Slip</h1>
      <p>Infinity Cloud ERP Payroll</p>
    </div>
    <div class="section">
      <table>
        <tr><th>Employee</th><td>${employee}</td><th>Period</th><td>${period}</td></tr>
        <tr><th>Payslip ID</th><td>${payslip.id}</td><th>Status</th><td>${payslip.status}</td></tr>
      </table>
    </div>
    <div class="section">
      <table>
        <tr><th>Earnings</th><th>Amount</th><th>Deductions</th><th>Amount</th></tr>
        <tr><td>Basic Salary</td><td>${money(gross * 0.55)}</td><td>Income Tax</td><td>${money(deductions * 0.6)}</td></tr>
        <tr><td>HRA</td><td>${money(gross * 0.25)}</td><td>Provident Fund</td><td>${money(deductions * 0.25)}</td></tr>
        <tr><td>Special Allowance</td><td>${money(gross * 0.2)}</td><td>Insurance</td><td>${money(deductions * 0.15)}</td></tr>
        <tr><th>Gross Pay</th><th>${money(gross)}</th><th>Total Deductions</th><th>${money(deductions)}</th></tr>
      </table>
    </div>
    <div class="section">
      <p class="net">Net Pay: ${money(payslip.net)}</p>
    </div>
    <div class="footer">
      This is a system generated payslip for payroll verification and employee records.
    </div>
  </div>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${employee.replace(/\s+/g, "_")}_${period}_Payslip.html`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function PayrollPayslipsPage() {
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const addNotification =
    useHrNotificationStore(
      (state) => state.addNotification
    );
  const [form, setForm] = useState(emptyPayslip);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const metrics = useMemo(() => {
    const totalNet = payslips.reduce((sum, payslip) => sum + (payslip.net ?? 0), 0);
    const released = payslips.filter((payslip) => payslip.status === "Released").length;
    const generated = payslips.filter((payslip) => payslip.status === "Generated").length;

    return { totalNet, released, generated, count: payslips.length };
  }, [payslips]);

  async function loadPayslips() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/payroll/payslips", { cache: "no-store" });
      const payload = (await response.json()) as ApiEnvelope<Payslip>;

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to load payslips.");
      }

      setPayslips(payload.data?.data ?? []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load payslips.");
    } finally {
      setLoading(false);
    }
  }

  async function createPayslip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const gross = Number(form.gross);
    const deductions = Number(form.deductions);

    try {
      const response = await fetch("/api/payroll/payslips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employee: form.employee.trim(),
          period: form.period.toUpperCase(),
          gross,
          deductions,
          net: gross - deductions,
          status: "Pending Release",
        }),
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to create payslip.");
      }

      setForm(emptyPayslip);
      setForm(emptyPayslip);

      const existingNotification =
        useHrNotificationStore
          .getState()
          .notifications.find(
            (item) =>
              item.employeeName === form.employee &&
              item.title === "Payslip Generated"
          );

      if (!existingNotification) {
        addNotification(
          form.employee,
          "Payslip Generated",
          `Your payslip for ${form.period} has been generated and is available for download.`,
          "Payroll"
        );
      }
      
      console.log(
        "NOTIFICATION CREATED:",
        form.employee
      );

      setMessage(
        "Payslip generated and synced with the payroll backend API."
      );

      await loadPayslips();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to create payslip.");
    } finally {
      setSaving(false);
    }
  }

  async function updatePayslip(id: string, patch: Partial<Payslip>) {
    setMessage("");

    try {
      const response = await fetch(`/api/payroll/payslips/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to update payslip.");
      }

      setMessage(`Payslip ${id} updated.`);
      await loadPayslips();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to update payslip.");
    }
  }

  async function deletePayslip(id: string) {
    setMessage("");

    try {
      const response = await fetch(`/api/payroll/payslips/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to delete payslip.");
      }

      setMessage(`Payslip ${id} deleted.`);
      await loadPayslips();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to delete payslip.");
    }
  }

  useEffect(() => {
    loadPayslips();
  }, []);

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
            Payroll Management
          </p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-semibold text-white md:text-4xl">
            <BadgeDollarSign className="h-8 w-8 text-cyan-300" />
            Payslip generation center
          </h1>
          <p className="mt-2 max-w-2xl text-base text-slate-300">
            Generate, release, download, and manage payslips through the live
            {/* `/api/payroll/payslips` backend. */}
          </p>
        </div>

        <button
          type="button"
          onClick={loadPayslips}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-semibold text-white shadow-lg shadow-purple-950/20 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-white/[0.07]"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
          Refresh payslips
        </button>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {[
          ["Payslips", metrics.count, "Payroll documents"],
          ["Generated", metrics.generated, "Ready for release"],
          ["Released", metrics.released, "Employee visible"],
          ["Net payroll", money(metrics.totalNet), "Total payout"],
        ].map(([label, value, helper]) => (
          <div
            key={label}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_50px_rgba(124,58,237,0.14)] backdrop-blur-2xl"
          >
            <p className="text-sm text-slate-300">{label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
            <p className="mt-2 text-sm text-cyan-200">{helper}</p>
          </div>
        ))}
      </section>

      <form
        onSubmit={createPayslip}
        className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_50px_rgba(124,58,237,0.14)] backdrop-blur-2xl"
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-white">Generate payslip</h2>
            <p className="mt-1 text-sm text-slate-300">
              New payroll documents are persisted and available for download.
            </p>
          </div>
          <FileSpreadsheet className="hidden h-6 w-6 text-cyan-300 sm:block" />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Employee</span>
            <input
              required
              value={form.employee}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  employee: event.target.value,
                }))
              }
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white"
              placeholder="Enter Employee Name"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Period</span>
            <input
              required
              value={form.period}
              onChange={(event) => setForm((current) => ({ ...current, period: event.target.value }))}
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
              placeholder="Enter the Period"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Gross</span>
            <input
              required
              min="0"
              type="number"
              value={form.gross}
              onChange={(event) => setForm((current) => ({ ...current, gross: event.target.value }))}
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition focus:border-cyan-300/70"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Deductions</span>
            <input
              required
              min="0"
              type="number"
              value={form.deductions}
              onChange={(event) => setForm((current) => ({ ...current, deductions: event.target.value }))}
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition focus:border-cyan-300/70"
            />
          </label>

          <button
            type="submit"
            disabled={saving}
            className="mt-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 px-5 font-semibold text-white shadow-lg shadow-fuchsia-950/30 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileSpreadsheet className="h-4 w-4" />}
            Generate
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
          <h2 className="text-2xl font-semibold text-white">Payslips</h2>
          <p className="mt-1 text-sm text-slate-300">
            Live payroll documents from the payslips API.
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-56 items-center justify-center text-slate-300">
            <Loader2 className="mr-3 h-5 w-5 animate-spin text-cyan-300" />
            Loading payslips...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-[0.24em] text-blue-200">
                  <th className="px-4 py-4 text-center whitespace-nowrap">
                    Payslip
                  </th>

                  <th className="px-4 py-4 text-center whitespace-nowrap">
                    Employee
                  </th>

                  <th className="px-4 py-4 text-center whitespace-nowrap">
                    Period
                  </th>

                  <th className="px-4 py-4 text-center whitespace-nowrap">
                    Gross
                  </th>

                  <th className="px-4 py-4 text-center whitespace-nowrap">
                    Deductions
                  </th>

                  <th className="px-4 py-4 text-center whitespace-nowrap">
                    Net
                  </th>

                  <th className="px-4 py-4 text-center whitespace-nowrap">
                    Status
                  </th>

                  <th className="px-4 py-4 text-center whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {payslips.map((payslip, index) => {
                  const employee = payslip.employee ?? payslip.employeeId ?? "Employee";
                  const period = payslip.period ?? payslip.month ?? "Current";
                  const gross = payslip.gross ?? payslip.net + (payslip.deductions ?? 0);
                  const deductions = payslip.deductions ?? Math.max(gross - payslip.net, 0);
                  const style = statusStyles[payslip.status] ?? statusStyles.Generated;

                  return (
                    <tr
                      key={payslip.id}
                      className={`border-b border-white/10 text-white ${index % 2 ? "bg-white/[0.03]" : ""}`}
                    >
                      <td className="px-4 py-5 text-center whitespace-nowrap font-semibold">{payslip.id}</td>
                      <td className="px-4 py-5 text-center whitespace-nowrap font-semibold">{employee}</td>
                      <td className="px-4 py-5 text-center whitespace-nowrap font-semibold">{period}</td>
                      <td className="px-4 py-5 text-center whitespace-nowrap font-semibold">{money(gross)}</td>
                      <td className="px-4 py-5 text-center whitespace-nowrap font-semibold">{money(deductions)}</td>
                      <td className="px-4 py-5 text-center whitespace-nowrap font-semibold text-emerald-200">{money(payslip.net)}</td>
                      <td className="px-4 py-5 text-center whitespace-nowrap">
                        <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ring-1 ${style}`}>
                          {payslip.status}
                        </span>
                      </td>
                      <td className="w-[330px] px-4 py-5 text-center whitespace-nowrap">
                        <div className="flex flex-nowrap justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => updatePayslip(payslip.id, { status: "Released" })}
                            className="inline-flex whitespace-nowrap items-center gap-2 rounded-lg border border-emerald-300/20 bg-emerald-500/15 px-3 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/25"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Release
                          </button>
                          <button
                            type="button"
                            onClick={() => downloadPayslip(payslip)}
                            className="inline-flex whitespace-nowrap items-center gap-2 rounded-lg border border-blue-300/20 bg-blue-500/15 px-3 py-2 text-sm font-semibold text-blue-100 transition hover:bg-blue-500/25"
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </button>
                          <button
                            type="button"
                            onClick={() => deletePayslip(payslip.id)}
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
