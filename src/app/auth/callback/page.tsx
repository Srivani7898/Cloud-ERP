import { Suspense } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthCallback } from "@/components/auth/AuthCallback";

export default function CallbackPage() {
  return (
    <AuthShell title="Completing SSO" subtitle="Your identity provider response is being validated.">
      <Suspense fallback={<p className="text-sm text-slate-300">Loading callback...</p>}>
        <AuthCallback />
      </Suspense>
    </AuthShell>
  );
}
