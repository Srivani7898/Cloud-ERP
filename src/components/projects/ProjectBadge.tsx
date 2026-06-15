import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  planning: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-300",
  active: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  at_risk: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
  completed: "bg-blue-500/15 text-blue-600 dark:text-blue-300",
  todo: "bg-slate-500/15 text-slate-600 dark:text-slate-300",
  in_progress: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-300",
  review: "bg-violet-500/15 text-violet-600 dark:text-violet-300",
  done: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  high: "bg-red-500/15 text-red-600 dark:text-red-300",
  medium: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
  low: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  critical: "bg-red-500/15 text-red-600 dark:text-red-300"
};

export function ProjectBadge({ value }: { value: string }) {
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize", styles[value])}>{value.replaceAll("_", " ")}</span>;
}
