import { AdminSecurityHeader } from "@/components/audit/AuditShell";
import { AuditEventTable } from "@/components/audit/AuditWidgets";

export default function AdminSecurityEventsPage() {
  return (
    <div className="space-y-6 p-8 text-white">
      <AdminSecurityHeader title="Security events" description="Centralized high-signal security activity for identity, access, data, and integrations." />
      <AuditEventTable />
    </div>
  );
}
