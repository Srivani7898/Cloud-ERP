"use client";

import { useState } from "react";
import { channelRows } from "@/components/notifications/NotificationWidgets";

export default function NotificationChannelsPage() {
  const [rows, setRows] = useState(channelRows);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Channel management</h1>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {rows.map((row) => {
          const Icon = row.icon;
          return (
            <article key={row.channel} className="rounded-lg border border-slate-700 bg-slate-900/70 p-5">
              <Icon className="h-7 w-7 text-cyan-300" />
              <h2 className="mt-4 text-xl font-semibold">{row.channel}</h2>
              <p className="mt-1 text-slate-400">{row.delivered} delivered</p>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-2xl font-semibold">
                  {row.success}%
                </p>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${row.status === "Active"
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-amber-500/20 text-amber-300"
                    }`}
                >
                  {row.status}
                </span>
              </div>
              <button onClick={() =>
                setRows(
                  rows.map((item) =>
                    item.channel === row.channel
                      ? {
                        ...item,
                        status:
                          item.status === "Active"
                            ? "Paused"
                            : "Active",

                        delivered:
                          item.status === "Active"
                            ? item.delivered + 25
                            : item.delivered + 10,

                        success:
                          item.status === "Active"
                            ? Math.min(
                              item.success + 1,
                              100
                            )
                            : Math.max(
                              item.success - 1,
                              50
                            ),
                      }
                      : item
                  )
                )
              }
                className={`mt-5 rounded-lg px-4 py-2 font-semibold text-white transition ${row.status === "Active"
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
                  }`}>{row.status === "Active" ? "Pause" : "Activate"}</button>
            </article>
          );
        })}
      </section>
    </div>
  );
}
