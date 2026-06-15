"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Mail, MapPin, Pencil, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HrStatusBadge } from "@/components/hr/HrStatusBadge";
import { useHrStore } from "@/store/hr-store";

export default function EmployeeDetailPage() {
  const params = useParams<{ id: string }>();
  const employee = useHrStore((state) => state.employees.find((item) => item.id === params.id));
  if (!employee) notFound();

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]">
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div><CardTitle className="flex items-center gap-2"><UserRound className="h-5 w-5" />{employee.name}</CardTitle><CardDescription>{employee.title} · {employee.department}</CardDescription></div>
          <Button asChild><Link href={`/hr/employees/edit/${employee.id}`}><Pencil className="h-4 w-4" />Edit</Link></Button>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div><p className="text-sm text-slate-500">Employee code</p><p className="font-medium">{employee.employeeCode}</p></div>
          <div><p className="text-sm text-slate-500">Status</p><HrStatusBadge status={employee.status} /></div>
          <div><p className="text-sm text-slate-500">Performance</p><p className="font-medium">{employee.performanceScore}/100</p></div>
          <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-slate-500" />{employee.email}</div>
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-slate-500" />{employee.location}</div>
          <div><p className="text-sm text-slate-500">Joined</p><p className="font-medium">{employee.joinedAt}</p></div>
        </CardContent>
      </Card>
    </div>
  );
}
