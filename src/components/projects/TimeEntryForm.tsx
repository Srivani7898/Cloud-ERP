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
  const addTimeEntry = useProjectsStore((state) => state.addTimeEntry);
  const form = useForm<Values>({ resolver: zodResolver(timeEntrySchema), defaultValues: { projectId: "", taskId: "", date: "", hours: 1 } });
  return <form className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.06] md:grid-cols-4" onSubmit={form.handleSubmit((values) => { addTimeEntry(values); form.reset(); })}><div className="space-y-2"><Label>Project ID</Label><Input {...form.register("projectId")} /></div><div className="space-y-2"><Label>Task ID</Label><Input {...form.register("taskId")} /></div><div className="space-y-2"><Label>Date</Label><Input type="date" {...form.register("date")} /></div><div className="space-y-2"><Label>Hours</Label><Input type="number" {...form.register("hours")} /></div><div className="md:col-span-4"><Button type="submit"><Clock className="h-4 w-4" />Log time</Button></div></form>;
}
