"use client";

import { useEffect, useMemo, useState } from "react";
import { BarChart3, CheckCircle2, Download, FileText, RefreshCw, Send, Trash2 } from "lucide-react";

type HrReport = {
  id: string;
  name?: string;
  type?: string;
  period?: string;
  owner?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

const reportTypes = ["Workforce Summary", "Attendance", "Leave", "Onboarding", "Compliance"];

const defaultReport = {
  name: "",
  type: "Workforce Summary",
  period: "",
  owner: "",
};

function fieldValue(report: HrReport, key: keyof HrReport, fallback = "Not set") {
  const value = report[key];
  return value === undefined || value === null || value === "" ? fallback : String(value);
}

function formatDate(value?: string) {
  if (!value) return "June 7, 2026";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function buildHrReportHtml(report: HrReport) {
  const name = fieldValue(report, "name", "HR Workforce Report");
  const type = fieldValue(report, "type", "Workforce Summary");
  const period = fieldValue(report, "period", "June 2026");
  const owner = fieldValue(report, "owner", "HR CoE");
  const status = fieldValue(report, "status", "Ready");
  const generatedOn = formatDate(report.updatedAt ?? report.createdAt);

  let reportContent = "";
  let reportTable = "";

  switch (report.type) {

    case "Workforce Summary":

      reportContent = `
      <div class="section-title">Workforce Summary</div>
      <p class="note">
        Overall workforce strength remains healthy with strong employee coverage.
      </p>
    `;

      reportTable = `
<table>
  <thead>
    <tr>
      <th>KPI</th>
      <th>Current</th>
      <th>Target</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>Total Employees</td>
      <td>248</td>
      <td>260</td>
    </tr>

    <tr>
      <td>Active Employees</td>
      <td>238</td>
      <td>250</td>
    </tr>

    <tr>
      <td>Attrition Rate</td>
      <td>4.2%</td>
      <td>&lt;5%</td>
    </tr>

    <tr>
      <td>Open Positions</td>
      <td>12</td>
      <td>10</td>
    </tr>

    <tr>
      <td>Internal Promotions</td>
      <td>8</td>
      <td>6</td>
    </tr>
    <tr>
      <td>New Hires</td>
      <td>14</td>
      <td>12</td>
    </tr>

      <tr>
        <td>Employees On Leave</td>
        <td>9</td>
        <td>10</td>
      </tr>

      <tr>
        <td>Average Tenure</td>
        <td>4.8 Years</td>
        <td>4.5 Years</td>
      </tr>

        <tr>
          <td>Training Completion</td>
          <td>92%</td>
          <td>90%</td>
        </tr>
          </tbody>
        </table>

        <div class="section-title">Workforce Insights</div>

          <p class="note">
          The organization continues to maintain a stable workforce with a healthy balance
          between recruitment, retention, and internal career progression. Employee
          turnover remains within acceptable thresholds while hiring initiatives are
          focused on critical business functions. Internal promotion activity indicates
          effective succession planning and leadership development across departments.
          Training completion rates remain above target, demonstrating a strong commitment
          to workforce development and compliance readiness.
          </p>

          <div class="section-title">Management Recommendations</div>

          <table>
            <thead>
              <tr>
                <th>Focus Area</th>
                <th>Recommendation</th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td>Recruitment</td>
              <td>Prioritize hiring for Engineering and Finance positions.</td>
            </tr>
            <tr>
              <td>Retention</td>
              <td>Continue employee engagement and recognition programs.</td>
            </tr>
            <tr>
              <td>Training</td>
              <td>Expand certification and technical learning initiatives.</td>
            </tr>
              <tr>
                <td>Succession Planning</td>
                <td>Increase leadership development opportunities.</td>
              </tr>
            </tbody>
          </table>
        `;
      break;

    case "Attendance":

  reportContent = `
  <div class="section-title">Attendance Report</div>

  <p class="note">
    Attendance performance remains healthy across all business units.
    Employee presence rates continue to exceed organizational targets while
    late arrivals and unplanned absences remain within acceptable thresholds.
    Remote work participation remains stable and workforce productivity indicators
    show positive operational efficiency.
  </p>
`;

  reportTable = `
  <table>
    <thead>
      <tr>
        <th>Metric</th>
        <th>Value</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>Present</td>
        <td>95%</td>
      </tr>

      <tr>
        <td>Remote</td>
        <td>18%</td>
      </tr>

      <tr>
        <td>Work From Office</td>
        <td>77%</td>
      </tr>

      <tr>
        <td>Late Arrivals</td>
        <td>5%</td>
      </tr>

      <tr>
        <td>Absent</td>
        <td>2%</td>
      </tr>

      <tr>
        <td>Average Working Hours</td>
        <td>8.4 Hours</td>
      </tr>

      <tr>
        <td>Overtime Hours</td>
        <td>126 Hours</td>
      </tr>

      <tr>
        <td>Attendance Compliance</td>
        <td>96.8%</td>
      </tr>
    </tbody>
  </table>

  <div class="section-title">Attendance Insights</div>

  <p class="note">
    Attendance levels remain consistently above organizational targets.
    Remote work participation continues to support workforce flexibility,
    while overtime utilization remains within acceptable operational limits.
    Late arrivals and absenteeism remain low, indicating strong employee engagement
    and effective attendance governance practices.
  </p>

  <div class="section-title">Attendance Recommendations</div>

  <table>
    <thead>
      <tr>
        <th>Area</th>
        <th>Recommendation</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>Punctuality</td>
        <td>Continue monitoring late arrival trends.</td>
      </tr>

      <tr>
        <td>Remote Work</td>
        <td>Maintain hybrid work policy controls.</td>
      </tr>

      <tr>
        <td>Productivity</td>
        <td>Track overtime utilization monthly.</td>
      </tr>

      <tr>
        <td>Compliance</td>
        <td>Maintain attendance compliance above 95%.</td>
      </tr>

      <tr>
        <td>Employee Wellbeing</td>
        <td>Monitor attendance patterns to identify potential burnout risks.</td>
      </tr>
    </tbody>
  </table>
`;
  break;

    case "Leave":

     reportContent = `
        <div class="section-title">Leave Report</div>

        <p class="note">
        Leave utilization remains within approved workforce planning thresholds.
        The majority of leave requests continue to be approved while maintaining
        operational continuity. Pending requests are being reviewed in accordance
        with company policy and workforce availability requirements.
        </p>
        `;

      reportTable = `
        <table>
          <thead>
            <tr>
              <th>Leave Type</th>
              <th>Count</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Approved</td>
              <td>18</td>
            </tr>

            <tr>
              <td>Pending</td>
              <td>7</td>
            </tr>

            <tr>
              <td>Rejected</td>
              <td>2</td>
            </tr>

            <tr>
              <td>Sick Leave</td>
              <td>12</td>
            </tr>

            <tr>
              <td>Annual Leave</td>
              <td>9</td>
            </tr>

            <tr>
              <td>Emergency Leave</td>
              <td>4</td>
            </tr>

              <tr>
                <td>Maternity/Paternity Leave</td>
                <td>2</td>
              </tr>
            </tbody>
          </table>

          <div class="section-title">Leave Insights</div>

          <p class="note">
          Leave demand remains stable across departments with no significant workforce
          capacity risks identified. Sick leave utilization remains within historical
          averages while annual leave requests are aligned with seasonal workforce planning.
          Overall leave approval rates indicate effective leave management and resource allocation.
          </p>

        <div class="section-title">Leave Recommendations</div>

        <table>
          <thead>
            <tr>
              <th>Focus Area</th>
              <th>Recommendation</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Planning</td>
              <td>Encourage employees to submit leave requests in advance.</td>
            </tr>

            <tr>
              <td>Coverage</td>
              <td>Ensure backup resources are identified during peak leave periods.</td>
            </tr>

            <tr>
              <td>Wellbeing</td>
              <td>Promote work-life balance through planned leave utilization.</td>
            </tr>

            <tr>
              <td>Compliance</td>
              <td>Maintain adherence to organizational leave approval policies.</td>
            </tr>
          </tbody>
        </table>
        `;
      break;

    case "Onboarding":

      reportContent = `

        <div class="section-title">Onboarding Report</div>
        <p class="note">
          New employee onboarding activities are progressing according to established HR timelines.
          Most onboarding milestones have been completed successfully, ensuring new hires are equipped
          with the necessary tools, access rights, training resources, and organizational guidance
          required for productive workforce integration.
        </p>
      `;

      reportTable = `

        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Create Employee ID</td><td>Completed</td></tr>
            <tr><td>Issue Laptop</td><td>Pending</td></tr>
            <tr><td>Create Email</td><td>Completed</td></tr>
            <tr><td>Background Verification</td><td>Completed</td></tr>
            <tr><td>IT Access Provisioning</td><td>Completed</td></tr>
            <tr><td>Manager Introduction</td><td>Completed</td></tr>
            <tr><td>Policy Orientation</td><td>Completed</td></tr>
            <tr><td>Benefits Enrollment</td><td>In Progress</td></tr>
            <tr><td>Training Assignment</td><td>Completed</td></tr>
          </tbody>
        </table>

        <div class="section-title">Onboarding Insights</div>

        <p class="note">
          Employee onboarding completion rates remain strong across all departments.
          Most new hires complete mandatory onboarding activities within the expected
          timeline, reducing operational delays and improving workforce readiness.
          Collaboration between HR Operations, IT Services, and department managers
          continues to streamline the employee integration process.
        </p>

        <div class="section-title">Onboarding Recommendations</div>

        <table>
          <thead>
            <tr>
              <th>Focus Area</th>
              <th>Recommendation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Equipment Readiness</td>
              <td>Ensure all employee devices are provisioned before joining dates.</td>
            </tr>
            <tr>
              <td>Training</td>
              <td>Expand role-specific onboarding and compliance training programs.</td>
            </tr>
            <tr>
              <td>Employee Engagement</td>
              <td>Schedule structured manager check-ins during the first 30 days.</td>
            </tr>
            <tr>
              <td>Documentation</td>
              <td>Digitize onboarding forms and automate approval workflows.</td>
            </tr>
            <tr>
              <td>Compliance</td>
              <td>Track onboarding completion metrics through monthly audits.</td>
            </tr>
            <tr>
              <td>Mentorship</td>
              <td>Assign onboarding mentors to improve employee integration and retention.</td>
            </tr>
          </tbody>
        </table>
      `;
        break;


   case "Compliance":

      reportContent = `

        <div class="section-title">Compliance Report</div>
        <p class="note">
          Organizational compliance activities continue to meet internal governance standards and regulatory requirements.
          Employee training completion rates remain high, policy acknowledgements are actively monitored,
          and compliance audits indicate strong adherence to corporate controls and operational procedures.
        </p>
        `;

      reportTable = `

        <table>
          <thead>
            <tr>
              <th>Compliance Item</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Code of Conduct Training</td><td>Completed</td></tr>
            <tr><td>Security Awareness Training</td><td>Completed</td></tr>
            <tr><td>Policy Acknowledgement</td><td>Pending</td></tr>
            <tr><td>Risk Assessment Review</td><td>Completed</td></tr>
            <tr><td>Internal Audit Completion</td><td>Completed</td></tr>
            <tr><td>Vendor Security Review</td><td>Completed</td></tr>
            <tr><td>Data Privacy Compliance</td><td>Completed</td></tr>
            <tr><td>Regulatory Documentation</td><td>Completed</td></tr>
            <tr><td>Annual Ethics Certification</td><td>In Progress</td></tr>
          </tbody>
        </table>

        <div class="section-title">Compliance Insights</div>

        <p class="note">
          Compliance performance remains strong across all monitored categories.
          Training completion rates exceed organizational targets and internal audits
          have identified no material control deficiencies. Ongoing policy acknowledgement
          tracking and periodic risk assessments continue to strengthen governance practices
          and regulatory readiness.
        </p>

        <div class="section-title">Compliance Recommendations</div>

        <table>
          <thead>
            <tr>
              <th>Focus Area</th>
              <th>Recommendation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Training</td>
              <td>Maintain mandatory compliance training completion above 95%.</td>
            </tr>
            <tr>
              <td>Policy Management</td>
              <td>Track pending policy acknowledgements through automated reminders.</td>
            </tr>
            <tr>
              <td>Audit Readiness</td>
              <td>Conduct quarterly internal compliance reviews and control assessments.</td>
            </tr>
            <tr>
              <td>Data Protection</td>
              <td>Strengthen employee awareness of privacy and information security requirements.</td>
            </tr>
            <tr>
              <td>Risk Management</td>
              <td>Review compliance risks and mitigation plans on a monthly basis.</td>
            </tr>
          </tbody>
        </table>
        `;
        break;

        }

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${name}</title>
  <style>
    @page { size: A4; margin: 22mm; }
    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
      color: #172033;
      background: #f6f8fb;
    }
      .sheet {
      background: #ffffff;
      border: 1px solid #d9e2ef;
      box-shadow: 0 18px 50px rgba(15, 23, 42, 0.12);
      min-height: 960px;
      padding: 36px;
      position: relative;
      box-sizing: border-box;
    }
    .topbar {
      height: 8px;
      background: linear-gradient(90deg, #7c3aed, #06b6d4, #ec4899);
      margin: -36px -36px 28px;
    }
    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      border-bottom: 2px solid #e5edf8;
      padding-bottom: 22px;
    }
    .brand { font-size: 12px; letter-spacing: 4px; color: #0891b2; font-weight: 700; }
    h1 { margin: 8px 0 6px; font-size: 30px; color: #0f172a; }
    .subtitle { color: #64748b; line-height: 1.5; font-size: 14px; }
    .badge {
      border: 1px solid #bfdbfe;
      background: #eff6ff;
      color: #1d4ed8;
      border-radius: 999px;
      padding: 8px 14px;
      font-weight: 700;
      font-size: 12px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;
      margin: 28px 0;
    }
    .metric {
      border: 1px solid #dbe7f5;
      border-radius: 14px;
      padding: 16px;
      background: #f8fbff;
    }
    .metric span { display: block; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 1.5px; }
    .metric strong { display: block; margin-top: 8px; font-size: 22px; color: #0f172a; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 18px;
      font-size: 13px;
    }
    th {
      background: #0f172a;
      color: #ffffff;
      text-align: left;
      padding: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 11px;
    }
    td {
      border: 1px solid #e2e8f0;
      padding: 12px;
      color: #1e293b;
    }
    .section-title {
      margin-top: 28px;
      color: #0f172a;
      font-size: 18px;
      font-weight: 800;
    }
    .note {
      border-left: 4px solid #06b6d4;
      background: #ecfeff;
      padding: 14px 16px;
      color: #155e75;
      line-height: 1.6;
      margin-top: 16px;
    }
    .signatures {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 60px;
      margin-top: 70px;
    }
      .signature {
        width: 48%;
        border-top: 1px solid #94a3b8;
        padding-top: 12px;
        color: #334155;
        font-size: 12px;
        line-height: 1.5;
      }

        .signature strong {
        display: block;
        margin-bottom: 4px;
        font-size: 14px;
      }

      .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 50px;
        padding-top: 14px;
        border-top: 1px solid #d6e0ef;
        color: #7b8ba8;
        font-size: 12px;
      }
    @media print {
      body { background: #ffffff; }
      .sheet { box-shadow: none; border: 0; }
    }
    </style>
  </head>
  <body>
      <main class="sheet">
        <div class="topbar"></div>
        <section class="header">
          <div>
            <div class="brand">NORTHSTAR MANUFACTURING · HUMAN RESOURCES</div>
            <h1>${name}</h1>
            <div class="subtitle">Enterprise HR report prepared for leadership review, workforce governance, and operational planning.</div>
          </div>
      <div class="badge">${status}</div>
    </section>

    <section class="grid">
      <div class="metric"><span>Report Type</span><strong>${type}</strong></div>
      <div class="metric"><span>Period</span><strong>${period}</strong></div>
      <div class="metric"><span>Owner</span><strong>${owner}</strong></div>
      <div class="metric"><span>Generated</span><strong>${generatedOn}</strong></div>
    </section>

    ${reportContent}

    ${reportTable}

      <div class="signatures">
      <div class="signature">
        <strong>${owner}</strong>
        <div>Prepared by</div>
      </div>

      <div class="signature">
        <strong>Chief People Officer</strong>
        <div>Reviewed and approved</div>
      </div>
    </div>

      <div class="footer">
        <div>Confidential HR report · Tenant scoped</div>
        <div>Report ID: ${fieldValue(report, "id", "HR-RPT-DRAFT")}</div>
      </div>
          </main>
          <script>window.onload = () => setTimeout(() => window.print(), 250);</script>
        </body>
        </html>`;
        }

export default function HrReportsPage() {
  const [reports, setReports] = useState<HrReport[]>([]);
  const [form, setForm] = useState(defaultReport);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Reports are connected to /api/hr/reports.");

  const totals = useMemo(() => {
    const published = reports.filter((report) => ["Published", "Ready"].includes(fieldValue(report, "status", ""))).length;
    return [
      { label: "Reports", value: reports.length, note: "Live HR records" },
      { label: "Published", value: published, note: "Leadership ready" },
      { label: "Drafts", value: Math.max(reports.length - published, 0), note: "Needs review" },
      { label: "Coverage", value: "4", note: "HR domains tracked" },
    ];
  }, [reports]);

  async function loadReports() {
    setLoading(true);
    try {
      const response = await fetch("/api/hr/reports", { cache: "no-store" });
      const json = await response.json();
      setReports(json?.data?.data ?? []);
      setMessage("Latest HR reports loaded from the backend.");
    } catch {
      setMessage("Unable to load HR reports. Check the dev server and API route.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReports();
  }, []);

  async function createReport() {
    setLoading(true);
    try {
      const response = await fetch("/api/hr/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status: "Ready" }),
      });
      const json = await response.json();
      if (json?.success) {
        setForm(defaultReport);
        setMessage("HR report created and synced to the API.");
        await loadReports();
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateReport(report: HrReport, status: string) {
    await fetch(`/api/hr/reports/${report.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setMessage(`${fieldValue(report, "name", "Report")} moved to ${status}.`);
    await loadReports();
  }

  async function deleteReport(report: HrReport) {
    await fetch(`/api/hr/reports/${report.id}`, { method: "DELETE" });
    setMessage(`${fieldValue(report, "name", "Report")} deleted.`);
    await loadReports();
  }

  function downloadPdf(report: HrReport) {
    const html = buildHrReportHtml(report);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(url), 15000);
    setMessage("PDF preview opened. Choose Save as PDF in the print dialog.");
  }

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">Human Resources</p>
          <h1 className="mt-3 flex items-center gap-3 text-4xl font-bold text-white">
            <FileText className="h-9 w-9 text-cyan-300" />
            HR reports
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-300">
            Build realistic workforce, attendance, leave, and onboarding reports from the live HR backend.
          </p>
        </div>
        <button
          onClick={loadReports}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:border-cyan-300/60 hover:bg-white/10"
        >
          <RefreshCw className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
          Refresh reports
        </button>
      </section>

      <section className="grid gap-5 md:grid-cols-4">
        {totals.map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_50px_rgba(124,58,237,0.12)] backdrop-blur-xl">
            <p className="text-slate-300">{item.label}</p>
            <p className="mt-5 text-4xl font-bold text-white">{item.value}</p>
            <p className="mt-3 text-cyan-300">{item.note}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_0_70px_rgba(124,58,237,0.16)] backdrop-blur-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Create HR report</h2>
            <p className="mt-2 text-slate-300">Report records are saved to the HR API and can be exported as realistic PDFs.</p>
          </div>
          <BarChart3 className="h-7 w-7 text-cyan-300" />
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-[1.2fr_1fr_1fr_1fr_auto]">
          <label className="space-y-2">
            <span className="font-semibold text-white">Report name</span>
            <input
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
              placeholder="Enter Report Name"
            />
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-white">Type</span>
            <select
              value={form.type}
              onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))}
              className="h-14 w-full rounded-xl border border-white/10 bg-slate-900 px-5 text-white outline-none transition focus:border-cyan-300 [&>option]:bg-slate-950 [&>option]:text-white"
            >
              {reportTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-white">Period</span>
            <input
              value={form.period}
              onChange={(event) => setForm((current) => ({ ...current, period: event.target.value }))}
              className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
            />
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-white">Owner</span>
            <input
              value={form.owner}
              onChange={(event) => setForm((current) => ({ ...current, owner: event.target.value }))}
              className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
            />
          </label>
          <button
            onClick={createReport}
            disabled={loading}
            className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 px-8 font-bold text-white shadow-[0_0_35px_rgba(236,72,153,0.35)] transition hover:scale-[1.02] disabled:opacity-60"
          >
            <Send className="h-5 w-5" />
            Create
          </button>
        </div>
        <p className="mt-5 rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-100">{message}</p>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_0_70px_rgba(124,58,237,0.14)] backdrop-blur-xl">
        <h2 className="text-2xl font-bold text-white">Report library</h2>
        <p className="mt-2 text-slate-300">Live HR report records from the backend API.</p>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <thead>
              <tr className="border-b border-white/10 text-sm uppercase tracking-[0.28em] text-cyan-300">
                <th className="px-4 py-4">Report</th>
                <th className="px-4 py-4">Type</th>
                <th className="px-4 py-4">Period</th>
                <th className="px-4 py-4">Owner</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-white/10 text-white even:bg-white/[0.03]">
                  <td className="px-4 py-5">
                    <div className="font-semibold">{fieldValue(report, "name", "HR report")}</div>
                    <div className="text-sm text-slate-400">{report.id}</div>
                  </td>
                  <td className="px-4 py-5">{fieldValue(report, "type")}</td>
                  <td className="px-4 py-5">{fieldValue(report, "period")}</td>
                  <td className="px-4 py-5 whitespace-nowrap">
                    {fieldValue(report, "owner")}
                  </td>
                  <td className="px-4 py-5">
                    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-100">
                      {fieldValue(report, "status", "Ready")}
                    </span>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex flex-nowrap justify-end gap-3">

                      <button
                        onClick={() => updateReport(report, "Published")}
                        className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-emerald-300/20 bg-emerald-400/15 px-4 py-3 font-semibold text-emerald-100 transition hover:bg-emerald-400/25"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Publish
                      </button>

                      <button
                        onClick={() => updateReport(report, "Draft")}
                        className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-amber-300/20 bg-amber-400/15 px-4 py-3 font-semibold text-amber-100 transition hover:bg-amber-400/25"
                      >
                        <FileText className="h-4 w-4" />
                        Draft
                      </button>

                      <button
                        onClick={() => downloadPdf(report)}
                        className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-violet-300/20 bg-violet-400/15 px-4 py-3 font-semibold text-violet-100 transition hover:bg-violet-400/25"
                      >
                        <Download className="h-4 w-4" />
                        PDF
                      </button>

                      <button
                        onClick={() => deleteReport(report)}
                        className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-rose-300/20 bg-rose-400/15 px-4 py-3 font-semibold text-rose-100 transition hover:bg-rose-400/25"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
