"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import type { Role } from "@/types/auth";
import { hasRole } from "@/utils/rbac";

export function ProtectedRoute({ children, roles }: { children: React.ReactNode; roles?: Role[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.accessToken);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;

    if (!token) {
      router.replace(`/auth/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    if (roles?.length && !hasRole(user, roles)) {
      router.replace("/unauthorized");
    }
  }, [hasHydrated, pathname, roles, router, token, user]);

  if (!hasHydrated || !token || (roles?.length && !hasRole(user, roles))) {
    return null;
  }

  return children;
}
