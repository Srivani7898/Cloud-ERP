"use client";

import {
  AlertTriangle,
  BellRing,
  CheckCircle2,
  Mail,
  MessageSquare,
  Webhook,
} from "lucide-react";

export const notificationKpis = [
  {
    label: "Events Processed",
    value: "1.84M",
    change: "+18.2%",
    color: "text-cyan-300",
  },
  {
    label: "Delivery Success",
    value: "98.7%",
    change: "+1.4%",
    color: "text-emerald-300",
  },
  {
    label: "Retry Queue",
    value: "42",
    change: "-19",
    color: "text-amber-300",
  },
  {
    label: "P95 Latency",
    value: "420ms",
    change: "-80ms",
    color: "text-blue-300",
  },
];

export const channelRows = [
  {
    channel: "In-App",
    icon: BellRing,
    status: "Active",
    delivered: "724,018",
    success: 99,
  },
  {
    channel: "Email",
    icon: Mail,
    status: "Active",
    delivered: "512,440",
    success: 98,
  },
  {
    channel: "SMS",
    icon: MessageSquare,
    status: "Active",
    delivered: "86,220",
    success: 96,
  },
  {
    channel: "Webhook",
    icon: Webhook,
    status: "Monitoring",
    delivered: "21,940",
    success: 93,
  },
];

export const events = [
  {
    title: "Invoice approval reminder sent",
    module: "Finance",
    channel: "Email",
    status: "Delivered",
    time: "1m ago",
  },
  {
    title: "Leave approval escalation",
    module: "HR",
    channel: "In-App",
    status: "Delivered",
    time: "3m ago",
  },
  {
    title: "Low-stock reorder alert",
    module: "SCM",
    channel: "SMS",
    status: "Retrying",
    time: "6m ago",
  },
  {
    title: "Project budget variance alert",
    module: "Projects",
    channel: "Webhook",
    status: "Failed",
    time: "9m ago",
  },
];

export function NotificationKpis() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {notificationKpis.map((kpi) => (
        <article
          key={kpi.label}
          className="rounded-lg border border-slate-700 bg-slate-900/70 p-5 shadow-2xl shadow-blue-950/20"
        >
          <p className="text-sm text-slate-400">
            {kpi.label}
          </p>

          <p
            className={`mt-2 text-3xl font-semibold ${kpi.color}`}
          >
            {kpi.value}
          </p>

          <p className="mt-2 text-sm text-emerald-300">
            {kpi.change} this week
          </p>
        </article>
      ))}
    </section>
  );
}

export function ChannelHealth() {
  return (
    <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
      <h2 className="text-2xl font-semibold">
        Channel Delivery Health
      </h2>

      <div className="mt-6 space-y-5">
        {channelRows.map((row) => {
          const Icon = row.icon;

          return (
            <div key={row.channel}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 font-medium text-white">
                  <Icon className="h-4 w-4 text-cyan-300" />
                  {row.channel}
                </span>

                <span className="text-slate-300">
                  {row.success}%
                </span>
              </div>

              <div className="h-3 rounded-full bg-slate-800">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                  style={{
                    width: `${row.success}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function LiveEventStream() {
  return (
    <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
      <h2 className="text-2xl font-semibold">
        Live Event Stream
      </h2>

      <p className="mt-1 text-slate-400">
        Simulated real-time domain events
        from ERP modules.
      </p>

      <div className="mt-5 space-y-3">
        {events.map((event) => (
          <div
            key={event.title}
            className="grid gap-3 rounded-lg border border-slate-800 bg-slate-950/70 p-4 md:grid-cols-[1fr_120px_120px_110px]"
          >
            <div>
              <p className="font-semibold text-white">
                {event.title}
              </p>

              <p className="text-sm text-slate-400">
                {event.module}
              </p>
            </div>

            <span>{event.channel}</span>

            <span
              className={
                event.status === "Delivered"
                  ? "text-emerald-300"
                  : event.status === "Failed"
                  ? "text-red-300"
                  : "text-amber-300"
              }
            >
              {event.status}
            </span>

            <span className="text-slate-400">
              {event.time}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AlertSummary() {
  return (
    <section className="rounded-lg border border-cyan-400/30 bg-gradient-to-br from-slate-900 via-blue-950/50 to-slate-900 p-6">
      <h2 className="text-2xl font-semibold">
        AI Delivery Insights
      </h2>

      <div className="mt-5 space-y-3">
        <div className="rounded-lg border border-slate-700 bg-slate-950/60 p-4">
          <CheckCircle2 className="mb-2 h-5 w-5 text-emerald-300" />
          Email bounce rate dropped after
          template cleanup.
        </div>

        <div className="rounded-lg border border-slate-700 bg-slate-950/60 p-4">
          <AlertTriangle className="mb-2 h-5 w-5 text-amber-300" />
          Webhook failures are concentrated
          in the SCM reorder endpoint.
        </div>
      </div>
    </section>
  );
}