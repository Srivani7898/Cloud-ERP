import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "audit",
      resource: "gdpr",
      count: 2,
      total: 2,
      data: [
        {
          id: "GDPR-DSR-1001",
          requestType: "Data access request",
          subject: "anika.rao@northstar.example",
          status: "Completed",
          dueDate: "2026-06-12",
        },
        {
          id: "GDPR-RET-1002",
          requestType: "Retention review",
          subject: "Finance invoices",
          status: "In Review",
          dueDate: "2026-06-18",
        },
      ],
    },
  });
}
