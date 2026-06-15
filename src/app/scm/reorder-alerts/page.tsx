"use client";

import { useState } from "react";
import { BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScmStatusBadge } from "@/components/scm/ScmStatusBadge";
import { ScmTable } from "@/components/scm/ScmTable";
import { useScmStore } from "@/store/scm-store";

export default function ReorderAlertsPage() {
  const { inventory, purchaseOrders, autoReorder } = useScmStore();
  const [lastReorderedSku, setLastReorderedSku] = useState<string | null>(null);
  const alerts = inventory.filter((item) => item.status === "low_stock" || item.status === "out_of_stock");
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Reorder automation</h2>
        <p className="text-sm text-slate-500">Low-stock alerts, suggested replenishment, and vendor notifications.</p>
      </div>
      {lastReorderedSku ? (
        <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-300">
          Auto reorder created for {lastReorderedSku}. Check Purchase Orders and Audit Logs.
        </div>
      ) : null}
      <ScmTable
        title="Reorder alerts"
        description="Items below reorder policy."
        headers={["SKU", "Product", "Warehouse", "Qty", "Reorder", "Status", "Action"]}
        rows={alerts.map((item) => {
          const openPoExists = purchaseOrders.some((po) => po.sku === item.sku && po.status !== "received" && po.status !== "cancelled");
          return [
            item.sku,
            item.productName,
            item.warehouse,
            item.quantity,
            item.reorderPoint,
            <ScmStatusBadge key="status" status={item.status} />,
            <Button
              key="action"
              size="sm"
              disabled={openPoExists}
              onClick={() => {
                autoReorder(item);
                setLastReorderedSku(item.sku);
              }}
            >
              <BellRing className="h-4 w-4" />
              {openPoExists ? "PO already open" : "Auto reorder"}
            </Button>
          ];
        })}
      />
    </div>
  );
}
