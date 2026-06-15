import { api } from "@/lib/api";
import type { Tenant } from "@/types/auth";

export async function listTenants() {
  const response = await api.get<Tenant[]>("/tenants");
  return response.data;
}

export async function getTenantPolicy(tenantId: string) {
  const response = await api.get(`/tenants/${tenantId}/policy`);
  return response.data;
}
