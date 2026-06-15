"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BarChart3, Lock, Mail, Network, ShieldCheck } from "lucide-react";

export default function AnalyticsLoginPage() {
  const router = useRouter();
  const [tenant, setTenant] = useState("northstar");
  const [email, setEmail] = useState("analytics.manager@northstar.example");
  const [password, setPassword] = useState("");
  const [mfa, setMfa] = useState("");
  const [step, setStep] = useState<"credentials" | "mfa">("credentials");
  const [error, setError] = useState("");

  function submitCredentials(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!tenant || !email || !password) {
      setError("Enter tenant, email, and password.");
      return;
    }
    setError("");
    setStep("mfa");
  }

  function submitMfa(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (mfa !== "123456") {
      setError("Use demo MFA code 123456.");
      return;
    }

    const user = {
      id: "user-analytics-manager",
      name: "Analytics Manager",
      email,
      tenantId: tenant,
      roles: ["analytics_manager"],
    };

    localStorage.setItem(
      "cloud-erp-auth",
      JSON.stringify({
        state: {
          user,
          accessToken: "demo-analytics-access-token",
          refreshToken: "demo-analytics-refresh-token",
          isAuthenticated: true,
          postLoginRedirect: "/analytics/dashboard",
        },
        version: 0,
      })
    );

    router.push("/analytics/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#020617] px-6 py-10 text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.24),transparent_32%),radial-gradient(circle_at_80%_30%,rgba(139,92,246,0.22),transparent_34%),linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:auto,auto,70px_70px,70px_70px]" />
      <section className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-xl items-center">
        <div className="w-full rounded-2xl border border-slate-700 bg-slate-900/75 p-8 shadow-2xl shadow-blue-950/40 backdrop-blur">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-400 to-violet-500">
            <BarChart3 className="h-8 w-8" />
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">Analytics Manager</p>
            <h1 className="mt-3 text-3xl font-semibold">Sign in to BI Analytics</h1>
            <p className="mt-2 text-slate-300">Access executive dashboards, AI insights, reports, and cross-module ERP analytics.</p>
          </div>

          {step === "credentials" ? (
            <form onSubmit={submitCredentials} className="mt-8 space-y-5">
              <label className="block">
                <span className="font-semibold">Tenant workspace</span>
                <span className="mt-2 flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-950/70 px-4 py-3">
                  <Network className="h-5 w-5 text-slate-400" />
                  <input value={tenant} onChange={(event) => setTenant(event.target.value)} className="w-full bg-transparent outline-none" />
                </span>
              </label>
              <label className="block">
                <span className="font-semibold">Work email</span>
                <span className="mt-2 flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-950/70 px-4 py-3">
                  <Mail className="h-5 w-5 text-slate-400" />
                  <input value={email} onChange={(event) => setEmail(event.target.value)} className="w-full bg-transparent outline-none" />
                </span>
              </label>
              <label className="block">
                <span className="font-semibold">Password</span>
                <span className="mt-2 flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-950/70 px-4 py-3">
                  <Lock className="h-5 w-5 text-slate-400" />
                  <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="w-full bg-transparent outline-none" />
                </span>
              </label>
              {error ? <p className="text-sm text-red-300">{error}</p> : null}
              <button className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold transition hover:bg-blue-500">Continue</button>
            </form>
          ) : (
            <form onSubmit={submitMfa} className="mt-8 space-y-5">
              <label className="block">
                <span className="font-semibold">MFA verification code</span>
                <span className="mt-2 flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-950/70 px-4 py-3">
                  <ShieldCheck className="h-5 w-5 text-slate-400" />
                  <input value={mfa} onChange={(event) => setMfa(event.target.value)} className="w-full bg-transparent outline-none" placeholder="123456" />
                </span>
              </label>
              {error ? <p className="text-sm text-red-300">{error}</p> : null}
              <button className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold transition hover:bg-blue-500">Open analytics dashboard</button>
              <button type="button" onClick={() => setStep("credentials")} className="w-full rounded-lg border border-slate-700 px-4 py-3 font-semibold transition hover:border-cyan-400">Back</button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
