"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, Mail, Network } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { FormField } from "@/components/auth/FormField";
import { SocialLogin } from "@/components/auth/SocialLogin";
import { useLogin } from "@/hooks/use-auth";
import { loginSchema } from "@/validations/auth";

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const login = useLogin();
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema) as any,
    defaultValues: { email: "", password: "", tenantSlug: "", portal: "employee", remember: false }
  });

  return (
    <form className="space-y-5" onSubmit={form.handleSubmit((values) => login.mutate(values as any))}>
      <FormField id="tenantSlug" label="Tenant workspace" error={form.formState.errors.tenantSlug}>
        <div className="relative">
          <Network className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input id="tenantSlug" className="border-white/15 bg-white/[0.07] pl-9 text-slate-50 shadow-inner shadow-white/[0.03] transition focus-visible:border-cyan-300/60 focus-visible:bg-white/[0.1]" {...form.register("tenantSlug")} />
        </div>
      </FormField>
      <FormField id="email" label="Work email" error={form.formState.errors.email}>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input id="email" type="email" className="border-white/15 bg-white/[0.07] pl-9 text-slate-50 shadow-inner shadow-white/[0.03] transition focus-visible:border-cyan-300/60 focus-visible:bg-white/[0.1]" {...form.register("email")} />
        </div>
      </FormField>
      <FormField id="password" label="Password" error={form.formState.errors.password}>
        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input id="password" type="password" className="border-white/15 bg-white/[0.07] pl-9 text-slate-50 shadow-inner shadow-white/[0.03] transition focus-visible:border-cyan-300/60 focus-visible:bg-white/[0.1]" {...form.register("password")} />
        </div>
      </FormField>
      <FormField id="portal" label="Login portal" error={form.formState.errors.portal}>
        <Select defaultValue="employee" onValueChange={(value) => form.setValue("portal", value as LoginValues["portal"])}>
          <SelectTrigger className="border-white/15 bg-white/[0.07] text-slate-50 focus:ring-cyan-300/60">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="employee">Employee Self-Service</SelectItem>
            <SelectItem value="hr_admin">HR Admin</SelectItem>
            <SelectItem value="finance_manager">Finance Manager</SelectItem>
            <SelectItem value="payroll_manager">Payroll Manager</SelectItem>
            <SelectItem value="scm_manager">SCM Manager</SelectItem>
            <SelectItem value="forecast_manager">Forecast Manager</SelectItem>
            <SelectItem value="project_manager">Project Manager</SelectItem>
            <SelectItem value="super_admin">Super Admin</SelectItem>
          </SelectContent>
        </Select>
      </FormField>
      <div className="flex items-center justify-between gap-3 text-sm">
        <label className="flex items-center gap-2 text-slate-300">
          <Checkbox checked={form.watch("remember")} onCheckedChange={(checked) => form.setValue("remember", Boolean(checked))} />
          Remember device
        </label>
        <Link className="text-cyan-300 hover:text-cyan-200" href="/auth/forgot-password">Forgot password?</Link>
      </div>
      <Button className="w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-500 shadow-lg shadow-blue-950/40 hover:brightness-110" size="lg" disabled={login.isPending}>{login.isPending ? "Securing session..." : "Sign in"}</Button>
      <div className="flex items-center gap-3 text-xs text-slate-400">
        <Separator className="bg-white/10" />
        <span className="shrink-0 whitespace-nowrap">or continue with SSO</span>
        <Separator className="bg-white/10" />
      </div>
      <SocialLogin />
    </form>
  );
}
