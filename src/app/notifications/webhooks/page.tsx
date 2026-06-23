"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const seed = [
  {
    name: "SCM Reorder Endpoint",
    url: "https://api.northstar.example/scm/reorder",
    status: "Failing",
    hits: 125,
  },
  {
    name: "Project Risk Endpoint",
    url: "https://api.northstar.example/projects/risk",
    status: "Active",
    hits: 278,
  },
];

export default function NotificationWebhooksPage() {
  const [webhooks, setWebhooks] = useState(seed);

  const activeCount = webhooks.filter(
    (item) => item.status === "Active"
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">
          Webhook Notifications
        </h1>

        <button
          onClick={() =>
            setWebhooks([
              {
                name: `Finance Endpoint ${webhooks.length + 1}`,
                url: `https://api.northstar.example/finance/${webhooks.length + 1}`,
                status: "Active",
                hits: 0,
              },
              ...webhooks,
            ])
          }
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Webhook
        </button>
      </div>

      {/* Summary */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-slate-400">
            Total Webhooks
          </p>
          <p className="mt-2 text-3xl font-bold">
            {webhooks.length}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-slate-400">
            Active Webhooks
          </p>
          <p className="mt-2 text-3xl font-bold">
            {activeCount}
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {webhooks.map((hook) => (
          <article
            key={hook.name}
            className="rounded-lg border border-slate-700 bg-slate-900/70 p-5"
          >
            <h2 className="text-xl font-semibold">
              {hook.name}
            </h2>

            <p className="mt-2 break-all text-slate-400">
              {hook.url}
            </p>

            <p className="mt-3 text-sm text-cyan-300">
              Hits: {hook.hits}
            </p>

            <span
              className={`mt-4 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                hook.status === "Active"
                  ? "bg-emerald-500/15 text-emerald-300"
                  : "bg-red-500/15 text-red-300"
              }`}
            >
              {hook.status}
            </span>

            <button
              onClick={() =>
                setWebhooks(
                  webhooks.map((item) =>
                    item.name === hook.name
                      ? {
                          ...item,
                          status:
                            item.status === "Active"
                              ? "Inactive"
                              : "Active",
                          hits: item.hits + 1,
                        }
                      : item
                  )
                )
              }
              className={`mt-5 block rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${
                hook.status === "Active"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              {hook.status === "Active"
                ? "Deactivate"
                : "Activate"}
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}