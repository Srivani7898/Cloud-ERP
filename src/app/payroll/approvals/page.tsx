"use client";

import { Button } from "@/components/ui/button";
import { PayrollStatusBadge } from "@/components/payroll/PayrollStatusBadge";
import { PayrollTable } from "@/components/payroll/PayrollTable";
import { usePayrollStore } from "@/store/payroll-store";

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export default function PayrollApprovalsPage() {
  const { approvals, approveRun, rejectRun } = usePayrollStore();
  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-semibold">Payroll approvals</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Approve or reject payroll runs before payment release.</p></div>
      <PayrollTable title="Approval queue" description="Payroll approval workflow." headers={["Approval", "Run", "Approver", "Requested", "Amount", "Status", "Action"]} rows={approvals.map((approval) => [approval.id, approval.runId, approval.approver, approval.requestedAt, money(approval.amount), <PayrollStatusBadge key="status" status={approval.status} />, <div key="actions" className="flex gap-2"><Button
        size="sm"
        onClick={async () => {
          approveRun(approval.id);

          try {
            await fetch(
              `/api/payroll/approvals/${approval.id}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify({
                  status: "Approved",
                }),
              }
            );

            console.log(
              "APPROVAL UPDATED"
            );
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Approve
      </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={async () => {
            rejectRun(approval.id);

            try {
              await fetch(
                `/api/payroll/approvals/${approval.id}`,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type":
                      "application/json",
                  },
                  body: JSON.stringify({
                    status: "Rejected",
                  }),
                }
              );

              console.log(
                "REJECTION UPDATED"
              );
            } catch (error) {
              console.error(error);
            }
          }}
        >
          Reject
        </Button></div>])} />
    </div>
  );
}
