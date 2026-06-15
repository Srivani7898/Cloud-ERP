"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  BellRing,
  ChartNoAxesCombined,
  Clock3,
  Code2,
  Inbox,
  LogOut,
  MessageSquareText,
  RefreshCw,
  Route,
  Settings,
  SlidersHorizontal,
  Sparkles,
  Webhook,
} from "lucide-react";

const navItems = [
  { href: "/notifications/dashboard", label: "Dashboard", icon: ChartNoAxesCombined },
  { href: "/notifications/inbox", label: "Inbox", icon: Inbox },
  { href: "/notifications/channels", label: "Channels", icon: BellRing },
  { href: "/notifications/templates", label: "Templates", icon: MessageSquareText },
  { href: "/notifications/rules", label: "Rules", icon: Route },
  { href: "/notifications/webhooks", label: "Webhooks", icon: Webhook },
  { href: "/notifications/analytics", label: "Analytics", icon: Sparkles },
  { href: "/notifications/history", label: "History", icon: Clock3 },
  { href: "/notifications/retry-queue", label: "Retry Queue", icon: RefreshCw },
  { href: "/notifications/settings", label: "Settings", icon: Settings },
];

export function NotificationsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <aside className="fixed inset-y-0 left-0 hidden w-[360px] overflow-y-auto border-r border-slate-800 bg-slate-950/95 p-5 lg:block">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-cyan-400 to-violet-500">
            <Bell className="h-7 w-7" />
          </div>
          <div>
            <p className="text-xl font-semibold">Notification Engine</p>
            <p className="text-sm text-slate-400">Real-Time Communication</p>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Event Fabric</p>
          <p className="mt-3 text-lg font-semibold">Northstar ERP Events</p>
          <p className="mt-1 text-slate-400">Finance · HR · Payroll · SCM · Projects</p>
        </div>

        <nav className="mt-6 space-y-1 pb-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-2.5 font-semibold transition ${
                  active ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" /> {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="lg:pl-[360px]">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-800 bg-slate-950/90 px-6 py-5 backdrop-blur md:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">Notification Engine</p>
            <h1 className="mt-1 text-2xl font-semibold">Enterprise communication command center</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/my-notifications" className="hidden rounded-lg border border-slate-700 px-4 py-2 font-semibold text-slate-100 transition hover:border-cyan-400 md:inline-flex">
              User Center
            </Link>
            <button onClick={() => router.push("/auth/logout")} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 font-semibold transition hover:border-blue-400">
              <LogOut className="h-5 w-5" /> Sign out
            </button>
          </div>
        </header>
        <div className="px-6 py-8 md:px-10">{children}</div>
      </main>
    </div>
  );
}

export function UserNotificationsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const links = [
    { href: "/my-notifications", label: "Notifications", icon: Inbox },
    { href: "/my-alerts", label: "Alerts", icon: BellRing },
    { href: "/my-preferences", label: "Preferences", icon: SlidersHorizontal },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <aside className="fixed inset-y-0 left-0 hidden w-[320px] border-r border-slate-800 bg-slate-950/95 p-5 lg:block">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-cyan-400 to-violet-500">
            <Code2 className="h-7 w-7" />
          </div>
          <div>
            <p className="text-xl font-semibold">My Notification Center</p>
            <p className="text-sm text-slate-400">Personal ERP alerts</p>
          </div>
        </div>
        <nav className="mt-10 space-y-2">
          {links.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={`flex items-center gap-3 rounded-lg px-4 py-3 font-semibold ${active ? "bg-blue-600" : "text-slate-300 hover:bg-slate-900"}`}>
                <Icon className="h-5 w-5" /> {item.label}
              </Link>
            );
          })}
        </nav>
        <button onClick={() => router.push("/auth/logout")} className="absolute bottom-5 left-5 right-5 inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 font-semibold">
          <LogOut className="h-5 w-5" /> Sign out
        </button>
      </aside>
      <main className="lg:pl-[320px]">
        <header className="border-b border-slate-800 bg-slate-950/90 px-6 py-5 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">Employee Communications</p>
          <h1 className="mt-1 text-2xl font-semibold">Personal notification workspace</h1>
        </header>
        <div className="px-6 py-8 md:px-10">{children}</div>
      </main>
    </div>
  );
}
