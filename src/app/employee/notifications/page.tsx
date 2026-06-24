"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, CheckCircle, Trash2 } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useHrNotificationStore } from "@/store/notification-store";

export default function EmployeeNotificationsPage() {
  const user = useAuthStore((state) => state.user);

  const notifications = useHrNotificationStore(
    (state) => state.notifications
  );

  console.log("Logged User:", user?.name);

  console.log(
    "Notification Employee Names:",
    notifications.map(
      (item) => item.employeeName
    )
  );

  console.log(
    "All Notifications:",
    notifications
  );

  const markAsRead = useHrNotificationStore(
    (state) => state.markAsRead
  );

  const markAllAsRead = useHrNotificationStore(
    (state) => state.markAllAsRead
  );

  const deleteNotification = useHrNotificationStore(
    (state) => state.deleteNotification
  );

  const [filter, setFilter] = useState<
    "all" | "read" | "unread"
  >("all");

  console.log("Logged User:", user?.name);

  console.log(
    "Notification Employee Names:",
    notifications.map(
      (item) => item.employeeName
    )
  );

  console.log(
    "Notifications Length:",
    notifications.length
  );

  // TEMPORARY TEST
  // Show all notifications without filtering
  const loggedUser = user?.name?.trim().toLowerCase();
  console.log(
    "LOGGED USER EXACT:",
    JSON.stringify(loggedUser)
  );

  notifications.forEach((item) => {
    console.log(
      "NOTIFICATION USER:",
      JSON.stringify(
        item.employeeName?.trim().toLowerCase()
      )
    );
  });

  const employeeNotifications =
    notifications.filter(
      (notification) =>
        notification.employeeName
          ?.trim()
          .toLowerCase()
          .includes(loggedUser || "")
    );

  console.log(
    "Filtered Notifications:",
    employeeNotifications
  );

  console.log(
    "Logged User:",
    loggedUser
  );

  console.log(
    "Employee Notifications:",
    employeeNotifications
  );

  employeeNotifications.forEach((item) => {
    console.log(
      "TITLE:",
      item.title,
      "CATEGORY:",
      item.category
    );
  });

  const visibleNotifications =
    employeeNotifications.filter(
      (item) => {
        if (filter === "read")
          return item.read;

        if (filter === "unread")
          return !item.read;

        return true;
      }
    );

  const unreadCount =
    employeeNotifications.filter(
      (item) => !item.read
    ).length;

  const getNotificationLink = (
    item: {
      title: string;
      category?: string;
    }
  ) => {

    switch (item.category) {

      case "Invoice":
        return "/employee/invoices";

      case "Payroll":
        return "/employee/payslips";

      case "Attendance":
        return "/employee/attendance";

      case "Leave":
        return "/employee/leave";

      case "Task":
        return "/employee/tasks";

      default:
        return "/employee/notifications";
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-3 text-3xl font-bold">
            <Bell className="h-7 w-7 text-cyan-400" />
            Notifications
          </h2>

          <p className="mt-2 text-slate-400">
            Review employee updates, approvals,
            payroll alerts and assigned work.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold text-white">
            {unreadCount} Unread
          </div>

          <button
            onClick={markAllAsRead}
            className="rounded-lg bg-cyan-600 px-4 py-2 text-white transition hover:bg-cyan-500"
          >
            Mark All Read
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-lg px-4 py-2 transition ${filter === "all"
            ? "bg-cyan-600 text-white"
            : "bg-slate-800 text-slate-300"
            }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("unread")}
          className={`rounded-lg px-4 py-2 transition ${filter === "unread"
            ? "bg-cyan-600 text-white"
            : "bg-slate-800 text-slate-300"
            }`}
        >
          Unread
        </button>

        <button
          onClick={() => setFilter("read")}
          className={`rounded-lg px-4 py-2 transition ${filter === "read"
            ? "bg-cyan-600 text-white"
            : "bg-slate-800 text-slate-300"
            }`}
        >
          Read
        </button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-3">

        <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
          <p className="text-sm text-slate-400">
            Total Notifications
          </p>

          <p className="text-3xl font-bold text-cyan-400">
            {employeeNotifications.length}
          </p>
        </div>

        <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
          <p className="text-sm text-slate-400">
            Read
          </p>

          <p className="text-3xl font-bold text-green-400">
            {
              employeeNotifications.filter(
                (n) => n.read
              ).length
            }
          </p>
        </div>

        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <p className="text-sm text-slate-400">
            Unread
          </p>

          <p className="text-3xl font-bold text-red-400">
            {unreadCount}
          </p>
        </div>

      </div>

      {/* Notification List */}
      {visibleNotifications.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 p-8 text-center">
          <Bell className="mx-auto mb-3 h-10 w-10 text-slate-500" />

          <p className="text-slate-400">
            No notifications found.
          </p>

          <p className="mt-2 text-sm text-slate-500">
            You are all caught up.
          </p>
        </div>
      ) : (
        visibleNotifications.map((item) => {
          const isRead = item.read;

          return (
            <div
              key={item.id}
              className={`rounded-xl border p-4 transition ${isRead
                ? "border-slate-700 bg-slate-900/40 opacity-75"
                : "border-cyan-500/30 bg-cyan-500/5"
                }`}
            >
              <div className="flex items-start justify-between">

                <div className="flex-1">
                  <h3 className="font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 whitespace-pre-line text-sm text-slate-300">
                    {item.message}
                  </p>

                  <p className="mt-3 text-xs text-slate-500">
                    {item.createdAt}
                  </p>
                </div>

                <div className="ml-4 flex flex-wrap gap-2">
                  <Link
                    href={getNotificationLink(item)}
                    onClick={() => markAsRead(item.id)}
                    className="rounded-lg bg-cyan-600 px-3 py-2 text-sm text-white transition hover:bg-cyan-500"
                  >
                    Open
                  </Link>

                  {!isRead && (
                    <button
                      onClick={() => markAsRead(item.id)}
                      className="rounded-lg bg-green-600 p-2 text-white transition hover:bg-green-500"
                      title="Mark as Read"
                    >
                      <CheckCircle size={16} />
                    </button>
                  )}

                  <button
                    onClick={() =>
                      deleteNotification(item.id)
                    }
                    className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-500"
                    title="Delete Notification"
                  >
                    <Trash2 size={16} />
                  </button>

                </div>

              </div>
            </div>
          );
        })
      )}
    </div>
  );
}