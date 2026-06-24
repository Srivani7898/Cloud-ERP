"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  fetchPayrollEmployees,
  createPayrollEmployee,
  fetchPayrollRuns,
  createPayrollRun,
  processPayrollRun,
  fetchPayrollPayslips,
  generatePayslips,
  fetchTaxRecords,
  fetchPayrollApprovals,
  updatePayrollApprovalStatus,
  fetchPayrollHistory,
  triggerSeed,
} from "@/services/payroll-service";
import type { PayrollApproval, PayrollEmployee, PayrollHistoryItem, PayrollPayslip, PayrollRun, TaxRecord } from "@/types/payroll";
import { useHrNotificationStore } from "@/store/notification-store";

type PayrollState = {
  employees: PayrollEmployee[];
  runs: PayrollRun[];
  payslips: PayrollPayslip[];
  taxRecords: TaxRecord[];
  approvals: PayrollApproval[];
  history: PayrollHistoryItem[];
  isLoading: boolean;
  createRun: (period: string, payDate: string) => Promise<void>;
  processRun: (runId: string) => Promise<void>;
  approveRun: (approvalId: string) => Promise<void>;
  rejectRun: (approvalId: string) => Promise<void>;
  addEmployee: (employee: Omit<PayrollEmployee, "id" | "payType" | "bankStatus">) => Promise<void>;
  generatePayslips: (period: string) => Promise<void>;
  fetchInitialData: () => Promise<void>;
};

export const usePayrollStore = create<PayrollState>()(
  persist(
    (set, get) => ({
      employees: [],
      runs: [],
      payslips: [],
      taxRecords: [],
      approvals: [],
      history: [],
      isLoading: false,

      fetchInitialData: async () => {
        set({ isLoading: true });
        try {
          let employeesList = await fetchPayrollEmployees();
          if (employeesList.length === 0) {
            await triggerSeed();
            employeesList = await fetchPayrollEmployees();
          }

          const [runsList, payslipsList, taxList, approvalsList, historyList] = await Promise.all([
            fetchPayrollRuns(),
            fetchPayrollPayslips(),
            fetchTaxRecords(),
            fetchPayrollApprovals(),
            fetchPayrollHistory(),
          ]);

          set({
            employees: employeesList,
            runs: runsList,
            payslips: payslipsList,
            taxRecords: taxList,
            approvals: approvalsList,
            history: historyList,
          });
        } catch (e) {
          console.error("Failed to fetch initial payroll data:", e);
        } finally {
          set({ isLoading: false });
        }
      },

      addEmployee: async (employee) => {
        try {
          await createPayrollEmployee(employee);
          const [employeesList, historyList] = await Promise.all([
            fetchPayrollEmployees(),
            fetchPayrollHistory(),
          ]);
          set({ employees: employeesList, history: historyList });
        } catch (e) {
          console.error("Failed to add payroll employee:", e);
        }
      },

      createRun: async (period, payDate) => {
        try {
          await createPayrollRun(period, payDate);
          const [runsList, historyList] = await Promise.all([
            fetchPayrollRuns(),
            fetchPayrollHistory(),
          ]);
          set({ runs: runsList, history: historyList });
        } catch (e) {
          console.error("Failed to create payroll run:", e);
        }
      },

      processRun: async (runId) => {
        try {
          await processPayrollRun(runId);
          const [runsList, approvalsList, historyList] = await Promise.all([
            fetchPayrollRuns(),
            fetchPayrollApprovals(),
            fetchPayrollHistory(),
          ]);
          set({ runs: runsList, approvals: approvalsList, history: historyList });
        } catch (e) {
          console.error("Failed to process payroll run:", e);
        }
      },

      approveRun: async (approvalId) => {
        try {
          await updatePayrollApprovalStatus(approvalId, "Approved");
          const [runsList, approvalsList, historyList] = await Promise.all([
            fetchPayrollRuns(),
            fetchPayrollApprovals(),
            fetchPayrollHistory(),
          ]);
          set({ runs: runsList, approvals: approvalsList, history: historyList });
        } catch (e) {
          console.error("Failed to approve payroll run:", e);
        }
      },

      rejectRun: async (approvalId) => {
        try {
          await updatePayrollApprovalStatus(approvalId, "Rejected");
          const [runsList, approvalsList, historyList] = await Promise.all([
            fetchPayrollRuns(),
            fetchPayrollApprovals(),
            fetchPayrollHistory(),
          ]);
          set({ runs: runsList, approvals: approvalsList, history: historyList });
        } catch (e) {
          console.error("Failed to reject payroll run:", e);
        }
      },

      generatePayslips: async (period) => {
        try {
          await generatePayslips(period);
          const [employeesList, payslipsList, taxList, historyList] = await Promise.all([
            fetchPayrollEmployees(),
            fetchPayrollPayslips(),
            fetchTaxRecords(),
            fetchPayrollHistory(),
          ]);

          // Push notifications to store for UI updates
          employeesList.forEach((employee) => {
            useHrNotificationStore
              .getState()
              .addNotification(
                employee.name,
                "Payslip Generated",
                `Your salary slip for ${period} has been generated and is ready for download.`,
                "Payroll"
              );
          });

          set({
            payslips: payslipsList,
            taxRecords: taxList,
            history: historyList,
          });
        } catch (e) {
          console.error("Failed to generate payslips:", e);
        }
      },
    }),
    {
      name: "cloud-erp-payroll",
      partialize: (state) => ({}), // We retrieve list dynamically, no need to persist lists.
    }
  )
);