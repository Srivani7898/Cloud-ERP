"use client";

import { notFound, useParams } from "next/navigation";
import { EmployeeForm } from "@/components/hr/EmployeeForm";
import { useHrStore } from "@/store/hr-store";

export default function EditEmployeePage() {
  const params = useParams<{ id: string }>();
  const employee = useHrStore((state) => state.employees.find((item) => item.id === params.id));
  if (!employee) notFound();

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-semibold">Edit employee</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Update employee profile and organization data.</p></div>
      <EmployeeForm employee={employee} />
    </div>
  );
}
