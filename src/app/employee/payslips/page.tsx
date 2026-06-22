"use client";

import { useEffect, useState } from "react";
import { Download, WalletCards } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HrTable } from "@/components/hr/HrTable";
import { useAuthStore } from "@/store/auth-store";
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

  const [allPayslips, setAllPayslips] =
    useState<any[]>([]);

  useEffect(() => {
    async function loadPayslips() {
      try {
        const response = await fetch(
          "/api/payroll/payslips",
          {
            cache: "no-store",
          }
        );

        const payload =
          await response.json();

        setAllPayslips(
          payload?.data?.data ?? []
        );
      } catch (error) {
        console.error(error);
      }
    }

    loadPayslips();
  }, []);

  const payslips = allPayslips.filter(
    (slip) =>
      (
        slip.employee ||
        slip.employeeName ||
        ""
      )
        .toLowerCase()
        .trim() ===
      employeeName
        .toLowerCase()
        .trim()
  );

  console.log(
    "Employee Payslips:",
    payslips
  );

  function money(
    amount: number = 0
  ) {
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
          money(slip.gross),
          money(slip.deductions),
          money(slip.net),
          new Date(
            slip.createdAt
          ).toLocaleDateString(),

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
                    slip.employeeCode ||
                    "EMP-1001",

                  department:
                    slip.department ||
                    "Engineering",

                  designation:
                    slip.designation ||
                    "Software Engineer",

                  month: slip.period,

                  payDate: new Date(
                    slip.createdAt
                  ).toLocaleDateString(),

                  companyName:
                    "Cloud ERP Technologies Pvt Ltd",

                  companyAddress:
                    "Bangalore, Karnataka, India",

                  bankName:
                    "State Bank of India",

                  accountNumber:
                    "XXXXXX4587",

                  panNumber:
                    "ABCDE1234F",

                  uanNumber:
                    "100245678912",

                  gross: money(
                    slip.gross
                  ),

                  deductions: money(
                    slip.deductions
                  ),

                  net: money(
                    slip.net
                  ),

                  earnings: [
                    [
                      "Basic Salary",
                      money(
                        slip.gross * 0.6
                      ),
                    ],
                    [
                      "House Rent Allowance",
                      money(
                        slip.gross * 0.2
                      ),
                    ],
                    [
                      "Special Allowance",
                      money(
                        slip.gross * 0.1
                      ),
                    ],
                    [
                      "Medical Allowance",
                      money(
                        slip.gross * 0.05
                      ),
                    ],
                    [
                      "Travel Allowance",
                      money(
                        slip.gross * 0.05
                      ),
                    ],
                  ],

                  deductionsBreakup: [
                    [
                      "Income Tax",
                      money(
                        slip.deductions * 0.5
                      ),
                    ],
                    [
                      "Provident Fund",
                      money(
                        slip.deductions * 0.3
                      ),
                    ],
                    [
                      "Professional Tax",
                      money(
                        slip.deductions * 0.1
                      ),
                    ],
                    [
                      "Insurance",
                      money(
                        slip.deductions * 0.1
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