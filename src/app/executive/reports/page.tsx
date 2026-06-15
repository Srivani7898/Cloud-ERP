"use client";

import { Download } from "lucide-react";
import { downloadAnalyticsPdf } from "@/utils/analytics-export";

export default function ExecutiveReportsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Executive reports</h1>
      <section className="grid gap-4 md:grid-cols-3">
        {["Board Performance Pack", "CEO Operations Brief", "CFO Financial Snapshot"].map((report) => <article key={report} className="rounded-lg border border-slate-700 bg-slate-900/70 p-5"><h2 className="text-xl font-semibold">{report}</h2><p className="mt-2 text-slate-400">Prepared for executive review.</p><button onClick={() => downloadAnalyticsPdf(report, ["Executive ERP analytics", "Revenue growth remains strong.", "SCM risk requires attention.", "Project delivery health is improving."])} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold"><Download className="h-4 w-4" /> Download PDF</button></article>)}
      </section>
    </div>
  );
}
