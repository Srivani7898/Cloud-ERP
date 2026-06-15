"use client";

import { useState } from "react";
import { CheckCheck, Inbox } from "lucide-react";

const seed = [
  { id: "u-1", title: "Your leave request was approved", body: "HR approved your casual leave for June 12.", unread: true },
  { id: "u-2", title: "Payslip is available", body: "May 2026 salary slip is ready for download.", unread: true },
  { id: "u-3", title: "Project milestone updated", body: "UAT complete milestone moved to at-risk.", unread: false },
];

export default function MyNotificationsPage() {
  const [rows, setRows] = useState(seed);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-3xl font-semibold"><Inbox className="h-7 w-7 text-cyan-300" /> My notifications</h1>
        <button onClick={() => setRows(rows.map((row) => ({ ...row, unread: false })))} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold"><CheckCheck className="h-4 w-4" /> Mark all read</button>
      </div>
      <section className="space-y-3">
        {rows.map((row) => <article key={row.id} className={`rounded-lg border p-5 ${row.unread ? "border-blue-500 bg-blue-500/10" : "border-slate-700 bg-slate-900/70"}`}><p className="text-lg font-semibold">{row.title}</p><p className="mt-2 text-slate-300">{row.body}</p></article>)}
      </section>
    </div>
  );
}
