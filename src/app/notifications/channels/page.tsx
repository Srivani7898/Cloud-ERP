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
              <p className="mt-3 text-2xl font-semibold">{row.success}%</p>
              <button onClick={() => setRows(rows.map((item) => item.channel === row.channel ? { ...item, status: item.status === "Active" ? "Paused" : "Active" } : item))} className="mt-5 rounded-lg bg-blue-600 px-4 py-2 font-semibold">{row.status === "Active" ? "Pause" : "Activate"}</button>
            </article>
          );
        })}
      </section>
    </div>
  );
}
