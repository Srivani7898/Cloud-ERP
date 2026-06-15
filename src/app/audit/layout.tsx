import type { ReactNode } from "react";
import { AuditShell } from "@/components/audit/AuditShell";

export default function AuditLayout({ children }: { children: ReactNode }) {
  return <AuditShell>{children}</AuditShell>;
}
