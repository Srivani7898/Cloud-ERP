"use client";

import { Download } from "lucide-react";
import { AdminSecurityHeader } from "@/components/audit/AuditShell";
import { downloadProjectPdf } from "@/utils/project-pdf";

export default function AdminAuditReportsPage() {
  return (
    <div className="space-y-6 p-8 text-white">
      <AdminSecurityHeader title="Admin audit reports" description="Generate board-ready and regulator-ready audit evidence packs." />
      <section className="grid gap-4 md:grid-cols-3">
        {["Tenant Audit Pack", "Security Control Evidence", "Regulatory Export"].map((report) => <article key={report} className="rounded-lg border border-slate-700 bg-slate-900/70 p-5"><h2 className="text-xl font-semibold">{report}</h2><p className="mt-2 text-slate-400">Includes immutable logs, control coverage, and exception summary.</p><button onClick={() => downloadProjectPdf(`${report}.pdf`.replaceAll(" ", "-").toLowerCase(), report, ["Prepared for: Super Admin", "Tenant: Northstar Manufacturing", "Hash chain: Verified", "Compliance posture: 93%", "Open exceptions: 2"])} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold"><Download className="h-4 w-4" /> Download</button></article>)}
      </section>
    </div>
  );
}
