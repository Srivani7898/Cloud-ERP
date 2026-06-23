"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectBadge } from "@/components/projects/ProjectBadge";
import { useProjectsStore } from "@/store/projects-store";

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ProjectOverviewPage() {
  const params = useParams();
  const projectId = params?.id as string;

  const projects = useProjectsStore((state) => state.projects);

  const project = projects.find(
    (item) => String(item.id) === String(projectId)
  );

  console.log("Current Route ID:", projectId);
  console.log("Projects Store:", projects);
  console.log("Matched Project:", project);

  if (!project) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6">
        <h2 className="text-xl font-semibold text-red-400">
          Project not found
        </h2>

        <p className="mt-2 text-slate-400">
          Route ID: {projectId}
        </p>

        <p className="mt-1 text-slate-400">
          Available Projects: {projects.length}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]">
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-4">
          <div>
            <p className="text-sm text-slate-500">Client</p>
            <p className="font-medium">{project.client}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Owner</p>
            <p className="font-medium">{project.owner}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Methodology</p>
            <p className="font-medium">{project.methodology}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Status</p>
            <ProjectBadge value={project.status} />
          </div>

          <div>
            <p className="text-sm text-slate-500">Budget</p>
            <p className="font-medium">
              {money(project.budget)}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Actual Cost</p>
            <p className="font-medium">
              {money(project.actual)}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Progress</p>
            <p className="font-medium">
              {project.progress}%
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Duration</p>
            <p className="font-medium">
              {project.startDate} - {project.endDate}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}