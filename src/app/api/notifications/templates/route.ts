import { NextResponse } from "next/server";

const data = [
  {
    id: "TPL-INV-APPROVAL",
    name: "Invoice approval reminder",
    channel: "Email",
    module: "Finance",
    status: "Published",
  },
  {
    id: "TPL-LEAVE-APPROVAL",
    name: "Leave approval alert",
    channel: "In-App",
    module: "HR",
    status: "Published",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "notifications",
      resource: "templates",
      count: data.length,
      total: data.length,
      data,
    },
  });
}
