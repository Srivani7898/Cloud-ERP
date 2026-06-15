import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "audit",
      resource: "data-access",
      count: 2,
      total: 2,
      data: [
        {
          id: "DA-1001",
          user: "finance.manager@northstar.example",
          dataset: "Finance Ledger",
          accessType: "Read",
          decision: "Allowed",
          timestamp: "2026-06-09T03:51:00.000Z",
        },
        {
          id: "DA-1002",
          user: "hr.admin@northstar.example",
          dataset: "Employee Compensation",
          accessType: "Export",
          decision: "Allowed",
          timestamp: "2026-06-09T03:55:00.000Z",
        },
      ],
    },
  });
}
