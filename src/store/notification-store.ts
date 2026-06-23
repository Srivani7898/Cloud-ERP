import { create } from "zustand";
import { persist } from "zustand/middleware";

export type HrNotification = {
  id: string;
  employeeName: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  category:
    | "Attendance"
    | "Leave"
    | "Task"
    | "Invoice"
    | "Payroll";
};

type HrNotificationState = {
  notifications: HrNotification[];

  addNotification: (
    employeeName: string,
    title: string,
    message: string,
    category:
      | "Attendance"
      | "Leave"
      | "Task"
      | "Invoice"
      | "Payroll"
  ) => void;

  markAsRead: (id: string) => void;

  markAllAsRead: () => void;

  deleteNotification: (id: string) => void;

  clearNotifications: () => void;
};

export const useHrNotificationStore =
  create<HrNotificationState>()(
    persist(
      (set) => ({
        notifications: [],

        addNotification: (
          employeeName,
          title,
          message,
          category
        ) =>
          set((state) => {
            const newNotification: HrNotification =
              {
                id: `NOT-${Date.now()}`,
                employeeName:
                  employeeName.trim(),
                title,
                message,
                category,
                createdAt:
                  new Date().toLocaleString(
                    "en-IN",
                    {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }
                  ),
                read: false,
              };

            return {
              notifications: [
                newNotification,
                ...state.notifications,
              ],
            };
          }),

        markAsRead: (id) =>
          set((state) => ({
            notifications:
              state.notifications.map(
                (notification) =>
                  notification.id === id
                    ? {
                        ...notification,
                        read:
                          !notification.read,
                      }
                    : notification
              ),
          })),

        markAllAsRead: () =>
          set((state) => ({
            notifications:
              state.notifications.map(
                (notification) => ({
                  ...notification,
                  read: true,
                })
              ),
          })),

        deleteNotification: (id) =>
          set((state) => ({
            notifications:
              state.notifications.filter(
                (notification) =>
                  notification.id !== id
              ),
          })),

        clearNotifications: () =>
          set({
            notifications: [],
          }),
      }),
      {
        name: "hr-notification-store",
        version: 3,
      }
    )
  );

/* ------------------------------
   Dashboard Helper Selectors
-------------------------------- */

export const getNotificationStats = (
  notifications: HrNotification[]
) => {
  const total = notifications.length;

  const unread =
    notifications.filter(
      (item) => !item.read
    ).length;

  const read =
    notifications.filter(
      (item) => item.read
    ).length;

  const attendance =
    notifications.filter(
      (item) =>
        item.category ===
        "Attendance"
    ).length;

  const leave =
    notifications.filter(
      (item) =>
        item.category === "Leave"
    ).length;

  const payroll =
    notifications.filter(
      (item) =>
        item.category ===
        "Payroll"
    ).length;

  return {
    total,
    unread,
    read,
    attendance,
    leave,
    payroll,
  };
};