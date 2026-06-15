import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "audit",
      resource: "dashboard",
      count: 1,
      total: 1,
      data: [
        {
          id: "AUD-DASH-1",
          name: "Enterprise security evidence center",
          complianceScore: 96,
          verifiedEvents: 19324,
          highRisks: 3,
          tamperStatus: "Verified",
          status: "Live",
        },
      ],
    },
  });
}
