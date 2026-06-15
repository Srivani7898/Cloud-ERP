import { z } from "zod";

export const productSchema = z.object({
  sku: z.string().min(3),
  name: z.string().min(2),
  category: z.string().min(2),
  unitCost: z.coerce.number().positive(),
  leadTimeDays: z.coerce.number().positive()
});

export const inventorySchema = z.object({
  sku: z.string().min(3),
  productName: z.string().min(2),
  warehouse: z.string().min(2),
  quantity: z.coerce.number().min(0),
  reorderPoint: z.coerce.number().min(0)
});

export const vendorSchema = z.object({
  name: z.string().min(2),
  contact: z.string().min(2),
  email: z.string().email(),
  region: z.string().min(2)
});

export const purchaseOrderSchema = z.object({
  vendor: z.string().min(2),
  sku: z.string().min(3),
  quantity: z.coerce.number().positive(),
  total: z.coerce.number().positive(),
  expectedDate: z.string().min(8)
});
