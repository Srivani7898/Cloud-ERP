"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProjectsStore } from "@/store/projects-store";
import { taskSchema } from "@/validations/projects";

type Values = z.infer<typeof taskSchema>;

export function TaskForm({ projectId }: { projectId: string }) {
  const addTask = useProjectsStore((state) => state.addTask);
  const form = useForm<Values>({ resolver: zodResolver(taskSchema), defaultValues: { title: "", assignee: "", priority: "medium", dueDate: "", estimateHours: 8 } });
  return <form className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.06] md:grid-cols-5" onSubmit={form.handleSubmit((values) => { addTask(projectId, values); form.reset(); })}><div className="space-y-2 md:col-span-2"><Label>Task</Label><Input {...form.register("title")} /></div><div className="space-y-2"><Label>Assignee</Label><Input {...form.register("assignee")} /></div><div className="space-y-2"><Label>Priority</Label><Select defaultValue="medium" onValueChange={(value) => form.setValue("priority", value as Values["priority"])}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="low">Low</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="high">High</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label>Due</Label><Input type="date" {...form.register("dueDate")} /></div><div className="space-y-2"><Label>Estimate Hours</Label><Input type="number" {...form.register("estimateHours")} /></div><div className="md:col-span-4"><Button type="submit"><Plus className="h-4 w-4" />Add task</Button></div></form>;
}
