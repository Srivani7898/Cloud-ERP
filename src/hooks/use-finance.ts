"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getAccounts,
  getAuditLogs,
  getCurrencyRates,
  getFinanceDashboard,
  getInvoices,
  getJournalEntries,
  getLedgerEntries,
  getPayments
} from "@/services/finance-service";

export function useFinanceDashboard() {
  return useQuery({ queryKey: ["finance", "dashboard"], queryFn: getFinanceDashboard });
}

export function useInvoices() {
  return useQuery({ queryKey: ["finance", "invoices"], queryFn: getInvoices });
}

export function usePayments() {
  return useQuery({ queryKey: ["finance", "payments"], queryFn: getPayments });
}

export function useAccounts() {
  return useQuery({ queryKey: ["finance", "accounts"], queryFn: getAccounts });
}

export function useLedgerEntries() {
  return useQuery({ queryKey: ["finance", "ledger"], queryFn: getLedgerEntries });
}

export function useJournalEntries() {
  return useQuery({ queryKey: ["finance", "journal-entries"], queryFn: getJournalEntries });
}

export function useCurrencyRates() {
  return useQuery({ queryKey: ["finance", "currency"], queryFn: getCurrencyRates });
}

export function useAuditLogs() {
  return useQuery({ queryKey: ["finance", "audit-logs"], queryFn: getAuditLogs });
}
