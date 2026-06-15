"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { goodsReceipts, inventory, products, purchaseOrders, scmAuditLogs, stockTransfers, vendors, warehouses } from "@/services/scm-service";
import type { GoodsReceipt, InventoryItem, Product, PurchaseOrder, ScmAuditLog, StockTransfer, Vendor, Warehouse } from "@/types/scm";

type ScmState = {
  products: Product[];
  inventory: InventoryItem[];
  vendors: Vendor[];
  purchaseOrders: PurchaseOrder[];
  goodsReceipts: GoodsReceipt[];
  stockTransfers: StockTransfer[];
  warehouses: Warehouse[];
  auditLogs: ScmAuditLog[];
  addProduct: (product: Omit<Product, "id">) => void;
  addInventory: (item: Omit<InventoryItem, "id" | "status">) => void;
  addVendor: (vendor: Omit<Vendor, "id" | "rating" | "status">) => void;
  addPurchaseOrder: (po: Omit<PurchaseOrder, "id" | "status">) => void;
  autoReorder: (item: InventoryItem) => void;
  receiveGoods: (poId: string) => void;
  completeTransfer: (transferId: string) => void;
  addAudit: (action: string, entity: string) => void;
};

function stamp() {
  return new Date().toISOString().slice(0, 16).replace("T", " ");
}

function statusFor(quantity: number, reorderPoint: number): InventoryItem["status"] {
  if (quantity === 0) return "out_of_stock";
  if (quantity < reorderPoint) return "low_stock";
  if (quantity > reorderPoint * 4) return "overstock";
  return "healthy";
}

export const useScmStore = create<ScmState>()(
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
      addAudit: (action, entity) => set((state) => ({ auditLogs: [{ id: `SCM-AUD-${Date.now()}`, action, actor: "SCM Manager", entity, timestamp: stamp() }, ...state.auditLogs] })),
      addProduct: (product) => set((state) => ({ products: [{ ...product, id: `prd-${Date.now()}` }, ...state.products], auditLogs: [{ id: `SCM-AUD-${Date.now()}`, action: "Product created", actor: "SCM Manager", entity: product.sku, timestamp: stamp() }, ...state.auditLogs] })),
      addInventory: (item) => set((state) => ({ inventory: [{ ...item, id: `inv-${Date.now()}`, status: statusFor(item.quantity, item.reorderPoint) }, ...state.inventory], auditLogs: [{ id: `SCM-AUD-${Date.now()}`, action: "Inventory item created", actor: "SCM Manager", entity: item.sku, timestamp: stamp() }, ...state.auditLogs] })),
      addVendor: (vendor) => set((state) => ({ vendors: [{ ...vendor, id: `ven-${Date.now()}`, rating: 82, status: "active" }, ...state.vendors], auditLogs: [{ id: `SCM-AUD-${Date.now()}`, action: "Vendor created", actor: "SCM Manager", entity: vendor.name, timestamp: stamp() }, ...state.auditLogs] })),
      addPurchaseOrder: (po) => set((state) => ({ purchaseOrders: [{ ...po, id: `PO-${Math.floor(6000 + Math.random() * 3000)}`, status: "draft" }, ...state.purchaseOrders], auditLogs: [{ id: `SCM-AUD-${Date.now()}`, action: "Purchase order created", actor: "SCM Manager", entity: po.sku, timestamp: stamp() }, ...state.auditLogs] })),
      autoReorder: (item) => set((state) => {
        const openPoExists = state.purchaseOrders.some((po) => po.sku === item.sku && po.status !== "received" && po.status !== "cancelled");
        if (openPoExists) {
          return {
            auditLogs: [{ id: `SCM-AUD-${Date.now()}`, action: "Auto reorder skipped - open PO exists", actor: "SCM Manager", entity: item.sku, timestamp: stamp() }, ...state.auditLogs]
          };
        }

        const reorderQty = Math.max(item.reorderPoint * 2 - item.quantity, item.reorderPoint);
        const poId = `PO-${Math.floor(6000 + Math.random() * 3000)}`;
        return {
          purchaseOrders: [
            {
              id: poId,
              vendor: "Auto-selected Vendor",
              sku: item.sku,
              quantity: reorderQty,
              total: reorderQty * 100,
              expectedDate: "2026-06-15",
              status: "sent"
            },
            ...state.purchaseOrders
          ],
          auditLogs: [
            { id: `SCM-AUD-${Date.now()}-1`, action: "Auto reorder PO created", actor: "SCM Manager", entity: poId, timestamp: stamp() },
            { id: `SCM-AUD-${Date.now()}-2`, action: "Vendor notification sent", actor: "SCM Manager", entity: item.sku, timestamp: stamp() },
            ...state.auditLogs
          ]
        };
      }),
      receiveGoods: (poId) => set((state) => {
        const po = state.purchaseOrders.find((item) => item.id === poId);
        if (!po) return state;
        return {
          purchaseOrders: state.purchaseOrders.map((item) => item.id === poId ? { ...item, status: "received" } : item),
          goodsReceipts: [{ id: `GR-${Math.floor(8000 + Math.random() * 2000)}`, poId, warehouse: "Bengaluru DC", receivedQty: po.quantity, receivedAt: new Date().toISOString().slice(0, 10), status: "pending_qc" }, ...state.goodsReceipts],
          inventory: state.inventory.map((item) => item.sku === po.sku ? { ...item, quantity: item.quantity + po.quantity, status: statusFor(item.quantity + po.quantity, item.reorderPoint) } : item),
          auditLogs: [{ id: `SCM-AUD-${Date.now()}`, action: "Goods received", actor: "SCM Manager", entity: poId, timestamp: stamp() }, ...state.auditLogs]
        };
      }),
      completeTransfer: (transferId) => set((state) => ({ stockTransfers: state.stockTransfers.map((item) => item.id === transferId ? { ...item, status: "completed" } : item), auditLogs: [{ id: `SCM-AUD-${Date.now()}`, action: "Stock transfer completed", actor: "SCM Manager", entity: transferId, timestamp: stamp() }, ...state.auditLogs] }))
    }),
    { name: "cloud-erp-scm" }
  )
);
