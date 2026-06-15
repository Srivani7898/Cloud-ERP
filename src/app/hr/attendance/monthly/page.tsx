"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useHrStore } from "@/store/hr-store";

export default function MonthlyAttendancePage() {
  const attendance = useHrStore((state) => state.attendance);
  const summary = [
    ["Present", attendance.filter((item) => item.status === "present").length],
    ["Remote", attendance.filter((item) => item.status === "remote").length],
    ["Late", attendance.filter((item) => item.status === "late").length],
    ["Absent", attendance.filter((item) => item.status === "absent").length]
  ];
  const max = Math.max(...summary.map(([, value]) => Number(value)), 1);
  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-semibold">Monthly attendance</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Attendance analytics for the active period.</p></div>
      <Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]"><CardHeader><CardTitle>Attendance distribution</CardTitle><CardDescription>Current month workforce status.</CardDescription></CardHeader><CardContent className="space-y-5">{summary.map(([label, value]) => <div key={label as string}><div className="mb-2 flex justify-between text-sm"><span>{label as string}</span><span>{value as number}</span></div><div className="h-3 rounded-full bg-slate-200 dark:bg-white/10"><div className="h-3 rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-500" style={{ width: `${(Number(value) / max) * 100}%` }} /></div></div>)}</CardContent></Card>
    </div>
  );
}
