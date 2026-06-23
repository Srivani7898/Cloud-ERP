import type { Milestone, Project, ProjectResource, ProjectRisk, ProjectTask, TimeEntry } from "@/types/projects";

export const projects: Project[] = [
  {
    id: "proj-1001",
    name: "ERP Finance Modernization",
    client: "Northstar Manufacturing",
    methodology: "Agile",
    owner: "Avery Stone",
    startDate: "2026-04-01",
    endDate: "2026-09-30",
    budget: 1250000,
    actual: 684000,
    progress: 35,
    status: "active",
  },

  {
    id: "proj-1002",
    name: "Global Inventory Rollout",
    client: "Northstar Manufacturing",
    methodology: "Hybrid",
    owner: "Maya Chen",
    startDate: "2026-03-15",
    endDate: "2026-08-15",
    budget: 980000,
    actual: 812000,
    progress: 30,
    status: "at_risk",
  },

  {
    id: "proj-1003",
    name: "AI Forecasting Pilot",
    client: "Northstar Manufacturing",
    methodology: "Agile",
    owner: "Ravi Kumar",
    startDate: "2026-05-01",
    endDate: "2026-07-31",
    budget: 420000,
    actual: 188000,
    progress: 0,
    status: "planning",
  },
];

export const projectTasks: ProjectTask[] = [
  { id: "task-1", projectId: "proj-1001", title: "Map finance approval workflow", assignee: "Anika Rao", status: "done", priority: "high", dueDate: "2026-06-05", estimateHours: 24, loggedHours: 22 },
  { id: "task-2", projectId: "proj-1001", title: "Build AP automation backlog", assignee: "Ethan Clarke", status: "in_progress", priority: "medium", dueDate: "2026-06-12", estimateHours: 32, loggedHours: 14 },
  { id: "task-3", projectId: "proj-1002", title: "Warehouse cutover plan", assignee: "Maya Chen", status: "review", priority: "high", dueDate: "2026-06-10", estimateHours: 40, loggedHours: 36 },
  { id: "task-4", projectId: "proj-1003", title: "Forecast model validation", assignee: "Ravi Kumar", status: "todo", priority: "high", dueDate: "2026-06-18", estimateHours: 28, loggedHours: 0 }
];

export const resources: ProjectResource[] = [
  { id: "res-1", projectId: "proj-1001", name: "Anika Rao", role: "HR SME", allocation: 45, costRate: 82 },
  { id: "res-2", projectId: "proj-1001", name: "Ethan Clarke", role: "Finance Lead", allocation: 70, costRate: 110 },
  { id: "res-3", projectId: "proj-1002", name: "Maya Chen", role: "Solution Architect", allocation: 85, costRate: 130 },
  { id: "res-4", projectId: "proj-1003", name: "Ravi Kumar", role: "AI Analyst", allocation: 60, costRate: 95 }
];

export const milestones: Milestone[] = [
  { id: "ms-1", projectId: "proj-1001", name: "Design sign-off", dueDate: "2026-06-15", completed: false },
  { id: "ms-2", projectId: "proj-1001", name: "UAT complete", dueDate: "2026-08-30", completed: false },
  { id: "ms-3", projectId: "proj-1002", name: "Warehouse pilot", dueDate: "2026-06-20", completed: true },
  { id: "ms-4", projectId: "proj-1003", name: "Model baseline", dueDate: "2026-06-25", completed: false }
];

export const risks: ProjectRisk[] = [
  { id: "risk-1", projectId: "proj-1002", title: "Warehouse data migration delay", level: "critical", owner: "Maya Chen", mitigation: "Add weekend conversion window and fallback extract." },
  { id: "risk-2", projectId: "proj-1001", title: "Finance approval scope creep", level: "medium", owner: "Ethan Clarke", mitigation: "Freeze backlog after sprint planning." }
];

export const timeEntries: TimeEntry[] = [
  { id: "time-1", projectId: "proj-1001", taskId: "task-1", employee: "Anika Rao", date: "2026-06-01", hours: 6 },
  { id: "time-2", projectId: "proj-1001", taskId: "task-2", employee: "Ethan Clarke", date: "2026-06-01", hours: 7 },
  { id: "time-3", projectId: "proj-1003", taskId: "task-4", employee: "Ravi Kumar", date: "2026-06-01", hours: 4 }
];
