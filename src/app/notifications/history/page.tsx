"use client";

const history = [
  {
    id: "DLV-10092",
    event: "Invoice reminder",
    channel: "Email",
    recipient: "finance.manager@northstar.example",
    status: "Delivered",
    time: "2026-06-03 21:42",
  },
  {
    id: "DLV-10091",
    event: "Leave approval",
    channel: "In-App",
    recipient: "anika.rao@northstar.example",
    status: "Read",
    time: "2026-06-03 21:39",
  },
  {
    id: "DLV-10090",
    event: "Low stock alert",
    channel: "SMS",
    recipient: "+91 90000 10020",
    status: "Retrying",
    time: "2026-06-03 21:35",
  },
  {
    id: "DLV-10089",
    event: "Budget variance",
    channel: "Webhook",
    recipient: "Project Risk Endpoint",
    status: "Failed",
    time: "2026-06-03 21:30",
  },
];

export default function NotificationHistoryPage() {
  const totalRecords = history.length;

  const deliveredCount = history.filter(
    (item) => item.status === "Delivered"
  ).length;

  const failedCount = history.filter(
    (item) => item.status === "Failed"
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">
          Delivery History
        </h1>

        <p className="mt-2 text-slate-300">
          Complete notification delivery audit
          trail with timestamps and status tracking.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-slate-400">
            Total Records
          </p>

          <p className="mt-2 text-3xl font-bold">
            {totalRecords}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-slate-400">
            Delivered
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-300">
            {deliveredCount}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-slate-400">
            Failed
          </p>

          <p className="mt-2 text-3xl font-bold text-red-300">
            {failedCount}
          </p>
        </div>
      </section>

      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <table className="w-full text-left">
          <thead className="text-xs uppercase tracking-[0.22em] text-slate-400">
            <tr>
              <th className="py-3">ID</th>
              <th>Event</th>
              <th>Channel</th>
              <th>Recipient</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {history.map((row) => (
              <tr key={row.id}>
                <td className="py-4 font-medium">
                  {row.id}
                </td>

                <td>{row.event}</td>

                <td>{row.channel}</td>

                <td>{row.recipient}</td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      row.status === "Delivered"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : row.status === "Failed"
                        ? "bg-red-500/20 text-red-300"
                        : row.status === "Retrying"
                        ? "bg-amber-500/20 text-amber-300"
                        : "bg-cyan-500/20 text-cyan-300"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>

                <td className="whitespace-nowrap">
                  {new Date(
                    row.time
                  ).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}