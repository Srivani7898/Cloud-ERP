"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  BrainCircuit,
  ChartNoAxesCombined,
  Download,
  Gauge,
  Grid2X2,
  LayoutDashboard,
  LogOut,
  PieChart,
  Search,
  Settings,
  Sparkles,
  TableProperties,
} from "lucide-react";

const navItems = [
  { href: "/analytics/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/analytics/builder", label: "Builder", icon: Grid2X2 },
  { href: "/analytics/widgets", label: "Widgets", icon: TableProperties },
  { href: "/analytics/kpis", label: "KPIs", icon: Gauge },
  { href: "/analytics/charts", label: "Charts", icon: PieChart },
  { href: "/analytics/reports", label: "Reports", icon: BarChart3 },
  { href: "/analytics/drilldown", label: "Drilldown", icon: Search },
  { href: "/analytics/export", label: "Export", icon: Download },
  { href: "/analytics/insights", label: "AI Insights", icon: BrainCircuit },
  { href: "/analytics/settings", label: "Settings", icon: Settings },
];

export function AnalyticsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <aside className="fixed inset-y-0 left-0 hidden w-[360px] overflow-y-auto border-r border-slate-800 bg-slate-950/95 p-5 lg:block">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-cyan-400 to-violet-500">
            <ChartNoAxesCombined className="h-7 w-7 text-white" />
          </div>
          <div>
            <p className="text-xl font-semibold">BI Analytics Dashboard</p>
            <p className="text-sm text-slate-400">Executive Intelligence</p>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Workspace</p>
          <p className="mt-3 text-lg font-semibold">Global ERP Analytics</p>
          <p className="mt-1 text-slate-400">Finance · HR · SCM · Projects</p>
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
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">Business Intelligence</p>
            <h1 className="mt-1 text-2xl font-semibold">Enterprise analytics command center</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/executive/dashboard" className="hidden rounded-lg border border-slate-700 px-4 py-2 font-semibold text-slate-100 transition hover:border-cyan-400 md:inline-flex">
              Executive View
            </Link>
            <button
              type="button"
              onClick={() => router.push("/auth/logout")}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 font-semibold transition hover:border-blue-400"
            >
              <LogOut className="h-5 w-5" /> Sign out
            </button>
          </div>
        </header>

        <div className="px-6 py-8 md:px-10">{children}</div>
      </main>
    </div>
  );
}

export function ExecutiveShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <header className="border-b border-slate-800 bg-slate-950/90 px-6 py-5 backdrop-blur md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-400">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Executive Analytics</p>
              <h1 className="text-2xl font-semibold">Board-ready ERP intelligence</h1>
            </div>
          </div>
          <Link href="/analytics/dashboard" className="rounded-lg border border-slate-700 px-4 py-2 font-semibold transition hover:border-cyan-400">
            Analytics Console
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8 md:px-10">{children}</main>
    </div>
  );
}
