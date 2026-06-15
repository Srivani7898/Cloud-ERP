import { LiveCrudResource } from "@/components/shared/LiveCrudResource";

export default function HRDepartmentsPage() {
  return (
    <LiveCrudResource
      moduleKey="hr"
      resourceKey="departments"
      eyebrow="Human Resources"
      title="Departments"
      description="Create and manage department ownership, workforce size, and budget through the HR departments API."
      fields={[
        { key: "name", label: "Department", required: true, placeholder: "Finance Operations" },
        { key: "head", label: "Head", required: true, placeholder: "Anika Rao" },
        { key: "employees", label: "Employees", type: "number", defaultValue: "42" },
        { key: "budget", label: "Budget", type: "number", defaultValue: "2400000" },
      ]}
      columns={[
        { key: "id", label: "Department ID" },
        { key: "name", label: "Department" },
        { key: "head", label: "Head" },
        { key: "employees", label: "Employees", format: "number" },
        { key: "budget", label: "Budget", format: "currency" },
        { key: "status", label: "Status", format: "status" },
      ]}
      defaultCreate={{ status: "Active" }}
      actions={[
        { label: "Activate", patch: { status: "Active" }, tone: "green" },
        { label: "Review", patch: { status: "Review" }, tone: "amber" },
      ]}
    />
  );
}
