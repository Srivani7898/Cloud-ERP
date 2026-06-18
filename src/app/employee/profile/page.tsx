"use client";

import { useState } from "react";
import { Mail, MapPin, Pencil, Save, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth-store";
import { useHrStore } from "@/store/hr-store";

export default function EmployeeProfilePage() {
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const employees = useHrStore((state) => state.employees);
  const employee =
    employees.find((emp) => emp.name === user?.name) ??
    employees[0]; const updateEmployee = useHrStore((state) => state.updateEmployee);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name ?? employee.name,
    email: user?.email ?? employee.email,
    location: employee.location,
    title: employee.title,
    department: employee.department
  });

  function saveProfile() {
    updateUser({ name: form.name, email: form.email });
    updateEmployee(employee.id, {
      name: form.name,
      email: form.email,
      location: form.location,
      title: form.title,
      department: form.department
    });
    setEditing(false);
  }

  return (
    <>
      <Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]">
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <UserRound className="h-5 w-5" />
              My profile
            </CardTitle>
            <CardDescription>Personal HR information from the employee master record.</CardDescription>
          </div>
          <Button onClick={() => (editing ? saveProfile() : setEditing(true))}>
            {editing ? <Save className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
            {editing ? "Save profile" : "Edit profile"}
          </Button>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {editing ? (
            <>
              <div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></div>
              <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></div>
              <div className="space-y-2"><Label htmlFor="location">Location</Label><Input id="location" value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} /></div>
              <div className="space-y-2"><Label htmlFor="title">Title</Label><Input id="title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></div>
              <div className="space-y-2"><Label htmlFor="department">Department</Label><Input id="department" value={form.department} onChange={(event) => setForm({ ...form, department: event.target.value })} /></div>
            </>
          ) : (
            <>
              <div><p className="text-sm text-slate-500">Name</p><p className="font-medium">{form.name}</p></div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-slate-500" />{form.email}</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-slate-500" />{form.location}</div>
              <div><p className="text-sm text-slate-500">Title</p><p className="font-medium">{form.title}</p></div>
              <div>
                <p className="text-sm text-slate-500">Department</p>
                <p className="font-medium">{form.department}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Manager</p>
                <p className="font-medium">
                  {employee.manager ?? "Not Assigned"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Status</p>
                <p className="font-medium capitalize">
                  {employee.status}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Joined</p>
                <p className="font-medium">{employee.joinedAt}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-4 mt-6">
        <div className="rounded-lg border border-white/10 p-4">
          <p className="text-sm text-slate-400">Employee ID</p>
          <p className="text-2xl font-bold">{employee.employeeCode}</p>
        </div>

        <div className="rounded-lg border border-white/10 p-4">
          <p className="text-sm text-slate-400">Performance Score</p>
          <p className="text-2xl font-bold">{employee.performanceScore}%</p>
        </div>

        <div className="rounded-lg border border-white/10 p-4">
          <p className="text-sm text-slate-400">Annual Leave</p>
          <p className="text-2xl font-bold">
            {employee.annualLeaveBalance}
          </p>
        </div>

        <div className="rounded-lg border border-white/10 p-4">
          <p className="text-sm text-slate-400">Sick Leave</p>
          <p className="text-2xl font-bold">
            {employee.sickLeaveBalance}
          </p>
        </div>
      </div>
    </>
  );
}