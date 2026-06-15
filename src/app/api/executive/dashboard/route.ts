import { NextResponse } from "next/server";

const dashboard = [
  {
    id: "EXE-DASH-1",
    name: "CEO Enterprise Pulse",
    revenue: 48200000,
    margin: 28.6,
    risk: "Moderate",
    status: "Live",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "executive",
      resource: "dashboard",
      count: dashboard.length,
      total: dashboard.length,
      data: dashboard,
    },
  });
}
