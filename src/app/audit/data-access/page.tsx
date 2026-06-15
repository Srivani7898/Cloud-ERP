const rows = [
  { dataset: "Payroll compensation", user: "maya@northstar.example", purpose: "Payroll review", decision: "Allowed", time: "4m ago" },
  { dataset: "Employee PII", user: "hr.admin@northstar.example", purpose: "Onboarding", decision: "Allowed", time: "8m ago" },
  { dataset: "Finance journal", user: "avery@northstar.example", purpose: "Close review", decision: "Allowed", time: "12m ago" },
  { dataset: "GDPR export", user: "unknown-session", purpose: "Export attempt", decision: "Blocked", time: "19m ago" },
];

export default function DataAccessPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Data access tracking</h1>
      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <table className="w-full text-left"><thead className="text-xs uppercase tracking-[0.22em] text-slate-400"><tr><th className="py-3">Dataset</th><th>User</th><th>Purpose</th><th>Decision</th><th>Time</th></tr></thead><tbody className="divide-y divide-slate-800">{rows.map((row) => <tr key={`${row.dataset}-${row.user}`}><td className="py-4 font-medium">{row.dataset}</td><td>{row.user}</td><td>{row.purpose}</td><td className={row.decision === "Blocked" ? "text-red-300" : "text-emerald-300"}>{row.decision}</td><td>{row.time}</td></tr>)}</tbody></table>
      </section>
    </div>
  );
}
