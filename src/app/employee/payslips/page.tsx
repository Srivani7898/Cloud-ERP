"use client";

import { Download, WalletCards } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HrTable } from "@/components/hr/HrTable";
import { useAuthStore } from "@/store/auth-store";
import { usePayrollStore } from "@/store/payroll-store";
import {
  downloadPayslipPdf,
  employeeFileName,
} from "@/utils/pdf";

export default function EmployeePayslipsPage() {
  const user = useAuthStore(
    (state) => state.user
  );

  const employeeName =
    user?.name ?? "Employee";

  const allPayslips = usePayrollStore(
    (state) => state.payslips
  );

  const payslips = allPayslips.filter(
    (slip) =>
      slip.employeeName === employeeName
  );

  function money(amount: number) {
    return new Intl.NumberFormat(
      "en-US",
      {
        style: "currency",
        currency: "USD",
      }
    ).format(amount);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <WalletCards className="h-5 w-5 text-blue-600 dark:text-cyan-300" />
          Salary Slips
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          View and download monthly salary slips.
        </p>
      </div>

      <HrTable
        title="Payslips"
        description="Payroll documents available for download."
        headers={[
          "Payslip ID",
          "Period",
          "Gross Pay",
          "Deductions",
          "Net Pay",
          "Generated Date",
          "Action",
        ]}
        rows={payslips.map((slip) => [
          slip.id,
          slip.period,
          money(slip.grossPay),
          money(slip.deductions),
          money(slip.netPay),
          slip.generatedAt,

          <Button
            key={slip.id}
            size="sm"
            variant="outline"
            onClick={() =>
              downloadPayslipPdf(
                employeeFileName(
                  employeeName,
                  `payslip-${slip.id}`
                ),
                {
                  employeeName,

                  employeeCode:
                    slip.employeeCode,

                  department:
                    slip.department,

                  designation:
                    slip.designation,

                  month: slip.period,

                  payDate:
                    slip.generatedAt,

                  gross: money(
                    slip.grossPay
                  ),

                  deductions: money(
                    slip.deductions
                  ),

                  net: money(
                    slip.netPay
                  ),

                  earnings: [
                    [
                      "Basic Salary",
                      money(
                        slip.grossPay
                      ),
                    ],
                  ],

                  deductionsBreakup: [
                    [
                      "Tax",
                      money(slip.tax),
                    ],
                    [
                      "Other Deductions",
                      money(
                        slip.deductions -
                        slip.tax
                      ),
                    ],
                  ],
                }
              )
            }
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>,
        ])}
      />
    </div>
  );
}