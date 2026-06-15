"use client";

import { Download } from "lucide-react";
import { downloadProjectPdf } from "@/utils/project-pdf";

const reports = ["SOC 2 Evidence Pack", "GDPR Compliance Report", "SOX Audit Trail", "Security Event Summary"];

export default function AuditReportsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Compliance reports</h1>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {reports.map((report) => <article key={report} className="rounded-lg border border-slate-700 bg-slate-900/70 p-5"><h2 className="text-xl font-semibold">{report}</h2><p className="mt-2 text-slate-400">Audit-ready evidence report.</p><button onClick={() => downloadProjectPdf(`${report}.pdf`.replaceAll(" ", "-").toLowerCase(), report, ["Tenant: Northstar Manufacturing", "Period: June 2026", "Hash chain: Verified", "Control coverage: 93%", "Exceptions: 2 under review", "Prepared for: Internal Audit and Compliance Office"])} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold"><Download className="h-4 w-4" /> PDF</button></article>)}
      </section>
    </div>
  );
}
