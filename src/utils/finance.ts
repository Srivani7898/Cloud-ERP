import type { Money } from "@/types/finance";

export function formatMoney(money: Money) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: money.currency,
    maximumFractionDigits: 0
  }).format(money.amount);
}

export function statusClass(status: string) {
  const classes: Record<string, string> = {
    paid: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
    completed: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
    approved: "bg-blue-500/15 text-blue-600 dark:text-blue-300",
    sent: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-300",
    scheduled: "bg-violet-500/15 text-violet-600 dark:text-violet-300",
    processing: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-300",
    overdue: "bg-red-500/15 text-red-600 dark:text-red-300",
    failed: "bg-red-500/15 text-red-600 dark:text-red-300",
    draft: "bg-slate-500/15 text-slate-600 dark:text-slate-300",
    posted: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
    reversed: "bg-amber-500/15 text-amber-600 dark:text-amber-300"
  };

  return classes[status] ?? "bg-slate-500/15 text-slate-600 dark:text-slate-300";
}
