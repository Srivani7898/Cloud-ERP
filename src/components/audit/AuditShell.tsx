"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  DatabaseZap,
  FileCheck2,
  FileText,
  Fingerprint,
  Gauge,
  LockKeyhole,
  LogOut,
  Scale,
  Settings,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

const navItems = [
  { href: "/audit/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/audit/logs", label: "Immutable Logs", icon: LockKeyhole },
  { href: "/audit/activity", label: "Activity", icon: Activity },
  { href: "/audit/compliance", label: "Compliance", icon: Scale },
  { href: "/audit/gdpr", label: "GDPR", icon: FileCheck2 },
  { href: "/audit/tamper-detection", label: "Tamper Detection", icon: Fingerprint },
  { href: "/audit/reports", label: "Reports", icon: FileText },
  { href: "/audit/risk-monitoring", label: "Risk Monitoring", icon: AlertTriangle },
  { href: "/audit/data-access", label: "Data Access", icon: DatabaseZap },
  { href: "/audit/user-activity", label: "User Activity", icon: UserCheck },
  { href: "/audit/settings", label: "Settings", icon: Settings },
];

export function AuditShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <aside className="fixed inset-y-0 left-0 hidden w-[360px] overflow-y-auto border-r border-slate-800 bg-slate-950/95 p-5 lg:block">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-violet-500 to-red-500">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div>
            <p className="text-xl font-semibold">Audit & Compliance</p>
            <p className="text-sm text-slate-400">Security Control Center</p>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Audit Tenant</p>
          <p className="mt-3 text-lg font-semibold">Northstar Manufacturing</p>
          <p className="mt-1 text-slate-400">SOC 2 · GDPR · ISO 27001</p>
        </div>

        <nav className="mt-6 space-y-1 pb-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-2.5 font-semibold transition ${active ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-900 hover:text-white"
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
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">Audit & Compliance</p>
            <h1 className="mt-1 text-2xl font-semibold">Enterprise security evidence center</h1>
          </div>
          <div className="flex items-center gap-3">
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

export function SecurityBadge({ status }: { status: "Verified" | "Warning" | "Failed" | "Open" | "Closed" }) {
  const colors = {
    Verified: "bg-emerald-500/15 text-emerald-300",
    Closed: "bg-emerald-500/15 text-emerald-300",
    Warning: "bg-amber-500/15 text-amber-300",
    Open: "bg-amber-500/15 text-amber-300",
    Failed: "bg-red-500/15 text-red-300",
  };
  return <span className={`rounded-full px-3 py-1 text-sm font-semibold ${colors[status]}`}>{status}</span>;
}

export function AdminSecurityHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">Super Admin Security</p>
      <h1 className="mt-3 text-3xl font-semibold text-white">{title}</h1>
      <p className="mt-2 text-slate-300">{description}</p>
    </div>
  );
}
