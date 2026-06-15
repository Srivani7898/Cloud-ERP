"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useScmStore } from "@/store/scm-store";
import { productSchema } from "@/validations/scm";

type Values = z.infer<typeof productSchema>;

export function ProductForm() {
  const addProduct = useScmStore((state) => state.addProduct);
  const form = useForm<Values>({ resolver: zodResolver(productSchema), defaultValues: { sku: "", name: "", category: "", unitCost: 0, leadTimeDays: 0 } });
  return (
    <form className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.06] md:grid-cols-5" onSubmit={form.handleSubmit((values) => { addProduct(values); form.reset(); })}>
      <div className="space-y-2"><Label>SKU</Label><Input {...form.register("sku")} /></div>
      <div className="space-y-2 md:col-span-2"><Label>Name</Label><Input {...form.register("name")} /></div>
      <div className="space-y-2"><Label>Category</Label><Input {...form.register("category")} /></div>
      <div className="space-y-2"><Label>Unit Cost</Label><Input type="number" {...form.register("unitCost")} /></div>
      <div className="space-y-2"><Label>Lead Time Days</Label><Input type="number" {...form.register("leadTimeDays")} /></div>
      <div className="flex items-end md:col-span-4"><Button type="submit"><Plus className="h-4 w-4" />Create product</Button></div>
    </form>
  );
}
