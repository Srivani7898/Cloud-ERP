import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  draft: "bg-slate-500/15 text-slate-600 dark:text-slate-300",
  processing: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-300",
  pending_approval: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
  approved: "bg-blue-500/15 text-blue-600 dark:text-blue-300",
  paid: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  failed: "bg-red-500/15 text-red-600 dark:text-red-300",
  pending: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
  rejected: "bg-red-500/15 text-red-600 dark:text-red-300",
  verified: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300"
};

export function PayrollStatusBadge({ status }: { status: string }) {
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize", styles[status])}>{status.replace("_", " ")}</span>;
}
