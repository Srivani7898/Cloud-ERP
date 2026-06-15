"use client";

import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HrTable } from "@/components/hr/HrTable";
import { useAuthStore } from "@/store/auth-store";
import { downloadComplianceCertificatePdf, downloadOfferLetterPdf, downloadSimplePdf, downloadTaxDeclarationPdf, employeeFileName } from "@/utils/pdf";

const documents = [
  {
    name: "Offer Letter",
    category: "Employment",
    date: "2026-06-01",
    owner: "People Operations",
    lines: [
      "NORTHSTAR MANUFACTURING PVT LTD",
      "People Operations Department",
      "Corporate Office: Bengaluru, India",
      "Document Ref: HR/EVL/2026/1001",
      "Date of Issue: 2026-06-01",
      "------------------------------------------------------------",
      "TO WHOM IT MAY CONCERN",
      "",
      "This is to certify that the employee named above is currently employed",
      "with Northstar Manufacturing Pvt Ltd. The employment details are listed",
      "below for official verification purposes.",
      "",
      "+----------------------+-----------------------------+",
      "| Employment Status    | Active                      |",
      "| Employment Type      | Full Time                   |",
      "| Department           | People Operations           |",
      "| Designation          | HR Business Partner         |",
      "| Work Location        | Bengaluru                   |",
      "| Joining Date         | 2024-02-12                  |",
      "+----------------------+-----------------------------+",
      "",
      "Authorized Signatory",
      "Signature: ____________________",
      "People Operations"
    ]
  },
  {
    name: "Tax Declaration Summary",
    category: "Payroll",
    date: "2026-04-01",
    owner: "Payroll",
    lines: [
      "TAX DECLARATION FORM",
      "Financial Year: FY2026",
      "Employer: Northstar Manufacturing Pvt Ltd",
      "Payroll Reference: TAX/FY2026/NS-1001",
      "------------------------------------------------------------",
      "",
      "Employee Declaration",
      "+-------------------------------+---------------+",
      "| Section                       | Amount        |",
      "+-------------------------------+---------------+",
      "| 80C Retirement Contributions  | $3,200        |",
      "| Health Insurance              | $1,200        |",
      "| Housing Allowance             | $4,800        |",
      "| Professional Tax              | $720          |",
      "| Standard Deduction            | $1,500        |",
      "+-------------------------------+---------------+",
      "",
      "Declaration: I confirm that the above details are correct and submitted",
      "for payroll tax computation in Cloud ERP.",
      "",
      "Employee Signature: ____________________",
      "Payroll Verified By: ___________________"
    ]
  },
  {
    name: "Compliance Training Certificate",
    category: "Training",
    date: "2026-05-12",
    owner: "Learning & Development",
    lines: [
      "CERTIFICATE OF COMPLIANCE",
      "============================================================",
      "Certificate Authority: Northstar Manufacturing Compliance Office",
      "This certificate confirms successful completion of mandatory",
      "enterprise compliance training.",
      "",
      "+----------------------+-----------------------------+",
      "| Course               | ERP Security and Privacy    |",
      "| Completion Date      | 2026-05-12                  |",
      "| Score                | 94%                         |",
      "| Certificate Status   | Valid                       |",
      "| Expiry Date          | 2027-05-12                  |",
      "+----------------------+-----------------------------+",
      "",
      "Compliance Officer: Priya Desai",
      "Authorized Signature: ____________________",
      "Certificate ID: CERT-ERP-2026-1001"
    ]
  }
];

export default function EmployeeDocumentsPage() {
  const user = useAuthStore((state) => state.user);
  const employeeName = user?.name ?? "Employee";

  return (
    <div className="space-y-6">
      <div><h2 className="flex items-center gap-2 text-2xl font-semibold"><FileText className="h-5 w-5 text-blue-600 dark:text-cyan-300" />Documents</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Download realistic HR and payroll documents as PDFs.</p></div>
      <HrTable
        title="My documents"
        description="Secure employee document center."
        headers={["Document", "Category", "Owner", "Date", "Action"]}
        rows={documents.map((doc) => [
          doc.name,
          doc.category,
          doc.owner,
          doc.date,
          <Button
            key="download"
            size="sm"
            variant="outline"
            onClick={() =>
              doc.name === "Compliance Training Certificate"
                ? downloadComplianceCertificatePdf(employeeFileName(employeeName, doc.name), employeeName)
                : doc.name === "Offer Letter"
                  ? downloadOfferLetterPdf(employeeFileName(employeeName, doc.name), employeeName)
                  : doc.name === "Tax Declaration Summary"
                    ? downloadTaxDeclarationPdf(employeeFileName(employeeName, doc.name), employeeName)
                    : downloadSimplePdf(employeeFileName(employeeName, doc.name), doc.name, [`Employee Name: ${employeeName}`, "Employee Code: NS-1001", "", ...doc.lines])
            }
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        ])}
      />
    </div>
  );
}
