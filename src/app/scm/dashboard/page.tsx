import { LiveModuleDashboard } from "@/components/shared/LiveModuleDashboard";

export default function SCMDashboardPage() {
  return (
    <LiveModuleDashboard
      eyebrow="Supply Chain & Inventory"
      title="Enterprise inventory command center"
      description="Live inventory, vendor, purchase order, goods receipt, and reorder signals from SCM APIs."
      moduleKey="scm"
      resources={[
        { resource: "inventory", label: "Inventory", description: "Stock quantity, warehouse health, and reorder policy state." },
        { resource: "vendors", label: "Vendors", description: "Supplier records and procurement readiness." },
        { resource: "purchase-orders", label: "Purchase Orders", description: "Purchase order lifecycle and fulfillment signals." },
        { resource: "reorder-alerts", label: "Reorder Alerts", description: "Automated replenishment and low-stock exceptions." },
      ]}
    />
  );
}
