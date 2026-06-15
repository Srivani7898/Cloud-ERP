import { cn } from "@/lib/utils";

const classes: Record<string, string> = {
  active: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  onboarding: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-300",
  on_leave: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
  terminated: "bg-red-500/15 text-red-600 dark:text-red-300",
  present: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  remote: "bg-blue-500/15 text-blue-600 dark:text-blue-300",
  late: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
  absent: "bg-red-500/15 text-red-600 dark:text-red-300",
  pending: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
  approved: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  rejected: "bg-red-500/15 text-red-600 dark:text-red-300"
};

export function HrStatusBadge({ status }: { status: string }) {
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize", classes[status])}>{status.replace("_", " ")}</span>;
}
