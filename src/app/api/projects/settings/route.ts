import { NextResponse } from "next/server";

const settings = [
  {
    id: "PRJ-SET-1",
    key: "varianceAlerts",
    label: "Enable budget variance alerts",
    enabled: true,
  },
  {
    id: "PRJ-SET-2",
    key: "timesheetApproval",
    label: "Require manager approval for timesheets",
    enabled: true,
  },
  {
    id: "PRJ-SET-3",
    key: "riskEscalation",
    label: "Auto-escalate high severity project risks",
    enabled: true,
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "projects",
      resource: "settings",
      count: settings.length,
      total: settings.length,
      data: settings,
    },
  });
}
