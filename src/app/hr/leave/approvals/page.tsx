"use client";

import { Button } from "@/components/ui/button";
import { HrStatusBadge } from "@/components/hr/HrStatusBadge";
import { HrTable } from "@/components/hr/HrTable";
import { useHrStore } from "@/store/hr-store";

export default function LeaveApprovalsPage() {
  const leaveRequests = useHrStore(
    (state) => state.leaveRequests
  );

  const pendingLeaveRequests = useHrStore(
    (state) => state.pendingLeaveRequests
  );

  console.log(
    "Pending Leave Requests:",
    pendingLeaveRequests
  );

  const approveLeave = useHrStore(
    (state) => state.approveLeave
  );

  const rejectLeave = useHrStore(
    (state) => state.rejectLeave
  );
  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-semibold">Leave approvals</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Approve or reject pending leave requests.</p><p className="text-red-500 font-bold">
        Pending Count: {pendingLeaveRequests.length}
      </p></div>
      <HrTable
        title="Pending Leave Requests"
        description="Employee leave requests awaiting approval."
        headers={[
          "Request",
          "Employee",
          "Type",
          "Dates",
          "Status",
          "Action"
        ]}
        rows={pendingLeaveRequests.map((row) => [row.id, row.employeeName, row.type, `${row.from} - ${row.to}`, <HrStatusBadge key="status" status={row.status} />, <div key="actions" className="flex gap-2"><Button
          size="sm"
          onClick={() => approveLeave(row.id)}
        >
          Approve
        </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => rejectLeave(row.id)}
          >
            Reject
          </Button></div>])} />
    </div>
  );
}
