import { Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function PayrollSettingsPage() {
  return (
    <div className="space-y-6">
      <div><h2 className="flex items-center gap-2 text-2xl font-semibold"><Settings className="h-5 w-5 text-blue-600 dark:text-cyan-300" />Payroll settings</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Configure payroll controls, approval workflows, tax rules, and payslip publishing.</p></div>
      <Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]">
        <CardHeader><CardTitle>Payroll controls</CardTitle><CardDescription>Enterprise defaults for payroll processing.</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          {["Require approval before payment release", "Auto-generate employee payslips after approval", "Sync payroll journal with finance ledger", "Validate bank details before payroll run", "Notify HR when payroll employee data is incomplete"].map((item) => <label key={item} className="flex items-center justify-between rounded-md border border-slate-200 p-4 text-sm dark:border-white/10"><span>{item}</span><Checkbox defaultChecked /></label>)}
        </CardContent>
      </Card>
    </div>
  );
}
