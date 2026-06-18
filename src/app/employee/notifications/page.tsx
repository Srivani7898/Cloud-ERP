"use client";

import { useAuthStore } from "@/store/auth-store";
import { useNotificationStore } from "@/store/notification-store";

export default function EmployeeNotificationsPage() {
  const user = useAuthStore(
    (state) => state.user
  );

  const notifications = useNotificationStore(
    (state) => state.notifications
  );

  const employeeNotifications =
    notifications.filter(
      (item) => item.employeeName === user?.name
    );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">
        Notifications
      </h2>

      {employeeNotifications.map((item) => (
        <div
          key={item.id}
          className="rounded-lg border border-white/10 p-4"
        >
          <h3 className="font-semibold">
            {item.title}
          </h3>

          <p className="text-sm text-slate-400">
            {item.message}
          </p>

          <p className="text-xs text-slate-500 mt-2">
            {item.createdAt}
          </p>
        </div>
      ))}
    </div>
  );
}