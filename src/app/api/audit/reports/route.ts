import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "audit",
      resource: "reports",
      count: 2,
      total: 2,
      data: [
        {
          id: "AUD-REP-1",
          name: "Quarterly Compliance Evidence Pack",
          type: "SOC 2 / ISO 27001",
          period: "FY2026-Q2",
          owner: "Audit CoE",
          status: "Ready",
          format: "PDF",
        },
        {
          id: "AUD-REP-2",
          name: "GDPR Data Processing Register",
          type: "GDPR",
          period: "June 2026",
          owner: "Privacy Office",
          status: "Draft",
          format: "PDF",
        },
      ],
    },
  });
}
