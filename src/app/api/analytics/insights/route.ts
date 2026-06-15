import { NextResponse } from "next/server";

const insights = [
  {
    id: "BI-INS-1",
    title: "Margin anomaly detected",
    impact: "High",
    recommendation: "Review APAC discounting and freight cost variance.",
    confidence: 92,
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "analytics",
      resource: "insights",
      count: insights.length,
      total: insights.length,
      data: insights,
    },
  });
}
