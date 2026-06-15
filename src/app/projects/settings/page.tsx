import { Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function ProjectSettingsPage() {
  return <div className="space-y-6"><div><h2 className="flex items-center gap-2 text-2xl font-semibold"><Settings className="h-5 w-5 text-blue-600 dark:text-cyan-300" />Project settings</h2><p className="text-sm text-slate-500">Configure delivery controls, budget thresholds, and team collaboration.</p></div><Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]"><CardHeader><CardTitle>Project controls</CardTitle><CardDescription>Enterprise project governance settings.</CardDescription></CardHeader><CardContent className="space-y-4">{["Require milestone approval", "Enable budget variance alerts", "Notify owners when task due date slips", "Require timesheet submission weekly", "Enable dependency risk scoring"].map((item) => <label key={item} className="flex items-center justify-between rounded-md border border-slate-200 p-4 text-sm dark:border-white/10"><span>{item}</span><Checkbox defaultChecked /></label>)}</CardContent></Card></div>;
}
