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

const categories = [
  "Electronics",
  "Hardware",
  "Software",
  "Office Supplies",
  "Raw Materials",
  "Finished Goods",
];

export function ProductForm() {
  const addProduct = useScmStore(
    (state) => state.addProduct
  );

  const form = useForm<Values>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      sku: "",
      name: "",
      category: "",
      unitCost: 0,
      leadTimeDays: 0,
    },
  });

  const handleSubmit = (values: Values) => {
    addProduct(values);

    form.reset({
      sku: "",
      name: "",
      category: "",
      unitCost: 0,
      leadTimeDays: 0,
    });
  };

  return (
    <form
      autoComplete="off"
      className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.06] md:grid-cols-5"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      {/* SKU */}

      <div className="space-y-2">
        <Label>SKU</Label>

        <Input
          {...form.register("sku")}
          autoComplete="off"
          placeholder="Enter SKU"
        />
      </div>

      {/* Product Name */}

      <div className="space-y-2 md:col-span-2">
        <Label>Product Name</Label>

        <Input
          {...form.register("name")}
          autoComplete="off"
          placeholder="Enter product name"
        />
      </div>

      {/* Category Dropdown */}

      <div className="space-y-2">
        <Label>Category</Label>

        <select
          {...form.register("category")}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">
            Select Category
          </option>

          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Unit Cost */}

      <div className="space-y-2">
        <Label>Unit Cost</Label>

        <Input
          type="number"
          autoComplete="off"
          placeholder="0"
          {...form.register("unitCost", {
            valueAsNumber: true,
          })}
        />
      </div>

      {/* Lead Time */}

      <div className="space-y-2">
        <Label>Lead Time Days</Label>

        <Input
          type="number"
          autoComplete="off"
          placeholder="0"
          {...form.register("leadTimeDays", {
            valueAsNumber: true,
          })}
        />
      </div>

      {/* Submit Button */}

      <div className="flex items-end md:col-span-5">
        <Button type="submit">
          <Plus className="h-4 w-4" />
          Create Product
        </Button>
      </div>
    </form>
  );
}