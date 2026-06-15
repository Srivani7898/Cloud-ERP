import { ProductForm } from "@/components/scm/ProductForm";

export default function CreateProductPage() {
  return <div className="space-y-6"><div><h2 className="text-2xl font-semibold">Create product</h2><p className="text-sm text-slate-500">Add a new product master record.</p></div><ProductForm /></div>;
}
