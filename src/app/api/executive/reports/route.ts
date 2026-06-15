import { NextResponse } from "next/server";

const reports = [
  {
    id: "EXE-RPT-1",
    name: "Board Performance Pack",
    period: "June 2026",
    format: "PDF",
    status: "Ready",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "executive",
      resource: "reports",
      count: reports.length,
      total: reports.length,
      data: reports,
    },
  });
}
