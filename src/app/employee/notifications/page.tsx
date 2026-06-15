import { Bell } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const notifications = [
  ["Leave request pending", "Your annual leave request is waiting for manager approval."],
  ["Payslip available", "Your May 2026 salary slip is ready to download."],
  ["Attendance regularization", "One late entry requires confirmation."],
  ["Policy update", "The hybrid work policy was updated by HR."]
];

export default function EmployeeNotificationsPage() {
  return (
    <div className="space-y-6">
      <div><h2 className="flex items-center gap-2 text-2xl font-semibold"><Bell className="h-5 w-5 text-blue-600 dark:text-cyan-300" />Notifications</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Personal HR, payroll, and workflow alerts.</p></div>
      <section className="grid gap-4">
        {notifications.map(([title, message]) => <Card key={title} className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]"><CardHeader><CardTitle>{title}</CardTitle><CardDescription>{message}</CardDescription></CardHeader><CardContent className="text-xs text-slate-500 dark:text-slate-400">Just now</CardContent></Card>)}
      </section>
    </div>
  );
}
