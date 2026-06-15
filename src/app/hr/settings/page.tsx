import { Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function HrSettingsPage() {
  return (
    <div className="space-y-6">
      <div><h2 className="flex items-center gap-2 text-2xl font-semibold"><Settings className="h-5 w-5 text-blue-600 dark:text-cyan-300" />HR settings</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Configure HR policies, approvals, onboarding, and employee self-service.</p></div>
      <Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]">
        <CardHeader><CardTitle>Policy controls</CardTitle><CardDescription>Enterprise HR defaults for the active tenant.</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          {["Require manager approval for leave", "Enable AI onboarding recommendations", "Notify HR when attendance risk increases", "Allow employee self-service profile updates"].map((item) => (
            <label key={item} className="flex items-center justify-between rounded-md border border-slate-200 p-4 text-sm dark:border-white/10"><span>{item}</span><Checkbox defaultChecked /></label>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
