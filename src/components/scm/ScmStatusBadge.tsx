import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  healthy: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  low_stock: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
  out_of_stock: "bg-red-500/15 text-red-600 dark:text-red-300",
  overstock: "bg-blue-500/15 text-blue-600 dark:text-blue-300",
  draft: "bg-slate-500/15 text-slate-600 dark:text-slate-300",
  sent: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-300",
  approved: "bg-blue-500/15 text-blue-600 dark:text-blue-300",
  received: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  pending_qc: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
  accepted: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  rejected: "bg-red-500/15 text-red-600 dark:text-red-300",
  in_transit: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-300",
  completed: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  active: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  review: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
  blocked: "bg-red-500/15 text-red-600 dark:text-red-300"
};

export function ScmStatusBadge({ status }: { status: string }) {
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize", styles[status])}>{status.replaceAll("_", " ")}</span>;
}
