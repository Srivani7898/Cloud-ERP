import { AdminSecurityHeader } from "@/components/audit/AuditShell";
import { CompliancePanel } from "@/components/audit/AuditWidgets";

export default function AdminCompliancePage() {
  return (
    <div className="space-y-6 p-8 text-white">
      <AdminSecurityHeader title="Tenant compliance administration" description="Super admin controls for regulatory frameworks, evidence health, and tenant compliance posture." />
      <CompliancePanel />
    </div>
  );
}
