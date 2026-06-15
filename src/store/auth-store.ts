"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthSession, AuthUser, Tenant } from "@/types/auth";

function setSessionCookie(active: boolean) {
  if (typeof document === "undefined") return;

  document.cookie = active
    ? "cloud-erp-auth=1; path=/; max-age=86400; SameSite=Lax"
    : "cloud-erp-auth=; path=/; max-age=0; SameSite=Lax";
}

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  activeTenant: Tenant | null;
  expiresAt: number | null;
  postLoginRedirect: string | null;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  setSession: (session: AuthSession) => void;
  setPostLoginRedirect: (redirectTo: string | null) => void;
  setActiveTenant: (tenant: Tenant) => void;
  updateUser: (user: Partial<AuthUser>) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      activeTenant: null,
      expiresAt: null,
      postLoginRedirect: null,
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
      setPostLoginRedirect: (redirectTo) => set({ postLoginRedirect: redirectTo }),
      setSession: (session) =>
        {
          setSessionCookie(true);
          set({
            user: session.user,
            accessToken: session.accessToken,
            refreshToken: session.refreshToken,
            activeTenant: session.user.tenant,
            expiresAt: session.expiresAt
          });
        },
      setActiveTenant: (tenant) => set({ activeTenant: tenant }),
      updateUser: (user) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...user } : null
        })),
      logout: () => {
        setSessionCookie(false);
        set({ user: null, accessToken: null, refreshToken: null, activeTenant: null, expiresAt: null, postLoginRedirect: null });
      }
    }),
    {
      name: "cloud-erp-auth",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        activeTenant: state.activeTenant,
        expiresAt: state.expiresAt,
        postLoginRedirect: state.postLoginRedirect
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )
);
