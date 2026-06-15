import { InventoryForm } from "@/components/scm/InventoryForm";

export default function CreateInventoryPage() {
  return <div className="space-y-6"><div><h2 className="text-2xl font-semibold">Create inventory item</h2><p className="text-sm text-slate-500">Add stock to warehouse inventory.</p></div><InventoryForm /></div>;
}
