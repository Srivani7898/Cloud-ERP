"use client";

import { AlertTriangle, CheckCircle2, Fingerprint, LockKeyhole, ShieldCheck } from "lucide-react";
import { SecurityBadge } from "@/components/audit/AuditShell";

export const auditEvents = [
  { id: "AUD-98431", actor: "avery@northstar.example", action: "Finance role granted", module: "RBAC", hash: "9f2c...a81", status: "Verified", time: "2m ago" },
  { id: "AUD-98430", actor: "system", action: "Invoice mutation committed", module: "Finance", hash: "771b...cc4", status: "Verified", time: "5m ago" },
  { id: "AUD-98429", actor: "maya@northstar.example", action: "Employee salary data viewed", module: "Payroll", hash: "2aa9...91e", status: "Warning", time: "9m ago" },
  { id: "AUD-98428", actor: "webhook-scm", action: "Reorder endpoint failed", module: "SCM", hash: "b110...773", status: "Failed", time: "12m ago" },
];

export const complianceControls = [
  { name: "SOC 2 access review", framework: "SOC 2", coverage: 94, status: "Verified" },
  { name: "GDPR data subject rights", framework: "GDPR", coverage: 88, status: "Warning" },
  { name: "ISO 27001 logging", framework: "ISO 27001", coverage: 97, status: "Verified" },
  { name: "SOX financial change trail", framework: "SOX", coverage: 91, status: "Verified" },
];

export function AuditKpis() {
  const cards = [
    { label: "Audit events", value: "2.41M", note: "+42k today", icon: LockKeyhole, color: "text-cyan-300" },
    { label: "Hash chain health", value: "99.99%", note: "verified", icon: Fingerprint, color: "text-emerald-300" },
    { label: "Open risks", value: "18", note: "-6 this week", icon: AlertTriangle, color: "text-amber-300" },
    { label: "Compliance score", value: "93%", note: "+4.2%", icon: ShieldCheck, color: "text-blue-300" },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <article key={card.label} className="rounded-lg border border-slate-700 bg-slate-900/70 p-5">
            <div className="flex items-center justify-between">
              <Icon className="h-6 w-6 text-cyan-300" />
              <span className="text-sm text-emerald-300">{card.note}</span>
            </div>
            <p className="mt-5 text-sm text-slate-400">{card.label}</p>
            <p className={`mt-1 text-3xl font-semibold ${card.color}`}>{card.value}</p>
          </article>
        );
      })}
    </section>
  );
}

export function HashChainPanel() {
  return (
    <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
      <h2 className="flex items-center gap-2 text-2xl font-semibold"><Fingerprint className="h-6 w-6 text-cyan-300" /> Hash chain verification</h2>
      <div className="mt-6 space-y-4">
        {["Genesis block", "Identity mutations", "Finance journal writes", "Payroll access reads", "SCM webhook events"].map((item, index) => (
          <div key={item} className="flex items-center gap-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/15">
              <CheckCircle2 className="h-5 w-5 text-emerald-300" />
            </div>
            <div className="flex-1 rounded-lg border border-slate-800 bg-slate-950/70 p-3">
              <p className="font-semibold">{item}</p>
              <p className="text-sm text-slate-400">block #{index + 19320} · sha256 verified</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CompliancePanel() {
  return (
    <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
      <h2 className="text-2xl font-semibold">Compliance coverage</h2>
      <div className="mt-6 space-y-5">
        {complianceControls.map((control) => (
          <div key={control.name}>
            <div className="mb-2 flex items-center justify-between">
              <div>
                <p className="font-medium">{control.name}</p>
                <p className="text-sm text-slate-400">{control.framework}</p>
              </div>
              <SecurityBadge status={control.status as "Verified" | "Warning"} />
            </div>
            <div className="h-3 rounded-full bg-slate-800">
              <div className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: `${control.coverage}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AuditEventTable() {
  return (
    <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
      <h2 className="text-2xl font-semibold">Recent immutable audit events</h2>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[840px] text-left">
          <thead className="text-xs uppercase tracking-[0.22em] text-slate-400"><tr><th className="py-3">Event</th><th>Actor</th><th>Action</th><th>Module</th><th>Hash</th><th>Status</th><th>Time</th></tr></thead>
          <tbody className="divide-y divide-slate-800">{auditEvents.map((event) => <tr key={event.id}><td className="py-4 font-medium">{event.id}</td><td>{event.actor}</td><td>{event.action}</td><td>{event.module}</td><td className="font-mono text-cyan-200">{event.hash}</td><td><SecurityBadge status={event.status as "Verified" | "Warning" | "Failed"} /></td><td>{event.time}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}
