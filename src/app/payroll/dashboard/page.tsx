import { LiveModuleDashboard } from "@/components/shared/LiveModuleDashboard";

export default function PayrollDashboardPage() {
  return (
    <LiveModuleDashboard
      eyebrow="Payroll Management"
      title="Enterprise payroll command center"
      description="Live payroll run, payslip, tax, approval, and employee payroll signals from backend APIs."
      moduleKey="payroll"
      resources={[
        { resource: "runs", label: "Payroll Runs", description: "Salary processing cycles and run status." },
        { resource: "payslips", label: "Payslips", description: "Generated and released payroll documents." },
        { resource: "employees", label: "Payroll Employees", description: "Compensation setup and payroll eligibility." },
        { resource: "approvals", label: "Approvals", description: "Payroll approval workflow and release readiness." },
      ]}
    />
  );
}