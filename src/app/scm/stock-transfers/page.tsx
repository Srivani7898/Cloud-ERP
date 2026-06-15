"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScmStatusBadge } from "@/components/scm/ScmStatusBadge";
import { ScmTable } from "@/components/scm/ScmTable";
import { useScmStore } from "@/store/scm-store";

export default function StockTransfersPage() {
  const { stockTransfers, completeTransfer } = useScmStore();
  return <div className="space-y-6"><div><h2 className="text-2xl font-semibold">Stock transfers</h2><p className="text-sm text-slate-500">Inter-warehouse transfer tracking.</p></div><ScmTable title="Transfers" description="Stock movement across warehouses." headers={["Transfer", "SKU", "From", "To", "Qty", "Status", "Action"]} rows={stockTransfers.map((transfer) => [transfer.id, transfer.sku, transfer.fromWarehouse, transfer.toWarehouse, transfer.quantity, <ScmStatusBadge key="status" status={transfer.status} />, <Button key="action" size="sm" disabled={transfer.status === "completed"} onClick={() => completeTransfer(transfer.id)}><CheckCircle2 className="h-4 w-4" />Complete</Button>])} /></div>;
}
