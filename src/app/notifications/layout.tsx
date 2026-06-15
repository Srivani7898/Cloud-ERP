import type { ReactNode } from "react";
import { NotificationsShell } from "@/components/notifications/NotificationsShell";

export default function NotificationsLayout({ children }: { children: ReactNode }) {
  return <NotificationsShell>{children}</NotificationsShell>;
}
