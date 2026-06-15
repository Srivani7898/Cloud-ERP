import type { ReactNode } from "react";
import { PasswordEyeEnhancer } from "@/components/auth/PasswordEyeEnhancer";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <PasswordEyeEnhancer />
    </>
  );
}
