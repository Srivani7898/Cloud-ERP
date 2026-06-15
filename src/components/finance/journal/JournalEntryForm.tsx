"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BookPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFinanceStore } from "@/store/finance-store";
import { journalEntrySchema } from "@/validations/finance";

type Values = z.infer<typeof journalEntrySchema>;

export function JournalEntryForm() {
  const addJournalEntry = useFinanceStore((state) => state.addJournalEntry);
  const form = useForm<Values>({
    resolver: zodResolver(journalEntrySchema),
    defaultValues: { description: "", period: "FY2026-Q2", debitAccount: "", creditAccount: "", amount: 0 }
  });

  return (
    <Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]">
      <CardHeader>
        <CardTitle>Create journal entry</CardTitle>
        <CardDescription>Prepare balanced debit and credit postings.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-4 md:grid-cols-5"
          onSubmit={form.handleSubmit((values) => {
            addJournalEntry({
              id: `JE-${Math.floor(4000 + Math.random() * 8000)}`,
              period: values.period as "FY2026-Q2",
              status: "draft",
              description: values.description,
              createdBy: "Finance User",
              total: { amount: values.amount, currency: "USD" }
            });
            form.reset();
          })}
        >
          <div className="space-y-2 md:col-span-2"><Label htmlFor="description">Description</Label><Input id="description" {...form.register("description")} /></div>
          <div className="space-y-2"><Label htmlFor="debitAccount">Debit</Label><Input id="debitAccount" {...form.register("debitAccount")} /></div>
          <div className="space-y-2"><Label htmlFor="creditAccount">Credit</Label><Input id="creditAccount" {...form.register("creditAccount")} /></div>
          <div className="space-y-2"><Label htmlFor="amount">Amount</Label><Input id="amount" type="number" {...form.register("amount")} /></div>
          <div className="flex items-end md:col-span-5"><Button type="submit"><BookPlus className="h-4 w-4" />Save draft</Button></div>
        </form>
      </CardContent>
    </Card>
  );
}
