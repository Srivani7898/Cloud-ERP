"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProjectsStore } from "@/store/projects-store";
import { projectSchema } from "@/validations/projects";

type Values = z.infer<typeof projectSchema>;

export function ProjectForm() {
  const router = useRouter();
  const addProject = useProjectsStore((state) => state.addProject);
  const form = useForm<Values>({ resolver: zodResolver(projectSchema), defaultValues: { name: "", client: "", methodology: "Agile", owner: "", startDate: "", endDate: "", budget: 0 } });
  return <form className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.06] md:grid-cols-3" onSubmit={form.handleSubmit((values) => { const project = addProject(values); router.push(`/projects/${project.id}`); })}><div className="space-y-2 md:col-span-2"><Label>Name</Label><Input {...form.register("name")} /></div><div className="space-y-2"><Label>Client</Label><Input {...form.register("client")} /></div><div className="space-y-2"><Label>Methodology</Label><Select defaultValue="Agile" onValueChange={(value) => form.setValue("methodology", value as Values["methodology"])}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Agile">Agile</SelectItem><SelectItem value="Waterfall">Waterfall</SelectItem><SelectItem value="Hybrid">Hybrid</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label>Owner</Label><Input {...form.register("owner")} /></div><div className="space-y-2"><Label>Budget</Label><Input type="number" {...form.register("budget")} /></div><div className="space-y-2"><Label>Start</Label><Input type="date" {...form.register("startDate")} /></div><div className="space-y-2"><Label>End</Label><Input type="date" {...form.register("endDate")} /></div><div className="flex items-end"><Button type="submit"><Save className="h-4 w-4" />Create project</Button></div></form>;
}
