"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { accounts, auditLogs, currencyRates, invoices, journalEntries, ledgerEntries, payments } from "@/services/finance-service";
import type { Account, AuditLog, CurrencyRate, FinancePeriod, Invoice, JournalEntry, LedgerEntry, Payment } from "@/types/finance";

type FinanceState = {
  period: FinancePeriod;
  entity: string;
  currency: string;
  invoices: Invoice[];
  payments: Payment[];
  accounts: Account[];
  ledgerEntries: LedgerEntry[];
  journalEntries: JournalEntry[];
  currencyRates: CurrencyRate[];
  auditLogs: AuditLog[];
  setPeriod: (period: FinancePeriod) => void;
  setEntity: (entity: string) => void;
  setCurrency: (currency: string) => void;
  addInvoice: (invoice: Invoice) => void;
  addPayment: (payment: Payment) => void;
  addAccount: (account: Account) => void;
  addLedgerEntry: (entry: LedgerEntry) => void;
  addJournalEntry: (entry: JournalEntry) => void;
  updateCurrencyRate: (pair: string, rate: number) => void;
  addAuditLog: (log: Omit<AuditLog, "id" | "timestamp">) => void;
};

function auditId() {
  return `AUD-${Math.floor(8000 + Math.random() * 9000)}`;
}

function nowStamp() {
  return new Date().toISOString().slice(0, 16).replace("T", " ");
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      period: "FY2026-Q2",
      entity: "Northstar Manufacturing",
      currency: "USD",
      invoices,
      payments,
      accounts,
      ledgerEntries,
      journalEntries,
      currencyRates,
      auditLogs,
      setPeriod: (period) => set({ period }),
      setEntity: (entity) => set({ entity }),
      setCurrency: (currency) => set({ currency }),
      addInvoice: (invoice) =>
        set((state) => ({
          invoices: [invoice, ...state.invoices],
          auditLogs: [
            { id: auditId(), actor: "Finance User", action: "Created invoice", entity: invoice.id, timestamp: nowStamp(), severity: "info" },
            ...state.auditLogs
          ]
        })),
      addPayment: (payment) =>
        set((state) => ({
          payments: [payment, ...state.payments],
          auditLogs: [
            { id: auditId(), actor: "Finance User", action: "Scheduled payment", entity: payment.id, timestamp: nowStamp(), severity: "warning" },
            ...state.auditLogs
          ]
        })),
      addAccount: (account) =>
        set((state) => ({
          accounts: [account, ...state.accounts],
          auditLogs: [
            { id: auditId(), actor: "Finance User", action: "Created account", entity: account.code, timestamp: nowStamp(), severity: "info" },
            ...state.auditLogs
          ]
        })),
      addLedgerEntry: (entry) =>
        set((state) => ({
          ledgerEntries: [entry, ...state.ledgerEntries],
          auditLogs: [
            { id: auditId(), actor: "Finance User", action: "Posted ledger entry", entity: entry.id, timestamp: nowStamp(), severity: "info" },
            ...state.auditLogs
          ]
        })),
      addJournalEntry: (entry) =>
        set((state) => ({
          journalEntries: [entry, ...state.journalEntries],
          auditLogs: [
            { id: auditId(), actor: "Finance User", action: "Created journal entry", entity: entry.id, timestamp: nowStamp(), severity: "info" },
            ...state.auditLogs
          ]
        })),
      updateCurrencyRate: (pair, rate) =>
        set((state) => ({
          currencyRates: state.currencyRates.map((item) =>
            item.pair === pair ? { ...item, rate, updatedAt: nowStamp() } : item
          ),
          auditLogs: [
            { id: auditId(), actor: "Finance User", action: "Updated currency rate", entity: pair, timestamp: nowStamp(), severity: "warning" },
            ...state.auditLogs
          ]
        })),
      addAuditLog: (log) =>
        set((state) => ({
          auditLogs: [{ ...log, id: auditId(), timestamp: nowStamp() }, ...state.auditLogs]
        }))
    }),
    { name: "cloud-erp-finance" }
  )
);
