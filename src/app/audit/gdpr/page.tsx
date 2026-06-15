"use client";

import { useState } from "react";
import { FileCheck2 } from "lucide-react";

const requests = [
  { id: "GDPR-1021", subject: "anika.rao@northstar.example", request: "Data export", status: "Open" },
  { id: "GDPR-1020", subject: "rohan.mehta@northstar.example", request: "Rectification", status: "Closed" },
  { id: "GDPR-1019", subject: "maya.chen@northstar.example", request: "Access review", status: "Open" },
];

export default function AuditGdprPage() {
  const [rows, setRows] = useState(requests);
  return (
    <div className="space-y-6">
      <h1 className="flex items-center gap-2 text-3xl font-semibold"><FileCheck2 className="h-7 w-7 text-cyan-300" /> GDPR management</h1>
      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <table className="w-full text-left"><thead className="text-xs uppercase tracking-[0.22em] text-slate-400"><tr><th className="py-3">Request</th><th>Subject</th><th>Type</th><th>Status</th><th>Action</th></tr></thead><tbody className="divide-y divide-slate-800">{rows.map((row) => <tr key={row.id}><td className="py-4 font-medium">{row.id}</td><td>{row.subject}</td><td>{row.request}</td><td>{row.status}</td><td><button onClick={() => setRows(rows.map((item) => item.id === row.id ? { ...item, status: "Closed" } : item))} className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold">Close</button></td></tr>)}</tbody></table>
      </section>
    </div>
  );
}
