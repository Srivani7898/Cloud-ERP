"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useHrStore } from "@/store/hr-store";
import type { Employee } from "@/types/hr";
import { employeeSchema } from "@/validations/hr";

type Values = z.infer<typeof employeeSchema>;

export function EmployeeForm({ employee }: { employee?: Employee }) {
  const router = useRouter();
  const addEmployee = useHrStore((state) => state.addEmployee);
  const updateEmployee = useHrStore((state) => state.updateEmployee);
  const form = useForm<Values>({
    resolver: zodResolver(employeeSchema),
    defaultValues: employee ?? { name: "", email: "", title: "", department: "", location: "", joinedAt: "" }
  });

  return (
    <form className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.06] md:grid-cols-2" onSubmit={form.handleSubmit(async (values) => {
      if (employee) {
        await updateEmployee(employee.id, values);
        router.push(`/hr/employees/${employee.id}`);
      } else {
        const created = await addEmployee(values as any);
        router.push(`/hr/employees/${created.id}`);
      }
    })}>
      <div className="space-y-2"><Label htmlFor="name">Full name</Label><Input id="name" {...form.register("name")} /></div>
      <div className="space-y-2"><Label htmlFor="email">Work email</Label><Input id="email" type="email" {...form.register("email")} /></div>
      <div className="space-y-2"><Label htmlFor="title">Job title</Label><Input id="title" {...form.register("title")} /></div>
      <div className="space-y-2"><Label htmlFor="department">Department</Label><Input id="department" {...form.register("department")} /></div>
      <div className="space-y-2"><Label htmlFor="location">Location</Label><Input id="location" {...form.register("location")} /></div>
      <div className="space-y-2"><Label htmlFor="joinedAt">Join date</Label><Input id="joinedAt" type="date" {...form.register("joinedAt")} /></div>
      <div className="md:col-span-2"><Button type="submit"><Save className="h-4 w-4" />Save employee</Button></div>
    </form>
  );
}
