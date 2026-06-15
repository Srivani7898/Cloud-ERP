"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = ["overview", "tasks", "gantt", "kanban", "resources", "budget", "milestones", "timeline", "reports", "risks"];

export default function ProjectDetailLayout({ children }: { children: React.ReactNode }) {
  const params = useParams<{ id: string }>();
  const pathname = usePathname();
  return <div className="space-y-6"><nav className="flex gap-2 overflow-x-auto rounded-lg border border-slate-200 bg-white p-2 dark:border-white/10 dark:bg-white/[0.06]">{tabs.map((tab) => { const href = `/projects/${params.id}/${tab}`; const active = pathname === href; return <Link key={tab} href={href} className={cn("shrink-0 rounded-md px-3 py-2 text-sm font-medium capitalize", active ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10")}>{tab}</Link>; })}</nav>{children}</div>;
}
