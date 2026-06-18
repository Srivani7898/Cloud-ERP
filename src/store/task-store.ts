import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Task = {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "In Progress" | "Completed";
};

type TaskState = {
  tasks: Task[];

  addTask: (
    task: Omit<Task, "id" | "status">
  ) => void;

  updateTaskStatus: (
    id: string,
    status: Task["status"]
  ) => void;
};

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [
        {
          id: "TSK-001",
          title: "Update Employee Profile",
          description: "Verify personal information.",
          assignedTo: "Anika Rao",
          dueDate: "2026-06-25",
          priority: "High",
          status: "Pending",
        },
      ],

      addTask: (task) =>
        set((state) => ({
          tasks: [
            {
              ...task,
              id: `TSK-${Date.now()}`,
              status: "Pending",
            },
            ...state.tasks,
          ],
        })),

      updateTaskStatus: (id, status) => {
        console.log(
          "UPDATE TASK STATUS:",
          id,
          status
        );

        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, status }
              : task
          ),
        }));
      },
    }),
    {
      name: "task-store",
    }
  )
);