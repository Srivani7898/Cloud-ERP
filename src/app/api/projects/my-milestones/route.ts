import { NextResponse } from "next/server";

const data = [
  { id: "MILE-1001", project: "Customer Portal Rollout", milestone: "Design sign-off", due: "2026-06-15", completed: false },
  { id: "MILE-1002", project: "Warehouse Automation", milestone: "Warehouse pilot", due: "2026-06-20", completed: true },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "projects",
      resource: "my-milestones",
      count: data.length,
      total: data.length,
      data,
    },
  });
}
