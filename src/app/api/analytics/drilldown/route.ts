import { NextResponse } from "next/server";

const drilldown = [
  {
    id: "BI-DRL-1",
    path: "Finance > Revenue > APAC",
    dimension: "Region",
    variance: 8.4,
    status: "Explorable",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "analytics",
      resource: "drilldown",
      count: drilldown.length,
      total: drilldown.length,
      data: drilldown,
    },
  });
}
