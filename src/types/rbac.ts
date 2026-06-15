import type { Role } from "@/types/auth";

export type Permission =
  | "dashboard:read"
  | "tenant:manage"
  | "users:manage"
  | "profile:update"
  | "settings:read"
  | "settings:update";

export const rolePermissions: Record<Role, Permission[]> = {
  super_admin: ["dashboard:read", "tenant:manage", "users:manage", "profile:update", "settings:read", "settings:update"],
  tenant_admin: ["dashboard:read", "tenant:manage", "users:manage", "profile:update", "settings:read", "settings:update"],
  finance_manager: ["dashboard:read", "profile:update", "settings:read"],
  hr_manager: ["dashboard:read", "users:manage", "profile:update", "settings:read", "settings:update"],
  payroll_manager: ["dashboard:read", "users:manage", "profile:update", "settings:read", "settings:update"],
  scm_manager: ["dashboard:read", "profile:update", "settings:read", "settings:update"],
  forecast_manager: ["dashboard:read", "profile:update", "settings:read", "settings:update"],
  project_manager: ["dashboard:read", "users:manage", "profile:update", "settings:read", "settings:update"],
  employee: ["dashboard:read", "profile:update"],
  operator: ["dashboard:read", "profile:update"],
  auditor: ["dashboard:read", "settings:read"]
};
