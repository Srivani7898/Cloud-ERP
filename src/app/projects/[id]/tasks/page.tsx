"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProjectBadge } from "@/components/projects/ProjectBadge";
import { ProjectTable } from "@/components/projects/ProjectTable";
import { TaskForm } from "@/components/projects/TaskForm";
import { useProjectsStore } from "@/store/projects-store";
import type { TaskStatus } from "@/types/projects";

export default function ProjectTasksPage() {
  const { id } = useParams<{ id: string }>();
  const { tasks, updateTaskStatus } = useProjectsStore();
  const projectTasks = tasks.filter((task) => task.projectId === id);
  const nextStatus: Record<TaskStatus, TaskStatus> = { todo: "in_progress", in_progress: "review", review: "done", done: "done" };
  return <div className="space-y-6"><TaskForm projectId={id} /><ProjectTable title="Tasks" description="Project task management and assignments." headers={["Task", "Assignee", "Status", "Priority", "Due", "Hours", "Action"]} rows={projectTasks.map((task) => [task.title, task.assignee, <ProjectBadge key="status" value={task.status} />, <ProjectBadge key="priority" value={task.priority} />, task.dueDate, `${task.loggedHours}/${task.estimateHours}`, <Button key="action" size="sm" disabled={task.status === "done"} onClick={() => updateTaskStatus(task.id, nextStatus[task.status])}>Move next</Button>])} /></div>;
}
