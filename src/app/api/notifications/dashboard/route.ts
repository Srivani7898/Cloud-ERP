import { NextResponse } from "next/server";

const data = [
  {
    id: "NOT-DASH-1",
    name: "Notification operations center",
    deliveredToday: 18420,
    failedToday: 42,
    retryQueue: 16,
    status: "Live",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "notifications",
      resource: "dashboard",
      count: data.length,
      total: data.length,
      data,
    },
  });
}
