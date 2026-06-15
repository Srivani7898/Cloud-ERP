"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useHrStore } from "@/store/hr-store";
import { attendanceSchema } from "@/validations/hr";

type Values = z.infer<typeof attendanceSchema>;

export function AttendanceForm() {
  const addAttendance = useHrStore((state) => state.addAttendance);
  const form = useForm<Values>({ resolver: zodResolver(attendanceSchema), defaultValues: { employeeName: "", date: "", checkIn: "09:00", checkOut: "18:00", status: "present" } });

  return (
    <form className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.06] md:grid-cols-5" onSubmit={form.handleSubmit((values) => { addAttendance(values); form.reset(); })}>
      <div className="space-y-2 md:col-span-2"><Label htmlFor="employeeName">Employee</Label><Input id="employeeName" {...form.register("employeeName")} /></div>
      <div className="space-y-2"><Label htmlFor="date">Date</Label><Input id="date" type="date" {...form.register("date")} /></div>
      <div className="space-y-2"><Label htmlFor="checkIn">Check in</Label><Input id="checkIn" type="time" {...form.register("checkIn")} /></div>
      <div className="space-y-2"><Label htmlFor="checkOut">Check out</Label><Input id="checkOut" type="time" {...form.register("checkOut")} /></div>
      <div className="space-y-2"><Label>Status</Label><Select defaultValue="present" onValueChange={(value) => form.setValue("status", value as Values["status"])}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="present">Present</SelectItem><SelectItem value="remote">Remote</SelectItem><SelectItem value="late">Late</SelectItem><SelectItem value="absent">Absent</SelectItem></SelectContent></Select></div>
      <div className="flex items-end md:col-span-4"><Button type="submit"><Clock className="h-4 w-4" />Record attendance</Button></div>
    </form>
  );
}
