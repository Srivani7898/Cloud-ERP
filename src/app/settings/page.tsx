import { Lock, ServerCog, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ServerCog className="h-5 w-5 text-blue-600 dark:text-cyan-300" />Tenant security policy</CardTitle>
          <CardDescription>Enterprise defaults for authentication, MFA, and tenant isolation.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {["Require MFA for all privileged roles", "Block unmanaged devices for payroll exports", "Expire inactive sessions after 30 minutes", "Enforce SSO for finance and HR modules"].map((item) => (
            <label key={item} className="flex items-center justify-between rounded-md border border-slate-200 p-4 text-sm dark:border-white/10">
              <span>{item}</span>
              <Checkbox defaultChecked />
            </label>
          ))}
          <Button><Lock className="h-4 w-4" />Save policy</Button>
        </CardContent>
      </Card>
      <Card className="border-amber-300 bg-amber-50 dark:border-amber-300/30 dark:bg-amber-300/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-200"><ShieldAlert className="h-5 w-5" />Privileged change control</CardTitle>
          <CardDescription className="text-amber-700/80 dark:text-amber-100/80">Production policy edits should be paired with approval workflows in the backend API.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
