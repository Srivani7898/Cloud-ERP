"use client";

import { Button } from "@/components/ui/button";
import { HrStatusBadge } from "@/components/hr/HrStatusBadge";
import { HrTable } from "@/components/hr/HrTable";
import { useHrStore } from "@/store/hr-store";

export default function LeaveApprovalsPage() {
  const { leaveRequests, updateLeaveStatus } = useHrStore();
  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-semibold">Leave approvals</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Approve or reject pending leave requests.</p></div>
      <HrTable title="Approval queue" description="Manager-facing leave approval workflow." headers={["Request", "Employee", "Type", "Dates", "Status", "Action"]} rows={leaveRequests.map((row) => [row.id, row.employeeName, row.type, `${row.from} - ${row.to}`, <HrStatusBadge key="status" status={row.status} />, <div key="actions" className="flex gap-2"><Button size="sm" onClick={() => updateLeaveStatus(row.id, "approved")}>Approve</Button><Button size="sm" variant="outline" onClick={() => updateLeaveStatus(row.id, "rejected")}>Reject</Button></div>])} />
    </div>
  );
}
