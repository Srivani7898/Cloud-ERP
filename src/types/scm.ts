export type InventoryStatus = "healthy" | "low_stock" | "out_of_stock" | "overstock";
export type POStatus = "draft" | "sent" | "approved" | "received" | "cancelled";
export type ReceiptStatus = "pending_qc" | "accepted" | "rejected";
export type TransferStatus = "scheduled" | "in_transit" | "completed";

export type Product = {
  id: string;
  sku: string;
  name: string;
  category: string;
  unitCost: number;
  leadTimeDays: number;
};

export type InventoryItem = {
  id: string;
  sku: string;
  productName: string;
  warehouse: string;
  quantity: number;
  reorderPoint: number;
  status: InventoryStatus;
};

export type Vendor = {
  id: string;
  name: string;
  contact: string;
  email: string;
  rating: number;
  region: string;
  status: "active" | "review" | "blocked";
};

export type PurchaseOrder = {
  id: string;
  vendor: string;
  sku: string;
  quantity: number;
  total: number;
  expectedDate: string;
  status: POStatus;
};

export type GoodsReceipt = {
  id: string;
  poId: string;
  warehouse: string;
  receivedQty: number;
  receivedAt: string;
  status: ReceiptStatus;
};

export type StockTransfer = {
  id: string;
  sku: string;
  fromWarehouse: string;
  toWarehouse: string;
  quantity: number;
  status: TransferStatus;
};

export type Warehouse = {
  id: string;
  name: string;
  region: string;
  capacity: number;
  utilization: number;
};

export type ScmAuditLog = {
  id: string;
  action: string;
  actor: string;
  entity: string;
  timestamp: string;
};
