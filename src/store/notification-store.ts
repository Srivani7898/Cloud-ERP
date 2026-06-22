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
        ) => {
          console.log(
            "NOTIFICATION STORE CALLED:",
            employeeName,
            title
          );

          set((state) => {
            const newNotification = {
              id: Date.now().toString(),
              employeeName: employeeName.trim(),
              title,
              message,
              category,
              createdAt: new Date().toLocaleString(),
              read: false,
            };

            console.log(
              "ADDING NOTIFICATION:",
              newNotification
            );

            return {
              notifications: [
                newNotification,
                ...state.notifications,
              ],
            };
          });
        },

        markAsRead: (id) =>
          set((state) => ({
            notifications:
              state.notifications.map(
                (notification) =>
                  notification.id === id
                    ? {
                        ...notification,
                        read: true,
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
      }),
      {
        name: "hr-notification-store",
        version: 2,
      }
    )
  );