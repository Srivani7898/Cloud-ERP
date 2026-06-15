"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

const rows = [
  { module: "Finance", metric: "Revenue", region: "North America", value: "$18.4M", risk: "Low" },
  { module: "Finance", metric: "Receivables", region: "Europe", value: "$4.2M", risk: "Medium" },
  { module: "HR", metric: "Attrition", region: "India", value: "7.8%", risk: "Low" },
  { module: "SCM", metric: "Stockout Risk", region: "APAC", value: "14 SKUs", risk: "High" },
  { module: "Projects", metric: "Delivery Variance", region: "Global", value: "6.4%", risk: "Medium" },
];

export default function AnalyticsDrilldownPage() {
  const [module, setModule] = useState("All");
  const filtered = useMemo(() => module === "All" ? rows : rows.filter((row) => row.module === module), [module]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-semibold"><Search className="h-7 w-7 text-cyan-300" /> Drill-down analytics</h1>
        <p className="mt-2 text-slate-300">Slice ERP metrics by module, region, risk, and business owner.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {["All", "Finance", "HR", "SCM", "Projects"].map((item) => <button key={item} onClick={() => setModule(item)} className={`rounded-lg px-4 py-2 font-semibold ${module === item ? "bg-blue-600" : "border border-slate-700 bg-slate-900 hover:border-cyan-400"}`}>{item}</button>)}
      </div>
      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <table className="w-full text-left">
          <thead className="text-xs uppercase tracking-[0.22em] text-slate-400"><tr><th className="py-3">Module</th><th>Metric</th><th>Region</th><th>Value</th><th>Risk</th></tr></thead>
          <tbody className="divide-y divide-slate-800">{filtered.map((row) => <tr key={`${row.module}-${row.metric}`}><td className="py-4 font-medium">{row.module}</td><td>{row.metric}</td><td>{row.region}</td><td>{row.value}</td><td>{row.risk}</td></tr>)}</tbody>
        </table>
      </section>
    </div>
  );
}
