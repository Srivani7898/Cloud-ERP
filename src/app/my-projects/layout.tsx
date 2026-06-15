import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { ProjectsShell } from "@/components/projects/ProjectsShell";

export default function MyProjectsLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute roles={["super_admin", "tenant_admin", "project_manager", "employee"]}><ProjectsShell>{children}</ProjectsShell></ProtectedRoute>;
}
