import { NextResponse } from "next/server";

const exports = [
  {
    id: "BI-EXP-1",
    report: "Executive ERP Performance",
    format: "PDF",
    status: "Generated",
    generatedAt: "2026-06-08T10:00:00.000Z",
  },
  {
    id: "BI-EXP-2",
    report: "Cross Module Variance",
    format: "Excel",
    status: "Generated",
    generatedAt: "2026-06-08T10:02:00.000Z",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "analytics",
      resource: "export",
      count: exports.length,
      total: exports.length,
      data: exports,
    },
  });
}
