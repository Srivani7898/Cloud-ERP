import { LiveCrudResource } from "@/components/shared/LiveCrudResource";

export default function FinanceLedgerPage() {
  return (
    <LiveCrudResource
      moduleKey="finance"
      resourceKey="ledger"
      eyebrow="Finance Management"
      title="General ledger"
      description="Post and review ledger entries with debit, credit, account, and posting status through the ledger API."
      fields={[
        { key: "account", label: "Account", required: true, placeholder: "Customer invoice posting" },
        { key: "description", label: "Description", required: true, placeholder: "Enter Description" },
        { key: "debit", label: "Debit", type: "number", defaultValue: "0" },
        { key: "credit", label: "Credit", type: "number", defaultValue: "0" },
      ]}
      columns={[
        { key: "id", label: "Entry" },
        { key: "account", label: "Account" },
        { key: "description", label: "Description" },
        { key: "debit", label: "Debit", format: "currency" },
        { key: "credit", label: "Credit", format: "currency" },
        { key: "status", label: "Status", format: "status" },
      ]}
      defaultCreate={{ status: "Created" }}
      actions={[
        { label: "Post", patch: { status: "Posted" }, tone: "green" },
        { label: "Reverse", patch: { status: "Reversed" }, tone: "rose" },
      ]}
    />
  );
}
