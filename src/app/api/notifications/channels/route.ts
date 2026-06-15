import { NextResponse } from "next/server";

const data = [
  { id: "CH-EMAIL", name: "Email", provider: "SendGrid", status: "Active", successRate: 99.2 },
  { id: "CH-SMS", name: "SMS", provider: "Twilio", status: "Active", successRate: 97.8 },
  { id: "CH-WEBHOOK", name: "Webhook", provider: "ERP Event Bus", status: "Active", successRate: 98.6 },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "notifications",
      resource: "channels",
      count: data.length,
      total: data.length,
      data,
    },
  });
}
