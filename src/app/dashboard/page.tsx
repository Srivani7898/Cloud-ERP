import { Activity, Cpu, DatabaseZap, ShieldCheck, UsersRound } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const metrics = [
  { label: "Active sessions", value: "14,208", trend: "+8.2%", icon: Activity },
  { label: "Tenant workloads", value: "482", trend: "+12", icon: DatabaseZap },
  { label: "MFA adoption", value: "96.4%", trend: "+3.1%", icon: ShieldCheck },
  { label: "Privileged users", value: "128", trend: "-4", icon: UsersRound }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-600 dark:text-cyan-300">Identity intelligence</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal">Tenant access is healthy</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              AI risk scoring, RBAC coverage, MFA enrollment, and session telemetry are consolidated for this tenant.
            </p>
          </div>
          <div className="grid min-w-[280px] grid-cols-2 gap-3">
            <div className="rounded-lg bg-blue-600 p-4 text-white">
              <Cpu className="h-5 w-5" />
              <p className="mt-5 text-2xl font-semibold">Low</p>
              <p className="text-sm text-blue-100">risk posture</p>
            </div>
            <div className="rounded-lg bg-slate-950 p-4 text-white dark:bg-white dark:text-slate-950">
              <ShieldCheck className="h-5 w-5" />
              <p className="mt-5 text-2xl font-semibold">24</p>
              <p className="text-sm opacity-70">policies active</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardDescription>{metric.label}</CardDescription>
                <Icon className="h-4 w-4 text-blue-600 dark:text-cyan-300" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{metric.value}</div>
                <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-300">{metric.trend} this week</p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.4fr_0.6fr]">
        <Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]">
          <CardHeader>
            <CardTitle>Access events</CardTitle>
            <CardDescription>Recent tenant-scoped authentication activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Azure AD SSO sign-in approved", "Finance Manager role granted", "Password reset challenge completed", "Suspicious session terminated"].map((event, index) => (
              <div key={event} className="flex items-center justify-between rounded-md border border-slate-200 p-3 text-sm dark:border-white/10">
                <span>{event}</span>
                <span className="text-slate-500 dark:text-slate-400">{index + 2}m ago</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]">
          <CardHeader>
            <CardTitle>RBAC coverage</CardTitle>
            <CardDescription>Critical duties protected by explicit roles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {["Finance close", "Procurement approvals", "Payroll exports", "Tenant administration"].map((item, index) => (
              <div key={item}>
                <div className="mb-2 flex justify-between text-sm"><span>{item}</span><span>{92 - index * 4}%</span></div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-white/10"><div className="h-2 rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-500" style={{ width: `${92 - index * 4}%` }} /></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
