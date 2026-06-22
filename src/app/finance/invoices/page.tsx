"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useHrNotificationStore } from "@/store/notification-store";
import {
  CheckCircle2,
  FileText,
  Loader2,
  Plus,
  RefreshCcw,
  Send,
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

type Invoice = {
  id: string;
  customer: string;
  status: string;
  assignedTo?: string;
  dueDate?: string;
  total?: number;
  amount?: number;
  currency?: string;
  aiRisk?: number;
  createdAt?: string;
  updatedAt?: string;
};

const emptyInvoice = {
  customer: "",
  dueDate: "",
  total: "",
  currency: "USD",
  assignedTo: "",
};

const statusStyles: Record<string, string> = {
  Approved: "bg-blue-500/15 text-blue-200 ring-blue-400/25",
  Draft: "bg-slate-500/15 text-slate-200 ring-slate-400/25",
  Overdue: "bg-rose-500/15 text-rose-200 ring-rose-400/25",
  Paid: "bg-emerald-500/15 text-emerald-200 ring-emerald-400/25",
  Sent: "bg-cyan-500/15 text-cyan-200 ring-cyan-400/25",
};

function currency(value?: number, code = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: code,
    maximumFractionDigits: 0,
  }).format(value ?? 0);
}

export default function FinanceInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [form, setForm] = useState(emptyInvoice);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const addNotification =
    useHrNotificationStore(
      (state) => state.addNotification
    );

  const totals = useMemo(() => {
    return invoices.reduce(
      (acc, invoice) => {
        const amount = invoice.total ?? invoice.amount ?? 0;
        acc.value += amount;
        acc.open += invoice.status === "Paid" ? 0 : amount;
        acc.risk += invoice.aiRisk ?? 0;
        return acc;
      },
      { value: 0, open: 0, risk: 0 },
    );
  }, [invoices]);

  const averageRisk = invoices.length ? Math.round(totals.risk / invoices.length) : 0;

  async function loadInvoices() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/finance/invoices", { cache: "no-store" });
      const payload = (await response.json()) as ApiEnvelope<Invoice>;

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to load invoices.");
      }

      setInvoices(payload.data?.data ?? []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load invoices.");
    } finally {
      setLoading(false);
    }
  }

  async function createInvoice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/finance/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form.customer.trim(),
          status: "Draft",
          dueDate: form.dueDate,
          total: Number(form.total),
          currency: form.currency.toUpperCase(),
          assignedTo: form.assignedTo,
          aiRisk: 18,
        }),
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to create invoice.");
      }

      setForm(emptyInvoice);
      if (form.assignedTo?.trim()) {
        addNotification(
          form.assignedTo,
          "Invoice Generated",
          `A new invoice for ${form.customer} worth ${form.total} ${form.currency} has been generated.`,
          "Invoice"
        );

        console.log(
          "FINANCE INVOICE NOTIFICATION CREATED:",
          form.assignedTo
        );
      }
      setMessage("Invoice draft created and synced with the backend API.");
      await loadInvoices();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to create invoice.");
    } finally {
      setSaving(false);
    }
  }

  async function updateInvoice(id: string, patch: Partial<Invoice>) {
    setMessage("");

    try {
      const response = await fetch(`/api/finance/invoices/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to update invoice.");
      }

      setMessage(`Invoice ${id} updated.`);
      await loadInvoices();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to update invoice.");
    }
  }

  async function deleteInvoice(id: string) {
    setMessage("");

    try {
      const response = await fetch(`/api/finance/invoices/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to delete invoice.");
      }

      setMessage(`Invoice ${id} deleted.`);
      await loadInvoices();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to delete invoice.");
    }
  }

  useEffect(() => {
    loadInvoices();
  }, []);

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
            Finance Management
          </p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-semibold text-white md:text-4xl">
            <FileText className="h-8 w-8 text-cyan-300" />
            Invoice command center
          </h1>
          {/* <p className="mt-2 max-w-2xl text-base text-slate-300">
            Create, approve, collect, and remove tenant-scoped invoices through
            the live `/api/finance/invoices` backend.
          </p> */}
        </div>

        <button
          type="button"
          onClick={loadInvoices}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-semibold text-white shadow-lg shadow-purple-950/20 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-white/[0.07]"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
          Refresh invoices
        </button>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Total invoiced", currency(totals.value), "All invoice value"],
          ["Open receivables", currency(totals.open), "Draft, sent, approved, overdue"],
          ["Average AI risk", `${averageRisk}/100`, "Portfolio collection signal"],
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
        onSubmit={createInvoice}
        className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_50px_rgba(124,58,237,0.14)] backdrop-blur-2xl"
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-white">Create invoice draft</h2>
            <p className="mt-1 text-sm text-slate-300">
              New records are written to the API and appear in the table immediately.
            </p>
          </div>
          <Plus className="hidden h-6 w-6 text-cyan-300 sm:block" />
        </div>

        <div className="grid gap-4 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Customer</span>
            <input
              required
              value={form.customer}
              onChange={(event) => setForm((current) => ({ ...current, customer: event.target.value }))}
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
              placeholder="Enter the customer name or company"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Due date</span>
            <input
              required
              type="date"
              value={form.dueDate}
              onChange={(event) => setForm((current) => ({ ...current, dueDate: event.target.value }))}
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition focus:border-cyan-300/70"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Amount</span>
            <input
              required
              min="0"
              type="number"
              value={form.total}
              onChange={(event) => setForm((current) => ({ ...current, total: event.target.value }))}
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition focus:border-cyan-300/70"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Currency</span>
            <input
              required
              value={form.currency}
              onChange={(event) => setForm((current) => ({ ...current, currency: event.target.value }))}
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition focus:border-cyan-300/70"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">
              Assign Employee
            </span>

            <input
              value={form.assignedTo}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  assignedTo: event.target.value,
                }))
              }
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white"
              placeholder="Enter assign employee name"
            />
          </label>

          <button
            type="submit"
            disabled={saving}
            className="mt-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 px-5 font-semibold text-white shadow-lg shadow-fuchsia-950/30 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
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
          <h2 className="text-2xl font-semibold text-white">Invoices</h2>
          <p className="mt-1 text-sm text-slate-300">
            Data loaded from the live finance invoice API.
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-56 items-center justify-center text-slate-300">
            <Loader2 className="mr-3 h-5 w-5 animate-spin text-cyan-300" />
            Loading invoices...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-white/10">
                <tr className="text-center">
                  <th className="px-4 py-4 text-center whitespace-nowrap">Invoice</th>
                  <th className="px-4 py-4 text-center whitespace-nowrap">Customer</th>
                  <th className="px-4 py-4 text-center whitespace-nowrap">Assigned To</th>
                  <th className="px-4 py-4 text-center whitespace-nowrap">Status</th>
                  <th className="px-4 py-4 text-center whitespace-nowrap">Due Date</th>
                  <th className="px-4 py-4 text-center whitespace-nowrap">Total</th>
                  <th className="px-4 py-4 text-center whitespace-nowrap">AI Risk</th>
                  <th className="px-4 py-4 text-center whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, index) => {
                  const amount = invoice.total ?? invoice.amount ?? 0;
                  const style = statusStyles[invoice.status] ?? statusStyles.Draft;

                  return (
                    <tr
                      key={invoice.id}
                      className={`border-b border-white/10 text-white ${index % 2 ? "bg-white/[0.03]" : ""}`}
                    >
                      <td className="px-4 py-5 font-semibold whitespace-nowrap">
                        {invoice.id}
                      </td>
                      <td className="px-4 py-5">{invoice.customer}</td>

                      <td className="px-4 py-5">
                        {invoice.assignedTo || "-"}
                      </td>

                      <td className="px-4 py-5">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${style}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-4 py-5 whitespace-nowrap">
                        {invoice.dueDate}
                      </td>
                      <td className="px-4 py-5 whitespace-nowrap">
                        {currency(amount, invoice.currency)}
                      </td><td className="px-4 py-5 whitespace-nowrap">
                        {invoice.aiRisk ?? 0}/100
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => updateInvoice(invoice.id, { status: "Approved", aiRisk: 9 })}
                            className="inline-flex items-center gap-1 rounded-lg border border-blue-300/20 bg-blue-500/15 px-2 py-2 text-xs font-semibold text-blue-100"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => updateInvoice(invoice.id, { status: "Paid", aiRisk: 0 })}
                            className="inline-flex items-center gap-1 rounded-lg border border-emerald-300/20 bg-emerald-500/15 px-2 py-2 text-xs font-semibold text-emerald-100"
                          >
                            Paid
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteInvoice(invoice.id)}
                            className="inline-flex items-center gap-1 rounded-lg border border-rose-300/20 bg-rose-500/15 px-2 py-2 text-xs font-semibold text-rose-100"
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
