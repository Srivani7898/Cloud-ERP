"use client";

import { LeaveForm } from "@/components/hr/LeaveForm";
import { HrStatusBadge } from "@/components/hr/HrStatusBadge";
import { HrTable } from "@/components/hr/HrTable";
import { useHrStore } from "@/store/hr-store";
import { useAuthStore } from "@/store/auth-store";

export default function EmployeeLeavePage() {
  const user = useAuthStore(
    (state) => state.user
  );

  const employees = useHrStore(
    (state) => state.employees
  );

  const employee = employees.find(
    (emp) => emp.name === user?.name
  );

  const leaveRequests = useHrStore(
    (state) => state.leaveRequests
  );

  const pendingLeaveRequests = useHrStore(
    (state) => state.pendingLeaveRequests
  );

  const employeePendingLeaves =
    pendingLeaveRequests.filter(
      (item) =>
        item.employeeName === user?.name
    );

  const employeeLeaveHistory =
    leaveRequests.filter(
      (item) =>
        item.employeeName === user?.name
    );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">
          Apply Leave
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Submit leave requests and track approvals.
        </p>
      </div>

      <LeaveForm />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4">
          <p className="text-sm text-slate-300">
            Annual Leave Balance
          </p>

          <p className="text-3xl font-bold text-green-400">
            {employee?.annualLeaveBalance ?? 0}
          </p>
        </div>

        <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-4">
          <p className="text-sm text-slate-300">
            Sick Leave Balance
          </p>

          <p className="text-3xl font-bold text-cyan-400">
            {employee?.sickLeaveBalance ?? 0}
          </p>
        </div>
      </div>

      <HrTable
        title="Pending Leave Requests"
        description="Waiting for HR approval."
        headers={[
          "Request ID",
          "Type",
          "Dates",
          "Days",
          "Status",
        ]}
        rows={employeePendingLeaves.map(
          (row) => [
            row.id,
            row.type,
            `${row.from} - ${row.to}`,
            row.days,
            <HrStatusBadge
              key={row.id}
              status="pending"
            />,
          ]
        )}
      />

      <HrTable
        title="Leave History"
        description="Approved and rejected leave requests."
        headers={[
          "Request ID",
          "Type",
          "Dates",
          "Days",
          "Status",
        ]}
        rows={employeeLeaveHistory.map(
          (row) => [
            row.id,
            row.type,
            `${row.from} - ${row.to}`,
            row.days,
            <HrStatusBadge
              key={row.id}
              status={row.status}
            />,
          ]
        )}
      />
    </div>
  );
}