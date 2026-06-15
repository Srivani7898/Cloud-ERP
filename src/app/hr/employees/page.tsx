"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  ChevronDown,
  Loader2,
  Plus,
  RefreshCcw,
  Trash2,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";

type ApiEnvelope<T> = {
  success: boolean;
  data?: {
    module: string;
    resource: string;
    count: number;
    total: number;
    data: T[];
  };
  error?: string;
};

type Employee = {
  id: string;
  name: string;
  department: string;
  title?: string;
  status: string;
  location?: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
};

const emptyEmployee = {
  name: "",
  department: "Finance",
  title: "",
  location: "Bengaluru",
};

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-500/15 text-emerald-200 ring-emerald-400/25",
  "On Leave": "bg-amber-500/15 text-amber-200 ring-amber-400/25",
  Inactive: "bg-slate-500/15 text-slate-200 ring-slate-400/25",
  Terminated: "bg-rose-500/15 text-rose-200 ring-rose-400/25",
};

export default function HREmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState(emptyEmployee);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [departmentOpen, setDepartmentOpen] = useState(false);

  const metrics = useMemo(() => {
    const departments = new Set(employees.map((employee) => employee.department).filter(Boolean));
    const active = employees.filter((employee) => employee.status === "Active").length;
    const leave = employees.filter((employee) => employee.status === "On Leave").length;

    return {
      total: employees.length,
      active,
      leave,
      departments: departments.size,
    };
  }, [employees]);

  async function loadEmployees() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/hr/employees", { cache: "no-store" });
      const payload = (await response.json()) as ApiEnvelope<Employee>;

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to load employees.");
      }

      setEmployees(payload.data?.data ?? []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load employees.");
    } finally {
      setLoading(false);
    }
  }

  async function createEmployee(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/hr/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          department: form.department,
          title: form.title.trim() || "Employee",
          status: "Active",
          location: form.location.trim() || "Bengaluru",
        }),
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to create employee.");
      }

      setForm(emptyEmployee);
      setMessage("Employee created and synced with the HR backend API.");
      await loadEmployees();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to create employee.");
    } finally {
      setSaving(false);
    }
  }

  async function updateEmployee(id: string, patch: Partial<Employee>) {
    setMessage("");

    try {
      const response = await fetch(`/api/hr/employees/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to update employee.");
      }

      setMessage(`Employee ${id} updated.`);
      await loadEmployees();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to update employee.");
    }
  }

  async function deleteEmployee(id: string) {
    setMessage("");

    try {
      const response = await fetch(`/api/hr/employees/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to delete employee.");
      }

      setMessage(`Employee ${id} deleted.`);
      await loadEmployees();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to delete employee.");
    }
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
            Human Resources
          </p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-semibold text-white md:text-4xl">
            <UsersRound className="h-8 w-8 text-cyan-300" />
            Employee directory
          </h1>
          <p className="mt-2 max-w-2xl text-base text-slate-300">
            Manage tenant employees through the live `/api/hr/employees` backend.
          </p>
        </div>

        <button
          type="button"
          onClick={loadEmployees}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-semibold text-white shadow-lg shadow-purple-950/20 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-white/[0.07]"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
          Refresh employees
        </button>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {[
          ["Employees", metrics.total, "Total workforce records"],
          ["Active", metrics.active, "Ready for assignment"],
          ["On leave", metrics.leave, "Temporary availability impact"],
          ["Departments", metrics.departments, "Functional coverage"],
        ].map(([label, value, helper]) => (
          <div
            key={label}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_50px_rgba(124,58,237,0.14)] backdrop-blur-2xl"
          >
            <p className="text-sm text-slate-300">{label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
            <p className="mt-2 text-sm text-cyan-200">{helper}</p>
          </div>
        ))}
      </section>

      <form
        onSubmit={createEmployee}
        className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_50px_rgba(124,58,237,0.14)] backdrop-blur-2xl"
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-white">Add employee</h2>
            <p className="mt-1 text-sm text-slate-300">
              New employees are written to the HR API and reflected instantly.
            </p>
          </div>
          <Plus className="hidden h-6 w-6 text-cyan-300 sm:block" />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Full name</span>
           <input
            autoComplete="off"
            value={form.location}
            onChange={(event) =>
            setForm((current) => ({
            ...current,
            location: event.target.value,
            }))
          }
          className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
          placeholder="Hyderabad"
          />
          </label>

          <label className="relative space-y-2">
            <span className="text-sm font-semibold text-white">Department</span>
            <button
              type="button"
              onClick={() => setDepartmentOpen((open) => !open)}
              className="flex h-12 w-full items-center justify-between rounded-xl border border-white/10 bg-slate-950/60 px-4 text-left text-white outline-none transition hover:border-cyan-300/40 focus:border-cyan-300/70"
            >
              <span>{form.department}</span>
              <ChevronDown className="h-4 w-4 text-slate-300" />
            </button>
            {departmentOpen ? (
              <div className="absolute bottom-[3.25rem] left-0 right-0 z-50 overflow-hidden rounded-xl border border-cyan-300/20 bg-slate-950 shadow-2xl shadow-cyan-950/30">
                {["Finance", "HR", "SCM", "Projects", "Analytics"].map((department) => (
                  <button
                    key={department}
                    type="button"
                    onClick={() => {
                      setForm((current) => ({ ...current, department }));
                      setDepartmentOpen(false);
                    }}
                    className={`block w-full px-4 py-3 text-left text-sm font-semibold transition hover:bg-cyan-400/10 hover:text-cyan-100 ${
                      form.department === department ? "bg-cyan-400/15 text-cyan-100" : "text-white"
                    }`}
                  >
                    {department}
                  </button>
                ))}
              </div>
            ) : null}
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Title</span>
            <input
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
              placeholder="ERP Analyst"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Location</span>
            <input
              value={form.location}
              onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))}
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
              placeholder="Enter the name"
            />
          </label>

          <button
            type="submit"
            disabled={saving}
            className="mt-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 px-5 font-semibold text-white shadow-lg shadow-fuchsia-950/30 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserRoundCheck className="h-4 w-4" />}
            Create
          </button>
        </div>
      </form>

      {message ? (
        <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-5 py-4 text-cyan-100">
          {message}
        </div>
      ) : null}

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_50px_rgba(124,58,237,0.14)] backdrop-blur-2xl">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white">Employees</h2>
          <p className="mt-1 text-sm text-slate-300">
            Live records from the HR employee API.
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-56 items-center justify-center text-slate-300">
            <Loader2 className="mr-3 h-5 w-5 animate-spin text-cyan-300" />
            Loading employees...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px] text-left">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-[0.24em] text-blue-200">
                  <th className="px-4 py-4">Employee</th>
                  <th className="px-4 py-4">Department</th>
                  <th className="px-4 py-4">Title</th>
                  <th className="px-4 py-4">Location</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => {
                  const style = statusStyles[employee.status] ?? statusStyles.Active;

                  return (
                    <tr
                      key={employee.id}
                      className={`border-b border-white/10 text-white ${index % 2 ? "bg-white/[0.03]" : ""}`}
                    >
                      <td className="px-4 py-5 whitespace-nowrap">
                      <div className="font-semibold whitespace-nowrap">
                      {employee.name}
                      </div>
                      </td>
                      <td className="px-4 py-5 whitespace-nowrap">
                      {employee.department}
                      </td>

                      <td className="px-4 py-5 whitespace-nowrap">
                       {employee.title ?? "Employee"}
                        </td>

                      <td className="px-4 py-5 whitespace-nowrap">
                      {employee.location ?? "Not set"}
                      </td>

                      <td className="px-4 py-5">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${style}`}>
                          {employee.status}
                        </span>
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex flex-wrap justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => updateEmployee(employee.id, { status: "Active" })}
                            className="inline-flex items-center gap-2 rounded-lg border border-emerald-300/20 bg-emerald-500/15 px-3 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/25"
                          >
                            <BadgeCheck className="h-4 w-4" />
                            Active
                          </button>
                          <button
                            type="button"
                            onClick={() => updateEmployee(employee.id, { status: "On Leave" })}
                            className="inline-flex items-center gap-2 rounded-lg border border-amber-300/20 bg-amber-500/15 px-3 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-500/25"
                          >
                            On leave
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteEmployee(employee.id)}
                            className="inline-flex items-center gap-2 rounded-lg border border-rose-300/20 bg-rose-500/15 px-3 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-500/25"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
