"use client";

import { History } from "lucide-react";
import { PayrollTable } from "@/components/payroll/PayrollTable";
import { usePayrollStore } from "@/store/payroll-store";

export default function PayrollHistoryPage() {
  const history = usePayrollStore((state) => state.history);
  return (
    <div className="space-y-6">
      <div><h2 className="flex items-center gap-2 text-2xl font-semibold"><History className="h-5 w-5 text-blue-600 dark:text-cyan-300" />Payroll history</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Auditable payroll activity history.</p></div>
      <PayrollTable title="History" description="Payroll engine audit trail." headers={["ID", "Action", "Actor", "Timestamp", "Entity"]} rows={history.map((item) => [item.id, item.action, item.actor, item.timestamp, item.entity])} />
    </div>
  );
}
