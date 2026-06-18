"use client";

import Link from "next/link";
import { Bell, CalendarCheck, Download, FileText, ReceiptText, UserRound, WalletCards } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FinanceTable } from "@/components/finance/FinanceTable";
import { StatusBadge } from "@/components/finance/StatusBadge";
import { HrTable } from "@/components/hr/HrTable";
import { HrStatusBadge } from "@/components/hr/HrStatusBadge";
import { useFinanceStore } from "@/store/finance-store";
import { useHrStore } from "@/store/hr-store";
import { useAuthStore } from "@/store/auth-store";
import { formatMoney } from "@/utils/finance";
import { downloadPayslipPdf, employeeFileName } from "@/utils/pdf";
import { useNotificationStore } from "@/store/notification-store";

export default function EmployeeDashboardPage() {
  const user = useAuthStore((state) => state.user);
  const { attendance, leaveRequests } = useHrStore();
  const allInvoices = useFinanceStore((state) => state.invoices);
  const invoices = allInvoices.slice(0, 3);
  const employeeName = user?.name ?? "Employee";
  const employees = useHrStore((state) => state.employees);
  const currentEmployee = employees.find(
    (emp) => emp.name === employeeName
  );
  const presentCount = attendance.filter(
    (a) => a.status === "present"
  ).length;

  const remoteCount = attendance.filter(
    (a) => a.status === "remote"
  ).length;

  const lateCount = attendance.filter(
    (a) => a.status === "late"
  ).length;

  const absentCount = attendance.filter(
    (a) => a.status === "absent"
  ).length;

  const notifications = useNotificationStore(
    (state) => state.notifications
  );

  const unreadCount = notifications.filter(
    (notification) =>
      notification.employeeName === user?.name &&
      !notification.read
  ).length;

  const totalAttendance =
    presentCount +
    remoteCount +
    lateCount +
    absentCount;

  const attendancePercentage =
    totalAttendance > 0
      ? Math.round(
        ((presentCount + remoteCount + lateCount) /
          totalAttendance) *
        100
      )
      : 0;

  const metrics = [
    {
      label: "Attendance records",
      value: attendance.length,
      icon: CalendarCheck,
    },
    {
      label: "Leave requests",
      value: leaveRequests.length,
      icon: FileText,
    },
    {
      label: "Payslips",
      value: 3,
      icon: WalletCards,
    },
    {
      label: "Unread Notifications",
      value: unreadCount,
      icon: Bell,
    },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.06]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-normal">Welcome to Employee Self-Service</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              View attendance, apply leave, download payslips, track assigned invoices, and manage personal documents.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <Link href="/employee/leave">
                <CalendarCheck className="h-4 w-4" />
                Apply leave
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/employee/profile">
                <UserRound className="h-4 w-4" />
                Profile
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                downloadPayslipPdf(
                  employeeFileName(employeeName, "latest-payslip-may-2026"),
                  {
                    employeeName,
                    employeeCode: "NS-1001",
                    department: "People Operations",
                    designation: "HR Business Partner",
                    month: "May 2026",
                    payDate: "2026-05-31",
                    gross: "$8,400.00",
                    deductions: "$1,120.00",
                    net: "$7,280.00",
                    earnings: [["Basic Pay", "$5,200.00"], ["House Rent Allowance", "$1,450.00"], ["Special Allowance", "$1,250.00"], ["Performance Bonus", "$500.00"]],
                    deductionsBreakup: [["Federal Tax", "$620.00"], ["Provident Fund", "$320.00"], ["Health Insurance", "$120.00"], ["Professional Tax", "$60.00"]]
                  }
                )
              }
            >
              <Download className="h-4 w-4" />
              Latest payslip
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {metrics.map((metric) => <Card key={metric.label} className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]"><CardContent className="p-5"><metric.icon className="h-5 w-5 text-blue-600 dark:text-cyan-300" /><p className="mt-5 text-2xl font-semibold">{metric.value}</p><p className="text-sm text-slate-500 dark:text-slate-400">{metric.label}</p></CardContent></Card>)}
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <Card className="border-green-500/20 bg-green-500/10">
          <CardContent className="p-5">
            <p className="text-sm text-slate-300">Present</p>
            <p className="mt-2 text-4xl font-bold text-green-400">
              {presentCount}
            </p>
          </CardContent>
        </Card>

        <Card className="border-cyan-500/20 bg-cyan-500/10">
          <CardContent className="p-5">
            <p className="text-sm text-slate-300">Remote</p>
            <p className="mt-2 text-4xl font-bold text-cyan-400">
              {remoteCount}
            </p>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/20 bg-yellow-500/10">
          <CardContent className="p-5">
            <p className="text-sm text-slate-300">Late</p>
            <p className="mt-2 text-4xl font-bold text-yellow-400">
              {lateCount}
            </p>
          </CardContent>
        </Card>

        <Card className="border-red-500/20 bg-red-500/10">
          <CardContent className="p-5">
            <p className="text-sm text-slate-300">Absent</p>
            <p className="mt-2 text-4xl font-bold text-red-400">
              {absentCount}
            </p>
          </CardContent>
        </Card>

        <Card className="border-cyan-500/20 bg-cyan-500/10">
          <CardContent className="p-5">
            <p className="text-sm text-slate-300">
              Attendance Rate
            </p>

            <p className="mt-2 text-4xl font-bold text-cyan-400">
              {attendancePercentage}%
            </p>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-700">
              <div
                className="h-full rounded-full bg-cyan-400"
                style={{
                  width: `${attendancePercentage}%`,
                }}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="border-emerald-500/20 bg-emerald-500/10">
          <CardContent className="p-5">
            <p className="text-sm text-slate-300">
              Annual Leave Balance
            </p>

            <p className="mt-2 text-4xl font-bold text-emerald-400">
              {currentEmployee?.annualLeaveBalance ?? 0}
            </p>
          </CardContent>
        </Card>

        <Card className="border-cyan-500/20 bg-cyan-500/10">
          <CardContent className="p-5">
            <p className="text-sm text-slate-300">
              Sick Leave Balance
            </p>

            <p className="mt-2 text-4xl font-bold text-cyan-400">
              {currentEmployee?.sickLeaveBalance ?? 0}
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <HrTable
          title="My attendance"
          description="Recent attendance activity."
          headers={["Date", "Check In", "Check Out", "Status"]}
          rows={attendance.slice(0, 5).map((row) => [
            row.date,
            row.checkIn,
            row.checkOut,
            <HrStatusBadge key="status" status={row.status} />
          ])}
        />
        <HrTable
          title="My leave status"
          description="Latest leave requests."
          headers={["Request", "Type", "Dates", "Days", "Status"]}
          rows={leaveRequests.slice(0, 5).map((leave) => [
            leave.id,
            leave.type,
            `${leave.from} - ${leave.to}`,
            leave.days,
            <HrStatusBadge key="status" status={leave.status} />
          ])}
        />
      </section>

      <FinanceTable
        title="Assigned invoices"
        description="Finance invoices assigned for review or follow-up."
        headers={["Invoice", "Customer", "Status", "Due Date", "Total"]}
        rows={invoices.map((invoice) => [
          <span key="invoice" className="font-medium">{invoice.id}</span>,
          invoice.customer,
          <StatusBadge key="status" status={invoice.status} />,
          invoice.dueDate,
          formatMoney(invoice.total)
        ])}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Payslip available", "May 2026 salary slip is ready.", "/employee/payslips", WalletCards],
          ["Document update", "Tax declaration is available.", "/employee/documents", FileText],
          ["Invoice review", "Assigned finance items need review.", "/employee/invoices", ReceiptText],
          ["HR notification", "Hybrid work policy was updated.", "/employee/notifications", Bell]
        ].map(([title, description, href, Icon]) => (
          <Card key={title as string} className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]">
            <CardContent className="p-5">
              <Icon className="h-5 w-5 text-blue-600 dark:text-cyan-300" />
              <p className="mt-4 font-semibold">{title as string}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description as string}</p>
              <Button asChild variant="ghost" className="mt-4 px-0">
                <Link href={href as string}>Open</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
