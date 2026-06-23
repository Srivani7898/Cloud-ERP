"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Play } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { usePayrollStore } from "@/store/payroll-store";
import { payrollRunSchema } from "@/validations/payroll";

type Values = z.infer<typeof payrollRunSchema>;

export function PayrollRunForm() {
  const createRun = usePayrollStore(
    (state) => state.createRun
  );

  const form = useForm<Values>({
    resolver: zodResolver(payrollRunSchema),
    defaultValues: {
      period: "",
      payDate: "",
    },
  });

  const onSubmit = async (values: Values) => {
    console.log("CREATE RUN CLICKED");
    console.log(values);

    createRun(values.period, values.payDate);

    try {
      await fetch("/api/payroll/runs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          period: values.period,
          payDate: values.payDate,
          employees: 0,
          gross: 0,
          status: "Draft",
        }),
      });

      console.log("PAYROLL RUN SAVED TO API");
    } catch (error) {
      console.error("FAILED TO SAVE RUN", error);
    }

    form.reset();
  };

  return (
    <Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]">
      <CardHeader>
        <CardTitle>
          Create Payroll Run
        </CardTitle>

        <CardDescription>
          Start salary processing for a payroll period.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          autoComplete="off"
          className="grid gap-4 md:grid-cols-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-2">
            <Label htmlFor="period">
              Period
            </Label>

            <Input
              id="period"
              placeholder="Enter Period"
              autoComplete="off"
              {...form.register("period")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="payDate">
              Pay Date
            </Label>

            <Input
              id="payDate"
              type="date"
              autoComplete="off"
              {...form.register("payDate")}
            />
          </div>

          <div className="flex items-end">
            <Button
              type="submit"
              className="w-full"
            >
              <Play className="h-4 w-4 mr-2" />
              Create Run
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}