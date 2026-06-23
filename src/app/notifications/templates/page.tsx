"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const seed = [
  {
    name: "Invoice approval reminder",
    channel: "Email",
    module: "Finance",
    status: "Published",
  },
  {
    name: "Leave request update",
    channel: "In-App",
    module: "HR",
    status: "Published",
  },
  {
    name: "Low stock alert",
    channel: "SMS",
    module: "SCM",
    status: "Draft",
  },
];

export default function NotificationTemplatesPage() {
  const [templates, setTemplates] = useState(seed);

  const totalTemplates = templates.length;

  const publishedTemplates = templates.filter(
    (item) => item.status === "Published"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">
          Notification Templates
        </h1>

        <button
          onClick={() =>
            setTemplates([
              {
                name: `Template ${templates.length + 1}`,
                channel: "Webhook",
                module: "Projects",
                status: "Draft",
              },
              ...templates,
            ])
          }
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Create Template
        </button>
      </div>

      {/* Metrics */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-slate-400">
            Total Templates
          </p>

          <p className="mt-2 text-3xl font-bold">
            {totalTemplates}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-slate-400">
            Published Templates
          </p>

          <p className="mt-2 text-3xl font-bold">
            {publishedTemplates}
          </p>
        </div>
      </section>

      {/* Table */}
      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <table className="w-full text-left">
          <thead className="text-xs uppercase tracking-[0.22em] text-slate-400">
            <tr>
              <th className="py-3">
                Template
              </th>
              <th>Channel</th>
              <th>Module</th>
              <th>Status</th>
              <th className="text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {templates.map((row) => (
              <tr
                key={`${row.name}-${row.channel}`}
              >
                <td className="py-4 font-medium">
                  {row.name}
                </td>

                <td>{row.channel}</td>

                <td>{row.module}</td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      row.status === "Published"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-amber-500/20 text-amber-300"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>

                <td>
                  <div className="flex justify-center">
                    <button
                      onClick={() =>
                        setTemplates(
                          templates.map(
                            (item) =>
                              item.name ===
                              row.name
                                ? {
                                    ...item,
                                    status:
                                      item.status ===
                                      "Published"
                                        ? "Draft"
                                        : "Published",
                                  }
                                : item
                          )
                        )
                      }
                      className={`rounded-lg px-3 py-2 text-sm font-semibold text-white transition ${
                        row.status ===
                        "Published"
                          ? "bg-amber-600 hover:bg-amber-700"
                          : "bg-emerald-600 hover:bg-emerald-700"
                      }`}
                    >
                      {row.status ===
                      "Published"
                        ? "Unpublish"
                        : "Publish"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}