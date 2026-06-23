"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Trash2, UserPlus } from "lucide-react";
import { usePayrollStore } from "@/store/payroll-store";

type PayrollEmployee = {
  id: string;
  code?: string;
  name?: string;
  department?: string;
  designation?: string;
  payType?: string;
  salary?: number;
  baseSalary?: number;
  taxCode?: string;
  taxRegion?: string;
  bank?: string;
  status?: string;
};

const defaultForm = {
  code: "",
  name: "",
  department: "",
  designation: "",
  baseSalary: "",
  taxRegion: "",
};

function money(value?: number) {
  return `$${Number(value ?? 0).toLocaleString("en-US")}`;
}

function valueOf(employee: PayrollEmployee, key: keyof PayrollEmployee, fallback = "Not set") {
  const value = employee[key];
  return value === undefined || value === null || value === "" ? fallback : String(value);
}

export default function PayrollEmployeesPage() {
  const [employees, setEmployees] = useState<PayrollEmployee[]>([]);
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Employees are connected to /api/payroll/employees.");
  const addPayrollEmployee = usePayrollStore(
    (state) => state.addEmployee
  );

  const summary = useMemo(() => {
    const totalPayroll = employees.reduce((sum, employee) => sum + Number(employee.baseSalary ?? employee.salary ?? 0), 0);
    const active = employees.filter((employee) => valueOf(employee, "status", "Active") === "Active").length;
    return [
      { label: "Employees", value: employees.length, note: "Payroll records" },
      { label: "Active", value: active, note: "Ready for payroll" },
      { label: "Monthly payroll", value: money(totalPayroll), note: "Base salary total" },
      { label: "Tax regions", value: new Set(employees.map((employee) => employee.taxRegion ?? employee.taxCode ?? "India")).size, note: "Compliance coverage" },
    ];
  }, [employees]);

  async function loadEmployees() {
    setLoading(true);
    try {
      const response = await fetch("/api/payroll/employees", { cache: "no-store" });
      const json = await response.json();
      setEmployees(json?.data?.data ?? []);
      setMessage("Latest payroll employees loaded from the backend.");
    } catch {
      setMessage("Unable to load payroll employees. Check the dev server and API route.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  async function addEmployee() {
    setLoading(true);
    try {
      const payload = {
        id: form.code,
        code: form.code,
        name: form.name,
        department: form.department,
        designation: form.designation,
        payType: "Monthly",
        baseSalary: Number(form.baseSalary),
        salary: Number(form.baseSalary),
        taxRegion: form.taxRegion,
        taxCode: form.taxRegion === "India" ? "IN-NEW" : form.taxRegion,
        bank: "Verified",
        status: "Employee Added",
      };

      const response = await fetch("/api/payroll/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await response.json();
      if (json?.success) {
        console.log("FORM DATA", form);
        addPayrollEmployee({
          employeeCode: form.code,
          name: form.name,
          department: form.department,
          designation: form.designation,
          baseSalary: Number(form.baseSalary),
          taxRegion: form.taxRegion,
        });

        setMessage(
          `${form.name} added to payroll and synced with the API.`
        );

        setForm(defaultForm);

        await loadEmployees();
      } else {
        setMessage("Employee was not saved. Check the API response.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(employee: PayrollEmployee, status: string) {
    const employeeId = employee.id ?? employee.code;
    if (!employeeId) {
      setMessage("This employee record does not have an ID, so it cannot be updated.");
      return;
    }

    setEmployees((current) => current.map((item) => (item.id === employee.id ? { ...item, status } : item)));
    const response = await fetch(`/api/payroll/employees/${employeeId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      setMessage("Status update failed. Refresh the page and try again.");
      await loadEmployees();
      return;
    }
    setMessage(`${valueOf(employee, "name", "Employee")} updated to ${status}.`);
    await loadEmployees();
  }

  async function deleteEmployee(employee: PayrollEmployee) {
    const employeeId = employee.id ?? employee.code;
    if (!employeeId) {
      setMessage("This employee record does not have an ID, so it cannot be deleted.");
      return;
    }

    setEmployees((current) => current.filter((item) => item.id !== employee.id));
    const response = await fetch(`/api/payroll/employees/${employeeId}`, { method: "DELETE" });
    if (!response.ok) {
      setMessage("Delete failed. Refresh the page and try again.");
      await loadEmployees();
      return;
    }
    setMessage(`${valueOf(employee, "name", "Employee")} removed from payroll.`);
    await loadEmployees();
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-white">Payroll employees</h1>
        <p className="mt-3 text-lg text-slate-300">Employee payroll setup, salaries, tax region, and bank verification.</p>
      </section>

      <section className="grid gap-5 md:grid-cols-4">
        {summary.map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_50px_rgba(124,58,237,0.12)] backdrop-blur-xl">
            <p className="text-slate-300">{item.label}</p>
            <p className="mt-4 text-3xl font-bold text-white">{item.value}</p>
            <p className="mt-3 text-cyan-300">{item.note}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_0_70px_rgba(124,58,237,0.16)] backdrop-blur-xl">
        <h2 className="text-2xl font-bold text-white">Add payroll employee</h2>
        <p className="mt-2 text-slate-300">Enroll an employee into the payroll engine.</p>

        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          <label className="space-y-2">
            <span className="font-semibold text-white">Code</span>
            <input
              autoComplete="off"
              spellCheck={false}
              value={form.code}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  code: event.target.value,
                }))
              }
              placeholder="Enter Employee Code"
              className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300"
            />
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-white">Name</span>
            <input
              autoComplete="off"
              spellCheck={false}
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
              placeholder="Enter Employee Name"
              className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300"
            />
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-white">Department</span>
            <input
              autoComplete="off"
              spellCheck={false}
              value={form.department}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  department: event.target.value,
                }))
              }
              placeholder="Enter Department"
              className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300"
            />
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-white">Designation</span>
            <input
              autoComplete="off"
              spellCheck={false}
              value={form.designation}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  designation: event.target.value,
                }))
              }
              placeholder="Enter Designation"
              className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300"
            />
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-white">Base salary</span>
            <input
              type="number"
              autoComplete="off"
              value={form.baseSalary}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  baseSalary: event.target.value,
                }))
              }
              placeholder="Enter Base Salary"
              className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300"
            />
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-white">Tax region</span>
            <input
              autoComplete="off"
              spellCheck={false}
              value={form.taxRegion}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  taxRegion: event.target.value,
                }))
              }
              placeholder="Enter Tax Region"
              className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300"
            />
          </label>
        </div>

        <button
          onClick={addEmployee}
          disabled={loading}
          className="mt-6 inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 px-8 font-bold text-white shadow-[0_0_35px_rgba(236,72,153,0.35)] transition hover:scale-[1.02] disabled:opacity-60"
        >
          <UserPlus className="h-5 w-5" />
          Add employee
        </button>
        <p className="mt-5 rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-100">{message}</p>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_0_70px_rgba(124,58,237,0.14)] backdrop-blur-xl">
        <h2 className="text-2xl font-bold text-white">Employees</h2>
        <p className="mt-2 text-slate-300">Employees enrolled in payroll.</p>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[1500px] text-left">
            <thead>
              <tr className="border-b border-white/10 text-sm uppercase tracking-[0.18em] text-cyan-300">
                <th className="px-4 py-4 whitespace-nowrap">Employee</th>
                <th className="px-4 py-4 whitespace-nowrap">Department</th>
                <th className="px-4 py-4 whitespace-nowrap">Designation</th>
                <th className="px-4 py-4 whitespace-nowrap">Pay Type</th>
                <th className="px-4 py-4 whitespace-nowrap">Basic Salary</th>
                <th className="px-4 py-4 whitespace-nowrap">Tax Region</th>
                <th className="px-4 py-4 whitespace-nowrap">Bank</th>
                <th className="px-4 py-4 whitespace-nowrap text-center">Status</th>
                <th className="w-[320px] px-4 py-4 text-center whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-b border-white/10 text-white even:bg-white/[0.03]">
                  <td className="px-4 py-5 font-semibold whitespace-nowrap">
                    <span className="text-cyan-300">
                      {employee.code ?? employee.id}
                    </span>
                    {" - "}
                    <span>
                      {valueOf(employee, "name")}
                    </span>
                  </td>
                  <td className="px-4 py-5 text-center">{valueOf(employee, "department")}</td>
                  <td className="px-4 py-5 text-center">{valueOf(employee, "designation", "Payroll Employee")}</td>
                  <td className="px-4 py-5 text-center">{valueOf(employee, "payType", "Monthly")}</td>
                  <td className="px-4 py-5 text-center">{money(employee.baseSalary ?? employee.salary)}</td>
                  <td className="px-4 py-5 text-center">{employee.taxRegion ?? employee.taxCode ?? "India"}</td>
                  <td className="px-4 py-5 text-center">
                    <span className="rounded-full border border-emerald-300/20 bg-emerald-400/15 px-3 py-1 text-sm font-semibold text-emerald-100">
                      {valueOf(employee, "bank", "Verified")}
                    </span>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span
                      className={`inline-flex min-w-[120px] items-center justify-center whitespace-nowrap rounded-full border px-3 py-1 text-sm font-semibold ${valueOf(employee, "status") === "Employee Added"
                        ? "border-cyan-300/20 bg-cyan-400/15 text-cyan-100"
                        : valueOf(employee, "status") === "Active"
                          ? "border-emerald-300/20 bg-emerald-400/15 text-emerald-100"
                          : "border-amber-300/20 bg-amber-400/15 text-amber-100"
                        }`}
                    >
                      {valueOf(employee, "status", "Active")}
                    </span>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => updateStatus(employee, "Active")}
                        disabled={employee.status === "Active"}
                        className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-emerald-300/20 bg-emerald-400/15 px-4 py-3 font-semibold text-emerald-100 disabled:opacity-50"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Activate
                      </button>
                      <button onClick={() => updateStatus(employee, "On Hold")} className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-amber-300/20 bg-amber-400/15 px-4 py-3 font-semibold text-amber-100">
                        On hold
                      </button>
                      <button onClick={() => deleteEmployee(employee)} className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-rose-300/20 bg-rose-400/15 px-4 py-3 font-semibold text-rose-100">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
