import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "admin",
      resource: "security-events",
      count: 2,
      total: 2,
      data: [
        { id: "SEC-1001", event: "MFA challenge completed", severity: "Normal", status: "Resolved" },
        { id: "SEC-1002", event: "Privileged role assignment", severity: "High", status: "Reviewed" },
      ],
    },
  });
}
