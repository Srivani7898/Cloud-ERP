import { AppShell } from "@/components/layout/AppShell";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute roles={["super_admin", "tenant_admin", "auditor"]}>
      <AppShell>{children}</AppShell>
    </ProtectedRoute>
  );
}
