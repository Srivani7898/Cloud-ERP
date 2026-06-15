import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { ProjectsShell } from "@/components/projects/ProjectsShell";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute roles={["super_admin", "tenant_admin", "project_manager"]}><ProjectsShell>{children}</ProjectsShell></ProtectedRoute>;
}
