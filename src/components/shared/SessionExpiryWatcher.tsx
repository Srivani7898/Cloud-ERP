"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { isTokenExpired } from "@/utils/jwt";

export function SessionExpiryWatcher() {
  const router = useRouter();
  const { accessToken, logout } = useAuthStore();

  useEffect(() => {
    if (!accessToken) return;

    const interval = window.setInterval(() => {
      if (isTokenExpired(accessToken)) {
        logout();
        router.replace("/auth/login?reason=session-expired");
      }
    }, 30_000);

    return () => window.clearInterval(interval);
  }, [accessToken, logout, router]);

  return null;
}
