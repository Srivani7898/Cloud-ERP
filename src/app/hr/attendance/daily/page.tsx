"use client";

import { CalendarCheck, CheckCircle2, XCircle } from "lucide-react";
import { AttendanceForm } from "@/components/hr/AttendanceForm";
import { HrStatusBadge } from "@/components/hr/HrStatusBadge";
import { HrTable } from "@/components/hr/HrTable";
import { useHrStore } from "@/store/hr-store";

export default function DailyAttendancePage() {
  const attendance = useHrStore((state) => state.attendance);

  const pendingAttendance = useHrStore(
    (state) => state.pendingAttendance
  );

  const approveAttendance = useHrStore(
    (state) => state.approveAttendance
  );

  const rejectAttendance = useHrStore(
    (state) => state.rejectAttendance
  );
  return (
    <div className="space-y-6">
      <div><h2 className="flex items-center gap-2 text-2xl font-semibold"><CalendarCheck className="h-5 w-5 text-blue-600 dark:text-cyan-300" />Daily attendance</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Record and monitor employee daily attendance.</p></div>
      <AttendanceForm />

          <p className="text-red-500 font-semibold">
            Pending Requests: {pendingAttendance.length}
          </p>

          <HrTable
            title="Pending Attendance Requests"
            description="Employee attendance awaiting HR approval."
            headers={[
              "Employee",
              "Date",
              "Check In",
              "Check Out",
              "Status",
              "Actions",
            ]}

            rows={pendingAttendance.map((row) => [
              row.employeeName,
              row.date,
              row.checkIn,
              row.checkOut,
              <HrStatusBadge
                key={`pending-${row.id}`}
                status={row.status}
              />,
                              <div
                key={`actions-${row.id}`}
                className="flex items-center justify-center gap-2"
              >
                <button
                  onClick={() => approveAttendance(row.id)}
                  className="rounded-md bg-green-600 px-3 py-1 text-sm font-medium text-white hover:bg-green-700"
                >
                  Approve
                </button>

                <button
                  onClick={() => rejectAttendance(row.id)}
                  className="rounded-md bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            ])}
          />
      <HrTable title="Attendance records" description="Daily attendance activity." headers={["Employee", "Date", "Check In", "Check Out", "Status"]} rows={attendance.map((row) => [row.employeeName, row.date, row.checkIn, row.checkOut, <HrStatusBadge key="status" status={row.status} />])} />
    </div>
  );
}
