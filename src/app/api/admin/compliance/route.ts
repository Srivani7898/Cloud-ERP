import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "admin",
      resource: "compliance",
      count: 2,
      total: 2,
      data: [
        { id: "ADM-CMP-1", tenant: "Northstar Manufacturing", framework: "SOC 2", score: 97, status: "Compliant" },
        { id: "ADM-CMP-2", tenant: "Northstar Manufacturing", framework: "GDPR", score: 94, status: "Compliant" },
      ],
    },
  });
}
