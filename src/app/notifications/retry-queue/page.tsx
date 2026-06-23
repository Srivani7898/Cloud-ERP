"use client";

import { useState } from "react";
import { RefreshCw, CheckCircle2 } from "lucide-react";

const seed = [
  {
    id: "RTY-901",
    event: "Low-stock reorder alert",
    channel: "SMS",
    attempts: 2,
    status: "Queued",
  },
  {
    id: "RTY-902",
    event: "Project variance webhook",
    channel: "Webhook",
    attempts: 3,
    status: "Queued",
  },
  {
    id: "RTY-903",
    event: "Payroll approval email",
    channel: "Email",
    attempts: 1,
    status: "Queued",
  },
];

export default function RetryQueuePage() {
  const [rows, setRows] = useState(seed);

  const [message, setMessage] = useState(
    "Retry queue is ready."
  );

  function retry(id: string) {
    setRows(
      rows.map((row) =>
        row.id === id
          ? {
              ...row,
              attempts: row.attempts + 1,
              status:
                row.status === "Success"
                  ? "Queued"
                  : "Success",
            }
          : row
      )
    );

    setMessage(
      "Retry queue updated successfully."
    );
  }

  const totalRetries = rows.length;

  const successCount = rows.filter(
    (row) => row.status === "Success"
  ).length;

  const queuedCount = rows.filter(
    (row) => row.status === "Queued"
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">
          Retry Management
        </h1>

        <p className="mt-2 text-slate-300">
          Manage failed notifications and
          retry delivery operations.
        </p>
      </div>

      <p className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-200">
        {message}
      </p>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-slate-400">
            Total Queue
          </p>

          <p className="mt-2 text-3xl font-bold">
            {totalRetries}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-slate-400">
            Success
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-300">
            {successCount}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-slate-400">
            Queued
          </p>

          <p className="mt-2 text-3xl font-bold text-amber-300">
            {queuedCount}
          </p>
        </div>
      </section>

      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <table className="w-full text-left">
          <thead className="text-xs uppercase tracking-[0.22em] text-slate-400">
            <tr>
              <th className="py-3">
                Retry ID
              </th>
              <th>Event</th>
              <th>Channel</th>
              <th>Attempts</th>
              <th>Status</th>
              <th className="text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="py-4 font-medium">
                  {row.id}
                </td>

                <td>{row.event}</td>

                <td>{row.channel}</td>

                <td>{row.attempts}</td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      row.status === "Success"
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
                        retry(row.id)
                      }
                      className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white transition ${
                        row.status ===
                        "Success"
                          ? "bg-emerald-600 hover:bg-emerald-700"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {row.status ===
                      "Success" ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          Reset
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4" />
                          Retry
                        </>
                      )}
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