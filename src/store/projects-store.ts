"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { milestones, projectTasks, projects, resources, risks, timeEntries } from "@/services/projects-service";
import type { Milestone, Project, ProjectResource, ProjectRisk, ProjectTask, TimeEntry } from "@/types/projects";

type ProjectsState = {
  projects: Project[];
  tasks: ProjectTask[];
  resources: ProjectResource[];
  milestones: Milestone[];
  risks: ProjectRisk[];
  timeEntries: TimeEntry[];
  addProject: (project: Omit<Project, "id" | "actual" | "progress" | "status">) => Project;
  addTask: (projectId: string, task: Omit<ProjectTask, "id" | "projectId" | "status" | "loggedHours">) => void;
  updateTaskStatus: (taskId: string, status: ProjectTask["status"]) => void;
  toggleMilestone: (id: string) => void;
  addTimeEntry: (entry: Omit<TimeEntry, "id" | "employee">) => void;
};

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (set) => ({
      projects,
      tasks: projectTasks,
      resources,
      milestones,
      risks,
      timeEntries,
      addProject: (project) => {
        const created: Project = { ...project, id: `proj-${Date.now()}`, actual: 0, progress: 0, status: "planning" };
        set((state) => ({ projects: [created, ...state.projects] }));
        return created;
      },
      addTask: (projectId, task) =>
        set((state) => ({
          tasks: [{ ...task, id: `task-${Date.now()}`, projectId, status: "todo", loggedHours: 0 }, ...state.tasks]
        })),
      updateTaskStatus: (taskId, status) =>
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === taskId ? { ...task, status } : task))
        })),
      toggleMilestone: (id) =>
        set((state) => ({
          milestones: state.milestones.map((milestone) => (milestone.id === id ? { ...milestone, completed: !milestone.completed } : milestone))
        })),
      addTimeEntry: (entry) =>
        set((state) => ({
          timeEntries: [{ ...entry, id: `time-${Date.now()}`, employee: "Current Employee" }, ...state.timeEntries],
          tasks: state.tasks.map((task) => task.id === entry.taskId ? { ...task, loggedHours: task.loggedHours + entry.hours } : task)
        }))
    }),
    { name: "cloud-erp-projects" }
  )
);
