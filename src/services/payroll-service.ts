import type { PayrollApproval, PayrollEmployee, PayrollHistoryItem, PayrollPayslip, PayrollRun, TaxRecord } from "@/types/payroll";

export const payrollEmployees: PayrollEmployee[] = [
  { id: "pay-emp-1001", employeeCode: "NS-1001", name: "Anika Rao", department: "People Operations", designation: "HR Business Partner", payType: "monthly", baseSalary: 8400, taxRegion: "India", bankStatus: "verified" },
  { id: "pay-emp-1002", employeeCode: "NS-1002", name: "Ethan Clarke", department: "Finance", designation: "Finance Controller", payType: "monthly", baseSalary: 11200, taxRegion: "US", bankStatus: "verified" },
  { id: "pay-emp-1003", employeeCode: "NS-1003", name: "Maya Chen", department: "Engineering", designation: "Cloud ERP Architect", payType: "monthly", baseSalary: 12800, taxRegion: "Singapore", bankStatus: "pending" },
  { id: "pay-emp-1004", employeeCode: "NS-1004", name: "Omar Haddad", department: "Operations", designation: "Supply Chain Lead", payType: "monthly", baseSalary: 9800, taxRegion: "UAE", bankStatus: "verified" }
];

export const payrollRuns: PayrollRun[] = [
  { id: "PR-2026-05", period: "May 2026", payDate: "2026-05-31", employees: 4, grossPay: 42200, deductions: 7280, netPay: 34920, status: "paid" },
  { id: "PR-2026-06", period: "June 2026", payDate: "2026-06-30", employees: 4, grossPay: 42200, deductions: 7310, netPay: 34890, status: "pending_approval" },
  { id: "PR-2026-07", period: "July 2026", payDate: "2026-07-31", employees: 4, grossPay: 42200, deductions: 0, netPay: 0, status: "draft" }
];

export const payrollPayslips = [];
 [
  { id: "PS-1001-MAY", employeeId: "pay-emp-1001", employeeName: "Anika Rao", period: "May 2026", grossPay: 8400, tax: 620, deductions: 1120, netPay: 7280, generatedAt: "2026-05-31" },
  { id: "PS-1002-MAY", employeeId: "pay-emp-1002", employeeName: "Ethan Clarke", period: "May 2026", grossPay: 11200, tax: 1450, deductions: 2180, netPay: 9020, generatedAt: "2026-05-31" },
  { id: "PS-1003-MAY", employeeId: "pay-emp-1003", employeeName: "Maya Chen", period: "May 2026", grossPay: 12800, tax: 1380, deductions: 2350, netPay: 10450, generatedAt: "2026-05-31" }
];

export const taxRecords: TaxRecord[] = [
  { id: "TAX-1001", employeeName: "Anika Rao", region: "India", taxableIncome: 100800, taxWithheld: 7440, retirementContribution: 3840 },
  { id: "TAX-1002", employeeName: "Ethan Clarke", region: "US", taxableIncome: 134400, taxWithheld: 17400, retirementContribution: 6000 },
  { id: "TAX-1003", employeeName: "Maya Chen", region: "Singapore", taxableIncome: 153600, taxWithheld: 16560, retirementContribution: 7200 }
];

export const payrollApprovals: PayrollApproval[] = [
  { id: "APR-601", runId: "PR-2026-06", approver: "Avery Stone", status: "pending", requestedAt: "2026-06-01 09:30", amount: 34890 }
];

export const payrollHistory: PayrollHistoryItem[] = [
  { id: "HIS-9001", action: "Payroll run paid", actor: "Payroll Manager", timestamp: "2026-05-31 18:20", entity: "PR-2026-05" },
  { id: "HIS-9002", action: "Payslips generated", actor: "System", timestamp: "2026-05-31 17:40", entity: "May 2026" },
  { id: "HIS-9003", action: "Approval requested", actor: "Payroll Manager", timestamp: "2026-06-01 09:30", entity: "PR-2026-06" }
];
