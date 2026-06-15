import { Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function ForecastSettingsPage() {
  return <div className="space-y-6"><div><h2 className="flex items-center gap-2 text-2xl font-semibold"><Settings className="h-5 w-5 text-blue-600 dark:text-cyan-300" />Forecast settings</h2><p className="text-sm text-slate-500">Configure model, pipeline, alerting, and recommendation policies.</p></div><Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]"><CardHeader><CardTitle>AI forecast controls</CardTitle><CardDescription>Enterprise defaults for demand prediction.</CardDescription></CardHeader><CardContent className="space-y-4">{["Auto-run forecast after ERP inventory sync", "Generate reorder recommendations for low confidence SKUs", "Notify SCM manager for critical stockout risk", "Compare Prophet and LSTM before publishing forecast", "Store forecast output in Redis/Postgres cache"].map((item) => <label key={item} className="flex items-center justify-between rounded-md border border-slate-200 p-4 text-sm dark:border-white/10"><span>{item}</span><Checkbox defaultChecked /></label>)}</CardContent></Card></div>;
}
