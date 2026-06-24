"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getInvoices,
  createInvoice,
  getPayments,
  createPayment,
  getAccounts,
  createAccount,
  getLedgerEntries,
  createLedgerEntry,
  getJournalEntries,
  createJournalEntry,
  getCurrencyRates,
  updateCurrencyRate,
  getAuditLogs,
  triggerSeed,
} from "@/services/finance-service";
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
  isLoading: boolean;

  setPeriod: (period: FinancePeriod) => void;
  setEntity: (entity: string) => void;
  setCurrency: (currency: string) => void;
  fetchInitialData: () => Promise<void>;
  addInvoice: (invoice: Invoice) => Promise<void>;
  addPayment: (payment: Payment) => Promise<void>;
  addAccount: (account: Account) => Promise<void>;
  addLedgerEntry: (entry: LedgerEntry) => Promise<void>;
  addJournalEntry: (entry: JournalEntry) => Promise<void>;
  updateCurrencyRate: (pair: string, rate: number) => Promise<void>;
};

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set, get) => ({
      period: "FY2026-Q2",
      entity: "Northstar Manufacturing",
      currency: "USD",
      invoices: [],
      payments: [],
      accounts: [],
      ledgerEntries: [],
      journalEntries: [],
      currencyRates: [],
      auditLogs: [],
      isLoading: false,

      setPeriod: (period) => set({ period }),
      setEntity: (entity) => set({ entity }),
      setCurrency: (currency) => set({ currency }),

      fetchInitialData: async () => {
        set({ isLoading: true });
        try {
          let invoicesList = await getInvoices();
          if (invoicesList.length === 0) {
            await triggerSeed();
            invoicesList = await getInvoices();
          }

          const [paymentsList, accountsList, ledgerList, journalList, ratesList, logsList] = await Promise.all([
            getPayments(),
            getAccounts(),
            getLedgerEntries(),
            getJournalEntries(),
            getCurrencyRates(),
            getAuditLogs(),
          ]);

          set({
            invoices: invoicesList,
            payments: paymentsList,
            accounts: accountsList,
            ledgerEntries: ledgerList,
            journalEntries: journalList,
            currencyRates: ratesList,
            auditLogs: logsList,
          });
        } catch (e) {
          console.error("Failed to load initial finance data:", e);
        } finally {
          set({ isLoading: false });
        }
      },

      addInvoice: async (invoice) => {
        try {
          await createInvoice({
            customer: invoice.customer,
            status: invoice.status,
            dueDate: invoice.dueDate,
            amount: invoice.total.amount,
            currency: invoice.total.currency,
            riskScore: invoice.riskScore,
            assignedTo: invoice.assignedTo,
          });
          const invoicesList = await getInvoices();
          const logsList = await getAuditLogs();
          set({ invoices: invoicesList, auditLogs: logsList });
        } catch (e) {
          console.error("Failed to add invoice:", e);
        }
      },

      addPayment: async (payment) => {
        try {
          await createPayment({
            vendor: payment.vendor,
            status: payment.status,
            method: payment.method,
            scheduledDate: payment.scheduledDate,
            amount: payment.total.amount,
            currency: payment.total.currency,
          });
          const paymentsList = await getPayments();
          const logsList = await getAuditLogs();
          set({ payments: paymentsList, auditLogs: logsList });
        } catch (e) {
          console.error("Failed to add payment:", e);
        }
      },

      addAccount: async (account) => {
        try {
          await createAccount({
            code: account.code,
            name: account.name,
            type: account.type,
            amount: account.balance.amount,
            currency: account.balance.currency,
            owner: account.owner,
          });
          const accountsList = await getAccounts();
          const logsList = await getAuditLogs();
          set({ accounts: accountsList, auditLogs: logsList });
        } catch (e) {
          console.error("Failed to add account:", e);
        }
      },

      addLedgerEntry: async (entry) => {
        try {
          await createLedgerEntry({
            date: entry.date,
            account: entry.account,
            description: entry.description,
            debitAmount: entry.debit.amount,
            debitCurrency: entry.debit.currency,
            creditAmount: entry.credit.amount,
            creditCurrency: entry.credit.currency,
          });
          const ledgerList = await getLedgerEntries();
          const logsList = await getAuditLogs();
          set({ ledgerEntries: ledgerList, auditLogs: logsList });
        } catch (e) {
          console.error("Failed to add ledger entry:", e);
        }
      },

      addJournalEntry: async (entry) => {
        try {
          await createJournalEntry({
            period: entry.period,
            status: entry.status,
            description: entry.description,
            createdBy: entry.createdBy,
            amount: entry.total.amount,
            currency: entry.total.currency,
          });
          const journalList = await getJournalEntries();
          const logsList = await getAuditLogs();
          set({ journalEntries: journalList, auditLogs: logsList });
        } catch (e) {
          console.error("Failed to add journal entry:", e);
        }
      },

      updateCurrencyRate: async (pair, rate) => {
        try {
          await updateCurrencyRate(pair, rate);
          const ratesList = await getCurrencyRates();
          const logsList = await getAuditLogs();
          set({ currencyRates: ratesList, auditLogs: logsList });
        } catch (e) {
          console.error("Failed to update currency rate:", e);
        }
      },
    }),
    {
      name: "cloud-erp-finance",
      partialize: (state) => ({
        period: state.period,
        entity: state.entity,
        currency: state.currency,
      }),
    }
  )
);
