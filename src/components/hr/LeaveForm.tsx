"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useHrStore } from "@/store/hr-store";
import { leaveSchema } from "@/validations/hr";

type Values = z.infer<typeof leaveSchema>;

export function LeaveForm() {
  const applyLeave = useHrStore((state) => state.applyLeave);
  const form = useForm<Values>({ resolver: zodResolver(leaveSchema), defaultValues: { employeeName: "", type: "Annual", from: "", to: "", days: 1 } });

  return (
    <form className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.06] md:grid-cols-5" onSubmit={form.handleSubmit((values) => { applyLeave(values); form.reset(); })}>
      <div className="space-y-2 md:col-span-2"><Label htmlFor="employeeName">Employee</Label><Input id="employeeName" {...form.register("employeeName")} /></div>
      <div className="space-y-2"><Label>Leave type</Label><Select defaultValue="Annual" onValueChange={(value) => form.setValue("type", value as Values["type"])}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Annual">Annual</SelectItem><SelectItem value="Sick">Sick</SelectItem><SelectItem value="Parental">Parental</SelectItem><SelectItem value="Unpaid">Unpaid</SelectItem></SelectContent></Select></div>
      <div className="space-y-2"><Label htmlFor="from">From</Label><Input id="from" type="date" {...form.register("from")} /></div>
      <div className="space-y-2"><Label htmlFor="to">To</Label><Input id="to" type="date" {...form.register("to")} /></div>
      <div className="space-y-2"><Label htmlFor="days">Days</Label><Input id="days" type="number" {...form.register("days")} /></div>
      <div className="flex items-end md:col-span-4"><Button type="submit"><Send className="h-4 w-4" />Apply leave</Button></div>
    </form>
  );
}
