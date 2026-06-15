"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFinanceStore } from "@/store/finance-store";
import { invoiceSchema } from "@/validations/finance";

type Values = z.infer<typeof invoiceSchema>;

export function InvoiceForm() {
  const addInvoice = useFinanceStore((state) => state.addInvoice);
  const form = useForm<Values>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: { customer: "", dueDate: "", amount: 0, currency: "USD" }
  });

  return (
    <Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]">
      <CardHeader>
        <CardTitle>Create invoice</CardTitle>
        <CardDescription>Draft an AR invoice for approval and delivery.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-4 md:grid-cols-4"
          onSubmit={form.handleSubmit((values) => {
            addInvoice({
              id: `INV-${Math.floor(11000 + Math.random() * 8000)}`,
              customer: values.customer,
              status: "draft",
              dueDate: values.dueDate,
              total: { amount: values.amount, currency: values.currency.toUpperCase() },
              riskScore: 18
            });
            form.reset();
          })}
        >
          <div className="space-y-2 md:col-span-2"><Label htmlFor="customer">Customer</Label><Input id="customer" {...form.register("customer")} /></div>
          <div className="space-y-2"><Label htmlFor="dueDate">Due date</Label><Input id="dueDate" type="date" {...form.register("dueDate")} /></div>
          <div className="space-y-2"><Label htmlFor="amount">Amount</Label><Input id="amount" type="number" {...form.register("amount")} /></div>
          <div className="space-y-2"><Label htmlFor="currency">Currency</Label><Input id="currency" {...form.register("currency")} /></div>
          <div className="flex items-end md:col-span-3"><Button type="submit"><Send className="h-4 w-4" />Create draft</Button></div>
        </form>
      </CardContent>
    </Card>
  );
}
