"use client";

import { useState } from "react";
import { Download, ShieldCheck, WalletCards } from "lucide-react";
import { downloadProjectPdf } from "@/utils/project-pdf";

const budgetLines = [
  { category: "Labor", planned: 185000, actual: 142500 },
  { category: "ERP Licenses", planned: 68000, actual: 64000 },
  { category: "Integration", planned: 92000, actual: 71000 },
  { category: "QA and Release", planned: 48000, actual: 22500 },
];

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function ProjectBudgetPage() {
  const [message, setMessage] = useState("Budget is open for finance review.");
  const planned = budgetLines.reduce((sum, line) => sum + line.planned, 0);
  const actual = budgetLines.reduce((sum, line) => sum + line.actual, 0);

  function downloadReport() {
    downloadProjectPdf("project-budget-report.pdf", "Project Budget Report", [
      `Planned budget: ${money.format(planned)}`,
      `Actual spend: ${money.format(actual)}`,
      `Variance: ${money.format(planned - actual)}`,
      "",
      ...budgetLines.map((line) => `${line.category}: planned ${money.format(line.planned)}, actual ${money.format(line.actual)}, variance ${money.format(line.planned - line.actual)}`),
    ]);
    setMessage("Budget report downloaded.");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-semibold text-white"><WalletCards className="h-7 w-7 text-cyan-300" /> Budget control</h1>
        <p className="mt-2 text-slate-300">Planned spend, actuals, and variance tracking.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={() => setMessage("Finance approval recorded for this budget baseline.")} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500"><ShieldCheck className="h-4 w-4" /> Approve baseline</button>
        <button onClick={downloadReport} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 font-semibold text-white hover:border-cyan-400"><Download className="h-4 w-4" /> Download report</button>
        <span className="text-sm text-cyan-200">{message}</span>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-5"><p className="text-sm text-slate-400">Planned budget</p><p className="mt-2 text-2xl font-semibold text-white">{money.format(planned)}</p></div>
        <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-5"><p className="text-sm text-slate-400">Actual spend</p><p className="mt-2 text-2xl font-semibold text-white">{money.format(actual)}</p></div>
        <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-5"><p className="text-sm text-slate-400">Variance</p><p className="mt-2 text-2xl font-semibold text-emerald-300">{money.format(planned - actual)}</p></div>
      </div>
      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <table className="w-full text-left">
          <thead className="text-xs uppercase tracking-[0.22em] text-slate-400"><tr><th className="py-3">Category</th><th>Planned</th><th>Actual</th><th>Variance</th></tr></thead>
          <tbody className="divide-y divide-slate-800 text-white">{budgetLines.map((line) => <tr key={line.category}><td className="py-4 font-medium">{line.category}</td><td>{money.format(line.planned)}</td><td>{money.format(line.actual)}</td><td className="text-emerald-300">{money.format(line.planned - line.actual)}</td></tr>)}</tbody>
        </table>
      </section>
    </div>
  );
}
