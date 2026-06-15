"use client";

import Link from "next/link";
import { PackageCheck, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScmStatusBadge } from "@/components/scm/ScmStatusBadge";
import { ScmTable } from "@/components/scm/ScmTable";
import { useScmStore } from "@/store/scm-store";

function money(value: number) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value); }

export default function PurchaseOrdersPage() {
  const { purchaseOrders, receiveGoods } = useScmStore();
  return <div className="space-y-6"><div className="flex items-center justify-between"><div><h2 className="text-2xl font-semibold">Purchase orders</h2><p className="text-sm text-slate-500">Procurement orders and vendor commitments.</p></div><Button asChild><Link href="/scm/purchase-orders/create"><Plus className="h-4 w-4" />Create PO</Link></Button></div><ScmTable title="Purchase Orders" description="PO lifecycle and receipt status." headers={["PO", "Vendor", "SKU", "Qty", "Total", "Expected", "Status", "Action"]} rows={purchaseOrders.map((po) => [po.id, po.vendor, po.sku, po.quantity, money(po.total), po.expectedDate, <ScmStatusBadge key="status" status={po.status} />, <Button key="action" size="sm" disabled={po.status === "received"} onClick={() => receiveGoods(po.id)}><PackageCheck className="h-4 w-4" />Receive</Button>])} /></div>;
}
