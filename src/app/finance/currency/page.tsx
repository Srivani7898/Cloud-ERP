import { LiveCrudResource } from "@/components/shared/LiveCrudResource";

export default function FinanceCurrencyPage() {
  return (
    <LiveCrudResource
      moduleKey="finance"
      resourceKey="currency"
      eyebrow="Finance Management"
      title="Currency management"
      description="Manage currency pairs, exchange rates, effective dates, and active conversion state through the currency API."
      fields={[
        { key: "pair", label: "Pair", required: true, placeholder: "USD/INR" },
        { key: "base", label: "Base", defaultValue: "USD" },
        { key: "quote", label: "Quote", defaultValue: "INR" },
        { key: "rate", label: "Rate", type: "number", defaultValue: "83.2" },
      ]}
      columns={[
        { key: "id", label: "Rate ID" },
        { key: "pair", label: "Pair" },
        { key: "base", label: "Base" },
        { key: "quote", label: "Quote" },
        { key: "rate", label: "Rate", format: "number" },
        { key: "status", label: "Status", format: "status" },
      ]}
      defaultCreate={{ status: "Created" }}
      actions={[
        { label: "Activate", patch: { status: "Active" }, tone: "green" },
        { label: "Review", patch: { status: "Review" }, tone: "amber" },
      ]}
    />
  );
} 
