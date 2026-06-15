import { CompliancePanel } from "@/components/audit/AuditWidgets";

export default function AuditCompliancePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Compliance monitoring</h1>
      <CompliancePanel />
    </div>
  );
}
