import type { ReactNode } from "react";
import { AnalyticsShell } from "@/components/analytics/AnalyticsShell";

export default function AnalyticsLayout({ children }: { children: ReactNode }) {
  return <AnalyticsShell>{children}</AnalyticsShell>;
}
