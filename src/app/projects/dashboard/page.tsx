import { LiveModuleDashboard } from "@/components/shared/LiveModuleDashboard";

export default function ProjectsDashboardPage() {
  return (
    <LiveModuleDashboard
      eyebrow="Project Management"
      title="Enterprise delivery command center"
      description="Live project, task, milestone, budget, and risk signals aggregated from project backend APIs."
      moduleKey="projects"
      resources={[
        { resource: "projects", label: "Projects", description: "Portfolio status, risk, budget, and ownership." },
        { resource: "tasks", label: "Tasks", description: "Task assignment and delivery execution records." },
        { resource: "milestones", label: "Milestones", description: "Milestone commitments and completion state." },
        { resource: "risks", label: "Risks", description: "Project risk tracking and executive exceptions." },
      ]}
    />
  );
}
