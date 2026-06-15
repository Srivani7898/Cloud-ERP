import type { ReactNode } from "react";
import { UserNotificationsShell } from "@/components/notifications/NotificationsShell";

export default function MyNotificationsGroupLayout({ children }: { children: ReactNode }) {
  return <UserNotificationsShell>{children}</UserNotificationsShell>;
}
