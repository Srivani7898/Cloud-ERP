"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useProjectsStore } from "@/store/projects-store";
import { timeEntrySchema } from "@/validations/projects";

type Values = z.infer<typeof timeEntrySchema>;

export function TimeEntryForm() {
  const addTimeEntry = useProjectsStore(
    (state) => state.addTimeEntry
  );

  const projects = useProjectsStore(
    (state) => state.projects
  );

  const tasks = useProjectsStore(
    (state) => state.tasks
  );

  const form = useForm<Values>({
    resolver: zodResolver(timeEntrySchema),
    defaultValues: {
      projectId: "",
      taskId: "",
      date: "",
      hours: 1,
    },
  });

  const selectedProjectId =
    form.watch("projectId");

  const projectTasks = tasks.filter(
    (task) =>
      task.projectId === selectedProjectId
  );

  const handleSubmit = (values: Values) => {
    addTimeEntry(values);

    form.reset({
      projectId: "",
      taskId: "",
      date: "",
      hours: 1,
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.06] md:grid-cols-4"
    >
      {/* Project */}
      <div className="space-y-2">
        <Label>Project</Label>

        <select
          {...form.register("projectId")}
          className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white"
        >
          <option value="">
            Select Project
          </option>

          {projects.map((project) => (
            <option
              key={project.id}
              value={project.id}
            >
              {project.id} - {project.name}
            </option>
          ))}
        </select>
      </div>

      {/* Task */}
      <div className="space-y-2">
        <Label>Task</Label>

        <select
          key={selectedProjectId}
          {...form.register("taskId")}
          disabled={!selectedProjectId}
          className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white disabled:opacity-50"
        >
          <option value="">
            {!selectedProjectId
              ? "Select Project First"
              : projectTasks.length === 0
              ? "No Tasks Available"
              : "Select Task"}
          </option>

          {projectTasks.map((task) => (
            <option
              key={task.id}
              value={task.id}
            >
              {task.id} - {task.title}
            </option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div className="space-y-2">
        <Label>Date</Label>

        <Input
          type="date"
          {...form.register("date")}
        />
      </div>

      {/* Hours */}
      <div className="space-y-2">
        <Label>Hours</Label>

        <Input
          type="number"
          min={1}
          {...form.register("hours", {
            valueAsNumber: true,
          })}
        />
      </div>

      {/* Submit Button */}
      <div className="md:col-span-4">
        <Button type="submit">
          <Clock className="mr-2 h-4 w-4" />
          Log Time
        </Button>
      </div>
    </form>
  );
}