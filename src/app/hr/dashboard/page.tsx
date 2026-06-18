"use client";

import { LiveModuleDashboard } from "@/components/shared/LiveModuleDashboard";
import { useTaskStore } from "@/store/task-store";

export default function HRDashboardPage() {
  const tasks = useTaskStore((state) => state.tasks);

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  return (
  <div className="space-y-6">

    {/* Task Stats */}

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

      <div className="rounded-xl border border-white/10 p-5">
        <p className="text-sm text-slate-400">
          Total Tasks
        </p>

        <h3 className="text-3xl font-bold">
          {tasks.length}
        </h3>
      </div>

      <div className="rounded-xl border border-yellow-500/20 p-5">
        <p className="text-sm text-yellow-400">
          Pending
        </p>

        <h3 className="text-3xl font-bold">
          {pendingTasks}
        </h3>
      </div>

      <div className="rounded-xl border border-blue-500/20 p-5">
        <p className="text-sm text-blue-400">
          In Progress
        </p>

        <h3 className="text-3xl font-bold">
          {inProgressTasks}
        </h3>
      </div>

      <div className="rounded-xl border border-green-500/20 p-5">
        <p className="text-sm text-green-400">
          Completed
        </p>

        <h3 className="text-3xl font-bold">
          {completedTasks}
        </h3>
      </div>

    </div>

    <LiveModuleDashboard
      eyebrow="Human Resources"
      title="Enterprise people operations center"
      description="Live workforce, attendance, leave, onboarding, and department summaries from HR backend APIs."
      moduleKey="hr"
      resources={[
        {
          resource: "employees",
          label: "Employees",
          description:
            "Employee directory, status, location, and department data.",
        },
        {
          resource: "attendance",
          label: "Attendance",
          description:
            "Daily and monthly attendance records for workforce visibility.",
        },
        {
          resource: "leave",
          label: "Leave",
          description:
            "Leave applications, approvals, and availability impact.",
        },
        {
          resource: "departments",
          label: "Departments",
          description:
            "Organizational department coverage and ownership.",
        },
      ]}
    />

  </div>
);
}
