"use client";

import { useTaskStore } from "@/store/task-store";
import { useAuthStore } from "@/store/auth-store";

export default function EmployeeTasksPage() {
  const user = useAuthStore((state) => state.user);

  const allTasks = useTaskStore(
    (state) => state.tasks
  );
  const updateTaskStatus = useTaskStore(
    (state) => state.updateTaskStatus
  );
  console.log("Logged User:", user);
  console.log("All Tasks:", allTasks);
  console.log(
    "Filtered Tasks:",
    allTasks.filter(
      (task) => task.assignedTo === user?.name
    )
  );
  const tasks = allTasks.filter(
    (task) => task.assignedTo === user?.name
  );
  console.log(tasks);


  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">
          My Tasks
        </h2>

        <p className="text-slate-400">
          View assigned tasks and track progress.
        </p>
      </div>

      <div className="rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-3 text-left">Task ID</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Due Date</th>
              <th className="p-3 text-left">Priority</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-4 text-center"
                >
                  No tasks assigned
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-b border-white/5"
                >
                  <td className="p-3">{task.id}</td>
                  <td className="p-3">{task.title}</td>
                  <td className="p-3">{task.dueDate}</td>
                  <td className="p-3">{task.priority}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${task.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : task.status === "In Progress"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-green-500/20 text-green-400"
                        }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {task.status === "Pending" && (
                      <button
                        onClick={() => {
                          console.log("START CLICKED", task.id);

                          updateTaskStatus(
                            task.id,
                            "In Progress"
                          );
                        }}
                        className="px-3 py-1 rounded bg-yellow-500 text-black"
                      >
                        Start
                      </button>
                    )}

                    {task.status === "In Progress" && (
                      <button
                        onClick={() => {
                          console.log("COMPLETE CLICKED", task.id);

                          updateTaskStatus(
                            task.id,
                            "Completed"
                          );
                        }}
                        className="px-3 py-1 rounded bg-green-600 text-white"
                      >
                        Complete
                      </button>
                    )}

                    {task.status === "Completed" && (
                      <span className="text-green-400">
                        ✓ Done
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}