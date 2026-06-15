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
import { ledgerEntrySchema } from "@/validations/finance";

type Values = z.infer<typeof ledgerEntrySchema>;

export function LedgerEntryForm() {
  const addLedgerEntry = useFinanceStore((state) => state.addLedgerEntry);
  const form = useForm<Values>({
    resolver: zodResolver(ledgerEntrySchema),
    defaultValues: { account: "", description: "", debit: 0, credit: 0 }
  });

  return (
    <Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]">
      <CardHeader><CardTitle>Post ledger entry</CardTitle><CardDescription>Add a debit or credit posting to the general ledger.</CardDescription></CardHeader>
      <CardContent>
        <form className="grid gap-4 md:grid-cols-5" onSubmit={form.handleSubmit((values) => {
          addLedgerEntry({
            id: `GL-${Math.floor(91000 + Math.random() * 8000)}`,
            date: new Date().toISOString().slice(0, 10),
            account: values.account,
            description: values.description,
            debit: { amount: values.debit, currency: "USD" },
            credit: { amount: values.credit, currency: "USD" }
          });
          form.reset();
        })}>
          <div className="space-y-2 md:col-span-2"><Label htmlFor="account">Account</Label><Input id="account" {...form.register("account")} /></div>
          <div className="space-y-2 md:col-span-3"><Label htmlFor="description">Description</Label><Input id="description" {...form.register("description")} /></div>
          <div className="space-y-2"><Label htmlFor="debit">Debit</Label><Input id="debit" type="number" {...form.register("debit")} /></div>
          <div className="space-y-2"><Label htmlFor="credit">Credit</Label><Input id="credit" type="number" {...form.register("credit")} /></div>
          <div className="flex items-end md:col-span-3"><Button type="submit"><BookPlus className="h-4 w-4" />Post entry</Button></div>
        </form>
      </CardContent>
    </Card>
  );
}
