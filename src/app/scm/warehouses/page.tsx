"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScmTable } from "@/components/scm/ScmTable";
import { useScmStore } from "@/store/scm-store";

export default function WarehousesPage() {
  const warehouses = useScmStore((state) => state.warehouses);
  return <div className="space-y-6"><div><h2 className="text-2xl font-semibold">Warehouse management</h2><p className="text-sm text-slate-500">Capacity, utilization, and regional warehouse visibility.</p></div><section className="grid gap-4 md:grid-cols-3">{warehouses.map((wh) => <Card key={wh.id} className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]"><CardHeader><CardTitle>{wh.name}</CardTitle><CardDescription>{wh.region}</CardDescription></CardHeader><CardContent><div className="mb-2 flex justify-between text-sm"><span>Utilization</span><span>{wh.utilization}%</span></div><div className="h-3 rounded-full bg-slate-200 dark:bg-white/10"><div className="h-3 rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-500" style={{ width: `${wh.utilization}%` }} /></div><p className="mt-3 text-sm text-slate-500">Capacity: {wh.capacity} units</p></CardContent></Card>)}</section><ScmTable title="Warehouse list" description="Warehouse capacity and utilization." headers={["Warehouse", "Region", "Capacity", "Utilization"]} rows={warehouses.map((wh) => [wh.name, wh.region, wh.capacity, `${wh.utilization}%`])} /></div>;
}
