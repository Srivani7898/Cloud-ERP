export type Money = {
  amount: number;
  currency: string;
};

export type FinancePeriod = "FY2026-Q1" | "FY2026-Q2" | "FY2026-Q3" | "FY2026-Q4";

export type InvoiceStatus = "draft" | "sent" | "approved" | "paid" | "overdue";
export type PaymentStatus = "scheduled" | "processing" | "completed" | "failed";
export type AccountType = "asset" | "liability" | "equity" | "revenue" | "expense";

export type FinanceKpi = {
  label: string;
  value: string;
  change: string;
  tone: "positive" | "warning" | "neutral";
};

export type Invoice = {
  id: string;
  customer: string;
  status: InvoiceStatus;
  dueDate: string;
  total: Money;
  riskScore: number;
  assignedTo?: string;
};

export type Payment = {
  id: string;
  vendor: string;
  status: PaymentStatus;
  method: "ACH" | "Wire" | "Card" | "Check";
  scheduledDate: string;
  total: Money;
};

export type Account = {
  code: string;
  name: string;
  type: AccountType;
  balance: Money;
  owner: string;
};

export type LedgerEntry = {
  id: string;
  date: string;
  account: string;
  description: string;
  debit: Money;
  credit: Money;
};

export type JournalEntry = {
  id: string;
  period: FinancePeriod;
  status: "draft" | "posted" | "reversed";
  description: string;
  createdBy: string;
  total: Money;
};

export type CurrencyRate = {
  pair: string;
  rate: number;
  change: number;
  updatedAt: string;
};

export type AuditLog = {
  id: string;
  actor: string;
  action: string;
  entity: string;
  timestamp: string;
  severity: "info" | "warning" | "critical";
};
