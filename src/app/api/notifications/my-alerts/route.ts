import { NextResponse } from "next/server";

const data = [
  {
    id: "MY-ALT-1",
    title: "Project risk escalation",
    severity: "High",
    status: "Open",
    due: "2026-06-09",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "notifications",
      resource: "my-alerts",
      count: data.length,
      total: data.length,
      data,
    },
  });
}
