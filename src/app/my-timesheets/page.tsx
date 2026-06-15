"use client";

import { ProjectTable } from "@/components/projects/ProjectTable";
import { TimeEntryForm } from "@/components/projects/TimeEntryForm";
import { useProjectsStore } from "@/store/projects-store";

export default function MyTimesheetsPage() {
  const entries = useProjectsStore((state) => state.timeEntries);
  return <div className="space-y-6"><TimeEntryForm /><ProjectTable title="My timesheets" description="Time entries logged to projects." headers={["Project", "Task", "Employee", "Date", "Hours"]} rows={entries.map((entry) => [entry.projectId, entry.taskId, entry.employee, entry.date, entry.hours])} /></div>;
}
