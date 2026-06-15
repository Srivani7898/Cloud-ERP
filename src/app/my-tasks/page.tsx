"use client";

import { ProjectBadge } from "@/components/projects/ProjectBadge";
import { ProjectTable } from "@/components/projects/ProjectTable";
import { useProjectsStore } from "@/store/projects-store";

export default function MyTasksPage() {
  const tasks = useProjectsStore((state) => state.tasks);
  return <ProjectTable title="My tasks" description="Assigned project work." headers={["Task", "Assignee", "Status", "Priority", "Due", "Hours"]} rows={tasks.map((task) => [task.title, task.assignee, <ProjectBadge key="status" value={task.status} />, <ProjectBadge key="priority" value={task.priority} />, task.dueDate, `${task.loggedHours}/${task.estimateHours}`])} />;
}
