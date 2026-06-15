import { NextResponse } from "next/server";

const data = [
  {
    id: "MY-PREF-1",
    user: "Anika Rao",
    email: true,
    sms: false,
    inApp: true,
    webhook: false,
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "notifications",
      resource: "my-preferences",
      count: data.length,
      total: data.length,
      data,
    },
  });
}
