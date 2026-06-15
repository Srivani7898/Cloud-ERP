"use client";

import { ShieldCheck } from "lucide-react";
import { PayrollTable } from "@/components/payroll/PayrollTable";
import { usePayrollStore } from "@/store/payroll-store";

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export default function PayrollTaxPage() {
  const taxRecords = usePayrollStore((state) => state.taxRecords);
  return (
    <div className="space-y-6">
      <div><h2 className="flex items-center gap-2 text-2xl font-semibold"><ShieldCheck className="h-5 w-5 text-blue-600 dark:text-cyan-300" />Tax calculation view</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Taxable income, withholding, and retirement contribution visibility.</p></div>
      <PayrollTable title="Tax records" description="Employee tax computation summary." headers={["Record", "Employee", "Region", "Taxable Income", "Tax Withheld", "Retirement Contribution"]} rows={taxRecords.map((record) => [record.id, record.employeeName, record.region, money(record.taxableIncome), money(record.taxWithheld), money(record.retirementContribution)])} />
    </div>
  );
}
