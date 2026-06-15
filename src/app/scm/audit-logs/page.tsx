"use client";

import { ScmTable } from "@/components/scm/ScmTable";
import { useScmStore } from "@/store/scm-store";

export default function ScmAuditLogsPage() {
  const logs = useScmStore((state) => state.auditLogs);
  return <div className="space-y-6"><div><h2 className="text-2xl font-semibold">Stock audit logs</h2><p className="text-sm text-slate-500">Auditable supply chain and inventory activity.</p></div><ScmTable title="Audit logs" description="Immutable SCM action history." headers={["Log", "Action", "Actor", "Entity", "Timestamp"]} rows={logs.map((log) => [log.id, log.action, log.actor, log.entity, log.timestamp])} /></div>;
}
