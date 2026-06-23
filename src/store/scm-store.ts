"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  goodsReceipts,
  inventory,
  products,
  purchaseOrders,
  scmAuditLogs,
  stockTransfers,
  vendors,
  warehouses,
} from "@/services/scm-service";

import type {
  GoodsReceipt,
  InventoryItem,
  Product,
  PurchaseOrder,
  ScmAuditLog,
  StockTransfer,
  Vendor,
  Warehouse,
} from "@/types/scm";

type ScmState = {
  products: Product[];
  inventory: InventoryItem[];
  vendors: Vendor[];
  purchaseOrders: PurchaseOrder[];
  goodsReceipts: GoodsReceipt[];
  stockTransfers: StockTransfer[];
  warehouses: Warehouse[];
  auditLogs: ScmAuditLog[];

  addProduct: (
    product: Omit<Product, "id">
  ) => void;

  addInventory: (
    item: Omit<
      InventoryItem,
      "id" | "status"
    >
  ) => void;

  addVendor: (
    vendor: Omit<
      Vendor,
      "id" | "rating" | "status"
    >
  ) => void;

  updateVendorStatus: (
    vendorId: string,
    status: Vendor["status"]
  ) => void;

  addPurchaseOrder: (
    po: Omit<
      PurchaseOrder,
      "id" | "status"
    >
  ) => void;

  updatePurchaseOrderStatus: (
    poId: string,
    status: PurchaseOrder["status"]
  ) => void;

  deletePurchaseOrder: (
    poId: string
  ) => void;

  clearPurchaseOrder: (
    poId: string
  ) => void;

  updateReceiptStatus: (
    receiptId: string,
    status: GoodsReceipt["status"]
  ) => void;

  autoReorder: (
    item: InventoryItem
  ) => void;

  receiveGoods: (
    poId: string
  ) => void;

  createTransfer: (
    transfer: Omit<
      StockTransfer,
      "id" | "status"
    >
  ) => void;

  dispatchTransfer: (
    transferId: string
  ) => void;

  completeTransfer: (
    transferId: string
  ) => void;

  deleteTransfer: (
    transferId: string
  ) => void;

  addAudit: (
    action: string,
    entity: string
  ) => void;
};

function stamp() {
  return new Date().toLocaleString(
    "en-IN",
    {
      dateStyle: "medium",
      timeStyle: "medium",
    }
  );
}

function statusFor(
  quantity: number,
  reorderPoint: number
): InventoryItem["status"] {
  if (quantity === 0)
    return "out_of_stock";

  if (quantity < reorderPoint)
    return "low_stock";

  if (quantity > reorderPoint * 4)
    return "overstock";

  return "healthy";
}

export const useScmStore =
  create<ScmState>()(
    persist(
      (set) => ({
        products,
        inventory,
        vendors,
        purchaseOrders,
        goodsReceipts,
        stockTransfers,
        warehouses,
        auditLogs: scmAuditLogs,

        addAudit: (
          action,
          entity
        ) =>
          set((state) => ({
            auditLogs: [
              {
                id: `SCM-AUD-${Date.now()}`,
                action,
                actor:
                  "SCM Manager",
                entity,
                timestamp:
                  stamp(),
              },
              ...state.auditLogs,
            ],
          })),

        addProduct: (
          product
        ) =>
          set((state) => ({
            products: [
              {
                ...product,
                id: `prd-${Date.now()}`,
              },
              ...state.products,
            ],

            auditLogs: [
              {
                id: `SCM-AUD-${Date.now()}`,
                action:
                  "Product created",
                actor:
                  "SCM Manager",
                entity:
                  product.sku,
                timestamp:
                  stamp(),
              },
              ...state.auditLogs,
            ],
          })),

        addInventory: (
          item
        ) =>
          set((state) => ({
            inventory: [
              {
                ...item,
                id: `inv-${Date.now()}`,
                status: statusFor(
                  item.quantity,
                  item.reorderPoint
                ),
              },
              ...state.inventory,
            ],

            auditLogs: [
              {
                id: `SCM-AUD-${Date.now()}`,
                action:
                  "Inventory created",
                actor:
                  "SCM Manager",
                entity:
                  item.sku,
                timestamp:
                  stamp(),
              },
              ...state.auditLogs,
            ],
          })),

        addVendor: (
          vendor
        ) =>
          set((state) => ({
            vendors: [
              {
                ...vendor,
                id: `ven-${Date.now()}`,
                rating: 82,
                status:
                  "active",
              },
              ...state.vendors,
            ],

            auditLogs: [
              {
                id: `SCM-AUD-${Date.now()}`,
                action:
                  "Vendor created",
                actor:
                  "SCM Manager",
                entity:
                  vendor.name,
                timestamp:
                  stamp(),
              },
              ...state.auditLogs,
            ],
          })),

        updateVendorStatus: (
          vendorId,
          status
        ) =>
          set((state) => ({
            vendors:
              state.vendors.map(
                (vendor) =>
                  vendor.id ===
                    vendorId
                    ? {
                      ...vendor,
                      status,
                    }
                    : vendor
              ),

            auditLogs: [
              {
                id: `SCM-AUD-${Date.now()}`,
                action: `Vendor status changed to ${status}`,
                actor:
                  "SCM Manager",
                entity:
                  vendorId,
                timestamp:
                  stamp(),
              },
              ...state.auditLogs,
            ],
          })),

        addPurchaseOrder: (
          po
        ) =>
          set((state) => ({
            purchaseOrders: [
              {
                ...po,
                id: `PO-${Math.floor(
                  6000 +
                  Math.random() *
                  3000
                )}`,
                status:
                  "draft",
              },
              ...state.purchaseOrders,
            ],

            auditLogs: [
              {
                id: `SCM-AUD-${Date.now()}`,
                action:
                  "Purchase Order Created",
                actor:
                  "SCM Manager",
                entity:
                  po.sku,
                timestamp:
                  stamp(),
              },
              ...state.auditLogs,
            ],
          })),

        updatePurchaseOrderStatus:
          (
            poId,
            status
          ) =>
            set((state) => ({
              purchaseOrders:
                state.purchaseOrders.map(
                  (po) =>
                    po.id ===
                      poId
                      ? {
                        ...po,
                        status,
                      }
                      : po
                ),

              auditLogs: [
                {
                  id: `SCM-AUD-${Date.now()}`,
                  action: `PO status changed to ${status}`,
                  actor:
                    "SCM Manager",
                  entity:
                    poId,
                  timestamp:
                    stamp(),
                },
                ...state.auditLogs,
              ],
            })),

        deletePurchaseOrder:
          (poId) =>
            set((state) => ({
              purchaseOrders:
                state.purchaseOrders.filter(
                  (po) =>
                    po.id !==
                    poId
                ),

              auditLogs: [
                {
                  id: `SCM-AUD-${Date.now()}`,
                  action:
                    "Purchase Order Deleted",
                  actor:
                    "SCM Manager",
                  entity:
                    poId,
                  timestamp:
                    stamp(),
                },
                ...state.auditLogs,
              ],
            })),

        clearPurchaseOrder:
          (poId) =>
            set((state) => ({
              purchaseOrders:
                state.purchaseOrders.filter(
                  (po) => po.id !== poId
                ),

              auditLogs: [
                {
                  id: `SCM-AUD-${Date.now()}`,
                  action:
                    "Purchase Order Cleared",
                  actor:
                    "SCM Manager",
                  entity: poId,
                  timestamp: stamp(),
                },
                ...state.auditLogs,
              ],
            })),

        autoReorder: (
          item
        ) =>
          set((state) => {
            const poId = `PO-${Math.floor(
              6000 +
              Math.random() *
              3000
            )}`;


            return {
              purchaseOrders: [
                {
                  id: poId,
                  vendor:
                    "Auto Vendor",
                  sku: item.sku,
                  quantity:
                    item.reorderPoint,
                  total:
                    item.reorderPoint *
                    100,
                  expectedDate:
                    "2026-06-15",
                  status:
                    "sent",
                },
                ...state.purchaseOrders,
              ],

              auditLogs: [
                {
                  id: `SCM-AUD-${Date.now()}`,
                  action:
                    "Auto Reorder Created",
                  actor:
                    "SCM Manager",
                  entity:
                    poId,
                  timestamp:
                    stamp(),
                },
                ...state.auditLogs,
              ],
            };
          }),

        receiveGoods: (
          poId
        ) =>
          set((state) => {
            const po =
              state.purchaseOrders.find(
                (item) =>
                  item.id ===
                  poId
              );

            if (!po)
              return state;

            return {
              purchaseOrders:
                state.purchaseOrders.map(
                  (item) =>
                    item.id === poId
                      ? {
                        ...item,
                        status: "received",
                      }
                      : item
                ),

              goodsReceipts: [
                {
                  id: `GR-${Math.floor(
                    1000 + Math.random() * 9000
                  )}`,
                  poId,
                  warehouse:
                    "Main Warehouse",
                  receivedQty:
                    po.quantity,
                  receivedAt:
                    new Date()
                      .toISOString()
                      .slice(
                        0,
                        10
                      ),
                  status:
                    "pending_qc",
                },
                ...state.goodsReceipts,
              ],

              auditLogs: [
                {
                  id: `SCM-AUD-${Date.now()}`,
                  action:
                    "Goods Received",
                  actor:
                    "SCM Manager",
                  entity:
                    poId,
                  timestamp:
                    stamp(),
                },
                ...state.auditLogs,
              ],
            };
          }),
        updateReceiptStatus:
          (
            receiptId,
            status
          ) =>
            set((state) => {
              const receipt =
                state.goodsReceipts.find(
                  (item) =>
                    item.id === receiptId
                );

              if (!receipt) {
                return state;
              }

              const po =
                state.purchaseOrders.find(
                  (item) =>
                    item.id === receipt.poId
                );

              let updatedInventory =
                state.inventory;

              if (
                status === "accepted" &&
                po
              ) {
                updatedInventory =
                  state.inventory.map(
                    (item) =>
                      item.sku === po.sku
                        ? {
                          ...item,
                          quantity:
                            item.quantity +
                            receipt.receivedQty,
                          status: statusFor(
                            item.quantity +
                            receipt.receivedQty,
                            item.reorderPoint
                          ),
                        }
                        : item
                  );
              }

              return {
                inventory:
                  updatedInventory,

                purchaseOrders:
                  state.purchaseOrders.map(
                    (poItem) =>
                      poItem.id === receipt.poId
                        ? {
                          ...poItem,
                          status: "closed",
                        }
                        : poItem
                  ),

                warehouses:
                  state.warehouses.map(
                    (warehouse) =>
                      warehouse.name ===
                        receipt.warehouse
                        ? {
                          ...warehouse,
                          utilization:
                            warehouse.utilization +
                            receipt.receivedQty,
                        }
                        : warehouse
                  ),

                goodsReceipts:
                  state.goodsReceipts.map(
                    (item) =>
                      item.id === receiptId
                        ? {
                          ...item,
                          status,
                        }
                        : item
                  ),

                auditLogs: [
                  {
                    id: `SCM-AUD-${Date.now()}`,
                    action: `Receipt ${status}`,
                    actor:
                      "SCM Manager",
                    entity:
                      receiptId,
                    timestamp:
                      stamp(),
                  },
                  ...state.auditLogs,
                ],
              };
            }),

        createTransfer: (
          transfer
        ) =>
          set((state) => ({
            stockTransfers: [
              {
                ...transfer,
                id: `TR-${Date.now()}`,
                status:
                  "scheduled",
              },
              ...state.stockTransfers,
            ],

            auditLogs: [
              {
                id: `SCM-AUD-${Date.now()}`,
                action:
                  "Transfer Created",
                actor:
                  "SCM Manager",
                entity:
                  transfer.sku,
                timestamp:
                  stamp(),
              },
              ...state.auditLogs,
            ],
          })),
        completeTransfer:
          (
            transferId: string
          ) =>
            set((state) => {
              const transfer =
                state.stockTransfers.find(
                  (item) =>
                    item.id === transferId
                );

              if (!transfer) {
                return state;
              }

              const updatedInventory =
                state.inventory.map(
                  (item) => {
                    if (
                      item.sku ===
                      transfer.sku &&
                      item.warehouse ===
                      transfer.fromWarehouse
                    ) {
                      const quantity =
                        Math.max(
                          0,
                          item.quantity -
                          transfer.quantity
                        );

                      return {
                        ...item,
                        quantity,
                        status:
                          statusFor(
                            quantity,
                            item.reorderPoint
                          ),
                      };
                    }

                    if (
                      item.sku ===
                      transfer.sku &&
                      item.warehouse ===
                      transfer.toWarehouse
                    ) {
                      const quantity =
                        item.quantity +
                        transfer.quantity;

                      return {
                        ...item,
                        quantity,
                        status:
                          statusFor(
                            quantity,
                            item.reorderPoint
                          ),
                      };
                    }

                    return item;
                  }
                );

              return {
                inventory:
                  updatedInventory,

                stockTransfers:
                  state.stockTransfers.map(
                    (item) =>
                      item.id ===
                        transferId
                        ? {
                          ...item,
                          status:
                            "completed",
                        }
                        : item
                  ),

                auditLogs: [
                  {
                    id: `SCM-AUD-${Date.now()}`,
                    action:
                      "Transfer Completed",
                    actor:
                      "SCM Manager",
                    entity:
                      transferId,
                    timestamp:
                      stamp(),
                  },
                  ...state.auditLogs,
                ],
              };
            }),
        dispatchTransfer:
          (transferId) =>
            set((state) => ({
              stockTransfers:
                state.stockTransfers.map(
                  (transfer) =>
                    transfer.id === transferId
                      ? {
                        ...transfer,
                        status: "in_transit",
                      }
                      : transfer
                ),

              auditLogs: [
                {
                  id: `SCM-AUD-${Date.now()}`,
                  action:
                    "Transfer Dispatched",
                  actor:
                    "SCM Manager",
                  entity:
                    transferId,
                  timestamp:
                    stamp(),
                },
                ...state.auditLogs,
              ],
            })),
        deleteTransfer:
          (transferId) =>
            set((state) => ({
              stockTransfers:
                state.stockTransfers.filter(
                  (transfer) =>
                    transfer.id !== transferId
                ),

              auditLogs: [
                {
                  id: `SCM-AUD-${Date.now()}`,
                  action:
                    "Transfer Deleted",
                  actor:
                    "SCM Manager",
                  entity:
                    transferId,
                  timestamp:
                    stamp(),
                },
                ...state.auditLogs,
              ],
            })),
      }),

      {
        name:
          "cloud-erp-scm",
      }
    )
  );