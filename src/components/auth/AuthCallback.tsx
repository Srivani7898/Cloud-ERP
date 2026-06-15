"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { createDemoToken } from "@/utils/jwt";

export function AuthCallback() {
  const router = useRouter();
  const params = useSearchParams();
  const setSession = useAuthStore((state) => state.setSession);

  useEffect(() => {
    const provider = params.get("provider") ?? "sso";
    setSession({
      accessToken: createDemoToken(),
      refreshToken: createDemoToken(86_400),
      expiresAt: Date.now() + 3600_000,
      user: {
        id: `usr_${provider}`,
        name: "Morgan Lee",
        email: "morgan.lee@northstar.example",
        roles: ["tenant_admin"],
        tenant: { id: "tenant-northstar", name: "Northstar Manufacturing", region: "US East", plan: "Enterprise" },
        mfaEnabled: true
      }
    });
    router.replace("/auth/mfa");
  }, [params, router, setSession]);

  return (
    <div className="flex items-center gap-3 text-sm text-slate-300">
      <LoaderCircle className="h-5 w-5 animate-spin text-cyan-300" />
      Finalizing secure SSO handshake...
    </div>
  );
}
