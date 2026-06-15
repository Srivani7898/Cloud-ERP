"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock } from "lucide-react";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "user@cloud.com";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    setMessage("Password reset successful. Redirecting to sign in...");
    window.setTimeout(() => router.push("/auth/login"), 900);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-white">Create new password</h1>
        <p className="mt-3 text-slate-300">Reset access for {email}</p>
      </div>

      <label className="block">
        <span className="font-semibold text-white">New password</span>
        <span className="mt-2 flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-950/70 px-4 py-3">
          <Lock className="h-5 w-5 text-slate-400" />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type={showPassword ? "text" : "password"}
            className="w-full bg-transparent text-white outline-none"
            placeholder="Minimum 8 characters"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="rounded-md p-1 text-slate-300 transition hover:text-white"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </span>
      </label>

      <label className="block">
        <span className="font-semibold text-white">Confirm password</span>
        <span className="mt-2 flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-950/70 px-4 py-3">
          <Lock className="h-5 w-5 text-slate-400" />
          <input
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            type={showConfirm ? "text" : "password"}
            className="w-full bg-transparent text-white outline-none"
            placeholder="Re-enter new password"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="rounded-md p-1 text-slate-300 transition hover:text-white"
            aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
          >
            {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </span>
      </label>

      {message ? (
        <div className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">
          {message}
        </div>
      ) : null}

      <button type="submit" className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500">
        Reset password
      </button>
    </form>
  );
}
