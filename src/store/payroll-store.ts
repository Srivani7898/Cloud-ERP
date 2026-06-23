"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  payrollApprovals,
  payrollEmployees,
  payrollHistory,
  payrollPayslips,
  payrollRuns,
  taxRecords
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
  createRun: (period: string, payDate: string) => void;
  processRun: (runId: string) => void;
  approveRun: (approvalId: string) => Promise<void>;
  rejectRun: (approvalId: string) => Promise<void>;
  addEmployee: (employee: Omit<PayrollEmployee, "id" | "payType" | "bankStatus">) => void;
  generatePayslips: (period: string) => void;
  addHistory: (
    action: string,
    entity: string,
    actor?: string
  ) => void;
};

function stamp() {
  return new Date().toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const usePayrollStore = create<PayrollState>()(
  persist(
    (set, get) => ({
      employees: payrollEmployees,
      runs: payrollRuns,
      payslips: payrollPayslips,
      taxRecords,
      approvals: payrollApprovals,
      history: payrollHistory,
      addHistory: (action, entity, actor = "Payroll Manager") =>
        set((state) => ({
          history: [
            {
              id: `HIS-${Date.now()}`,
              action,
              actor,
              timestamp: stamp(),
              entity,
            },
            ...state.history,
          ],
        })),

      createRun: (period, payDate) =>
        set((state) => {
          console.log("STORE CREATE RUN");
          console.log("Period:", period);
          console.log("Pay Date:", payDate);

          return {
            runs: [
              {
                id: `PR-${Date.now()}`,
                period,
                payDate,
                employees: state.employees.length,
                grossPay: state.employees.reduce(
                  (sum, employee) => sum + employee.baseSalary,
                  0
                ),
                deductions: 0,
                netPay: 0,
                status: "draft",
              },
              ...state.runs,
            ],

            history: [
              {
                id: `HIS-${Date.now()}`,
                action: "Payroll run created",
                actor: "Payroll Manager",
                timestamp: stamp(),
                entity: period,
              },
              ...state.history,
            ],
          };
        }),

      processRun: (runId) =>
        set((state) => {
          console.log("PROCESS BUTTON CLICKED");
          console.log("RUN ID:", runId);

          const run = state.runs.find(
            (item) => item.id === runId
          );

          if (!run) {
            console.log("RUN NOT FOUND");
            return state;
          }

          const deductions = Math.round(
            run.grossPay * 0.17
          );

          const netPay = run.grossPay - deductions;

          console.log("DEDUCTIONS:", deductions);
          console.log("NET PAY:", netPay);

          return {
            runs: state.runs.map((item) =>
              item.id === runId
                ? {
                  ...item,
                  deductions,
                  netPay,
                  status: "pending_approval",
                }
                : item
            ),

            approvals: [
              {
                id: `APR-${Date.now()}`,
                runId,
                approver: "Payroll Manager",
                status: "pending",
                requestedAt: stamp(),
                amount: netPay,
              },
              ...state.approvals,
            ],

            history: [
              {
                id: `HIS-${Date.now()}`,
                action: "Payroll run processed",
                actor: "Payroll Manager",
                timestamp: stamp(),
                entity: runId,
              },
              ...state.history,
            ],
          };
        }),
      approveRun: async (approvalId) => {
        const approval = get().approvals.find(
          (item) => item.id === approvalId
        );

        if (!approval) return;

        await fetch(
          `/api/payroll/approvals/${approvalId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: "Approved",
            }),
          }
        );

        await fetch(
          `/api/payroll/runs/${approval.runId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: "Approved",
            }),
          }
        );

        set((state) => ({
          approvals: state.approvals.map((item) =>
            item.id === approvalId
              ? { ...item, status: "approved" }
              : item
          ),

          runs: state.runs.map((item) =>
            item.id === approval.runId
              ? { ...item, status: "approved" }
              : item
          ),

          history: [
            {
              id: `HIS-${Date.now()}`,
              action: "Payroll approved",
              actor: "Payroll Manager",
              timestamp: stamp(),
              entity: approval.runId,
            },
            ...state.history,
          ],
        }));
      },
      rejectRun: async (approvalId) => {
        const approval = get().approvals.find(
          (item) => item.id === approvalId
        );

        if (!approval) return;

        await fetch(
          `/api/payroll/approvals/${approvalId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: "Rejected",
            }),
          }
        );

        await fetch(
          `/api/payroll/runs/${approval.runId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: "Failed",
            }),
          }
        );

        set((state) => ({
          approvals: state.approvals.map((item) =>
            item.id === approvalId
              ? { ...item, status: "rejected" }
              : item
          ),

          runs: state.runs.map((item) =>
            item.id === approval.runId
              ? { ...item, status: "failed" }
              : item
          ),

          history: [
            {
              id: `HIS-${Date.now()}`,
              action: "Payroll rejected",
              actor: "Payroll Manager",
              timestamp: stamp(),
              entity: approval.runId,
            },
            ...state.history,
          ],
        }));
      },
      addEmployee: (employee) =>
        set((state) => ({
          employees: [
            {
              ...employee,
              id: `pay-emp-${Date.now()}`,
              payType: "monthly",
              bankStatus: "pending",
            },
            ...state.employees,
          ],

          history: [
            {
              id: `HIS-${Date.now()}`,
              action: "Payroll employee added",
              actor: "Payroll Manager",
              timestamp: stamp(),
              entity: employee.employeeCode,
            },
            ...state.history,
          ],
        })),
      generatePayslips: (period) =>
        set((state) => {

          console.log("GENERATE PAYSLIPS CLICKED");

          console.log(
            state.employees.map((employee) => ({
              id: `TAX-${Date.now()}-${employee.id}`,
              employeeName: employee.name,
              region: employee.taxRegion,
              taxableIncome: employee.baseSalary,
              taxWithheld: Math.round(employee.baseSalary * 0.09),
              retirementContribution: Math.round(employee.baseSalary * 0.05),
            }))
          );
          console.log("EMPLOYEES IN STORE", state.employees);

          return {
            payslips: [
              ...state.employees.map((employee) => {
                const deductions = Math.round(
                  employee.baseSalary * 0.17
                );

                const tax = Math.round(
                  employee.baseSalary * 0.09
                );

                useHrNotificationStore
                  .getState()
                  .addNotification(
                    employee.name,
                    "Payslip Generated",
                    `Your salary slip for ${period} has been generated and is ready for download.`,
                    "Payroll"
                  );

                return {
                  id: `PS-${employee.employeeCode}-${period}`,

                  employeeId: employee.id,
                  employeeName: employee.name,

                  employeeCode: employee.employeeCode,
                  department: employee.department,
                  designation: employee.designation,

                  period,

                  grossPay: employee.baseSalary,
                  tax,
                  deductions,

                  netPay:
                    employee.baseSalary - deductions,

                  generatedAt: new Date()
                    .toISOString()
                    .slice(0, 10),
                };
              }),

              ...state.payslips,
            ],

            taxRecords: state.employees.map((employee) => ({
              id: `TAX-${Date.now()}-${employee.id}`,
              employeeName: employee.name,
              region: employee.taxRegion,
              taxableIncome: employee.baseSalary,
              taxWithheld: Math.round(employee.baseSalary * 0.09),
              retirementContribution: Math.round(employee.baseSalary * 0.05),
            })),

            history: [
              {
                id: `HIS-${Date.now()}`,
                action: "Payslips & Tax Records Generated",
                actor: "Payroll Manager",
                timestamp: stamp(),
                entity: period,
              },

              ...state.history,
            ],
          };
        }),
    }),
    {
      name: "cloud-erp-payroll",
    }
  )
);