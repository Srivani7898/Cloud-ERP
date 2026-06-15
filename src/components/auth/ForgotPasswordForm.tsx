"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Network } from "lucide-react";

export function ForgotPasswordForm() {
  const router = useRouter();
  const [tenant, setTenant] = useState("northstar");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("Reset instructions were sent if the account exists.");

    window.setTimeout(() => {
      const query = new URLSearchParams({
        tenant: tenant || "northstar",
        email: email || "user@cloud.com",
        token: "demo-reset-token",
      });
      router.push(`/auth/reset-password?${query.toString()}`);
    }, 700);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-white">Recover account access</h1>
        <p className="mt-3 text-slate-300">
          We will send a time-limited reset link to the verified tenant administrator email.
        </p>
      </div>

      <label className="block">
        <span className="font-semibold text-white">Tenant workspace</span>
        <span className="mt-2 flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-950/70 px-4 py-3">
          <Network className="h-5 w-5 text-slate-400" />
          <input
            value={tenant}
            onChange={(event) => setTenant(event.target.value)}
            className="w-full bg-transparent text-white outline-none"
            placeholder="northstar"
          />
        </span>
      </label>

      <label className="block">
        <span className="font-semibold text-white">Work email</span>
        <span className="mt-2 flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-950/70 px-4 py-3">
          <Mail className="h-5 w-5 text-slate-400" />
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full bg-transparent text-white outline-none"
            placeholder="user@cloud.com"
            type="email"
          />
        </span>
      </label>

      {message ? (
        <div className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">
          {message} Redirecting to reset password...
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Opening reset page..." : "Send reset link"}
      </button>

      <button
        type="button"
        onClick={() => router.push("/auth/login")}
        className="w-full text-center font-semibold text-cyan-300 transition hover:text-white"
      >
        Back to sign in
      </button>
    </form>
  );
}
