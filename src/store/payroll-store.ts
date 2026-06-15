"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { payrollApprovals, payrollEmployees, payrollHistory, payrollPayslips, payrollRuns, taxRecords } from "@/services/payroll-service";
import type { PayrollApproval, PayrollEmployee, PayrollHistoryItem, PayrollPayslip, PayrollRun, TaxRecord } from "@/types/payroll";

type PayrollState = {
  employees: PayrollEmployee[];
  runs: PayrollRun[];
  payslips: PayrollPayslip[];
  taxRecords: TaxRecord[];
  approvals: PayrollApproval[];
  history: PayrollHistoryItem[];
  createRun: (period: string, payDate: string) => void;
  processRun: (runId: string) => void;
  approveRun: (approvalId: string) => void;
  rejectRun: (approvalId: string) => void;
  addEmployee: (employee: Omit<PayrollEmployee, "id" | "payType" | "bankStatus">) => void;
  generatePayslips: (period: string) => void;
  addHistory: (action: string, entity: string) => void;
};

function stamp() {
  return new Date().toISOString().slice(0, 16).replace("T", " ");
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
      addHistory: (action, entity) =>
        set((state) => ({
          history: [{ id: `HIS-${Date.now()}`, action, actor: "Payroll Manager", timestamp: stamp(), entity }, ...state.history]
        })),
      createRun: (period, payDate) =>
        set((state) => ({
          runs: [{ id: `PR-${Date.now()}`, period, payDate, employees: state.employees.length, grossPay: state.employees.reduce((sum, employee) => sum + employee.baseSalary, 0), deductions: 0, netPay: 0, status: "draft" }, ...state.runs],
          history: [{ id: `HIS-${Date.now()}`, action: "Payroll run created", actor: "Payroll Manager", timestamp: stamp(), entity: period }, ...state.history]
        })),
      processRun: (runId) =>
        set((state) => {
          const run = state.runs.find((item) => item.id === runId);
          if (!run) return state;
          const deductions = Math.round(run.grossPay * 0.17);
          const netPay = run.grossPay - deductions;
          return {
            runs: state.runs.map((item) => (item.id === runId ? { ...item, deductions, netPay, status: "pending_approval" } : item)),
            approvals: [{ id: `APR-${Date.now()}`, runId, approver: "Avery Stone", status: "pending", requestedAt: stamp(), amount: netPay }, ...state.approvals],
            history: [{ id: `HIS-${Date.now()}`, action: "Payroll run processed", actor: "Payroll Manager", timestamp: stamp(), entity: runId }, ...state.history]
          };
        }),
      approveRun: (approvalId) =>
        set((state) => {
          const approval = state.approvals.find((item) => item.id === approvalId);
          return {
            approvals: state.approvals.map((item) => (item.id === approvalId ? { ...item, status: "approved" } : item)),
            runs: state.runs.map((item) => (item.id === approval?.runId ? { ...item, status: "approved" } : item)),
            history: [{ id: `HIS-${Date.now()}`, action: "Payroll approved", actor: "Avery Stone", timestamp: stamp(), entity: approval?.runId ?? approvalId }, ...state.history]
          };
        }),
      rejectRun: (approvalId) =>
        set((state) => {
          const approval = state.approvals.find((item) => item.id === approvalId);
          return {
            approvals: state.approvals.map((item) => (item.id === approvalId ? { ...item, status: "rejected" } : item)),
            runs: state.runs.map((item) => (item.id === approval?.runId ? { ...item, status: "failed" } : item)),
            history: [{ id: `HIS-${Date.now()}`, action: "Payroll rejected", actor: "Avery Stone", timestamp: stamp(), entity: approval?.runId ?? approvalId }, ...state.history]
          };
        }),
      addEmployee: (employee) =>
        set((state) => ({
          employees: [{ ...employee, id: `pay-emp-${Date.now()}`, payType: "monthly", bankStatus: "pending" }, ...state.employees],
          history: [{ id: `HIS-${Date.now()}`, action: "Payroll employee added", actor: "Payroll Manager", timestamp: stamp(), entity: employee.employeeCode }, ...state.history]
        })),
      generatePayslips: (period) =>
        set((state) => ({
          payslips: [
            ...state.employees.map((employee) => {
              const deductions = Math.round(employee.baseSalary * 0.17);
              return { id: `PS-${employee.employeeCode}-${period}`, employeeId: employee.id, employeeName: employee.name, period, grossPay: employee.baseSalary, tax: Math.round(employee.baseSalary * 0.09), deductions, netPay: employee.baseSalary - deductions, generatedAt: new Date().toISOString().slice(0, 10) };
            }),
            ...state.payslips
          ],
          history: [{ id: `HIS-${Date.now()}`, action: "Payslips generated", actor: "Payroll Manager", timestamp: stamp(), entity: period }, ...state.history]
        }))
    }),
    { name: "cloud-erp-payroll" }
  )
);
