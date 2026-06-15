import { NextResponse } from "next/server";

const data = [
  {
    id: "HIST-1",
    notification: "Invoice approval reminder",
    channel: "Email",
    recipient: "finance.manager@northstar.example",
    status: "Delivered",
    sentAt: "2026-06-08T14:05:00.000Z",
  },
  {
    id: "HIST-2",
    notification: "Low stock alert",
    channel: "Webhook",
    recipient: "scm-ops-webhook",
    status: "Delivered",
    sentAt: "2026-06-08T14:08:00.000Z",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "notifications",
      resource: "history",
      count: data.length,
      total: data.length,
      data,
    },
  });
}
