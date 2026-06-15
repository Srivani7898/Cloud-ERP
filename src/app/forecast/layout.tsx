import { ForecastShell } from "@/components/forecast/ForecastShell";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

export default function ForecastLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute roles={["super_admin", "tenant_admin", "forecast_manager", "scm_manager"]}><ForecastShell>{children}</ForecastShell></ProtectedRoute>;
}
