"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  milestones,
  projectTasks,
  projects,
  resources,
  risks,
  timeEntries,
} from "@/services/projects-service";

import type {
  Milestone,
  Project,
  ProjectResource,
  ProjectRisk,
  ProjectTask,
  TimeEntry,
  TaskStatus,
  ProjectStatus,
} from "@/types/projects";

type ProjectsState = {
  projects: Project[];
  tasks: ProjectTask[];
  resources: ProjectResource[];
  milestones: Milestone[];
  risks: ProjectRisk[];
  timeEntries: TimeEntry[];

  addProject: (
    project: Omit<
      Project,
      "id" | "actual" | "progress" | "status"
    >
  ) => Project;

  addTask: (
    projectId: string,
    task: Omit<
      ProjectTask,
      "id" | "projectId" | "status" | "loggedHours"
    >
  ) => void;

  updateTask: (
    taskId: string,
    updates: Partial<ProjectTask>
  ) => void;

  toggleMilestone: (
    id: string
  ) => void;

  addTimeEntry: (
    entry: Omit<
      TimeEntry,
      "id" | "employee"
    >
  ) => void;
};

const calculateProjectProgress = (
  projectId: string,
  tasks: ProjectTask[],
  milestones: Milestone[]
): number => {
  const projectTasks = tasks.filter(
    (task) => task.projectId === projectId
  );

  const projectMilestones = milestones.filter(
    (milestone) =>
      milestone.projectId === projectId
  );

  const completedTasks =
    projectTasks.filter(
      (task) => task.status === "done"
    ).length;

  const completedMilestones =
    projectMilestones.filter(
      (milestone) => milestone.completed
    ).length;

  const taskProgress =
    projectTasks.length > 0
      ? (completedTasks /
          projectTasks.length) *
        70
      : 0;

  const milestoneProgress =
    projectMilestones.length > 0
      ? (completedMilestones /
          projectMilestones.length) *
        30
      : 0;

  return Math.min(
    100,
    Math.round(
      taskProgress + milestoneProgress
    )
  );
};

const calculateProjectStatus = (
  progress: number
): ProjectStatus => {
  if (progress >= 100) {
    return "completed";
  }

  if (progress > 0) {
    return "active";
  }

  return "planning";
};

export const useProjectsStore =
  create<ProjectsState>()(
    persist(
      (set) => ({
        projects,

        tasks: projectTasks,

        resources,

        milestones,

        risks,

        timeEntries,

        addProject: (project) => {
          const created: Project = {
            ...project,
            id: `proj-${Date.now()}`,
            actual: 0,
            progress: 0,
            status: "planning",
          };

          set((state) => ({
            projects: [
              created,
              ...state.projects,
            ],
          }));

          return created;
        },

        addTask: (
          projectId,
          task
        ) => {
          set((state) => {
            const newTask: ProjectTask = {
              ...task,
              id: `task-${Date.now()}`,
              projectId,
              status:
                "todo" as TaskStatus,
              loggedHours: 0,
            };

            const updatedTasks: ProjectTask[] =
              [
                newTask,
                ...state.tasks,
              ];

            const updatedProjects =
              state.projects.map(
                (project) => {
                  const progress =
                    calculateProjectProgress(
                      project.id,
                      updatedTasks,
                      state.milestones
                    );

                  return {
                    ...project,
                    progress,
                    status:
                      calculateProjectStatus(
                        progress
                      ),
                  };
                }
              );

            return {
              tasks:
                updatedTasks,
              projects:
                updatedProjects,
            };
          });
        },

        updateTask: (
          taskId,
          updates
        ) => {
          set((state) => {
            const updatedTasks: ProjectTask[] =
              state.tasks.map(
                (task) =>
                  task.id === taskId
                    ? {
                        ...task,
                        ...updates,
                      }
                    : task
              );

            const updatedProjects =
              state.projects.map(
                (project) => {
                  const progress =
                    calculateProjectProgress(
                      project.id,
                      updatedTasks,
                      state.milestones
                    );

                  return {
                    ...project,
                    progress,
                    status:
                      calculateProjectStatus(
                        progress
                      ),
                  };
                }
              );

            return {
              tasks:
                updatedTasks,
              projects:
                updatedProjects,
            };
          });
        },

        toggleMilestone: (
          id
        ) => {
          set((state) => {
            const updatedMilestones: Milestone[] =
              state.milestones.map(
                (milestone) =>
                  milestone.id === id
                    ? {
                        ...milestone,
                        completed:
                          !milestone.completed,
                      }
                    : milestone
              );

            const updatedProjects =
              state.projects.map(
                (project) => {
                  const progress =
                    calculateProjectProgress(
                      project.id,
                      state.tasks,
                      updatedMilestones
                    );

                  return {
                    ...project,
                    progress,
                    status:
                      calculateProjectStatus(
                        progress
                      ),
                  };
                }
              );

            return {
              milestones:
                updatedMilestones,
              projects:
                updatedProjects,
            };
          });
        },

        addTimeEntry: (
          entry
        ) => {
          set((state) => {
            const updatedTasks: ProjectTask[] =
              state.tasks.map(
                (task) =>
                  task.id === entry.taskId
                    ? {
                        ...task,
                        loggedHours:
                          task.loggedHours +
                          entry.hours,
                      }
                    : task
              );

            const updatedProjects =
              state.projects.map(
                (project) => {
                  const progress =
                    calculateProjectProgress(
                      project.id,
                      updatedTasks,
                      state.milestones
                    );

                  return {
                    ...project,
                    actual:
                      project.id ===
                      entry.projectId
                        ? project.actual +
                          entry.hours *
                            100
                        : project.actual,
                    progress,
                    status:
                      calculateProjectStatus(
                        progress
                      ),
                  };
                }
              );

            return {
              timeEntries: [
                {
                  ...entry,
                  id: `time-${Date.now()}`,
                  employee:
                    "Current Employee",
                },
                ...state.timeEntries,
              ],

              tasks:
                updatedTasks,

              projects:
                updatedProjects,
            };
          });
        },
      }),
      {
        name:
          "cloud-erp-projects",
      }
    )
  );