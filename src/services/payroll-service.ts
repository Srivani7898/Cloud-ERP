import { api } from "@/lib/api";
import type { PayrollApproval, PayrollEmployee, PayrollHistoryItem, PayrollPayslip, PayrollRun, TaxRecord } from "@/types/payroll";

export async function fetchPayrollEmployees(): Promise<PayrollEmployee[]> {
  const response = await api.get<PayrollEmployee[]>("/payroll/employees");
  return response.data;
}

export async function createPayrollEmployee(
  dto: Omit<PayrollEmployee, "id" | "payType" | "bankStatus">
): Promise<PayrollEmployee> {
  const response = await api.post<PayrollEmployee>("/payroll/employees", dto);
  return response.data;
}

export async function fetchPayrollRuns(): Promise<PayrollRun[]> {
  const response = await api.get<PayrollRun[]>("/payroll/runs");
  return response.data;
}

export async function createPayrollRun(
  period: string,
  payDate: string
): Promise<PayrollRun> {
  const response = await api.post<PayrollRun>("/payroll/runs", { period, payDate });
  return response.data;
}

export async function processPayrollRun(id: string): Promise<PayrollRun> {
  const response = await api.post<PayrollRun>(`/payroll/runs/${id}/process`);
  return response.data;
}

export async function fetchPayrollPayslips(): Promise<PayrollPayslip[]> {
  const response = await api.get<PayrollPayslip[]>("/payroll/payslips");
  return response.data;
}

export async function generatePayslips(period: string): Promise<PayrollPayslip[]> {
  const response = await api.post<PayrollPayslip[]>("/payroll/payslips", { period });
  return response.data;
}

export async function fetchTaxRecords(): Promise<TaxRecord[]> {
  const response = await api.get<TaxRecord[]>("/payroll/tax");
  return response.data;
}

export async function fetchPayrollApprovals(): Promise<PayrollApproval[]> {
  const response = await api.get<PayrollApproval[]>("/payroll/approvals");
  return response.data;
}

export async function updatePayrollApprovalStatus(
  id: string,
  status: string
): Promise<PayrollApproval> {
  const response = await api.patch<PayrollApproval>(`/payroll/approvals/${id}`, { status });
  return response.data;
}

export async function fetchPayrollHistory(): Promise<PayrollHistoryItem[]> {
  const response = await api.get<PayrollHistoryItem[]>("/payroll/history");
  return response.data;
}

export async function triggerSeed(): Promise<{ seeded: boolean }> {
  const response = await api.post<{ seeded: boolean }>("/payroll/seed");
  return response.data;
}
