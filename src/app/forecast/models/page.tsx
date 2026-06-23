"use client";

import { ForecastBadge } from "@/components/forecast/ForecastBadge";
import { ForecastTable } from "@/components/forecast/ForecastTable";
import { useForecastStore } from "@/store/forecast-store";

export default function ForecastModelsPage() {
  const models = useForecastStore((state) => state.models);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">
          Model Monitoring
        </h2>

        <p className="text-sm text-slate-500">
          Model health, MAPE, accuracy, and last processing time.
        </p>
      </div>

      <ForecastTable
        title="Forecast Models"
        description="Prophet, LSTM, and Hybrid model monitoring."
        headers={[
          "Model",
          "Algorithm",
          "Accuracy",
          "MAPE",
          "Last Run",
          "Status",
        ]}
        rows={models.map((model) => [
          model.name,
          model.algorithm,
          `${model.accuracy.toFixed(1)}%`,
          `${model.mape.toFixed(1)}%`,
          model.lastRun,
          <ForecastBadge
            key={`status-${model.id}`}
            value={model.status}
          />,
        ])}
      />
    </div>
  );
}