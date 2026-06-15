import { NextResponse } from "next/server";

const data = [
  { id: "TIME-1001", project: "Customer Portal Rollout", week: "2026-W24", hours: 38, status: "Submitted" },
  { id: "TIME-1002", project: "Warehouse Automation", week: "2026-W24", hours: 12, status: "Draft" },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "projects",
      resource: "my-timesheets",
      count: data.length,
      total: data.length,
      data,
    },
  });
}
