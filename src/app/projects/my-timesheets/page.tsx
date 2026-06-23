"use client";

import { ProjectTable } from "@/components/projects/ProjectTable";
import { TimeEntryForm } from "@/components/projects/TimeEntryForm";
import { useProjectsStore } from "@/store/projects-store";

export default function MyTimesheetsPage() {
  const entries = useProjectsStore(
    (state) => state.timeEntries
  );

  const projects = useProjectsStore(
    (state) => state.projects
  );

  const tasks = useProjectsStore(
    (state) => state.tasks
  );

  return (
    <div className="space-y-6">
      <TimeEntryForm />

      <ProjectTable
        title="My Timesheets"
        description="Track employee work logs and project effort."
        headers={[
          "Project",
          "Task",
          "Employee",
          "Date",
          "Hours",
        ]}
        rows={entries.map((entry) => {
          const project = projects.find(
            (p) => p.id === entry.projectId
          );

          const task = tasks.find(
            (t) => t.id === entry.taskId
          );

          return [
            project?.name ?? entry.projectId,
            task?.title ?? entry.taskId,
            entry.employee,
            entry.date,
            `${entry.hours} hrs`,
          ];
        })}
      />
    </div>
  );
}