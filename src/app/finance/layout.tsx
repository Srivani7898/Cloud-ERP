import { FinanceShell } from "@/components/finance/FinanceShell";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

export default function FinanceLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute roles={["super_admin", "tenant_admin", "finance_manager", "auditor"]}>
      <FinanceShell>{children}</FinanceShell>
    </ProtectedRoute>
  );
}
