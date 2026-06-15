import { NextResponse } from "next/server";

const dashboard = [
  {
    id: "BI-DASH-1",
    name: "Executive ERP Command Center",
    owner: "Analytics CoE",
    widgets: 12,
    refreshRate: "Real-time",
    status: "Live",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "analytics",
      resource: "dashboard",
      count: dashboard.length,
      total: dashboard.length,
      data: dashboard,
    },
  });
}
