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
            <CardContent>
              <div className="mb-4 space-y-1">
                <p className="text-sm">
                  <span className="font-semibold">Planned Employees:</span>{" "}
                  {dept.employees}
                </p>

                <p className="text-sm">
                  <span className="font-semibold">Assigned Employees:</span>{" "}
                  {
                    employees.filter(
                      (employee) => employee.department === dept.name
                    ).length
                  }
                </p>
              </div>

              <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-white/10">
                      <th className="px-4 py-2 text-left">Employee</th>
                      <th className="px-4 py-2 text-left">Designation</th>
                    </tr>
                  </thead>

                  <tbody>
                    {employees.filter(
                      (employee) => employee.department === dept.name
                    ).length > 0 ? (
                      employees
                        .filter((employee) => employee.department === dept.name)
                        .map((employee) => (
                          <tr
                            key={employee.id}
                            className="border-b border-slate-200 dark:border-white/10"
                          >
                            <td className="px-4 py-2">{employee.name}</td>
                            <td className="px-4 py-2">{employee.title}</td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td className="px-4 py-3 text-slate-500" colSpan={2}>
                          No employees assigned yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
