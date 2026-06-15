"use client";

import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PayrollRunForm } from "@/components/payroll/PayrollRunForm";
import { PayrollStatusBadge } from "@/components/payroll/PayrollStatusBadge";
import { PayrollTable } from "@/components/payroll/PayrollTable";
import { usePayrollStore } from "@/store/payroll-store";

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export default function PayrollRunsPage() {
  const { runs, processRun } = usePayrollStore();
  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-semibold">Payroll runs</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Create, process, and send payroll runs for approval.</p></div>
      <PayrollRunForm />
      <PayrollTable title="Runs" description="Salary processing runs." headers={["Run", "Period", "Pay Date", "Employees", "Gross", "Deductions", "Net", "Status", "Action"]} rows={runs.map((run) => [run.id, run.period, run.payDate, run.employees, money(run.grossPay), money(run.deductions), money(run.netPay), <PayrollStatusBadge key="status" status={run.status} />, <Button key="action" size="sm" disabled={run.status !== "draft"} onClick={() => processRun(run.id)}><Play className="h-4 w-4" />Process</Button>])} />
    </div>
  );
}
