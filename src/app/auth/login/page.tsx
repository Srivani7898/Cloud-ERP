import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <AuthShell title="Sign in to Cloud ERP" subtitle="Access your secure enterprise finance and operations workspace.">
      <LoginForm />
      <p className="mt-6 text-center text-sm text-slate-300">
        New to Cloud ERP?{" "}
        <Link href="/auth/register" className="font-semibold text-cyan-300 transition hover:text-white">
          Create account
        </Link>
      </p>
    </AuthShell>
  );
}
