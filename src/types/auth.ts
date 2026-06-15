export type Role = "super_admin" | "tenant_admin" | "finance_manager" | "hr_manager" | "payroll_manager" | "scm_manager" | "forecast_manager" | "project_manager" | "employee" | "operator" | "auditor";

export type Tenant = {
  id: string;
  name: string;
  region: string;
  plan: "Enterprise" | "Business" | "Sandbox";
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  roles: Role[];
  tenant: Tenant;
  mfaEnabled: boolean;
};

export type AuthSession = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
};

export type LoginInput = {
  email: string;
  password: string;
  tenantSlug: string;
  portal: "super_admin" | "hr_admin" | "finance_manager" | "payroll_manager" | "scm_manager" | "forecast_manager" | "project_manager" | "employee";
  remember: boolean;
};

export type RegisterInput = {
  companyName: string;
  name: string;
  email: string;
  password: string;
  region: string;
  acceptTerms: boolean;
};
