import { LiveCrudResource } from "@/components/shared/LiveCrudResource";

export default function FinanceJournalEntriesPage() {
  return (
    <LiveCrudResource
      moduleKey="finance"
      resourceKey="journal-entries"
      eyebrow="Finance Management"
      title="Journal entries"
      description="Create, approve, and post journal entries through the finance journal entries API."
      fields={[
        { key: "reference", label: "Reference", required: true, placeholder: "Enter Reference" },
        { key: "description", label: "Description", required: true, placeholder: "Month-end accrual" },
        { key: "amount", label: "Amount", type: "number", defaultValue: "10000" },
        { key: "postingDate", label: "Posting date", type: "date", required: true },
      ]}
      columns={[
        { key: "id", label: "Journal" },
        { key: "reference", label: "Reference" },
        { key: "description", label: "Description" },
        { key: "amount", label: "Amount", format: "currency" },
        { key: "postingDate", label: "Posting date" },
        { key: "status", label: "Status", format: "status" },
      ]}
      defaultCreate={{ status: "Created" }}
      actions={[
        { label: "Approve", patch: { status: "Approved" }, tone: "blue" },
        { label: "Post", patch: { status: "Posted" }, tone: "green" },
      ]}
    />
  );
}
