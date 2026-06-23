"use client";

import Link from "next/link";
import {
  PackageCheck,
  Plus,
  FileText,
  Trash2,
  RotateCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScmStatusBadge } from "@/components/scm/ScmStatusBadge";
import { ScmTable } from "@/components/scm/ScmTable";
import { useScmStore } from "@/store/scm-store";

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function PurchaseOrdersPage() {
  const purchaseOrders = useScmStore(
    (state) => state.purchaseOrders
  );

  const receiveGoods = useScmStore(
    (state) => state.receiveGoods
  );

  const updatePurchaseOrderStatus =
    useScmStore(
      (state) =>
        state.updatePurchaseOrderStatus
    );

  const deletePurchaseOrder =
    useScmStore(
      (state) =>
        state.deletePurchaseOrder
    );

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">
            Purchase Orders
          </h2>

          <p className="text-sm text-slate-500">
            Procurement orders and vendor
            commitments.
          </p>
        </div>

        <Button asChild>
          <Link href="/scm/purchase-orders/create">
            <Plus className="h-4 w-4" />
            Create PO
          </Link>
        </Button>
      </div>

      {/* Table */}

      <ScmTable
        title="Purchase Orders"
        description="PO lifecycle and receipt status."
        headers={[
          "PO",
          "Vendor",
          "SKU",
          "Qty",
          "Total",
          "Expected",
          "Status",
          "Actions",
        ]}
        rows={purchaseOrders.map((po) => [
          <span
            key={`${po.id}-id`}
            className="whitespace-nowrap"
          >
            {po.id}
          </span>,

          <span
            key={`${po.id}-vendor`}
            className="whitespace-nowrap"
          >
            {po.vendor}
          </span>,

          <span
            key={`${po.id}-sku`}
            className="whitespace-nowrap"
          >
            {po.sku}
          </span>,

          <span
            key={`${po.id}-qty`}
            className="whitespace-nowrap"
          >
            {po.quantity}
          </span>,

          <span
            key={`${po.id}-total`}
            className="whitespace-nowrap"
          >
            {money(po.total)}
          </span>,

          <span
            key={`${po.id}-date`}
            className="whitespace-nowrap"
          >
            {po.expectedDate}
          </span>,

          <ScmStatusBadge
            key={`${po.id}-status`}
            status={po.status}
          />,

          <div
            key={`${po.id}-actions`}
            className="flex flex-wrap justify-center gap-2"
          >
            {/* Draft */}

            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                updatePurchaseOrderStatus(
                  po.id,
                  "draft"
                )
              }
            >
              <FileText className="h-4 w-4" />
              Draft
            </Button>

            {/* Receive */}

            <Button
              size="sm"
              disabled={
                po.status === "received"
              }
              onClick={() =>
                receiveGoods(po.id)
              }
            >
              <PackageCheck className="h-4 w-4" />
              Receive
            </Button>

            {/* Clear / Open */}

            <Button
              size="sm"
              variant="secondary"
              onClick={() =>
                updatePurchaseOrderStatus(
                  po.id,
                  "open"
                )
              }
            >
              <RotateCcw className="h-4 w-4" />
              Clear
            </Button>

            {/* Delete */}

            <Button
              size="sm"
              variant="destructive"
              onClick={() =>
                deletePurchaseOrder(
                  po.id
                )
              }
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>,
        ])}
      />
    </div>
  );
}