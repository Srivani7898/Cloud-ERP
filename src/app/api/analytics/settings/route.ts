import { NextResponse } from "next/server";

const settings = [
  {
    id: "BI-SET-1",
    key: "realTimeRefresh",
    label: "Enable real-time dashboard refresh",
    enabled: true,
  },
  {
    id: "BI-SET-2",
    key: "executiveExports",
    label: "Allow executive PDF and Excel exports",
    enabled: true,
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "analytics",
      resource: "settings",
      count: settings.length,
      total: settings.length,
      data: settings,
    },
  });
}
