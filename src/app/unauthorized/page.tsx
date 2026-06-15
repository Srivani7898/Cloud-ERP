import Link from "next/link";
import { ShieldX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-50">
      <section className="max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-red-400/15 text-red-200"><ShieldX className="h-8 w-8" /></div>
        <h1 className="mt-6 text-3xl font-semibold tracking-normal">Access requires another role</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">Your current tenant permissions do not include this workspace. Ask a tenant administrator for access.</p>
        <Button asChild className="mt-8"><Link href="/dashboard">Return to dashboard</Link></Button>
      </section>
    </main>
  );
}
