import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "admin",
      resource: "audit-reports",
      count: 1,
      total: 1,
      data: [
        {
          id: "ADM-AUD-RPT-1",
          name: "Enterprise Audit Board Pack",
          period: "FY2026-Q2",
          format: "PDF",
          status: "Ready",
        },
      ],
    },
  });
}
