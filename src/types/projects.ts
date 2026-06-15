export type ProjectStatus = "planning" | "active" | "at_risk" | "completed";
export type TaskStatus = "todo" | "in_progress" | "review" | "done";
export type RiskLevel = "low" | "medium" | "high" | "critical";

export type Project = {
  id: string;
  name: string;
  client: string;
  methodology: "Agile" | "Waterfall" | "Hybrid";
  owner: string;
  startDate: string;
  endDate: string;
  budget: number;
  actual: number;
  progress: number;
  status: ProjectStatus;
};

export type ProjectTask = {
  id: string;
  projectId: string;
  title: string;
  assignee: string;
  status: TaskStatus;
  priority: "low" | "medium" | "high";
  dueDate: string;
  estimateHours: number;
  loggedHours: number;
};

export type ProjectResource = {
  id: string;
  projectId: string;
  name: string;
  role: string;
  allocation: number;
  costRate: number;
};

export type Milestone = {
  id: string;
  projectId: string;
  name: string;
  dueDate: string;
  completed: boolean;
};

export type ProjectRisk = {
  id: string;
  projectId: string;
  title: string;
  level: RiskLevel;
  owner: string;
  mitigation: string;
};

export type TimeEntry = {
  id: string;
  projectId: string;
  taskId: string;
  employee: string;
  date: string;
  hours: number;
};
