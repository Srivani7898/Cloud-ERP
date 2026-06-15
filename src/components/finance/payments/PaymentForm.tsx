"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarClock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFinanceStore } from "@/store/finance-store";
import { paymentSchema } from "@/validations/finance";

type Values = z.infer<typeof paymentSchema>;

export function PaymentForm() {
  const addPayment = useFinanceStore((state) => state.addPayment);
  const form = useForm<Values>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { vendor: "", scheduledDate: "", amount: 0, method: "ACH" }
  });

  return (
    <Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]">
      <CardHeader>
        <CardTitle>Schedule payment</CardTitle>
        <CardDescription>Create an AP payment instruction for approval.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-4 md:grid-cols-4"
          onSubmit={form.handleSubmit((values) => {
            addPayment({
              id: `PAY-${Math.floor(9000 + Math.random() * 8000)}`,
              vendor: values.vendor,
              status: "scheduled",
              method: values.method,
              scheduledDate: values.scheduledDate,
              total: { amount: values.amount, currency: "USD" }
            });
            form.reset();
          })}
        >
          <div className="space-y-2 md:col-span-2"><Label htmlFor="vendor">Vendor</Label><Input id="vendor" {...form.register("vendor")} /></div>
          <div className="space-y-2"><Label htmlFor="scheduledDate">Scheduled</Label><Input id="scheduledDate" type="date" {...form.register("scheduledDate")} /></div>
          <div className="space-y-2"><Label htmlFor="amount">Amount</Label><Input id="amount" type="number" {...form.register("amount")} /></div>
          <div className="space-y-2">
            <Label>Method</Label>
            <Select defaultValue="ACH" onValueChange={(value) => form.setValue("method", value as Values["method"])}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ACH">ACH</SelectItem>
                <SelectItem value="Wire">Wire</SelectItem>
                <SelectItem value="Card">Card</SelectItem>
                <SelectItem value="Check">Check</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end md:col-span-3"><Button type="submit"><CalendarClock className="h-4 w-4" />Queue payment</Button></div>
        </form>
      </CardContent>
    </Card>
  );
}
