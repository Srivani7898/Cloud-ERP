"use client";

import { ShieldCheck } from "lucide-react";

import { ScmTable } from "@/components/scm/ScmTable";
import { useScmStore } from "@/store/scm-store";

export default function ScmAuditLogsPage() {
  const logs = useScmStore(
    (state) => state.auditLogs
  );

  const sortedLogs = [...logs].sort(
    (a, b) =>
      new Date(b.timestamp).getTime() -
      new Date(a.timestamp).getTime()
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">
          SCM Audit Logs
        </h2>

        <p className="text-sm text-slate-500">
          Real-time audit trail of supply
          chain operations.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-slate-500">
            Total Logs
          </p>

          <p className="text-3xl font-bold">
            {logs.length}
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-slate-500">
            Latest Activity
          </p>

          <p className="font-semibold">
            {logs[0]?.action ?? "N/A"}
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-green-500" />

            <span className="font-semibold">
              Audit Tracking Active
            </span>
          </div>
        </div>
      </div>

      <ScmTable
        title="Audit Logs"
        description="Immutable SCM action history."
        headers={[
          "Log ID",
          "Action",
          "Actor",
          "Entity",
          "Timestamp",
        ]}
        rows={sortedLogs.map((log) => [
          log.id,
          log.action,
          log.actor,
          log.entity,
          new Date(
            log.timestamp
          ).toLocaleString(),
        ])}
      />
    </div>
  );
}