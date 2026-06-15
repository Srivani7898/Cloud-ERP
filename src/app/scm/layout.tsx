import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { ScmShell } from "@/components/scm/ScmShell";

export default function ScmLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute roles={["super_admin", "tenant_admin", "scm_manager"]}>
      <ScmShell>{children}</ScmShell>
    </ProtectedRoute>
  );
}
