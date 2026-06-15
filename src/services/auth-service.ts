import type { AuthSession, LoginInput, RegisterInput, Role } from "@/types/auth";
import { createDemoToken } from "@/utils/jwt";

const demoTenant = {
  id: "tenant-northstar",
  name: "Northstar Manufacturing",
  region: "US East",
  plan: "Enterprise" as const
};

function portalRoles(portal?: LoginInput["portal"]): Role[] {
  if (portal === "super_admin") return ["super_admin", "tenant_admin", "finance_manager", "hr_manager", "payroll_manager", "scm_manager", "forecast_manager", "project_manager"];
  if (portal === "hr_admin") return ["hr_manager"];
  if (portal === "finance_manager") return ["finance_manager"];
  if (portal === "payroll_manager") return ["payroll_manager", "finance_manager", "hr_manager"];
  if (portal === "scm_manager") return ["scm_manager"];
  if (portal === "forecast_manager") return ["forecast_manager"];
  if (portal === "project_manager") return ["project_manager"];
  if (portal === "employee") return ["employee"];
  return ["tenant_admin", "finance_manager", "hr_manager", "payroll_manager", "scm_manager", "forecast_manager", "project_manager"];
}

function demoSession(email: string, name = "Avery Stone", portal?: LoginInput["portal"]): AuthSession {
  return {
    accessToken: createDemoToken(3600),
    refreshToken: createDemoToken(86_400),
    expiresAt: Date.now() + 3600_000,
    user: {
      id: "usr_1024",
      name,
      email,
      roles: portalRoles(portal),
      tenant: demoTenant,
      mfaEnabled: true
    }
  };
}

export async function login(input: LoginInput) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return demoSession(input.email, input.portal === "employee" ? "Anika Rao" : "Avery Stone", input.portal);
}

export async function register(input: RegisterInput) {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return demoSession(input.email, input.name);
}

export async function verifyMfa(code: string) {
  await new Promise((resolve) => setTimeout(resolve, 400));
  if (code.length !== 6) throw new Error("Invalid MFA code");
  return { verified: true };
}

export async function requestPasswordReset() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { delivered: true };
}

export async function resetPassword() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { updated: true };
}

export function getSsoUrl(provider: "google" | "azure") {
  const callback = encodeURIComponent(`${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/auth/callback`);
  return `/auth/callback?provider=${provider}&code=demo-code&redirect_uri=${callback}`;
}
