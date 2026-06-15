import { LiveCrudResource } from "@/components/shared/LiveCrudResource";

export default function FinanceAuditLogsPage() {
  return (
    <LiveCrudResource
      moduleKey="finance"
      resourceKey="audit-logs"
      eyebrow="Finance Management"
      title="Finance audit logs"
      description="Track finance-specific approvals, postings, payment changes, and compliance evidence through the audit logs API."
      fields={[
        {
          key: "actor",
          label: "Actor",
          placeholder: "Enter actor name",
        },
        {
          key: "action",
          label: "Action",
          required: true,
          placeholder: "Enter audit action",
        },
        {
          key: "severity",
          label: "Severity",
          type: "select",
          defaultValue: "Select Severity",
          options: ["Low", "Medium", "High", "Critical"],
        },
        {
          key: "reference",
          label: "Reference",
          placeholder: "Enter reference ID",
        },
      ]}
      columns={[
        { key: "id", label: "Log" },
        { key: "actor", label: "Actor" },
        { key: "action", label: "Action" },
        { key: "reference", label: "Reference" },
        { key: "severity", label: "Severity", format: "status" },
        { key: "status", label: "Status", format: "status" },
      ]}
      defaultCreate={{
        status: "Created",
        type: "Audit Logs",
      }}
      actions={[
        {
          label: "Verify",
          patch: { status: "Verified" },
          tone: "green",
        },
        {
          label: "Escalate",
          patch: {
            status: "Escalated",
            severity: "High",
          },
          tone: "amber",
        },
        {
          label: "Resolve",
          patch: { status: "Resolved" },
          tone: "blue",
        },
      ]}
      enableExport
      exportFormat="pdf"
    />
  );
}