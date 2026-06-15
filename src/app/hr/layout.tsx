import { HrShell } from "@/components/hr/HrShell";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

export default function HrLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute roles={["super_admin", "tenant_admin", "hr_manager"]}>
      <HrShell>{children}</HrShell>
    </ProtectedRoute>
  );
}
