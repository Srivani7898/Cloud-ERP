import { NextResponse } from "next/server";

const data = [
  {
    id: "NOT-SET-1",
    key: "realTimeAlerts",
    label: "Enable real-time in-app alerts",
    enabled: true,
  },
  {
    id: "NOT-SET-2",
    key: "retryFailedDeliveries",
    label: "Retry failed channel deliveries",
    enabled: true,
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "notifications",
      resource: "settings",
      count: data.length,
      total: data.length,
      data,
    },
  });
}
