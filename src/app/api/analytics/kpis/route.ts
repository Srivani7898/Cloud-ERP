import { NextResponse } from "next/server";

const kpis = [
  {
    id: "BI-KPI-1",
    metric: "ERP Revenue",
    value: 48200000,
    unit: "USD",
    trend: "+12.4%",
    status: "Healthy",
  },
  {
    id: "BI-KPI-2",
    metric: "Operating Margin",
    value: 28.6,
    unit: "%",
    trend: "+2.1%",
    status: "Healthy",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "analytics",
      resource: "kpis",
      count: kpis.length,
      total: kpis.length,
      data: kpis,
    },
  });
}
