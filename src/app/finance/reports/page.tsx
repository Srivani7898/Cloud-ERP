import { LiveCrudResource } from "@/components/shared/LiveCrudResource";

export default function FinanceReportsPage() {
  return (
    <LiveCrudResource
      moduleKey="finance"
      resourceKey="reports"
      eyebrow="Finance Management"
      title="Financial reports"
      description="Create, publish, and export income statement, cash flow, balance sheet, and variance reports through the reports API."
      fields={[
        { key: "name", label: "Report name", required: true, placeholder: "Enter the report name" },
        { key: "type", label: "Type", type: "select", defaultValue: "", options: ["Income Statement", "Balance Sheet", "Cash Flow", "Variance"] },
        { key: "period", label: "Period", required: true, placeholder: "FY2026-Q1"},
        { key: "owner", label: "Owner",  placeholder: "Enter owner name" },
      ]}
      columns={[
        { key: "id", label: "Report" },
        { key: "name", label: "Name" },
        { key: "type", label: "Type" },
        { key: "period", label: "Period" },
        { key: "owner", label: "Owner" },
        { key: "status", label: "Status", format: "status" },
      ]}
      defaultCreate={{ status: "Created" }}
      actions={[
        { label: "Publish", patch: { status: "Published" }, tone: "green" },
        { label: "Draft", patch: { status: "Draft" }, tone: "amber" },
      ]}
      enableExport
      exportFormat="pdf"
    />
  );
}
