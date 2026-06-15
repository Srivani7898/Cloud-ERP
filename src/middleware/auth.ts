import type { NextRequest } from "next/server";

export function getTenantFromRequest(request: NextRequest) {
  return request.headers.get("x-tenant-id") ?? request.cookies.get("tenant-id")?.value ?? null;
}
