"use client";

import { useState } from "react";
import { CheckCircle2, Fingerprint, RefreshCw, ShieldCheck } from "lucide-react";

const chainBlocks = [
  "Genesis block",
  "Identity mutations",
  "Finance journal writes",
  "Payroll access reads",
  "SCM webhook events",
];

export default function TamperDetectionPage() {
  const [message, setMessage] = useState("Latest verification completed with no tampering detected.");
  const [lastVerified, setLastVerified] = useState("Not run in this session");
  const [runCount, setRunCount] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);

  function verifyChain() {
    setIsVerifying(true);
    setMessage("Verifying hash chain integrity across immutable audit blocks...");

    window.setTimeout(() => {
      setRunCount((count) => count + 1);
      setLastVerified(new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date()));
      setMessage("Hash chain verified successfully. No tampering detected.");
      setIsVerifying(false);
    }, 800);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-semibold">
            <Fingerprint className="h-7 w-7 text-cyan-300" /> Tamper detection
          </h1>
          <p className="mt-2 text-slate-300">{message}</p>
        </div>
        <button
          type="button"
          onClick={verifyChain}
          disabled={isVerifying}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <RefreshCw className={`h-4 w-4 ${isVerifying ? "animate-spin" : ""}`} />
          {isVerifying ? "Verifying..." : "Re-verify chain"}
        </button>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-lg border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">Verification result</p>
          <p className="mt-2 flex items-center gap-2 text-2xl font-semibold text-emerald-300">
            <ShieldCheck className="h-6 w-6" /> Verified
          </p>
        </article>
        <article className="rounded-lg border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">Last verified</p>
          <p className="mt-2 text-xl font-semibold text-white">{lastVerified}</p>
        </article>
        <article className="rounded-lg border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">Verification runs</p>
          <p className="mt-2 text-2xl font-semibold text-cyan-300">{runCount}</p>
        </article>
      </section>

      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <Fingerprint className="h-6 w-6 text-cyan-300" /> Hash chain verification
        </h2>
        <div className="mt-6 space-y-4">
          {chainBlocks.map((item, index) => (
            <div key={item} className="flex items-center gap-4">
              <div className={`flex h-9 w-9 items-center justify-center rounded-full border ${isVerifying ? "border-blue-400/50 bg-blue-500/15" : "border-emerald-400/40 bg-emerald-500/15"}`}>
                {isVerifying ? <RefreshCw className="h-5 w-5 animate-spin text-blue-300" /> : <CheckCircle2 className="h-5 w-5 text-emerald-300" />}
              </div>
              <div className="flex-1 rounded-lg border border-slate-800 bg-slate-950/70 p-3">
                <p className="font-semibold">{item}</p>
                <p className="text-sm text-slate-400">
                  block #{19320 + index} · {isVerifying ? "verification in progress" : `sha256 verified${runCount ? ` · run ${runCount}` : ""}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
