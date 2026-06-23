"use client";

import { useState } from "react";
import {
  BellRing,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { useRouter } from "next/navigation";

const seed = [
  {
    id: "a-1",
    title: "Timesheet due today",
    severity: "Warning",
    acknowledged: false,
  },
  {
    id: "a-2",
    title: "MFA device verification required",
    severity: "Critical",
    acknowledged: false,
  },
  {
    id: "a-3",
    title: "Expense policy updated",
    severity: "Info",
    acknowledged: true,
  },
];

export default function MyAlertsPage() {
  const router = useRouter();

  const [alerts, setAlerts] =
    useState(seed);

  const totalAlerts =
    alerts.length;

  const acknowledgedAlerts =
    alerts.filter(
      (alert) =>
        alert.acknowledged
    ).length;

  const pendingAlerts =
    alerts.filter(
      (alert) =>
        !alert.acknowledged
    ).length;

  function toggleAlert(
    id: string
  ) {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id
          ? {
              ...alert,
              acknowledged:
                !alert.acknowledged,
            }
          : alert
      )
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="flex items-center gap-2 text-3xl font-semibold">
          <BellRing className="h-7 w-7 text-cyan-300" />
          My Alerts
        </h1>

        <button
          onClick={() =>
            router.push(
              "/notifications/inbox"
            )
          }
          className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-4 py-2 font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-slate-400">
            Total Alerts
          </p>

          <p className="mt-2 text-3xl font-bold">
            {totalAlerts}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-slate-400">
            Acknowledged
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-300">
            {acknowledgedAlerts}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-slate-400">
            Pending
          </p>

          <p className="mt-2 text-3xl font-bold text-amber-300">
            {pendingAlerts}
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {alerts.map((alert) => (
          <article
            key={alert.id}
            className="rounded-lg border border-slate-700 bg-slate-900/70 p-5"
          >
            <p className="text-lg font-semibold">
              {alert.title}
            </p>

            <div className="mt-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  alert.severity ===
                  "Critical"
                    ? "bg-red-500/20 text-red-300"
                    : alert.severity ===
                      "Warning"
                    ? "bg-amber-500/20 text-amber-300"
                    : "bg-cyan-500/20 text-cyan-300"
                }`}
              >
                {alert.severity}
              </span>
            </div>

            <div className="mt-4">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  alert.acknowledged
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-slate-700 text-slate-300"
                }`}
              >
                {alert.acknowledged
                  ? "Acknowledged"
                  : "Pending"}
              </span>
            </div>

            <button
              onClick={() =>
                toggleAlert(
                  alert.id
                )
              }
              className={`mt-5 inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-white ${
                alert.acknowledged
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />

              {alert.acknowledged
                ? "Unacknowledge"
                : "Acknowledge"}
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}