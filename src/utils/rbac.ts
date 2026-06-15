import { rolePermissions, type Permission } from "@/types/rbac";
import type { AuthUser, Role } from "@/types/auth";

export function hasRole(user: AuthUser | null, roles: Role[]) {
  if (!user) return false;
  return roles.some((role) => user.roles.includes(role));
}

export function hasPermission(user: AuthUser | null, permission: Permission) {
  if (!user) return false;
  return user.roles.some((role) => rolePermissions[role].includes(permission));
}
