"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, Lock, Mail, UserRound } from "lucide-react";

const inputClass =
  "h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] px-12 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/60";

export function RegisterForm() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const [form, setForm] = useState({
    company: "",
    name: "",
    email: "",
    password: "",
    residency: "US East",
  });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!accepted) return;

    localStorage.setItem(
      "cloud-erp-registered-user",
      JSON.stringify({
        authenticated: false,
        role: "super_admin",
        name: form.name || "Tenant Admin",
        email: form.email,
        tenant: form.company || "Northstar Manufacturing",
      }),
    );

    router.push("/auth/login?registered=1");
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <label className="block space-y-2">
        <span className="text-sm font-semibold text-white">Company</span>
        <div className="relative">
          <Building2 className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-300" />
          <input
            required
            value={form.company}
            onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
            className={inputClass}
            placeholder="Northstar Manufacturing"
          />
        </div>
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-white">Administrator name</span>
        <div className="relative">
          <UserRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-300" />
          <input
            required
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            className={inputClass}
            placeholder="Avery Stone"
          />
        </div>
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-white">Work email</span>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-300" />
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            className={inputClass}
            placeholder="admin@company.com"
          />
        </div>
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-white">Password</span>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-300" />
          <input
            required
            type="password"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            className={inputClass}
            placeholder="Create a strong password"
          />
        </div>
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-white">Data residency</span>
        <select
          value={form.residency}
          onChange={(event) => setForm((current) => ({ ...current, residency: event.target.value }))}
          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/60 [&>option]:bg-slate-950 [&>option]:text-white"
        >
          <option>US East</option>
          <option>EU West</option>
          <option>India South</option>
          <option>Singapore</option>
        </select>
      </label>

      <label className="flex items-start gap-3 text-sm leading-6 text-slate-300">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(event) => setAccepted(event.target.checked)}
          className="mt-1 h-5 w-5 rounded border-white/10 bg-white/[0.06]"
        />
        <span>I accept tenant security, data processing, and enterprise usage terms.</span>
      </label>

      <button
        type="submit"
        disabled={!accepted}
        className="h-14 w-full rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 font-semibold text-white shadow-lg shadow-fuchsia-950/30 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
      >
        Create account
      </button>

      <p className="text-center text-sm text-slate-300">
        Already have an account?{" "}
        <Link href="/auth/login" className="font-semibold text-cyan-300 transition hover:text-white">
          Sign in
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;
