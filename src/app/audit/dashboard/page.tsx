import { LiveModuleDashboard } from "@/components/shared/LiveModuleDashboard";

export default function AuditDashboardPage() {
  return (
    <LiveModuleDashboard
      eyebrow="Audit & Compliance"
      title="Enterprise security evidence center"
      description="Live audit logs, activity, compliance, GDPR, and risk signals from compliance backend APIs."
      moduleKey="audit"
      resources={[
        { resource: "logs", label: "Immutable Logs", description: "Hash evidence and mutation trail records." },
        { resource: "activity", label: "Activity", description: "Security and user activity telemetry." },
        { resource: "compliance", label: "Compliance", description: "Regulatory posture and control state." },
        { resource: "risk-monitoring", label: "Risk Monitoring", description: "Security risk and exception monitoring." },
      ]}
    />
  );
}
