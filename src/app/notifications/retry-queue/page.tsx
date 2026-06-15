"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";

const seed = [
  { id: "RTY-901", event: "Low-stock reorder alert", channel: "SMS", attempts: 2, status: "Queued" },
  { id: "RTY-902", event: "Project variance webhook", channel: "Webhook", attempts: 3, status: "Queued" },
  { id: "RTY-903", event: "Payroll approval email", channel: "Email", attempts: 1, status: "Queued" },
];

export default function RetryQueuePage() {
  const [rows, setRows] = useState(seed);
  const [message, setMessage] = useState("Retry queue is ready.");

  function retry(id: string) {
    setRows(rows.map((row) => row.id === id ? { ...row, attempts: row.attempts + 1, status: "Retried" } : row));
    setMessage("Retry request submitted.");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Retry management</h1>
      <p className="text-sm text-cyan-200">{message}</p>
      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <table className="w-full text-left">
          <thead className="text-xs uppercase tracking-[0.22em] text-slate-400"><tr><th className="py-3">Retry ID</th><th>Event</th><th>Channel</th><th>Attempts</th><th>Status</th><th>Action</th></tr></thead>
          <tbody className="divide-y divide-slate-800">{rows.map((row) => <tr key={row.id}><td className="py-4 font-medium">{row.id}</td><td>{row.event}</td><td>{row.channel}</td><td>{row.attempts}</td><td>{row.status}</td><td><button onClick={() => retry(row.id)} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold"><RefreshCw className="h-4 w-4" /> Retry</button></td></tr>)}</tbody>
        </table>
      </section>
    </div>
  );
}
