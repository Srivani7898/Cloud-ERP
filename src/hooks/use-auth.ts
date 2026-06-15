"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login, register, resetPassword, requestPasswordReset, verifyMfa } from "@/services/auth-service";
import { useAuthStore } from "@/store/auth-store";
import type { AuthUser, LoginInput } from "@/types/auth";

function routeForUser(user: AuthUser) {
  if (user.roles.includes("super_admin")) return "/admin/dashboard";
  if (user.roles.includes("payroll_manager")) return "/payroll/dashboard";
  if (user.roles.includes("forecast_manager")) return "/forecast/dashboard";
  if (user.roles.includes("project_manager")) return "/projects/dashboard";
  if (user.roles.includes("scm_manager")) return "/scm/dashboard";
  if (user.roles.includes("hr_manager")) return "/hr/dashboard";
  if (user.roles.includes("finance_manager")) return "/finance/dashboard";
  if (user.roles.includes("employee")) return "/employee/dashboard";
  return "/dashboard";
}

function routeForPortal(portal: LoginInput["portal"]) {
  if (portal === "super_admin") return "/admin/dashboard";
  if (portal === "hr_admin") return "/hr/dashboard";
  if (portal === "finance_manager") return "/finance/dashboard";
  if (portal === "payroll_manager") return "/payroll/dashboard";
  if (portal === "scm_manager") return "/scm/dashboard";
  if (portal === "forecast_manager") return "/forecast/dashboard";
  if (portal === "project_manager") return "/projects/dashboard";
  return "/employee/dashboard";
}

export function useLogin() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
  const setPostLoginRedirect = useAuthStore((state) => state.setPostLoginRedirect);

  return useMutation({
    mutationFn: login,
    onSuccess: (session, values) => {
      setSession(session);
      const redirectTo = routeForPortal(values.portal);
      setPostLoginRedirect(redirectTo);
      router.push(session.user.mfaEnabled ? "/auth/mfa" : redirectTo);
    }
  });
}

export function useRegister() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: register,
    onSuccess: (session) => {
      setSession(session);
      router.push("/auth/mfa");
    }
  });
}

export function useMfa() {
  const router = useRouter();

  return useMutation({
    mutationFn: verifyMfa,
    onSuccess: () => {
      const { user, postLoginRedirect, setPostLoginRedirect } = useAuthStore.getState();
      setPostLoginRedirect(null);
      router.push(postLoginRedirect ?? (user ? routeForUser(user) : "/dashboard"));
    }
  });
}

export function useForgotPassword() {
  return useMutation({ mutationFn: requestPasswordReset });
}

export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => router.push("/auth/login?reason=password-reset")
  });
}
