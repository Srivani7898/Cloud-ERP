import { api } from "@/lib/api";
import type { AuthUser } from "@/types/auth";

export async function getProfile() {
  const response = await api.get<AuthUser>("/me");
  return response.data;
}

export async function updateProfile(input: Partial<AuthUser>) {
  const response = await api.patch<AuthUser>("/me", input);
  return response.data;
}
