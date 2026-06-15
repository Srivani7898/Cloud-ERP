import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "audit",
      resource: "risk-monitoring",
      count: 2,
      total: 2,
      data: [
        { id: "RISK-1001", risk: "Privileged access drift", severity: "High", status: "Open", owner: "IAM Team" },
        { id: "RISK-1002", risk: "Unreviewed data export", severity: "Medium", status: "Mitigating", owner: "Security CoE" },
      ],
    },
  });
}
