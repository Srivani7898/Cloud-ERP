"use client";

import { useState } from "react";
import { Download, FileText, RefreshCw } from "lucide-react";
import { downloadProjectPdf } from "@/utils/project-pdf";

const reports = [
  { name: "Executive status report", owner: "PMO", period: "June 2026", status: "Ready" },
  { name: "Budget variance report", owner: "Finance", period: "June 2026", status: "Ready" },
  { name: "Risk and dependency report", owner: "Delivery Office", period: "June 2026", status: "Draft" },
];

export default function ProjectReportsPage() {
  const [message, setMessage] = useState("Reports are ready.");

  function downloadReport(reportName: string) {
    const generatedOn = new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date());

    const reportContent =
      reportName === "Budget variance report"
        ? [
            "Report type: Budget Variance and Cost Control",
            "Project: Enterprise ERP Program",
            "Tenant: Northstar Manufacturing",
            `Generated on: ${generatedOn}`,
            "Prepared by: Finance PMO",
            "",
            "EXECUTIVE SUMMARY",
            "The project remains within the approved financial baseline. Current burn rate is controlled, with savings visible in QA and release activities.",
            "",
            "FINANCIAL POSITION",
            "Approved budget: USD 393,000",
            "Actual spend to date: USD 300,000",
            "Remaining budget: USD 93,000",
            "Budget utilization: 76%",
            "Forecast at completion: USD 382,500",
            "",
            "COST BREAKDOWN",
            "Labor: Planned USD 185,000 | Actual USD 142,500 | Variance USD 42,500 favorable",
            "ERP licenses: Planned USD 68,000 | Actual USD 64,000 | Variance USD 4,000 favorable",
            "Integration: Planned USD 92,000 | Actual USD 71,000 | Variance USD 21,000 favorable",
            "QA and release: Planned USD 48,000 | Actual USD 22,500 | Variance USD 25,500 favorable",
            "",
            "FINANCE RECOMMENDATION",
            "Maintain the current spend controls and release the next funding tranche after UAT entry criteria are approved.",
          ]
        : reportName === "Risk and dependency report"
          ? [
              "Report type: Risk and Dependency Register",
              "Project: Enterprise ERP Program",
              "Tenant: Northstar Manufacturing",
              `Generated on: ${generatedOn}`,
              "Prepared by: Delivery Office",
              "",
              "RISK SUMMARY",
              "Overall risk posture is moderate. One high-impact risk remains open around integration testing readiness.",
              "",
              "OPEN RISKS",
              "High: Integration testing delay | Owner: QA Lead | Mitigation: Daily defect triage and extended test window",
              "Medium: Finance approval dependency | Owner: Finance PM | Mitigation: Pre-read pack sent to approvers",
              "Medium: Resource overload | Owner: PMO | Mitigation: Capacity rebalanced across ERP consultants",
              "",
              "DEPENDENCIES",
              "Azure SSO configuration must be completed before production access testing.",
              "Finance approval workflow sign-off is required before release candidate packaging.",
              "Warehouse integration mock data must be validated by Supply Chain SMEs.",
              "",
              "NEXT ACTIONS",
              "Escalate integration test readiness in the steering committee and confirm owners for all medium risks.",
            ]
          : [
              "Report type: Executive Project Status",
              "Project: Enterprise ERP Program",
              "Tenant: Northstar Manufacturing",
              `Generated on: ${generatedOn}`,
              "Prepared by: Program Management Office",
              "",
              "EXECUTIVE SUMMARY",
              "The project is tracking on schedule with controlled budget utilization and stable scope. Delivery confidence remains high for the next steering milestone.",
              "",
              "PROJECT HEALTH",
              "Schedule status: On track",
              "Budget status: Within approved baseline",
              "Scope status: Stable",
              "Quality status: Monitoring",
              "Overall confidence: 82%",
              "",
              "KEY METRICS",
              "Completion: 68%",
              "Open tasks: 14",
              "Completed milestones: 3 of 5",
              "Budget utilization: 76%",
              "Critical risks: 1",
              "",
              "MILESTONE STATUS",
              "Charter approved: Complete",
              "Core ERP workflows configured: On track",
              "User acceptance testing: At risk",
              "Production launch: Planned",
              "",
              "MANAGEMENT ACTIONS",
              "Approve the UAT readiness checklist, confirm integration test ownership, and prepare the launch decision pack.",
            ];

    downloadProjectPdf(`${reportName}.pdf`.replaceAll(" ", "-").toLowerCase(), reportName, reportContent);
    setMessage(`${reportName} downloaded.`);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-semibold text-white"><FileText className="h-7 w-7 text-cyan-300" /> Project reports</h1>
        <p className="mt-2 text-slate-300">Executive reports and delivery packs.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={() => downloadReport("Complete project pack")} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500"><Download className="h-4 w-4" /> Download all PDF</button>
        <button onClick={() => setMessage("Reports refreshed from latest project data.")} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 font-semibold text-white hover:border-cyan-400"><RefreshCw className="h-4 w-4" /> Refresh</button>
        <span className="text-sm text-cyan-200">{message}</span>
      </div>
      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <table className="w-full text-left">
          <thead className="text-xs uppercase tracking-[0.22em] text-slate-400"><tr><th className="py-3">Report</th><th>Owner</th><th>Period</th><th>Status</th><th>Action</th></tr></thead>
          <tbody className="divide-y divide-slate-800 text-white">{reports.map((report) => <tr key={report.name}><td className="py-4 font-medium">{report.name}</td><td>{report.owner}</td><td>{report.period}</td><td>{report.status}</td><td><button onClick={() => downloadReport(report.name)} className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold hover:border-cyan-400">Download</button></td></tr>)}</tbody>
        </table>
      </section>
    </div>
  );
}
