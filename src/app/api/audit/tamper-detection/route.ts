import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      module: "audit",
      resource: "tamper-detection",
      count: 4,
      total: 4,
      data: [
        { id: "HASH-19320", block: 19320, segment: "Genesis block", hash: "sha256-9f2c-a81", verified: true },
        { id: "HASH-19321", block: 19321, segment: "Identity mutations", hash: "sha256-c4d7-b02", verified: true },
        { id: "HASH-19322", block: 19322, segment: "Finance journal writes", hash: "sha256-44ab-77d", verified: true },
        { id: "HASH-19323", block: 19323, segment: "Payroll access reads", hash: "sha256-e91a-8ac", verified: true },
      ],
    },
  });
}
