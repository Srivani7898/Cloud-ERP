"use client";

import { useState } from "react";
import {
  CheckCheck,
  Inbox,
  ArrowLeft,
  Bell,
} from "lucide-react";
import { useRouter } from "next/navigation";

const seed = [
  {
    id: "u-1",
    title: "Your leave request was approved",
    body: "HR approved your casual leave for June 12.",
    unread: true,
  },
  {
    id: "u-2",
    title: "Payslip is available",
    body: "May 2026 salary slip is ready for download.",
    unread: true,
  },
  {
    id: "u-3",
    title: "Project milestone updated",
    body: "UAT complete milestone moved to at-risk.",
    unread: false,
  },
];

export default function MyNotificationsPage() {
  const router = useRouter();

  const [rows, setRows] = useState(seed);

  const totalNotifications =
    rows.length;

  const unreadNotifications =
    rows.filter(
      (row) => row.unread
    ).length;

  const readNotifications =
    rows.filter(
      (row) => !row.unread
    ).length;

  function toggleRead(id: string) {
    setRows(
      rows.map((row) =>
        row.id === id
          ? {
              ...row,
              unread: !row.unread,
            }
          : row
      )
    );
  }

  function markAllRead() {
    setRows(
      rows.map((row) => ({
        ...row,
        unread: false,
      }))
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="flex items-center gap-2 text-3xl font-semibold">
          <Inbox className="h-7 w-7 text-cyan-300" />
          My Notifications
        </h1>

        <div className="flex gap-3">
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

          <button
            onClick={markAllRead}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white"
          >
            <CheckCheck className="h-4 w-4" />
            Mark All Read
          </button>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-slate-400">
            Total Notifications
          </p>

          <p className="mt-2 text-3xl font-bold">
            {totalNotifications}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-slate-400">
            Unread
          </p>

          <p className="mt-2 text-3xl font-bold text-amber-300">
            {unreadNotifications}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-slate-400">
            Read
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-300">
            {readNotifications}
          </p>
        </div>
      </section>

      <section className="space-y-3">
        {rows.map((row) => (
          <article
            key={row.id}
            className={`rounded-lg border p-5 transition ${
              row.unread
                ? "border-blue-500 bg-blue-500/10"
                : "border-slate-700 bg-slate-900/70"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="flex items-center gap-2 text-lg font-semibold">
                  <Bell className="h-4 w-4 text-cyan-300" />
                  {row.title}
                </p>

                <p className="mt-2 text-slate-300">
                  {row.body}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    row.unread
                      ? "bg-amber-500/20 text-amber-300"
                      : "bg-emerald-500/20 text-emerald-300"
                  }`}
                >
                  {row.unread
                    ? "Unread"
                    : "Read"}
                </span>

                <button
                  onClick={() =>
                    toggleRead(row.id)
                  }
                  className={`rounded-lg px-4 py-2 text-sm font-semibold text-white ${
                    row.unread
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                >
                  {row.unread
                    ? "Mark Read"
                    : "Mark Unread"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}