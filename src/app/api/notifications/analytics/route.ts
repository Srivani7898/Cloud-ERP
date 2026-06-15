import { NextResponse } from "next/server";

const data = [
  {
    id: "NOT-ANA-1",
    metric: "Delivery success rate",
    value: 98.9,
    unit: "%",
    trend: "+1.2%",
    status: "Healthy",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "notifications",
      resource: "analytics",
      count: data.length,
      total: data.length,
      data,
    },
  });
}
