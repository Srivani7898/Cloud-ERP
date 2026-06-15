"use client";

import { ShieldCheck } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/auth/FormField";
import { useMfa } from "@/hooks/use-auth";
import { mfaSchema } from "@/validations/auth";

type Values = z.infer<typeof mfaSchema>;

export function MFAForm() {
  const mfa = useMfa();
  const form = useForm<Values>({ resolver: zodResolver(mfaSchema), defaultValues: { code: "" } });

  return (
    <form className="space-y-5" onSubmit={form.handleSubmit((values) => mfa.mutate(values.code))}>
      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-cyan-300/15 text-cyan-200">
        <ShieldCheck className="h-7 w-7" />
      </div>
      <FormField id="code" label="Authenticator code" error={form.formState.errors.code}>
        <Input id="code" inputMode="numeric" maxLength={6} className="h-14 border-white/15 bg-white/5 text-center text-2xl font-semibold tracking-[0.35em] text-slate-50" {...form.register("code")} />
      </FormField>
      <Button className="w-full" size="lg" disabled={mfa.isPending}>{mfa.isPending ? "Verifying..." : "Verify and continue"}</Button>
      <p className="text-sm text-slate-300">Use any six-digit code in this demo flow.</p>
    </form>
  );
}
