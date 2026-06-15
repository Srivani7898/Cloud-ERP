import { EmployeeShell } from "@/components/employee/EmployeeShell";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute roles={["employee", "super_admin", "tenant_admin"]}>
      <EmployeeShell>{children}</EmployeeShell>
    </ProtectedRoute>
  );
}
