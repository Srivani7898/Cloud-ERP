import type { Account, AuditLog, CurrencyRate, FinanceKpi, Invoice, JournalEntry, LedgerEntry, Payment } from "@/types/finance";

export const financeKpis: FinanceKpi[] = [
  { label: "Net revenue", value: "$18.4M", change: "+12.8%", tone: "positive" },
  { label: "Operating cash", value: "$6.9M", change: "+4.2%", tone: "positive" },
  { label: "AP exposure", value: "$2.1M", change: "-7.6%", tone: "positive" },
  { label: "AR overdue", value: "$412K", change: "+2.4%", tone: "warning" }
];

export const invoices: Invoice[] = [
  { id: "INV-10492", customer: "Apex Retail Group", status: "overdue", dueDate: "2026-05-24", total: { amount: 128400, currency: "USD" }, riskScore: 82 },
  { id: "INV-10491", customer: "HelioGrid Energy", status: "approved", dueDate: "2026-06-02", total: { amount: 94200, currency: "USD" }, riskScore: 24 },
  { id: "INV-10490", customer: "Orion Logistics", status: "paid", dueDate: "2026-05-28", total: { amount: 221900, currency: "USD" }, riskScore: 9 },
  { id: "INV-10489", customer: "Meridian Health", status: "sent", dueDate: "2026-06-09", total: { amount: 78300, currency: "USD" }, riskScore: 31 }
];

export const payments: Payment[] = [
  { id: "PAY-8841", vendor: "CloudOps Infrastructure", status: "scheduled", method: "Wire", scheduledDate: "2026-06-01", total: { amount: 330000, currency: "USD" } },
  { id: "PAY-8840", vendor: "Atlas Components", status: "completed", method: "ACH", scheduledDate: "2026-05-29", total: { amount: 187500, currency: "USD" } },
  { id: "PAY-8839", vendor: "BluePeak Freight", status: "processing", method: "ACH", scheduledDate: "2026-05-30", total: { amount: 66500, currency: "USD" } }
];

export const accounts: Account[] = [
  { code: "1000", name: "Cash and equivalents", type: "asset", balance: { amount: 6920000, currency: "USD" }, owner: "Treasury" },
  { code: "1200", name: "Accounts receivable", type: "asset", balance: { amount: 2412000, currency: "USD" }, owner: "AR" },
  { code: "2000", name: "Accounts payable", type: "liability", balance: { amount: 2104000, currency: "USD" }, owner: "AP" },
  { code: "4000", name: "Subscription revenue", type: "revenue", balance: { amount: 18420000, currency: "USD" }, owner: "Revenue" },
  { code: "6100", name: "Cloud infrastructure expense", type: "expense", balance: { amount: 1380000, currency: "USD" }, owner: "FP&A" }
];

export const ledgerEntries: LedgerEntry[] = [
  { id: "GL-90021", date: "2026-05-29", account: "4000 Subscription revenue", description: "Monthly SaaS revenue recognition", debit: { amount: 0, currency: "USD" }, credit: { amount: 820000, currency: "USD" } },
  { id: "GL-90020", date: "2026-05-29", account: "1200 Accounts receivable", description: "Enterprise invoice posting", debit: { amount: 221900, currency: "USD" }, credit: { amount: 0, currency: "USD" } },
  { id: "GL-90019", date: "2026-05-28", account: "2000 Accounts payable", description: "Vendor accrual settlement", debit: { amount: 187500, currency: "USD" }, credit: { amount: 0, currency: "USD" } }
];

export const journalEntries: JournalEntry[] = [
  { id: "JE-3021", period: "FY2026-Q2", status: "posted", description: "Revenue recognition adjustment", createdBy: "Avery Stone", total: { amount: 820000, currency: "USD" } },
  { id: "JE-3020", period: "FY2026-Q2", status: "draft", description: "Cloud cost accrual", createdBy: "Priya Raman", total: { amount: 138000, currency: "USD" } },
  { id: "JE-3019", period: "FY2026-Q2", status: "reversed", description: "Duplicate freight accrual reversal", createdBy: "Morgan Lee", total: { amount: 42000, currency: "USD" } }
];

export const currencyRates: CurrencyRate[] = [
  { pair: "USD/EUR", rate: 0.92, change: -0.14, updatedAt: "2026-05-29 10:00" },
  { pair: "USD/INR", rate: 83.41, change: 0.22, updatedAt: "2026-05-29 10:00" },
  { pair: "USD/JPY", rate: 156.7, change: 0.48, updatedAt: "2026-05-29 10:00" },
  { pair: "USD/GBP", rate: 0.78, change: -0.08, updatedAt: "2026-05-29 10:00" }
];

export const auditLogs: AuditLog[] = [
  { id: "AUD-7712", actor: "Avery Stone", action: "Posted journal entry", entity: "JE-3021", timestamp: "2026-05-29 09:48", severity: "info" },
  { id: "AUD-7711", actor: "Morgan Lee", action: "Approved payment batch", entity: "PAY-8841", timestamp: "2026-05-29 09:21", severity: "warning" },
  { id: "AUD-7710", actor: "System AI", action: "Flagged invoice risk", entity: "INV-10492", timestamp: "2026-05-29 08:56", severity: "critical" }
];

const wait = () => new Promise((resolve) => setTimeout(resolve, 250));

export async function getFinanceDashboard() {
  await wait();
  return { financeKpis, invoices, payments, accounts, ledgerEntries, journalEntries, currencyRates, auditLogs };
}

export async function getInvoices() { await wait(); return invoices; }
export async function getPayments() { await wait(); return payments; }
export async function getAccounts() { await wait(); return accounts; }
export async function getLedgerEntries() { await wait(); return ledgerEntries; }
export async function getJournalEntries() { await wait(); return journalEntries; }
export async function getCurrencyRates() { await wait(); return currencyRates; }
export async function getAuditLogs() { await wait(); return auditLogs; }
