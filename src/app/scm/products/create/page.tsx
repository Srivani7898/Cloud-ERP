import Link from "next/link";
import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/scm/ProductForm";

export default function CreateProductPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">
            Create Product
          </h2>

          <p className="text-sm text-slate-500">
            Add a new product master record.
          </p>
        </div>

        <Button
          asChild
          variant="outline"
        >
          <Link href="/scm/products">
            <Eye className="h-4 w-4" />
            View Products
          </Link>
        </Button>
      </div>

      <ProductForm />
    </div>
  );
}