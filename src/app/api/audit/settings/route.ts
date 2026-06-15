import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "audit",
      resource: "settings",
      count: 3,
      total: 3,
      data: [
        { id: "AUD-SET-1", key: "immutableLogs", label: "Enable immutable audit log storage", enabled: true },
        { id: "AUD-SET-2", key: "hashChainVerification", label: "Verify hash chain every 15 minutes", enabled: true },
        { id: "AUD-SET-3", key: "gdprRetentionAlerts", label: "Notify privacy office on retention breach", enabled: true },
      ],
    },
  });
}
