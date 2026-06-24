import { api } from "@/lib/api";
import type { Account, AuditLog, CurrencyRate, Invoice, JournalEntry, LedgerEntry, Payment } from "@/types/finance";

export async function getFinanceDashboard() {
  const response = await api.get("/finance/dashboard");
  return response.data;
}

export async function getInvoices(): Promise<Invoice[]> {
  const response = await api.get<Invoice[]>("/finance/invoices");
  return response.data;
}

export async function createInvoice(dto: {
  customer: string;
  status: string;
  dueDate: string;
  amount: number;
  currency: string;
  riskScore: number;
  assignedTo?: string;
}): Promise<Invoice> {
  const response = await api.post<Invoice>("/finance/invoices", dto);
  return response.data;
}

export async function getPayments(): Promise<Payment[]> {
  const response = await api.get<Payment[]>("/finance/payments");
  return response.data;
}

export async function createPayment(dto: {
  vendor: string;
  status: string;
  method: string;
  scheduledDate: string;
  amount: number;
  currency: string;
}): Promise<Payment> {
  const response = await api.post<Payment>("/finance/payments", dto);
  return response.data;
}

export async function getAccounts(): Promise<Account[]> {
  const response = await api.get<Account[]>("/finance/accounts");
  return response.data;
}

export async function createAccount(dto: {
  code: string;
  name: string;
  type: string;
  amount: number;
  currency: string;
  owner: string;
}): Promise<Account> {
  const response = await api.post<Account>("/finance/accounts", dto);
  return response.data;
}

export async function getLedgerEntries(): Promise<LedgerEntry[]> {
  const response = await api.get<LedgerEntry[]>("/finance/ledger");
  return response.data;
}

export async function createLedgerEntry(dto: {
  date: string;
  account: string;
  description: string;
  debitAmount: number;
  debitCurrency: string;
  creditAmount: number;
  creditCurrency: string;
}): Promise<LedgerEntry> {
  const response = await api.post<LedgerEntry>("/finance/ledger", dto);
  return response.data;
}

export async function getJournalEntries(): Promise<JournalEntry[]> {
  const response = await api.get<JournalEntry[]>("/finance/journals");
  return response.data;
}

export async function createJournalEntry(dto: {
  period: string;
  status: string;
  description: string;
  createdBy: string;
  amount: number;
  currency: string;
}): Promise<JournalEntry> {
  const response = await api.post<JournalEntry>("/finance/journals", dto);
  return response.data;
}

export async function getCurrencyRates(): Promise<CurrencyRate[]> {
  const response = await api.get<CurrencyRate[]>("/finance/rates");
  return response.data;
}

export async function updateCurrencyRate(pair: string, rate: number): Promise<CurrencyRate> {
  const response = await api.patch<CurrencyRate>("/finance/rates", { pair, rate });
  return response.data;
}

export async function getAuditLogs(): Promise<AuditLog[]> {
  const response = await api.get<AuditLog[]>("/finance/logs");
  return response.data;
}

export async function triggerSeed(): Promise<{ seeded: boolean }> {
  const response = await api.post<{ seeded: boolean }>("/finance/seed");
  return response.data;
}
