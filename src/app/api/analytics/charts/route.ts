import { NextResponse } from "next/server";

const charts = [
  {
    id: "BI-CHT-1",
    name: "Cross-module performance trend",
    chartType: "Area",
    dataPoints: 12,
    status: "Ready",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "analytics",
      resource: "charts",
      count: charts.length,
      total: charts.length,
      data: charts,
    },
  });
}
