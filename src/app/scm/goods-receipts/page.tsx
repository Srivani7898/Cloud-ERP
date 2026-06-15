"use client";

import { ScmStatusBadge } from "@/components/scm/ScmStatusBadge";
import { ScmTable } from "@/components/scm/ScmTable";
import { useScmStore } from "@/store/scm-store";

export default function GoodsReceiptsPage() {
  const receipts = useScmStore((state) => state.goodsReceipts);
  return <div className="space-y-6"><div><h2 className="text-2xl font-semibold">Goods receipts</h2><p className="text-sm text-slate-500">Inbound receipt records and quality control status.</p></div><ScmTable title="Goods Receipts" description="Warehouse goods receipt activity." headers={["Receipt", "PO", "Warehouse", "Qty", "Received", "Status"]} rows={receipts.map((receipt) => [receipt.id, receipt.poId, receipt.warehouse, receipt.receivedQty, receipt.receivedAt, <ScmStatusBadge key="status" status={receipt.status} />])} /></div>;
}
