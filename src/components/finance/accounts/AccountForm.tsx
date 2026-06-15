"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFinanceStore } from "@/store/finance-store";
import { accountSchema } from "@/validations/finance";

type Values = z.infer<typeof accountSchema>;

export function AccountForm() {
  const addAccount = useFinanceStore((state) => state.addAccount);
  const form = useForm<Values>({
    resolver: zodResolver(accountSchema),
    defaultValues: { code: "", name: "", type: "asset", owner: "", balance: 0 }
  });

  return (
    <Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]">
      <CardHeader><CardTitle>Create account</CardTitle><CardDescription>Add an account to the tenant chart of accounts.</CardDescription></CardHeader>
      <CardContent>
        <form className="grid gap-4 md:grid-cols-5" onSubmit={form.handleSubmit((values) => {
          addAccount({ code: values.code, name: values.name, type: values.type, owner: values.owner, balance: { amount: values.balance, currency: "USD" } });
          form.reset();
        })}>
          <div className="space-y-2"><Label htmlFor="code">Code</Label><Input id="code" {...form.register("code")} /></div>
          <div className="space-y-2 md:col-span-2"><Label htmlFor="name">Name</Label><Input id="name" {...form.register("name")} /></div>
          <div className="space-y-2"><Label>Type</Label><Select defaultValue="asset" onValueChange={(value) => form.setValue("type", value as Values["type"])}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="asset">Asset</SelectItem><SelectItem value="liability">Liability</SelectItem><SelectItem value="equity">Equity</SelectItem><SelectItem value="revenue">Revenue</SelectItem><SelectItem value="expense">Expense</SelectItem></SelectContent></Select></div>
          <div className="space-y-2"><Label htmlFor="balance">Balance</Label><Input id="balance" type="number" {...form.register("balance")} /></div>
          <div className="space-y-2 md:col-span-2"><Label htmlFor="owner">Owner</Label><Input id="owner" {...form.register("owner")} /></div>
          <div className="flex items-end md:col-span-3"><Button type="submit"><Plus className="h-4 w-4" />Add account</Button></div>
        </form>
      </CardContent>
    </Card>
  );
}
