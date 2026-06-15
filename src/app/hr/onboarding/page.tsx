"use client";

import { CheckCircle2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HrTable } from "@/components/hr/HrTable";
import { useHrStore } from "@/store/hr-store";

export default function OnboardingPage() {
  const { onboardingTasks, toggleTask } = useHrStore();
  return (
    <div className="space-y-6">
      <div><h2 className="flex items-center gap-2 text-2xl font-semibold"><UserPlus className="h-5 w-5 text-blue-600 dark:text-cyan-300" />Employee onboarding</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Track onboarding tasks, owners, due dates, and completion status.</p></div>
      <HrTable title="Onboarding tasks" description="New-hire readiness checklist." headers={["Employee", "Task", "Owner", "Due Date", "Status", "Action"]} rows={onboardingTasks.map((task) => [task.employeeName, task.task, task.owner, task.dueDate, task.completed ? "Completed" : "Open", <Button key="action" size="sm" variant={task.completed ? "outline" : "default"} onClick={() => toggleTask(task.id)}><CheckCircle2 className="h-4 w-4" />Toggle</Button>])} />
    </div>
  );
}
