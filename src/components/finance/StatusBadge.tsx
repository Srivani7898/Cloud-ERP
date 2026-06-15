import { cn } from "@/lib/utils";
import { statusClass } from "@/utils/finance";

export function StatusBadge({ status }: { status: string }) {
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize", statusClass(status))}>{status.replace("-", " ")}</span>;
}
