"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScmTable } from "@/components/scm/ScmTable";
import { useScmStore } from "@/store/scm-store";

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function ProductsPage() {
  const products = useScmStore(
    (state) => state.products
  );

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">
            Products
          </h2>

          <p className="text-sm text-slate-500">
            Product master and lead-time data.
          </p>
        </div>

        <Button asChild>
          <Link href="/scm/products/create">
            <Plus className="h-4 w-4" />
            Create Product
          </Link>
        </Button>
      </div>

      {/* Products Table */}

      <ScmTable
        title="Products"
        description="SCM product catalog."
        headers={[
          "SKU",
          "Name",
          "Category",
          "Unit Cost",
          "Lead Time",
        ]}
        rows={products.map((product) => [
          <span
            key={`${product.sku}-sku`}
            className="whitespace-nowrap"
          >
            {product.sku}
          </span>,

          <span
            key={`${product.sku}-name`}
            className="whitespace-nowrap"
          >
            {product.name}
          </span>,

          <span
            key={`${product.sku}-category`}
            className="whitespace-nowrap"
          >
            {product.category}
          </span>,

          <span
            key={`${product.sku}-cost`}
            className="whitespace-nowrap"
          >
            {money(product.unitCost)}
          </span>,

          <span
            key={`${product.sku}-lead`}
            className="whitespace-nowrap"
          >
            {product.leadTimeDays} days
          </span>,
        ])}
      />
    </div>
  );
}