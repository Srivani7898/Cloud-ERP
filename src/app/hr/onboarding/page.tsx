"use client";

import { CheckCircle2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHrStore } from "@/store/hr-store";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OnboardingPage() {
  const { onboardingTasks, toggleTask, employees } = useHrStore();

  const totalTasks = onboardingTasks.length;

  const completedTasks = onboardingTasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  const progress =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

  const employeeGroups = onboardingTasks.reduce(
    (groups, task) => {
      if (!groups[task.employeeName]) {
        groups[task.employeeName] = [];
      }

      groups[task.employeeName].push(task);

      return groups;
    },
    {} as Record<string, typeof onboardingTasks>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <UserPlus className="h-5 w-5 text-blue-600 dark:text-cyan-300" />
          Employee Onboarding
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Track onboarding tasks, owners, due dates, and completion status.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-sm text-slate-400">Total Tasks</p>
          <p className="text-2xl font-bold">{totalTasks}</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-sm text-slate-400">Completed</p>
          <p className="text-2xl font-bold text-green-400">
            {completedTasks}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-sm text-slate-400">Pending</p>
          <p className="text-2xl font-bold text-amber-400">
            {pendingTasks}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-sm text-slate-400">Progress</p>
          <p className="text-2xl font-bold text-cyan-400">
            {progress}%
          </p>
        </div>
      </div>

      {/* Employee Cards */}
      <div className="space-y-4">
        {Object.entries(employeeGroups).map(
          ([employeeName, tasks]) => {

            const employeeInfo = employees.find(
              (emp) => emp.name === employeeName
            );

            const employeeProgress = Math.round(
              (tasks.filter((task) => task.completed).length /
                tasks.length) *
              100
            );

            const employeeStatus =
              employeeProgress === 0
                ? "Not Started"
                : employeeProgress === 100
                  ? "Completed"
                  : "In Progress";

            return (
              <Card
                key={employeeName}
                className="border-white/10 bg-white/[0.04]"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CardTitle>{employeeName}</CardTitle>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${employeeStatus === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : employeeStatus === "In Progress"
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-slate-500/20 text-slate-300"
                          }`}
                      >
                        {employeeStatus}
                      </span>
                    </div>

                    <span className="text-sm font-medium text-cyan-400">
                      {employeeProgress}% Complete
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-cyan-400"
                      style={{
                        width: `${employeeProgress}%`,
                      }}
                    />
                  </div>

                  {/* Employee Info */}
                  <div className="mt-3 grid grid-cols-2 gap-4 text-sm text-slate-400">
                    <div>
                      <span className="font-medium">Department:</span>{" "}
                      {employeeInfo?.department ?? "N/A"}
                    </div>

                    <div>
                      <span className="font-medium">Manager:</span>{" "}
                      {employeeInfo?.manager ?? "N/A"}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between rounded-lg border border-white/10 p-3"
                      >
                        <div>
                          <p className="font-medium">
                            {task.task}
                          </p>

                          <p className="text-sm text-slate-400">
                            Owner: {task.owner}
                          </p>

                          <p className="text-sm text-slate-400">
                            Due: {task.dueDate}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={
                              task.completed
                                ? "text-green-400"
                                : "text-amber-400"
                            }
                          >
                            {task.completed
                              ? "Completed"
                              : "Open"}
                          </span>

                          <Button
                            size="sm"
                            variant={
                              task.completed
                                ? "outline"
                                : "default"
                            }
                            onClick={() =>
                              toggleTask(task.id)
                            }
                          >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Toggle
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          }
        )}
      </div>
    </div>
  );
}