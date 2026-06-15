"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const seed = [
  { name: "Invoice approval reminder", channel: "Email", module: "Finance", status: "Published" },
  { name: "Leave request update", channel: "In-App", module: "HR", status: "Published" },
  { name: "Low stock alert", channel: "SMS", module: "SCM", status: "Draft" },
];

export default function NotificationTemplatesPage() {
  const [templates, setTemplates] = useState(seed);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Notification templates</h1>
        <button onClick={() => setTemplates([{ name: "Project risk escalation", channel: "Webhook", module: "Projects", status: "Draft" }, ...templates])} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold"><Plus className="h-4 w-4" /> Create template</button>
      </div>
      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <table className="w-full text-left">
          <thead className="text-xs uppercase tracking-[0.22em] text-slate-400"><tr><th className="py-3">Template</th><th>Channel</th><th>Module</th><th>Status</th><th>Action</th></tr></thead>
          <tbody className="divide-y divide-slate-800">{templates.map((row) => <tr key={`${row.name}-${row.channel}`}><td className="py-4 font-medium">{row.name}</td><td>{row.channel}</td><td>{row.module}</td><td>{row.status}</td><td><button onClick={() => setTemplates(templates.map((item) => item.name === row.name ? { ...item, status: item.status === "Published" ? "Draft" : "Published" } : item))} className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold">Toggle</button></td></tr>)}</tbody>
        </table>
      </section>
    </div>
  );
}
