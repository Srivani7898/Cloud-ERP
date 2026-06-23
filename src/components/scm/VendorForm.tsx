"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useScmStore } from "@/store/scm-store";
import { vendorSchema } from "@/validations/scm";

type Values = z.infer<typeof vendorSchema>;

export function VendorForm() {
  const addVendor = useScmStore(
    (state) => state.addVendor
  );

  const form = useForm<Values>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      name: "",
      contact: "",
      email: "",
      region: "",
    },
  });

  const handleSubmit = (values: Values) => {
    addVendor(values);

    form.reset({
      name: "",
      contact: "",
      email: "",
      region: "",
    });
  };

  return (
    <form
      autoComplete="off"
      className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.06] md:grid-cols-4"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <div className="space-y-2">
        <Label>Vendor</Label>

        <Input
          {...form.register("name")}
          autoComplete="off"
          placeholder="Enter vendor name"
        />
      </div>

      <div className="space-y-2">
        <Label>Contact</Label>

        <Input
          {...form.register("contact")}
          autoComplete="off"
          placeholder="Enter contact person"
        />
      </div>

      <div className="space-y-2">
        <Label>Email</Label>

        <Input
          type="email"
          {...form.register("email")}
          autoComplete="off"
          placeholder="Enter email address"
        />
      </div>

      <div className="space-y-2">
        <Label>Region</Label>

        <Input
          {...form.register("region")}
          autoComplete="off"
          placeholder="Enter region"
        />
      </div>

      <div className="md:col-span-4">
        <Button type="submit">
          <Plus className="h-4 w-4" />
          Create Vendor
        </Button>
      </div>
    </form>
  );
}