import { LiveModuleDashboard } from "@/components/shared/LiveModuleDashboard";

export default function FinanceDashboardPage() {
  return (
    <LiveModuleDashboard
      eyebrow="Finance Management"
      title="Enterprise financial control center"
      description="Live invoice, payment, ledger, and currency signals aggregated from the finance backend APIs."
      moduleKey="finance"
      resources={[
        { resource: "invoices", label: "Invoices", description: "Receivables, approvals, payment state, and AI risk." },
        { resource: "payments", label: "Payments", description: "Collections and payout activity across the tenant." },
        { resource: "ledger", label: "Ledger", description: "General ledger postings and accounting control entries." },
        { resource: "currency", label: "Currency", description: "Multi-currency operating context and conversion records." },
      ]}
    />
  );
}
