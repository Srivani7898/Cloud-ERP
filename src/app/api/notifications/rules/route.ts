import { NextResponse } from "next/server";

const data = [
  {
    id: "RULE-1",
    event: "finance.invoice.approval_pending",
    channel: "Email + In-App",
    priority: "High",
    status: "Enabled",
  },
  {
    id: "RULE-2",
    event: "scm.reorder.low_stock",
    channel: "Webhook + In-App",
    priority: "Critical",
    status: "Enabled",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "notifications",
      resource: "rules",
      count: data.length,
      total: data.length,
      data,
    },
  });
}
