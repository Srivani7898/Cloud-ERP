"use client";

import { LeaveForm } from "@/components/hr/LeaveForm";
import { HrStatusBadge } from "@/components/hr/HrStatusBadge";
import { HrTable } from "@/components/hr/HrTable";
import { useHrStore } from "@/store/hr-store";

export default function ApplyLeavePage() {
  const leaveRequests = useHrStore((state) => state.leaveRequests);
  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-semibold">Apply leave</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Create employee leave requests for approval.</p></div>
      <LeaveForm />
      <HrTable title="Leave requests" description="Submitted leave activity." headers={["Request", "Employee", "Type", "Dates", "Days", "Status"]} rows={leaveRequests.map((row) => [row.id, row.employeeName, row.type, `${row.from} - ${row.to}`, row.days, <HrStatusBadge key="status" status={row.status} />])} />
    </div>
  );
}
