import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "audit",
      resource: "activity",
      count: 2,
      total: 2,
      data: [
        {
          id: "ACT-1001",
          actor: "finance.manager@northstar.example",
          activity: "Approved invoice INV-10491",
          module: "Finance",
          severity: "Normal",
          timestamp: "2026-06-09T03:40:00.000Z",
        },
        {
          id: "ACT-1002",
          actor: "hr.admin@northstar.example",
          activity: "Updated employee leave policy",
          module: "HR",
          severity: "Medium",
          timestamp: "2026-06-09T03:46:00.000Z",
        },
      ],
    },
  });
}
