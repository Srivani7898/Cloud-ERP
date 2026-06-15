import { NextResponse } from "next/server";

const data = [
  {
    id: "MY-NOT-1",
    title: "Invoice approval reminder",
    module: "Finance",
    status: "Unread",
    receivedAt: "2026-06-08T14:10:00.000Z",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "notifications",
      resource: "my-notifications",
      count: data.length,
      total: data.length,
      data,
    },
  });
}
