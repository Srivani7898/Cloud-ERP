"use client";

import { useMemo, useState } from "react";
import {
  BellRing,
  ShoppingCart,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScmStatusBadge } from "@/components/scm/ScmStatusBadge";
import { ScmTable } from "@/components/scm/ScmTable";
import { useScmStore } from "@/store/scm-store";

export default function ReorderAlertsPage() {
  const {
    inventory,
    purchaseOrders,
    autoReorder,
    updatePurchaseOrderStatus,
  } = useScmStore();

  const [
    lastReorderedSku,
    setLastReorderedSku,
  ] = useState<string | null>(
    null
  );

  const alerts = inventory.filter(
    (item) =>
      item.status ===
        "low_stock" ||
      item.status ===
        "out_of_stock"
  );

  const metrics = useMemo(() => {
    return {
      totalAlerts:
        alerts.length,

      lowStock:
        alerts.filter(
          (item) =>
            item.status ===
            "low_stock"
        ).length,

      outOfStock:
        alerts.filter(
          (item) =>
            item.status ===
            "out_of_stock"
        ).length,

      openPOs:
        purchaseOrders.filter(
          (po) =>
            po.status !==
              "closed" &&
            po.status !==
              "cancelled"
        ).length,
    };
  }, [alerts, purchaseOrders]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">
          Reorder Automation
        </h2>

        <p className="text-sm text-slate-500">
          Low-stock alerts,
          replenishment planning,
          purchase order tracking
          and inventory recovery.
        </p>
      </div>

      {/* KPI Cards */}

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border p-4">
          <p className="text-sm text-slate-500">
            Total Alerts
          </p>

          <p className="text-3xl font-bold">
            {metrics.totalAlerts}
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-sm text-slate-500">
            Low Stock
          </p>

          <p className="text-3xl font-bold">
            {metrics.lowStock}
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-sm text-slate-500">
            Out Of Stock
          </p>

          <p className="text-3xl font-bold">
            {metrics.outOfStock}
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-sm text-slate-500">
            Open POs
          </p>

          <p className="text-3xl font-bold">
            {metrics.openPOs}
          </p>
        </div>
      </div>

      {lastReorderedSku ? (
        <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-300">
          Auto reorder created for{" "}
          {lastReorderedSku}. Check
          Purchase Orders and Audit
          Logs.
        </div>
      ) : null}

      <ScmTable
        title="Reorder Alerts"
        description="Items below reorder policy thresholds."
        headers={[
          "SKU",
          "Product",
          "Warehouse",
          "Qty",
          "Reorder Point",
          "Suggested Order",
          "Status",
          "PO Status",
          "Actions",
        ]}
        rows={alerts.map(
          (item) => {
            const openPO =
              purchaseOrders.find(
                (po) =>
                  po.sku ===
                    item.sku &&
                  po.status !==
                    "closed" &&
                  po.status !==
                    "cancelled"
              );

            const suggestedQty =
              Math.max(
                item.reorderPoint *
                  2,
                item.reorderPoint -
                  item.quantity
              );

            return [
              item.sku,

              item.productName,

              item.warehouse,

              item.quantity,

              item.reorderPoint,

              suggestedQty,

              <ScmStatusBadge
                key={`${item.id}-status`}
                status={
                  item.status
                }
              />,

              openPO
                ? openPO.status
                : "No Open PO",

              <div
                key={`${item.id}-actions`}
                className="flex flex-wrap items-center justify-center gap-2"
              >
                {!openPO && (
                  <Button
                    size="sm"
                    onClick={() => {
                      autoReorder(
                        item
                      );

                      setLastReorderedSku(
                        item.sku
                      );
                    }}
                  >
                    <BellRing className="mr-1 h-4 w-4" />
                    Create PO
                  </Button>
                )}

                {openPO &&
                  openPO.status !==
                    "closed" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        updatePurchaseOrderStatus(
                          openPO.id,
                          "closed"
                        )
                      }
                    >
                      <CheckCircle2 className="mr-1 h-4 w-4" />
                      Close PO
                    </Button>
                  )}

                {openPO && (
                  <Button
                    size="sm"
                    variant="secondary"
                  >
                    <ShoppingCart className="mr-1 h-4 w-4" />
                    Open PO
                  </Button>
                )}
              </div>,
            ];
          }
        )}
      />
    </div>
  );
}