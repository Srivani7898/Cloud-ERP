import { BadgeCheck, KeyRound, UserRound } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "@/components/shared/ProfileForm";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><UserRound className="h-5 w-5 text-blue-600 dark:text-cyan-300" />User profile</CardTitle>
          <CardDescription>Manage identity details used across Cloud ERP modules.</CardDescription>
        </CardHeader>
        <CardContent><ProfileForm /></CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]"><CardHeader><CardTitle className="flex items-center gap-2"><KeyRound className="h-5 w-5" />Security</CardTitle><CardDescription>MFA enabled, password rotated 18 days ago, trusted device active.</CardDescription></CardHeader></Card>
        <Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]"><CardHeader><CardTitle className="flex items-center gap-2"><BadgeCheck className="h-5 w-5" />Access</CardTitle><CardDescription>Tenant administrator and finance manager roles are assigned.</CardDescription></CardHeader></Card>
      </div>
    </div>
  );
}
