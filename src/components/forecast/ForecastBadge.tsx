import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  high: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  medium: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
  low: "bg-red-500/15 text-red-600 dark:text-red-300",
  healthy: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  training: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-300",
  degraded: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
  failed: "bg-red-500/15 text-red-600 dark:text-red-300",
  critical: "bg-red-500/15 text-red-600 dark:text-red-300"
};

export function ForecastBadge({ value }: { value: string }) {
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize", styles[value])}>{value.replaceAll("_", " ")}</span>;
}
