import { PayrollShell } from "@/components/payroll/PayrollShell";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

export default function PayrollLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute roles={["super_admin", "tenant_admin", "payroll_manager"]}>
      <PayrollShell>{children}</PayrollShell>
    </ProtectedRoute>
  );
}
