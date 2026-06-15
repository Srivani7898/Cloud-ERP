import { NextResponse } from "next/server";

const data = [
  {
    id: "RETRY-1",
    notification: "Payroll approval SMS",
    channel: "SMS",
    attempts: 2,
    nextRetry: "2026-06-08T14:45:00.000Z",
    status: "Queued",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "notifications",
      resource: "retry-queue",
      count: data.length,
      total: data.length,
      data,
    },
  });
}
