"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePayrollStore } from "@/store/payroll-store";
import { payrollEmployeeSchema } from "@/validations/payroll";

type Values = z.infer<typeof payrollEmployeeSchema>;

export function PayrollEmployeeForm() {
  const addEmployee = usePayrollStore((state) => state.addEmployee);
  const form = useForm<Values>({ resolver: zodResolver(payrollEmployeeSchema), defaultValues: { name: "", employeeCode: "", department: "", designation: "", baseSalary: 0, taxRegion: "" } });
  return (
    <Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]">
      <CardHeader><CardTitle>Add payroll employee</CardTitle><CardDescription>Enroll an employee into the payroll engine.</CardDescription></CardHeader>
      <CardContent>
        <form className="grid gap-4 md:grid-cols-3" onSubmit={form.handleSubmit((values) => { addEmployee(values); form.reset(); })}>
          <div className="space-y-2"><Label htmlFor="employeeCode">Code</Label><Input id="employeeCode" {...form.register("employeeCode")} /></div>
          <div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" {...form.register("name")} /></div>
          <div className="space-y-2"><Label htmlFor="department">Department</Label><Input id="department" {...form.register("department")} /></div>
          <div className="space-y-2"><Label htmlFor="designation">Designation</Label><Input id="designation" {...form.register("designation")} /></div>
          <div className="space-y-2"><Label htmlFor="baseSalary">Base salary</Label><Input id="baseSalary" type="number" {...form.register("baseSalary")} /></div>
          <div className="space-y-2"><Label htmlFor="taxRegion">Tax region</Label><Input id="taxRegion" {...form.register("taxRegion")} /></div>
          <div className="flex items-end md:col-span-3"><Button type="submit"><UserPlus className="h-4 w-4" />Add employee</Button></div>
        </form>
      </CardContent>
    </Card>
  );
}
