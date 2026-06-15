"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useScmStore } from "@/store/scm-store";
import { inventorySchema } from "@/validations/scm";

type Values = z.infer<typeof inventorySchema>;

export function InventoryForm() {
  const addInventory = useScmStore((state) => state.addInventory);
  const form = useForm<Values>({ resolver: zodResolver(inventorySchema), defaultValues: { sku: "", productName: "", warehouse: "", quantity: 0, reorderPoint: 0 } });
  return (
    <form className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.06] md:grid-cols-5" onSubmit={form.handleSubmit((values) => { addInventory(values); form.reset(); })}>
      <div className="space-y-2"><Label>SKU</Label><Input {...form.register("sku")} /></div>
      <div className="space-y-2 md:col-span-2"><Label>Product</Label><Input {...form.register("productName")} /></div>
      <div className="space-y-2"><Label>Warehouse</Label><Input {...form.register("warehouse")} /></div>
      <div className="space-y-2"><Label>Quantity</Label><Input type="number" {...form.register("quantity")} /></div>
      <div className="space-y-2"><Label>Reorder Point</Label><Input type="number" {...form.register("reorderPoint")} /></div>
      <div className="flex items-end md:col-span-4"><Button type="submit"><Plus className="h-4 w-4" />Add inventory</Button></div>
    </form>
  );
}
