"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth-store";
import { profileSchema } from "@/validations/auth";

type Values = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const { user, activeTenant, updateUser } = useAuthStore();
  const form = useForm<Values>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name ?? "", email: user?.email ?? "", region: activeTenant?.region ?? "" }
  });

  return (
    <form className="grid gap-4 sm:grid-cols-2" onSubmit={form.handleSubmit((values) => updateUser({ name: values.name, email: values.email }))}>
      <div className="space-y-2"><Label htmlFor="name">Full name</Label><Input id="name" {...form.register("name")} /></div>
      <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" {...form.register("email")} /></div>
      <div className="space-y-2"><Label htmlFor="region">Tenant region</Label><Input id="region" {...form.register("region")} disabled /></div>
      <div className="flex items-end"><Button type="submit"><Save className="h-4 w-4" />Save profile</Button></div>
    </form>
  );
}
