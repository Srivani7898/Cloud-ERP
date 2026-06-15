import { NextResponse } from "next/server";

const data = [
  { id: "TASK-1001", project: "Customer Portal Rollout", title: "Finalize access workflow", assignee: "Anika Rao", status: "In Progress", dueDate: "2026-06-18" },
  { id: "TASK-1002", project: "Warehouse Automation", title: "Validate scanner integration", assignee: "Anika Rao", status: "Todo", dueDate: "2026-06-22" },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "projects",
      resource: "my-tasks",
      count: data.length,
      total: data.length,
      data,
    },
  });
}
