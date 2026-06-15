import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "audit",
      resource: "compliance",
      count: 3,
      total: 3,
      data: [
        { id: "CMP-SOC2", framework: "SOC 2", score: 97, status: "Compliant", owner: "Security CoE" },
        { id: "CMP-GDPR", framework: "GDPR", score: 94, status: "Compliant", owner: "Privacy Office" },
        { id: "CMP-ISO", framework: "ISO 27001", score: 96, status: "Compliant", owner: "Risk Office" },
      ],
    },
  });
}
