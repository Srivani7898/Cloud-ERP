import { EmployeeForm } from "@/components/hr/EmployeeForm";

export default function CreateEmployeePage() {
  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-semibold">Create employee</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Onboard a new employee into the HR tenant.</p></div>
      <EmployeeForm />
    </div>
  );
}
