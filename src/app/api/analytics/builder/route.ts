import { NextResponse } from "next/server";

const builder = [
  {
    id: "BI-BLD-1",
    name: "Finance Executive View",
    layout: "12-column grid",
    widgets: 8,
    status: "Draft",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "analytics",
      resource: "builder",
      count: builder.length,
      total: builder.length,
      data: builder,
    },
  });
}
