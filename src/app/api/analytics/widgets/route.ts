import { NextResponse } from "next/server";

const widgets = [
  {
    id: "BI-WDG-1",
    name: "Revenue vs Forecast",
    type: "Line Chart",
    source: "Finance",
    status: "Active",
  },
  {
    id: "BI-WDG-2",
    name: "Workforce Cost",
    type: "KPI Card",
    source: "HR + Payroll",
    status: "Active",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "analytics",
      resource: "widgets",
      count: widgets.length,
      total: widgets.length,
      data: widgets,
    },
  });
}
