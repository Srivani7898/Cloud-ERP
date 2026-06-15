"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectBadge } from "@/components/projects/ProjectBadge";
import { useProjectsStore } from "@/store/projects-store";

function money(value: number) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value); }

export default function ProjectOverviewPage() {
  const { id } = useParams<{ id: string }>();
  const project = useProjectsStore((state) => state.projects.find((item) => item.id === id));
  if (!project) return <p>Project not found.</p>;
  return <div className="space-y-6"><Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]"><CardHeader><CardTitle>{project.name}</CardTitle></CardHeader><CardContent className="grid gap-4 md:grid-cols-4"><div><p className="text-sm text-slate-500">Client</p><p className="font-medium">{project.client}</p></div><div><p className="text-sm text-slate-500">Owner</p><p className="font-medium">{project.owner}</p></div><div><p className="text-sm text-slate-500">Method</p><p className="font-medium">{project.methodology}</p></div><div><p className="text-sm text-slate-500">Status</p><ProjectBadge value={project.status} /></div><div><p className="text-sm text-slate-500">Budget</p><p className="font-medium">{money(project.budget)}</p></div><div><p className="text-sm text-slate-500">Actual</p><p className="font-medium">{money(project.actual)}</p></div><div><p className="text-sm text-slate-500">Progress</p><p className="font-medium">{project.progress}%</p></div><div><p className="text-sm text-slate-500">Dates</p><p className="font-medium">{project.startDate} - {project.endDate}</p></div></CardContent></Card></div>;
}
