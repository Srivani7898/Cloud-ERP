import { LiveModuleDashboard } from "@/components/shared/LiveModuleDashboard";

export default function HRDashboardPage() {
  return (
    <LiveModuleDashboard
      eyebrow="Human Resources"
      title="Enterprise people operations center"
      description="Live workforce, attendance, leave, onboarding, and department summaries from HR backend APIs."
      moduleKey="hr"
      resources={[
        { resource: "employees", label: "Employees", description: "Employee directory, status, location, and department data." },
        { resource: "attendance", label: "Attendance", description: "Daily and monthly attendance records for workforce visibility." },
        { resource: "leave", label: "Leave", description: "Leave applications, approvals, and availability impact." },
        { resource: "departments", label: "Departments", description: "Organizational department coverage and ownership." },
      ]}
    />
  );
}
