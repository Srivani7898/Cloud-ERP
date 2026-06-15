"use client";

import { useState } from "react";
import { CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HrStatusBadge } from "@/components/hr/HrStatusBadge";
import { HrTable } from "@/components/hr/HrTable";
import { useAuthStore } from "@/store/auth-store";
import { useHrStore } from "@/store/hr-store";
import type { AttendanceStatus } from "@/types/hr";

export default function EmployeeAttendancePage() {
  const user = useAuthStore((state) => state.user);
  const attendance = useHrStore((state) => state.attendance);
  const addAttendance = useHrStore((state) => state.addAttendance);
  const today = new Date().toISOString().slice(0, 10);
  const currentTime = new Date().toTimeString().slice(0, 5);
  const [form, setForm] = useState({
    date: today,
    checkIn: currentTime,
    checkOut: "",
    status: "present" as AttendanceStatus,
    workLocation: "Office"
  });
  const employeeName = user?.name ?? "Employee";
  const hasMarkedToday = attendance.some((row) => row.date === form.date && row.employeeName === employeeName);

  function markAttendance() {
    addAttendance({
      employeeName,
      date: form.date,
      checkIn: form.checkIn,
      checkOut: form.checkOut || "-",
      status: form.status
    });
  }

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarCheck className="h-5 w-5 text-blue-600 dark:text-cyan-300" />
            Employee attendance self-marking
          </CardTitle>
          <CardDescription>Mark your own attendance with date, time, work mode, and daily status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="space-y-2">
              <Label htmlFor="attendanceDate">Date</Label>
              <Input id="attendanceDate" type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkIn">Check in</Label>
              <Input id="checkIn" type="time" value={form.checkIn} onChange={(event) => setForm({ ...form, checkIn: event.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkOut">Check out</Label>
              <Input id="checkOut" type="time" value={form.checkOut} onChange={(event) => setForm({ ...form, checkOut: event.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(value) => setForm({ ...form, status: value as AttendanceStatus })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Work mode</Label>
              <Select value={form.workLocation} onValueChange={(value) => setForm({ ...form, workLocation: value })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Office">Office</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                  <SelectItem value="Client Site">Client Site</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-md border border-slate-200 p-4 dark:border-white/10">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Employee</p>
              <p className="font-semibold">{employeeName}</p>
            </div>
            <Button onClick={markAttendance} disabled={hasMarkedToday}>
              <CalendarCheck className="h-4 w-4" />
              {hasMarkedToday ? "Attendance already marked" : "Submit attendance"}
            </Button>
          </div>
        </CardContent>
      </Card>
      <HrTable
        title="My attendance"
        description="Personal attendance records."
        headers={["Date", "Check In", "Check Out", "Status"]}
        rows={attendance.map((row) => [
          row.date,
          row.checkIn,
          row.checkOut,
          <HrStatusBadge key="status" status={row.status} />
        ])}
      />
    </div>
  );
}
