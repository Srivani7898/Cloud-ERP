import { ProjectForm } from "@/components/projects/ProjectForm";

export default function CreateProjectPage() {
  return <div className="space-y-6"><div><h2 className="text-2xl font-semibold">Create project</h2><p className="text-sm text-slate-500">Start an enterprise project with budget, dates, and owner.</p></div><ProjectForm /></div>;
}
