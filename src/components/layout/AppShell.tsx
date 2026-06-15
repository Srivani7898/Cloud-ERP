"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BrainCircuit, LogOut, Settings, Shield, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/profile", label: "Profile", icon: UserRound },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, activeTenant } = useAuthStore();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-200 bg-white/85 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80 lg:block">
        <Link href="/dashboard" className="flex items-center gap-3 px-2 py-3 font-semibold">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-600 text-white"><BrainCircuit className="h-5 w-5" /></span>
          Cloud ERP
        </Link>
        <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.06]">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Active tenant</p>
          <p className="mt-2 font-semibold">{activeTenant?.name ?? "No tenant"}</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{activeTenant?.region} · {activeTenant?.plan}</p>
        </div>
        <nav className="mt-6 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10", active && "bg-blue-600 text-white hover:bg-blue-600 dark:text-white")}>
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="mb-3 flex items-center gap-3 rounded-lg border border-slate-200 p-3 dark:border-white/10">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-cyan-500/15 text-cyan-600 dark:text-cyan-300"><Shield className="h-4 w-4" /></div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{user?.name}</p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user?.roles.join(", ")}</p>
            </div>
          </div>
          <Button asChild variant="outline" className="w-full justify-start">
            <Link href="/auth/logout"><LogOut className="h-4 w-4" />Sign out</Link>
          </Button>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/85 px-4 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80 sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Enterprise access plane</p>
            <h1 className="text-base font-semibold sm:text-lg">{activeTenant?.name ?? "Cloud ERP"}</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="ghost" size="icon" className="lg:hidden"><Link href="/auth/logout" aria-label="Sign out"><LogOut className="h-4 w-4" /></Link></Button>
          </div>
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
