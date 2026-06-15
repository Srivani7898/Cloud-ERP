"use client";

import { Download, WalletCards } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HrTable } from "@/components/hr/HrTable";
import { useAuthStore } from "@/store/auth-store";
import { downloadPayslipPdf, employeeFileName } from "@/utils/pdf";

const payslips = [
  {
    id: "MAY-2026",
    month: "May 2026",
    gross: 8400,
    deductions: 1120,
    net: 7280,
    payDate: "2026-05-31",
    earnings: [
      ["Basic Pay", 5200],
      ["House Rent Allowance", 1450],
      ["Special Allowance", 1250],
      ["Performance Bonus", 500]
    ],
    deductionsBreakup: [
      ["Federal Tax", 620],
      ["Provident Fund", 320],
      ["Health Insurance", 120],
      ["Professional Tax", 60]
    ]
  },
  {
    id: "APR-2026",
    month: "April 2026",
    gross: 8400,
    deductions: 1118,
    net: 7282,
    payDate: "2026-04-30",
    earnings: [
      ["Basic Pay", 5200],
      ["House Rent Allowance", 1450],
      ["Special Allowance", 1250],
      ["Performance Bonus", 500]
    ],
    deductionsBreakup: [
      ["Federal Tax", 618],
      ["Provident Fund", 320],
      ["Health Insurance", 120],
      ["Professional Tax", 60]
    ]
  },
  {
    id: "MAR-2026",
    month: "March 2026",
    gross: 8400,
    deductions: 1130,
    net: 7270,
    payDate: "2026-03-31",
    earnings: [
      ["Basic Pay", 5200],
      ["House Rent Allowance", 1450],
      ["Special Allowance", 1250],
      ["Performance Bonus", 500]
    ],
    deductionsBreakup: [
      ["Federal Tax", 630],
      ["Provident Fund", 320],
      ["Health Insurance", 120],
      ["Professional Tax", 60]
    ]
  }
];

export default function EmployeePayslipsPage() {
  const user = useAuthStore((state) => state.user);
  const employeeName = user?.name ?? "Employee";

  function money(amount: number) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
  }

  return (
    <div className="space-y-6">
      <div><h2 className="flex items-center gap-2 text-2xl font-semibold"><WalletCards className="h-5 w-5 text-blue-600 dark:text-cyan-300" />Salary slips</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">View and download monthly salary slips.</p></div>
      <HrTable
        title="Payslips"
        description="Payroll documents available for download."
        headers={["Period", "Month", "Gross", "Deductions", "Net", "Pay Date", "Action"]}
        rows={payslips.map((slip) => [
          slip.id,
          slip.month,
          money(slip.gross),
          money(slip.deductions),
          money(slip.net),
          slip.payDate,
          <Button
            key="download"
            size="sm"
            variant="outline"
            onClick={() =>
              downloadPayslipPdf(employeeFileName(employeeName, `payslip-${slip.id}`), {
                employeeName,
                employeeCode: "NS-1001",
                department: "People Operations",
                designation: "HR Business Partner",
                month: slip.month,
                payDate: slip.payDate,
                gross: money(slip.gross),
                deductions: money(slip.deductions),
                net: money(slip.net),
                earnings: slip.earnings.map(([label, value]) => [String(label), money(Number(value))]),
                deductionsBreakup: slip.deductionsBreakup.map(([label, value]) => [String(label), money(Number(value))])
              })
            }
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        ])}
      />
    </div>
  );
}
