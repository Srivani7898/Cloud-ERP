"use client";

import { useEffect, useState } from "react";
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
import { useAuthStore } from "@/store/auth-store";

type Values = z.infer<typeof leaveSchema>;

export function LeaveForm() {
  const applyLeave = useHrStore((state) => state.applyLeave);
  const employees = useHrStore((state) => state.employees);
  const user = useAuthStore((state) => state.user);
  const employee =
    employees.find(
      (emp) => emp.name === user?.name
    ) ?? employees[0];
  const [error, setError] = useState("");
  const form = useForm<Values>({ resolver: zodResolver(leaveSchema), defaultValues: { employeeName: user?.name ?? "", type: "Annual", from: "", to: "", days: 0 } });

  const fromDate = form.watch("from");
  const toDate = form.watch("to");

  useEffect(() => {
    console.log("FROM:", fromDate);
    console.log("TO:", toDate);

    if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);

      const diff =
        Math.ceil(
          (end.getTime() - start.getTime()) /
          (1000 * 60 * 60 * 24)
        ) + 1;

      console.log("DIFF:", diff);

      if (diff > 0) {
        form.setValue("days", diff);
      }
    }
  }, [fromDate, toDate, form]);

  return (
    <form className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.06] md:grid-cols-5" onSubmit={form.handleSubmit((values) => {

      if (
        values.type === "Annual" &&
        values.days > employee.annualLeaveBalance
      ) {
        setError(
          `Only ${employee.annualLeaveBalance} Annual Leave days remaining`
        );
        return;
      }

      if (
        values.type === "Sick" &&
        values.days > employee.sickLeaveBalance
      ) {
        setError(
          `Only ${employee.sickLeaveBalance} Sick Leave days remaining`
        );
        return;
      }

      setError("");
      applyLeave({
        ...values,
        employeeName: user?.name ?? "",
      });

      form.reset({
        employeeName: user?.name ?? "",
        type: "Annual",
        from: "",
        to: "",
        days: 0
      });
    })}>
      <div className="space-y-2 md:col-span-2"><Label htmlFor="employeeName">Employee</Label><Input
        id="employeeName"
        value={user?.name || ""}
        readOnly
      /></div>
      <div className="space-y-2"><Label>Leave type</Label><Select defaultValue="Annual" onValueChange={(value) => form.setValue("type", value as Values["type"])}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Annual">Annual</SelectItem><SelectItem value="Sick">Sick</SelectItem><SelectItem value="Parental">Parental</SelectItem><SelectItem value="Unpaid">Unpaid</SelectItem></SelectContent></Select></div>
      <div className="space-y-2"><Label htmlFor="from">From</Label><Input id="from" type="date" {...form.register("from")} /></div>
      <div className="space-y-2"><Label htmlFor="to">To</Label><Input id="to" type="date" {...form.register("to")} /></div>
      <div className="space-y-2">
        <Label htmlFor="days">Days</Label>

        <Input
          id="days"
          type="number"
          value={form.watch("days") || ""}
          disabled
        />

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
      <div className="flex items-end md:col-span-4"><Button type="submit"><Send className="h-4 w-4" />Apply leave</Button></div>
    </form>
  );
}
