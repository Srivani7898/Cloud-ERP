import { LiveCrudResource } from "@/components/shared/LiveCrudResource";

export default function FinancePaymentsPage() {
  return (
    <LiveCrudResource
      moduleKey="finance"
      resourceKey="payments"
      eyebrow="Finance Management"
      title="Payments"
      description="Manage payment collections, settlement state, and cash movement through the finance payments API."
      fields={[
        { key: "payer", label: "Payer", required: true, placeholder: "Apex Retail Group" },
        { key: "amount", label: "Amount", type: "number", required: true, defaultValue: "25000" },
        { key: "method", label: "Method", type: "select", defaultValue: "ACH", options: ["ACH", "Wire", "Card", "UPI"] },
        { key: "receivedAt", label: "Received date", type: "date", required: true },
      ]}
      columns={[
        { key: "id", label: "Payment" },
        { key: "payer", label: "Payer" },
        { key: "method", label: "Method" },
        { key: "amount", label: "Amount", format: "currency" },
        { key: "status", label: "Status", format: "status" },
      ]}
      defaultCreate={{ status: "Pending", currency: "USD" }}
      actions={[
        { label: "Clear", patch: { status: "Cleared" }, tone: "green" },
        { label: "Review", patch: { status: "Under Review" }, tone: "amber" },
      ]}
    />
  );
}
