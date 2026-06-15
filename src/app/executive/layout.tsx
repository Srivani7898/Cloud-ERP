import type { ReactNode } from "react";
import { ExecutiveShell } from "@/components/analytics/AnalyticsShell";

export default function ExecutiveLayout({ children }: { children: ReactNode }) {
  return <ExecutiveShell>{children}</ExecutiveShell>;
}
