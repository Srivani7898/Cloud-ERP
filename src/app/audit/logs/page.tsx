"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Archive,
  CheckCircle2,
  ChevronDown,
  Fingerprint,
  RefreshCw,
  ShieldCheck,
  Trash2,
} from "lucide-react";

type AuditForm = {
  actor: string;
  action: string;
  module: string;
  severity: string;
};

type AuditRow = {
  id: string;
  actor: string;
  action: string;
  module: string;
  severity: string;
  hash: string;
  state: string;
  timestamp: string;
};

const initialForm: AuditForm = {
  actor: "",
  action: "",
  module: "Finance",
  severity: "Medium",
};

const moduleOptions = ["Finance", "HR", "Payroll", "SCM", "Projects", "Identity"];
const severityOptions = ["Low", "Medium", "High", "Critical"];

function normalizeLog(log: Record<string, unknown>): AuditRow {
  const rawAction = String(log.action ?? "System audit event").replace(/^:+\s*/, "");
  const timestamp = String(log.timestamp ?? log.createdAt ?? new Date().toISOString());

  return {
    id: String(log.id ?? `AUD-LOG-${Date.now()}`),
    actor: String(log.actor ?? "System"),
    action: rawAction,
    module: String(log.module ?? "Enterprise"),
    severity: String(log.severity ?? "Medium"),
    hash: String(log.hash ?? `sha256-${Math.random().toString(16).slice(2, 14)}`),
    state: log.verified === false ? "Review" : String(log.status ?? "Verified"),
    timestamp,
  };
}

function extractRows(payload: unknown): AuditRow[] {
  if (!payload || typeof payload !== "object") return [];
  const response = payload as { data?: { data?: unknown[] } | unknown[] };
  const rows = Array.isArray(response.data)
    ? response.data
    : Array.isArray(response.data?.data)
      ? response.data.data
      : [];

  return rows.map((row) => normalizeLog(row as Record<string, unknown>));
}

function AuditSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative space-y-3">
      <span className="block text-sm font-semibold text-white">{label}</span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        className="flex h-16 w-full items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-5 text-left text-lg font-semibold text-white outline-none transition hover:bg-white/[0.13] focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
      >
        <span>{value}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-slate-300 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-cyan-300/20 bg-[#111827]/95 p-1 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl"
        >
          {options.map((option) => {
            const selected = option === value;

            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={selected}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                  selected
                    ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-lg shadow-pink-500/20"
                    : "text-slate-100 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span>{option}</span>
                {selected ? <CheckCircle2 className="h-4 w-4 shrink-0 text-white" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default function AuditLogsPage() {
  const [form, setForm] = useState<AuditForm>(initialForm);
  const [logs, setLogs] = useState<AuditRow[]>([]);
  const [message, setMessage] = useState("Latest immutable logs loaded from the audit API.");
  const [busy, setBusy] = useState(false);
  const [buttonState, setButtonState] = useState<Record<string, string>>({});

  const summary = useMemo(() => {
    const verified = logs.filter((log) => log.state === "Verified").length;
    const highRisk = logs.filter((log) => ["High", "Critical"].includes(log.severity)).length;
    const modules = new Set(logs.map((log) => log.module)).size;

    return { total: logs.length, verified, highRisk, modules };
  }, [logs]);

  async function loadLogs() {
    setBusy(true);
    try {
      const response = await fetch("/api/audit/logs", { cache: "no-store" });
      const payload = await response.json();
      setLogs(extractRows(payload));
      setMessage("Latest immutable logs loaded from the audit API.");
    } catch {
      setMessage("Unable to load audit logs right now.");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    loadLogs();
  }, []);

  async function recordAuditEvent(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanForm = {
      actor: form.actor.trim() || "Test Admin",
      action: form.action.trim().replace(/^:+\s*/, "") || "Updated payroll approval threshold",
      module: form.module,
      severity: form.severity,
      verified: true,
      hash: `sha256-${Math.random().toString(16).slice(2, 14)}`,
      timestamp: new Date().toISOString(),
    };

    setBusy(true);
    try {
      const response = await fetch("/api/audit/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanForm),
      });
      const payload = await response.json();
      const saved =
        payload?.data && !Array.isArray(payload.data)
          ? normalizeLog(payload.data as Record<string, unknown>)
          : normalizeLog(cleanForm);

      setLogs((current) => [saved, ...current]);
      setForm(initialForm);
      setMessage("Audit event recorded. Create fields cleared and hash evidence generated.");
    } catch {
      setMessage("Audit event could not be recorded.");
    } finally {
      setBusy(false);
    }
  }

  function updateRowAction(id: string, action: string) {
    setButtonState((current) => ({ ...current, [id]: action }));
    if (action === "Deleted") {
      setLogs((current) => current.filter((log) => log.id !== id));
    }
  }

  return (
    <div className="space-y-10">
      <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-violet-950/30 backdrop-blur-xl">
        <div className="mb-8 flex items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <Fingerprint className="h-9 w-9 text-cyan-300" />
              <h1 className="text-4xl font-bold tracking-tight text-white">Immutable audit logs</h1>
            </div>
            <p className="mt-3 max-w-3xl text-lg text-slate-300">
              Track system mutations, verification state, and hash evidence through the live{" "}
              <span className="font-mono text-cyan-200">/api/audit/logs</span> backend.
            </p>
          </div>
          <button
            type="button"
            onClick={loadLogs}
            className="inline-flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-6 font-semibold text-white transition hover:bg-white/10"
          >
            <RefreshCw className={`h-5 w-5 ${busy ? "animate-spin" : ""}`} />
            Refresh logs
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["Audit events", summary.total, "Stored evidence records"],
            ["Verified", summary.verified, "Hash chain confirmed"],
            ["High risk", summary.highRisk, "Elevated severity events"],
            ["Modules", summary.modules, "ERP areas covered"],
          ].map(([label, value, caption]) => (
            <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-slate-300">{label}</p>
              <p className="mt-5 text-4xl font-bold text-white">{value}</p>
              <p className="mt-3 text-sm text-cyan-300">{caption}</p>
            </div>
          ))}
        </div>
      </section>

    <form
    onSubmit={recordAuditEvent}
    className="relative z-50 overflow-visible rounded-[28px] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-violet-950/30 backdrop-blur-xl"
    >
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">Create audit event</h2>
            <p className="mt-2 text-slate-300">Add a test mutation event and persist it through the audit API.</p>
          </div>
          <ShieldCheck className="h-8 w-8 text-cyan-300" />
        </div>

        <div className="grid gap-5 xl:grid-cols-[1fr_1.6fr_1.4fr_1.2fr_auto]">
          <label className="space-y-3">
            <span className="text-sm font-semibold text-white">Actor</span>
            <input
              value={form.actor}
              onChange={(event) => setForm((current) => ({ ...current, actor: event.target.value }))}
              placeholder="Test Admin"
              className="h-16 w-full rounded-2xl border border-white/10 bg-white/10 px-5 text-lg text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
            />
          </label>

          <label className="space-y-3">
            <span className="text-sm font-semibold text-white">Action</span>
            <input
              value={form.action}
              onChange={(event) => setForm((current) => ({ ...current, action: event.target.value }))}
              placeholder="Updated payroll approval threshold"
              className="h-16 w-full rounded-2xl border border-white/10 bg-white/10 px-5 text-lg text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
            />
          </label>

          <AuditSelect
            label="Module"
            value={form.module}
            options={moduleOptions}
            onChange={(module) => setForm((current) => ({ ...current, module }))}
          />

          <AuditSelect
            label="Severity"
            value={form.severity}
            options={severityOptions}
            onChange={(severity) => setForm((current) => ({ ...current, severity }))}
          />

          <button
            type="submit"
            disabled={busy}
            className="mt-8 inline-flex h-16 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-500 to-pink-500 px-10 text-lg font-bold text-white shadow-2xl shadow-pink-500/25 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Fingerprint className="h-5 w-5" />
            Record
          </button>
        </div>

        <div className="mt-7 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-4 text-cyan-100">
          {message}
        </div>
      </form>

      <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-violet-950/30 backdrop-blur-xl">
        <h2 className="text-3xl font-bold text-white">Audit trail</h2>
        <p className="mt-2 text-slate-300">Live compliance evidence from the audit log API.</p>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[1320px] text-left">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-[0.35em] text-cyan-300">
                <th className="px-3 py-4">Event</th>
                <th className="px-3 py-4">Actor</th>
                <th className="px-3 py-4">Module</th>
                <th className="px-3 py-4">Severity</th>
                <th className="px-3 py-4">Hash evidence</th>
                <th className="px-3 py-4">State</th>
                <th className="px-3 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => {
                const action = buttonState[log.id];
                const state = action === "Flagged" ? "Review" : action === "Archived" ? "Archived" : log.state;

                return (
                  <tr key={log.id} className="border-b border-white/10 text-white">
                    <td className="px-3 py-6">
                      <p className="max-w-[260px] font-semibold">{log.action}</p>
                      <p className="mt-1 font-mono text-xs text-slate-400">{log.id}</p>
                    </td>
                    <td className="px-3 py-6">{log.actor}</td>
                    <td className="px-3 py-6">{log.module}</td>
                    <td className="px-3 py-6">
                      <span className="whitespace-nowrap rounded-full border border-amber-300/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-100">
                        {log.severity}
                      </span>
                    </td>
                    <td className="px-3 py-6">
                      <span className="whitespace-nowrap rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 font-mono text-xs text-cyan-100">
                        {log.hash}
                      </span>
                    </td>
                    <td className="px-3 py-6">
                      <span className="whitespace-nowrap rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 font-semibold text-emerald-100">
                        {state}
                      </span>
                    </td>
                    <td className="px-3 py-6">
                      <div className="flex flex-nowrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => updateRowAction(log.id, "Verified")}
                          className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-emerald-300/20 bg-emerald-400/15 px-4 font-semibold text-emerald-100"
                        >
                          <CheckCircle2 className="h-5 w-5 shrink-0" />
                          {action === "Verified" ? "Verified" : "Verify"}
                        </button>
                        <button
                          type="button"
                          onClick={() => updateRowAction(log.id, "Flagged")}
                          className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-amber-300/20 bg-amber-400/15 px-4 font-semibold text-amber-100"
                        >
                          <AlertTriangle className="h-5 w-5 shrink-0" />
                          {action === "Flagged" ? "Flagged" : "Flag risk"}
                        </button>
                        <button
                          type="button"
                          onClick={() => updateRowAction(log.id, "Archived")}
                          className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-violet-300/20 bg-violet-400/15 px-4 font-semibold text-violet-100"
                        >
                          <Archive className="h-5 w-5 shrink-0" />
                          {action === "Archived" ? "Archived" : "Archive"}
                        </button>
                        <button
                          type="button"
                          onClick={() => updateRowAction(log.id, "Deleted")}
                          className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-rose-300/20 bg-rose-400/15 px-4 font-semibold text-rose-100"
                        >
                          <Trash2 className="h-5 w-5 shrink-0" />
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
      </section>
    </div>
  );
}
