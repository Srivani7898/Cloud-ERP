"use client";

import { CalendarCheck } from "lucide-react";
import { AttendanceForm } from "@/components/hr/AttendanceForm";
import { HrStatusBadge } from "@/components/hr/HrStatusBadge";
import { HrTable } from "@/components/hr/HrTable";
import { useHrStore } from "@/store/hr-store";

export default function DailyAttendancePage() {
  const attendance = useHrStore((state) => state.attendance);
  return (
    <div className="space-y-6">
      <div><h2 className="flex items-center gap-2 text-2xl font-semibold"><CalendarCheck className="h-5 w-5 text-blue-600 dark:text-cyan-300" />Daily attendance</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Record and monitor employee daily attendance.</p></div>
      <AttendanceForm />
      <HrTable title="Attendance records" description="Daily attendance activity." headers={["Employee", "Date", "Check In", "Check Out", "Status"]} rows={attendance.map((row) => [row.employeeName, row.date, row.checkIn, row.checkOut, <HrStatusBadge key="status" status={row.status} />])} />
    </div>
  );
}
