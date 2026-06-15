const history = [
  { id: "DLV-10092", event: "Invoice reminder", channel: "Email", recipient: "finance.manager@northstar.example", status: "Delivered", time: "2026-06-03 21:42" },
  { id: "DLV-10091", event: "Leave approval", channel: "In-App", recipient: "anika.rao@northstar.example", status: "Read", time: "2026-06-03 21:39" },
  { id: "DLV-10090", event: "Low stock alert", channel: "SMS", recipient: "+91 90000 10020", status: "Retrying", time: "2026-06-03 21:35" },
  { id: "DLV-10089", event: "Budget variance", channel: "Webhook", recipient: "Project Risk Endpoint", status: "Failed", time: "2026-06-03 21:30" },
];

export default function NotificationHistoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Delivery history</h1>
      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <table className="w-full text-left">
          <thead className="text-xs uppercase tracking-[0.22em] text-slate-400"><tr><th className="py-3">ID</th><th>Event</th><th>Channel</th><th>Recipient</th><th>Status</th><th>Time</th></tr></thead>
          <tbody className="divide-y divide-slate-800">{history.map((row) => <tr key={row.id}><td className="py-4 font-medium">{row.id}</td><td>{row.event}</td><td>{row.channel}</td><td>{row.recipient}</td><td>{row.status}</td><td>{row.time}</td></tr>)}</tbody>
        </table>
      </section>
    </div>
  );
}
