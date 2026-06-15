import { NextResponse } from "next/server";

const timeline = [
  {
    id: "TL-1001",
    projectId: "proj-1001",
    phase: "Discovery",
    event: "Stakeholder workshops completed",
    date: "2026-06-03",
    status: "Completed",
  },
  {
    id: "TL-1002",
    projectId: "proj-1001",
    phase: "Design",
    event: "Solution design review",
    date: "2026-06-15",
    status: "In Progress",
  },
  {
    id: "TL-1003",
    projectId: "proj-1002",
    phase: "Pilot",
    event: "Warehouse automation pilot",
    date: "2026-06-20",
    status: "Planned",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "projects",
      resource: "timeline",
      count: timeline.length,
      total: timeline.length,
      data: timeline,
    },
  });
}
