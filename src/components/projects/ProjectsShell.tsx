"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BriefcaseBusiness, CheckSquare, Clock, FileText, LayoutDashboard, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/projects/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: BriefcaseBusiness },
  { href: "/my-projects", label: "My Projects", icon: BriefcaseBusiness },
  { href: "/my-tasks", label: "My Tasks", icon: CheckSquare },
  { href: "/my-timesheets", label: "Timesheets", icon: Clock },
  { href: "/my-milestones", label: "Milestones", icon: BarChart3 },
  { href: "/projects/settings", label: "Settings", icon: Settings }
];

export function ProjectsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-slate-100 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-200 bg-white/85 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/85 xl:block">
        <Link href="/projects/dashboard" className="flex items-center gap-3 px-2 py-3 font-semibold"><span className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 via-cyan-500 to-violet-500 text-white"><FileText className="h-5 w-5" /></span><span>Project Management Dashboard</span></Link>
        <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.06]"><p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Portfolio</p><p className="mt-2 font-semibold">Enterprise ERP Programs</p><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Agile + Waterfall</p></div>
        <nav className="mt-6 space-y-1">{nav.map((item) => { const Icon = item.icon; const active = pathname === item.href; return <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10", active && "bg-blue-600 text-white hover:bg-blue-600 dark:text-white")}><Icon className="h-4 w-4" />{item.label}</Link>; })}</nav>
      </aside>
      <div className="xl:pl-72">
        <header className="sticky top-0 z-20 flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white/85 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/85 sm:px-6"><div><p className="text-xs uppercase tracking-[0.18em] text-blue-600 dark:text-cyan-300">Project Management</p><h1 className="text-lg font-semibold tracking-normal">Enterprise delivery command center</h1></div><div className="flex items-center gap-2"><ThemeToggle /><Button asChild variant="outline" size="sm"><Link href="/auth/logout"><LogOut className="h-4 w-4" />Sign out</Link></Button></div></header>
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
