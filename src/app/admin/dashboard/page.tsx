import Link from "next/link";
import { BrainCircuit, BriefcaseBusiness, Building2, Package, ShieldCheck, UsersRound, WalletCards } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const modules = [
  { title: "HR Management", href: "/hr/dashboard", icon: UsersRound, description: "Employees, attendance, leave, onboarding, reports." },
  { title: "Finance Management", href: "/finance/dashboard", icon: WalletCards, description: "Invoices, payments, ledger, reports, currency." },
  { title: "Payroll Management", href: "/payroll/dashboard", icon: WalletCards, description: "Salary processing, tax, approvals, payslips, reports." },
  { title: "Supply Chain Management", href: "/scm/dashboard", icon: Package, description: "Inventory, vendors, POs, warehouses, reorders, reports." },
  { title: "AI Demand Forecasting", href: "/forecast/dashboard", icon: BrainCircuit, description: "SKU prediction, models, trends, recommendations, reports." },
  { title: "Project Management", href: "/projects/dashboard", icon: BriefcaseBusiness, description: "Projects, tasks, budgets, resources, risks, reports." },
  { title: "Employee Portal", href: "/employee/dashboard", icon: ShieldCheck, description: "Self-service profile, leave, payslips, documents." },
  { title: "Tenant Control", href: "/settings", icon: Building2, description: "Tenant policies, access, and enterprise settings." }
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.06]">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-600 dark:text-cyan-300">Super Admin</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-normal">Complete ERP access control center</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">Manage tenants, users, HR, finance, employee portals, and enterprise policies from one workspace.</p>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        {modules.map((module) => <Card key={module.title} className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]"><CardHeader><CardTitle className="flex items-center gap-2"><module.icon className="h-5 w-5 text-blue-600 dark:text-cyan-300" />{module.title}</CardTitle><CardDescription>{module.description}</CardDescription></CardHeader><CardContent><Button asChild variant="outline"><Link href={module.href}>Open module</Link></Button></CardContent></Card>)}
      </section>
    </div>
  );
}
