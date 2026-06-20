"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useHrNotificationStore } from "@/store/notification-store";
import {
  Bell,
  CalendarCheck,
  FileText,
  LayoutDashboard,
  LogOut,
  ReceiptText,
  UserRound,
  WalletCards,
  CheckSquare,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

const nav = [
  { href: "/employee/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/employee/profile", label: "Profile", icon: UserRound },
  { href: "/employee/attendance", label: "Attendance", icon: CalendarCheck },
  { href: "/employee/leave", label: "Leave", icon: CalendarCheck },

  { href: "/employee/tasks", label: "Tasks", icon: CheckSquare },

  { href: "/employee/payslips", label: "Payslips", icon: WalletCards },
  { href: "/employee/invoices", label: "Invoices", icon: ReceiptText },
  { href: "/employee/documents", label: "Documents", icon: FileText },
  { href: "/employee/notifications", label: "Notifications", icon: Bell }
];

export function EmployeeShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const [showNotifications, setShowNotifications] = useState(false);
  const notifications = useHrNotificationStore(
    (state) => state.notifications
  );

  const unreadCount = notifications.filter(
    (notification) =>
      notification.employeeName === user?.name &&
      !notification.read
  ).length;

  const employeeNotifications = notifications
    .filter(
      (notification) =>
        notification.employeeName === user?.name
    )
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-200 bg-white/85 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/85 xl:block">
        <Link href="/employee/dashboard" className="flex items-center gap-3 px-2 py-3 font-semibold">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 via-cyan-500 to-violet-500 text-white"><UserRound className="h-5 w-5" /></span>
          <span>Employee Portal<span className="block text-xs font-normal text-slate-500 dark:text-slate-400">Self-Service Workspace</span></span>
        </Link>
        <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.06]">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Signed in as</p>
          <p className="mt-2 font-semibold">{user?.name ?? "Employee"}</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{user?.email}</p>
        </div>
        <nav className="mt-6 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10",
                  active &&
                  "bg-blue-600 text-white hover:bg-blue-600 dark:text-white"
                )}
              >
                <Icon className="h-4 w-4" />

                <span>{item.label}</span>

                {item.label === "Notifications" &&
                  unreadCount > 0 && (
                    <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">
                      {unreadCount}
                    </span>
                  )}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="xl:pl-72">
        <header className="sticky top-0 z-20 flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white/85 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/85 sm:px-6">
          <div><p className="text-xs uppercase tracking-[0.18em] text-blue-600 dark:text-cyan-300">Employee Self-Service</p><h1 className="text-lg font-semibold tracking-normal">Personal ERP workspace</h1></div>
          <div className="flex items-center gap-3">

            <div className="relative">

              <button
                onClick={() =>
                  setShowNotifications(
                    !showNotifications
                  )
                }
                className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]"
              >
                <Bell className="h-5 w-5" />

                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-96 rounded-xl border border-white/10 bg-slate-900 p-4 shadow-2xl">

                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-semibold">
                      Notifications
                    </h3>

                    <button
                      onClick={() =>
                        setShowNotifications(false)
                      }
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="max-h-96 overflow-y-auto space-y-3">

                    {employeeNotifications.length === 0 ? (
                      <p className="text-sm text-slate-400">
                        No notifications
                      </p>
                    ) : (
                      employeeNotifications.map(
                        (notification) => (
                          <div
                            key={notification.id}
                            className={`rounded-lg border p-3 ${notification.read
                                ? "border-slate-700"
                                : "border-cyan-500/30 bg-cyan-500/5"
                              }`}
                          >
                            <h4 className="font-medium">
                              {notification.title}
                            </h4>

                            <p className="mt-1 text-xs text-slate-400">
                              {notification.message}
                            </p>
                          </div>
                        )
                      )
                    )}
                  </div>

                  <Link
                    href="/employee/notifications"
                    className="mt-4 block rounded-lg bg-cyan-600 px-4 py-2 text-center text-sm text-white hover:bg-cyan-500"
                  >
                    View All Notifications
                  </Link>
                </div>
              )}
            </div>

            <ThemeToggle />

            <Button
              asChild
              variant="outline"
              size="sm"
            >
              <Link href="/auth/logout">
                <LogOut className="h-4 w-4" />
                Sign out
              </Link>
            </Button>
          </div>
          <nav className="flex w-full gap-2 overflow-x-auto pb-1 xl:hidden">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return <Link key={item.href} href={item.href} className={cn("flex shrink-0 items-center gap-2 rounded-md border px-3 py-2 text-xs font-medium", active ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.06]")}><Icon className="h-3.5 w-3.5" />

                <span>{item.label}</span>

                {item.label === "Notifications" &&
                  unreadCount > 0 && (
                    <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                      {unreadCount}
                    </span>
                  )}</Link>;
            })}
          </nav>
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
