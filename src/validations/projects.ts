import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(3),
  client: z.string().min(2),
  methodology: z.enum(["Agile", "Waterfall", "Hybrid"]),
  owner: z.string().min(2),
  startDate: z.string().min(8),
  endDate: z.string().min(8),
  budget: z.coerce.number().positive()
});

export const taskSchema = z.object({
  title: z.string().min(3),
  assignee: z.string().min(2),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string().min(8),
  estimateHours: z.coerce.number().positive()
});

export const timeEntrySchema = z.object({
  projectId: z.string().min(2),
  taskId: z.string().min(2),
  date: z.string().min(8),
  hours: z.coerce.number().positive()
});
