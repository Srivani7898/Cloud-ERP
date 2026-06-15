import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function CurrencyRiskChart() {
  const exposure = [
    ["USD", 82],
    ["EUR", 64],
    ["INR", 72],
    ["JPY", 48],
    ["GBP", 58]
  ];

  return (
    <Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]">
      <CardHeader>
        <CardTitle>Currency exposure</CardTitle>
        <CardDescription>AI risk view across treasury currencies.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {exposure.map(([currency, value]) => (
          <div key={currency}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium">{currency}</span>
              <span className="text-slate-500 dark:text-slate-400">{value}% exposure</span>
            </div>
            <div className="h-3 rounded-full bg-slate-200 dark:bg-white/10">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-500"
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
