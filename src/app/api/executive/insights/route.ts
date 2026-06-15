import { NextResponse } from "next/server";

const insights = [
  {
    id: "EXE-INS-1",
    title: "Forecasted revenue acceleration",
    summary: "AI models project 9.8% revenue lift from inventory and pricing optimization.",
    confidence: 89,
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "executive",
      resource: "insights",
      count: insights.length,
      total: insights.length,
      data: insights,
    },
  });
}
