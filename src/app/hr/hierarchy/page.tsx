"use client";

import { GitFork } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useHrStore } from "@/store/hr-store";

export default function HierarchyPage() {
  const departments = useHrStore((state) => state.departments);
  const employees = useHrStore((state) => state.employees);
  return (
    <div className="space-y-6">
      <div><h2 className="flex items-center gap-2 text-2xl font-semibold"><GitFork className="h-5 w-5 text-blue-600 dark:text-cyan-300" />Employee hierarchy</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Organization chart by department and functional leader.</p></div>
      <section className="grid gap-4 xl:grid-cols-2">
        {departments.map((dept) => (
          <Card key={dept.id} className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]">
            <CardHeader><CardTitle>{dept.name}</CardTitle><CardDescription>Headed by {dept.head}</CardDescription></CardHeader>
            <CardContent className="space-y-3">
              {employees.filter((employee) => employee.department === dept.name).map((employee) => (
                <div key={employee.id} className="rounded-md border border-slate-200 p-3 dark:border-white/10">
                  <p className="font-medium">{employee.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{employee.title}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
