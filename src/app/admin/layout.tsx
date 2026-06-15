import { AppShell } from "@/components/layout/AppShell";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute roles={["super_admin"]}>
      <AppShell>{children}</AppShell>
    </ProtectedRoute>
  );
}
