import { z } from "zod";

export const invoiceSchema = z.object({
  customer: z.string().min(2, "Customer is required."),
  dueDate: z.string().min(8, "Due date is required."),
  amount: z.coerce.number().positive("Amount must be positive."),
  currency: z.string().min(3)
});

export const paymentSchema = z.object({
  vendor: z.string().min(2, "Vendor is required."),
  scheduledDate: z.string().min(8, "Scheduled date is required."),
  amount: z.coerce.number().positive("Amount must be positive."),
  method: z.enum(["ACH", "Wire", "Card", "Check"])
});

export const journalEntrySchema = z.object({
  description: z.string().min(8, "Description is required."),
  period: z.string().min(4),
  debitAccount: z.string().min(3),
  creditAccount: z.string().min(3),
  amount: z.coerce.number().positive()
});

export const accountSchema = z.object({
  code: z.string().min(3, "Account code is required."),
  name: z.string().min(3, "Account name is required."),
  type: z.enum(["asset", "liability", "equity", "revenue", "expense"]),
  owner: z.string().min(2, "Owner is required."),
  balance: z.coerce.number().min(0)
});

export const ledgerEntrySchema = z.object({
  account: z.string().min(3, "Account is required."),
  description: z.string().min(5, "Description is required."),
  debit: z.coerce.number().min(0),
  credit: z.coerce.number().min(0)
});
