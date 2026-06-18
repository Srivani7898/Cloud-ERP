import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Notification = {
  id: string;
  title: string;
  message: string;
  employeeName: string;
  createdAt: string;
  read: boolean;
};

type NotificationState = {
  notifications: Notification[];

  addNotification: (
    notification: Omit<
      Notification,
      "id" | "createdAt" | "read"
    >
  ) => void;

  markAsRead: (id: string) => void;
};

export const useNotificationStore =
  create<NotificationState>()(
    persist(
      (set) => ({
        notifications: [],

        addNotification: (
          notification
        ) =>
          set((state) => ({
            notifications: [
              {
                ...notification,
                id: `NTF-${Date.now()}`,
                createdAt:
                  new Date().toLocaleString(),
                read: false,
              },
              ...state.notifications,
            ],
          })),

        markAsRead: (id) =>
          set((state) => ({
            notifications:
              state.notifications.map(
                (item) =>
                  item.id === id
                    ? {
                        ...item,
                        read: true,
                      }
                    : item
              ),
          })),
      }),
      {
        name: "notification-store",
      }
    )
  );