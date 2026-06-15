import { NextResponse } from "next/server";

const data = [
  {
    id: "WH-ERP-1",
    name: "ERP event webhook",
    endpoint: "https://events.infinitycloud.example/erp",
    status: "Healthy",
    lastDelivery: "2026-06-08T14:20:00.000Z",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "notifications",
      resource: "webhooks",
      count: data.length,
      total: data.length,
      data,
    },
  });
}
