import type { AuthSession, LoginInput, RegisterInput } from "@/types/auth";
import { api } from "@/lib/api";

export async function login(input: LoginInput): Promise<AuthSession> {
  const response = await api.post<AuthSession>("/auth/login", {
    email: input.email,
    password: input.password,
    portal: input.portal,
    remember: input.remember
  });
  return response.data;
}

export async function register(input: RegisterInput): Promise<AuthSession> {
  const response = await api.post<AuthSession>("/auth/register", {
    companyName: input.companyName,
    name: input.name,
    email: input.email,
    password: input.password,
    region: input.region,
    acceptTerms: input.acceptTerms
  });
  return response.data;
}

export async function verifyMfa(code: string) {
  const response = await api.post<{ verified: boolean }>("/auth/verify-mfa", { code });
  return response.data;
}

export async function requestPasswordReset(email: string) {
  const response = await api.post<{ delivered: boolean }>("/auth/forgot-password", { email });
  return response.data;
}

export async function resetPassword(dto: any) {
  const response = await api.post<{ updated: boolean }>("/auth/reset-password", dto);
  return response.data;
}

export function getSsoUrl(provider: "google" | "azure") {
  const callback = encodeURIComponent(`${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/auth/callback`);
  return `/auth/callback?provider=${provider}&code=demo-code&redirect_uri=${callback}`;
}
