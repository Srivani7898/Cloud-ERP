import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "audit",
      resource: "user-activity",
      count: 2,
      total: 2,
      data: [
        { id: "UA-1001", user: "Avery Stone", role: "Super Admin", sessions: 4, lastSeen: "2026-06-09T03:58:00.000Z" },
        { id: "UA-1002", user: "Anika Rao", role: "Finance Manager", sessions: 2, lastSeen: "2026-06-09T04:02:00.000Z" },
      ],
    },
  });
}
