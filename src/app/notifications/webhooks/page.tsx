"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const seed = [
  { name: "SCM Reorder Endpoint", url: "https://api.northstar.example/scm/reorder", status: "Failing" },
  { name: "Project Risk Endpoint", url: "https://api.northstar.example/projects/risk", status: "Active" },
];

export default function NotificationWebhooksPage() {
  const [webhooks, setWebhooks] = useState(seed);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Webhook notifications</h1>
        <button onClick={() => setWebhooks([{ name: "Finance Approval Endpoint", url: "https://api.northstar.example/finance/approval", status: "Active" }, ...webhooks])} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold"><Plus className="h-4 w-4" /> Add webhook</button>
      </div>
      <section className="grid gap-4 md:grid-cols-2">
        {webhooks.map((hook) => <article key={hook.name} className="rounded-lg border border-slate-700 bg-slate-900/70 p-5"><h2 className="text-xl font-semibold">{hook.name}</h2><p className="mt-2 break-all text-slate-400">{hook.url}</p><span className={`mt-4 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${hook.status === "Active" ? "bg-emerald-500/15 text-emerald-300" : "bg-red-500/15 text-red-300"}`}>{hook.status}</span><button onClick={() => setWebhooks(webhooks.map((item) => item.name === hook.name ? { ...item, status: "Active" } : item))} className="mt-5 block rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold">Test & activate</button></article>)}
      </section>
    </div>
  );
}
