"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useScmStore } from "@/store/scm-store";
import { purchaseOrderSchema } from "@/validations/scm";

type Values = z.infer<typeof purchaseOrderSchema>;

export function PurchaseOrderForm() {
  const addPurchaseOrder = useScmStore((state) => state.addPurchaseOrder);
  const form = useForm<Values>({ resolver: zodResolver(purchaseOrderSchema), defaultValues: { vendor: "", sku: "", quantity: 0, total: 0, expectedDate: "" } });
  return (
    <form className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.06] md:grid-cols-5" onSubmit={form.handleSubmit((values) => { addPurchaseOrder(values); form.reset(); })}>
      <div className="space-y-2"><Label>Vendor</Label><Input {...form.register("vendor")} /></div>
      <div className="space-y-2"><Label>SKU</Label><Input {...form.register("sku")} /></div>
      <div className="space-y-2"><Label>Quantity</Label><Input type="number" {...form.register("quantity")} /></div>
      <div className="space-y-2"><Label>Total</Label><Input type="number" {...form.register("total")} /></div>
      <div className="space-y-2"><Label>Expected</Label><Input type="date" {...form.register("expectedDate")} /></div>
      <div className="md:col-span-5"><Button type="submit"><Plus className="h-4 w-4" />Create PO</Button></div>
    </form>
  );
}
