export type PayrollRunStatus = "draft" | "processing" | "pending_approval" | "approved" | "paid" | "failed";
export type PayrollApprovalStatus = "pending" | "approved" | "rejected";

export type PayrollEmployee = {
  id: string;
  employeeCode: string;
  name: string;
  department: string;
  designation: string;
  payType: "monthly" | "hourly";
  baseSalary: number;
  taxRegion: string;
  bankStatus: "verified" | "pending";
};

export type PayrollRun = {
  id: string;
  period: string;
  payDate: string;
  employees: number;
  grossPay: number;
  deductions: number;
  netPay: number;
  status: PayrollRunStatus;
};

export type PayrollPayslip = {
  id: string;
  employeeId: string;
  employeeName: string;
  period: string;
  grossPay: number;
  tax: number;
  deductions: number;
  netPay: number;
  generatedAt: string;
};

export type TaxRecord = {
  id: string;
  employeeName: string;
  region: string;
  taxableIncome: number;
  taxWithheld: number;
  retirementContribution: number;
};

export type PayrollApproval = {
  id: string;
  runId: string;
  approver: string;
  status: PayrollApprovalStatus;
  requestedAt: string;
  amount: number;
};

export type PayrollHistoryItem = {
  id: string;
  action: string;
  actor: string;
  timestamp: string;
  entity: string;
};
