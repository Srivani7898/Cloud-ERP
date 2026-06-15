"use client";

import { LiveCrudResource } from "@/components/shared/LiveCrudResource";
import { useHrStore } from "@/store/hr-store";

export default function HRDepartmentsPage() {
  return (
    <LiveCrudResource
      moduleKey="hr"
      resourceKey="departments"
      eyebrow="Human Resources"
      title="Departments"
      description="Create and manage department ownership, workforce size, and budget through the HR departments API."
      fields={[
        { key: "name", label: "Department", required: true, placeholder: "Enter Department" },
        { key: "head", label: "Head", required: true, placeholder: "Enter Head" },
        { key: "employees", label: "Employees", type: "number", placeholder: "Enter Employees" },
        { key: "budget", label: "Budget", type: "number", placeholder: "Enter Budget" },
      ]}
      columns={[
        { key: "id", label: "Department ID" },
        { key: "name", label: "Department" },
        { key: "head", label: "Head" },
        { key: "employees", label: "Employees", format: "number" },
        { key: "budget", label: "Budget", format: "currency" },
        { key: "status", label: "Status", format: "status" },
      ]}
      defaultCreate={{ status: "Created" }}

      onCreate={(record) => {
        useHrStore.getState().addDepartment({
          name: String(record.name),
          head: String(record.head),
          employees: Number(record.employees),
          budget: Number(record.budget),
          status: "Created",
        });
      }}

      actions={[
        { label: "Activate", patch: { status: "Active" }, tone: "green" },
        { label: "Review", patch: { status: "Review" }, tone: "amber" },
      ]}
    />
  );
}
