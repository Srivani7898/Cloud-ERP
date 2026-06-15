import type { GoodsReceipt, InventoryItem, Product, PurchaseOrder, ScmAuditLog, StockTransfer, Vendor, Warehouse } from "@/types/scm";

export const products: Product[] = [
  { id: "prd-1001", sku: "ERP-AI-CHIP", name: "AI Edge Controller", category: "Electronics", unitCost: 420, leadTimeDays: 18 },
  { id: "prd-1002", sku: "ERP-SENSOR-X", name: "Industrial Sensor X", category: "IoT", unitCost: 86, leadTimeDays: 9 },
  { id: "prd-1003", sku: "ERP-ROUTER-PRO", name: "Plant Network Router", category: "Networking", unitCost: 260, leadTimeDays: 14 }
];

export const inventory: InventoryItem[] = [
  { id: "inv-1", sku: "ERP-AI-CHIP", productName: "AI Edge Controller", warehouse: "Bengaluru DC", quantity: 42, reorderPoint: 60, status: "low_stock" },
  { id: "inv-2", sku: "ERP-SENSOR-X", productName: "Industrial Sensor X", warehouse: "Dallas DC", quantity: 480, reorderPoint: 140, status: "healthy" },
  { id: "inv-3", sku: "ERP-ROUTER-PRO", productName: "Plant Network Router", warehouse: "Singapore Hub", quantity: 0, reorderPoint: 30, status: "out_of_stock" }
];

export const vendors: Vendor[] = [
  { id: "ven-1", name: "Atlas Components", contact: "Nina Hart", email: "nina@atlas.example", rating: 94, region: "US", status: "active" },
  { id: "ven-2", name: "BluePeak Electronics", contact: "Ravi Shah", email: "ravi@bluepeak.example", rating: 88, region: "India", status: "active" },
  { id: "ven-3", name: "Orion Industrial", contact: "Maya Tan", email: "maya@orion.example", rating: 72, region: "Singapore", status: "review" }
];

export const purchaseOrders: PurchaseOrder[] = [
  { id: "PO-5001", vendor: "BluePeak Electronics", sku: "ERP-AI-CHIP", quantity: 120, total: 50400, expectedDate: "2026-06-12", status: "sent" },
  { id: "PO-5002", vendor: "Atlas Components", sku: "ERP-SENSOR-X", quantity: 600, total: 51600, expectedDate: "2026-06-08", status: "approved" }
];

export const goodsReceipts: GoodsReceipt[] = [
  { id: "GR-7001", poId: "PO-5002", warehouse: "Dallas DC", receivedQty: 300, receivedAt: "2026-06-01", status: "pending_qc" }
];

export const stockTransfers: StockTransfer[] = [
  { id: "ST-3001", sku: "ERP-SENSOR-X", fromWarehouse: "Dallas DC", toWarehouse: "Bengaluru DC", quantity: 80, status: "in_transit" }
];

export const warehouses: Warehouse[] = [
  { id: "wh-1", name: "Bengaluru DC", region: "India", capacity: 1200, utilization: 72 },
  { id: "wh-2", name: "Dallas DC", region: "US", capacity: 1800, utilization: 64 },
  { id: "wh-3", name: "Singapore Hub", region: "APAC", capacity: 950, utilization: 81 }
];

export const scmAuditLogs: ScmAuditLog[] = [
  { id: "SCM-AUD-1", action: "Purchase order sent", actor: "SCM Manager", entity: "PO-5001", timestamp: "2026-06-01 09:15" },
  { id: "SCM-AUD-2", action: "Goods receipt created", actor: "Warehouse Lead", entity: "GR-7001", timestamp: "2026-06-01 10:40" }
];
