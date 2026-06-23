"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProjectBadge } from "@/components/projects/ProjectBadge";
import { ProjectTable } from "@/components/projects/ProjectTable";
import { useProjectsStore } from "@/store/projects-store";

export default function MyTasksPage() {
  const tasks = useProjectsStore((state) => state.tasks);

  return (
    <ProjectTable
      title="My Tasks"
      description="Assigned project work."
      headers={[
        "Task",
        "Assignee",
        "Status",
        "Priority",
        "Due Date",
        "Hours",
        "Actions",
      ]}
      rows={tasks.map((task) => [
        task.title,
        task.assignee,
        <ProjectBadge key={`status-${task.id}`} value={task.status} />,
        <ProjectBadge key={`priority-${task.id}`} value={task.priority} />,
        task.dueDate,
        `${task.loggedHours}/${task.estimateHours}`,

        <Link
          key={`action-${task.id}`}
          href={`/projects/my-tasks/${task.id}`}
        >
          <Button size="sm">
            Update
          </Button>
        </Link>,
      ])}
    />
  );
}