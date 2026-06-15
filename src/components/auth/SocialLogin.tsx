"use client";

import { Cloud, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSsoUrl } from "@/services/auth-service";

export function SocialLogin() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Button variant="outline" className="border-white/15 bg-white/[0.07] text-slate-50 shadow-inner shadow-white/[0.03] transition hover:border-cyan-300/40 hover:bg-white/10" asChild>
        <a href={getSsoUrl("google")} aria-label="Continue with Google SSO">
          <Cloud className="h-4 w-4" />
          Google
        </a>
      </Button>
      <Button variant="outline" className="border-white/15 bg-white/[0.07] text-slate-50 shadow-inner shadow-white/[0.03] transition hover:border-violet-300/40 hover:bg-white/10" asChild>
        <a href={getSsoUrl("azure")} aria-label="Continue with Azure AD SSO">
          <KeyRound className="h-4 w-4" />
          Azure AD
        </a>
      </Button>
    </div>
  );
}
