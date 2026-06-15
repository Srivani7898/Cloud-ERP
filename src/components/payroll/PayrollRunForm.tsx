"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Play } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePayrollStore } from "@/store/payroll-store";
import { payrollRunSchema } from "@/validations/payroll";

type Values = z.infer<typeof payrollRunSchema>;

export function PayrollRunForm() {
  const createRun = usePayrollStore((state) => state.createRun);
  const form = useForm<Values>({ resolver: zodResolver(payrollRunSchema), defaultValues: { period: "", payDate: "" } });
  return (
    <Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]">
      <CardHeader><CardTitle>Create payroll run</CardTitle><CardDescription>Start salary processing for a payroll period.</CardDescription></CardHeader>
      <CardContent>
        <form className="grid gap-4 md:grid-cols-3" onSubmit={form.handleSubmit((values) => { createRun(values.period, values.payDate); form.reset(); })}>
          <div className="space-y-2"><Label htmlFor="period">Period</Label><Input id="period" placeholder="August 2026" {...form.register("period")} /></div>
          <div className="space-y-2"><Label htmlFor="payDate">Pay date</Label><Input id="payDate" type="date" {...form.register("payDate")} /></div>
          <div className="flex items-end"><Button type="submit"><Play className="h-4 w-4" />Create run</Button></div>
        </form>
      </CardContent>
    </Card>
  );
}
