import { LiveCrudResource } from "@/components/shared/LiveCrudResource";

export default function FinanceAccountsPage() {
  return (
    <LiveCrudResource
      moduleKey="finance"
      resourceKey="accounts"
      eyebrow="Finance Management"
      title="Chart of accounts"
      description="Manage account master data, account type, balance, and activation state through the finance accounts API."
      fields={[
        { key: "code", label: "Account code", required: true, placeholder: "Enter account code" },
        { key: "name", label: "Account name", required: true, placeholder: "Enter account name" },
        { key: "type", label: "Type", type: "select", defaultValue: "Select Type", options: ["Asset", "Liability", "Equity", "Revenue", "Expense"] },
        { key: "balance", label: "Balance", type: "number", defaultValue: "0" },
      ]}
      columns={[
        { key: "id", label: "Record" },
        { key: "code", label: "Code" },
        { key: "name", label: "Account" },
        { key: "type", label: "Type" },
        { key: "balance", label: "Balance", format: "currency" },
        { key: "status", label: "Status", format: "status" },
      ]}
      defaultCreate={{ status: "created" }}
      actions={[
        { label: "Activate", patch: { status: "Active" }, tone: "green" },
        { label: "Freeze", patch: { status: "Frozen" }, tone: "amber" },
      ]}
    />
  );
}
