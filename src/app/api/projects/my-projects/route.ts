import { NextResponse } from "next/server";

const data = [
  { id: "MY-PROJ-1001", name: "Customer Portal Rollout", role: "Project Manager", progress: 68, status: "In progress" },
  { id: "MY-PROJ-1002", name: "Warehouse Automation", role: "Contributor", progress: 52, status: "On track" },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "projects",
      resource: "my-projects",
      count: data.length,
      total: data.length,
      data,
    },
  });
}
