"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

export function LogoutClient() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    logout();
    router.replace("/auth/login?reason=logout");
  }, [logout, router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-50">
      <div className="flex items-center gap-3 text-sm text-slate-300">
        <LoaderCircle className="h-5 w-5 animate-spin text-cyan-300" />
        Ending secure session...
      </div>
    </main>
  );
}
