"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useForecastStore } from "@/store/forecast-store";
import {
  BrainCircuit,
  CheckCircle2,
  Loader2,
  RefreshCcw,
  Sparkles,
  Trash2,
  TrendingUp,
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

type Prediction = {
  id: string;
  sku: string;
  product?: string;
  model?: string;
  horizon?: string;
  forecastDemand?: number;
  forecastQty?: number;
  confidence: number;
  period?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

const emptyPrediction = {
  sku: "",
  product: "",
  model: "LSTM",
  forecastDemand: "",
  confidence: "",
  period: "",
};

const statusStyles: Record<string, string> = {
  Generated: "bg-blue-500/15 text-blue-200 ring-blue-400/25",
  Approved: "bg-emerald-500/15 text-emerald-200 ring-emerald-400/25",
  Monitoring: "bg-cyan-500/15 text-cyan-200 ring-cyan-400/25",
  Retrained: "bg-violet-500/15 text-violet-200 ring-violet-400/25",
};

function getDemand(prediction: Prediction) {
  return prediction.forecastDemand ?? prediction.forecastQty ?? 0;
}


export default function ForecastPredictionsPage() {
  const addSku = useForecastStore(
    (state) => state.addSku
  );

  const addProduct = useForecastStore(
    (state) => state.addProduct
  );

  const addTrend = useForecastStore(
    (state) => state.addTrend
  );

  const addRecommendation =
    useForecastStore(
      (state) =>
        state.addRecommendation
    );

  const updateModelMetrics =
    useForecastStore(
      (state) =>
        state.updateModelMetrics
    );

  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [form, setForm] = useState(emptyPrediction);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const metrics = useMemo(() => {
    const totalDemand = predictions.reduce((sum, prediction) => sum + getDemand(prediction), 0);
    const avgConfidence = predictions.length
      ? Math.round(predictions.reduce((sum, prediction) => sum + (prediction.confidence ?? 0), 0) / predictions.length)
      : 0;
    const approved = predictions.filter((prediction) => prediction.status === "Approved").length;

    return { totalDemand, avgConfidence, approved, count: predictions.length };
  }, [predictions]);

  async function loadPredictions() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/forecast/predictions", { cache: "no-store" });
      const payload = (await response.json()) as ApiEnvelope<Prediction>;

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to load predictions.");
      }

      setPredictions(payload.data?.data ?? []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load predictions.");
    } finally {
      setLoading(false);
    }
  }

  async function createPrediction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/forecast/predictions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sku: form.sku.trim().toUpperCase(),
          product: form.product.trim(),
          model: form.model,
          forecastDemand: Number(form.forecastDemand),
          confidence: Number(form.confidence),
          period: form.period,
          status: "Generated",
        }),
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(
          payload.error ||
          "Unable to create prediction."
        );
      }

      addSku({
        id: `sku-${Date.now()}`,
        sku: form.sku,
        productName: form.product,
        category: "Forecast Product",
        warehouse: "Main Warehouse",
        currentStock: 0,
        avgDemand: Number(
          form.forecastDemand
        ),
      });

      addProduct({
        id: `prd-${Date.now()}`,
        name: form.product,
        category: "Forecast Product",
        revenueImpact:
          Number(form.forecastDemand) *
          100,
        serviceLevel:
          Number(form.confidence),
      });

      addTrend(
        Number(
          form.forecastDemand
        )
      );

      addRecommendation(
        form.sku,
        Number(
          form.forecastDemand
        )
      );
      updateModelMetrics();

      setForm(emptyPrediction);

      setMessage(
        "Forecast prediction generated and synced with the forecast backend API."
      );

      await loadPredictions();

    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to create prediction.");
    } finally {
      setSaving(false);
    }
  }

  async function updatePrediction(id: string, patch: Partial<Prediction>) {
    setMessage("");

    try {
      const response = await fetch(`/api/forecast/predictions/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to update prediction.");
      }

      setMessage(`Prediction ${id} updated.`);
      await loadPredictions();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to update prediction.");
    }
  }

  async function deletePrediction(id: string) {
    setMessage("");

    try {
      const response = await fetch(`/api/forecast/predictions/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to delete prediction.");
      }

      setMessage(`Prediction ${id} deleted.`);
      await loadPredictions();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to delete prediction.");
    }
  }

  useEffect(() => {
    loadPredictions();
  }, []);

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
            AI Demand Forecasting
          </p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-semibold text-white md:text-4xl">
            <BrainCircuit className="h-8 w-8 text-cyan-300" />
            Prediction workbench
          </h1>
          <p className="mt-2 max-w-2xl text-base text-slate-300">
            Review SKU demand forecasts, model confidence, and approval state
            through the live `/api/forecast/predictions` backend.
          </p>
        </div>

        <button
          type="button"
          onClick={loadPredictions}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-semibold text-white shadow-lg shadow-purple-950/20 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-white/[0.07]"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
          Refresh predictions
        </button>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {[
          ["Predictions", metrics.count, "Model outputs"],
          ["Forecast demand", metrics.totalDemand.toLocaleString(), "Projected units"],
          ["Avg confidence", `${metrics.avgConfidence}%`, "Portfolio accuracy signal"],
          ["Approved", metrics.approved, "Ready for operations"],
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
        autoComplete="off"
        onSubmit={createPrediction}
        className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_50px_rgba(124,58,237,0.14)] backdrop-blur-2xl"
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-white">Run forecast</h2>
            <p className="mt-1 text-sm text-slate-300">
              Create a prediction record and persist the model output through the API.
            </p>
          </div>
          <Sparkles className="hidden h-6 w-6 text-cyan-300 sm:block" />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr_1fr_1fr_1fr_auto]">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">SKU</span>
            <input
              required
              autoComplete="off"
              value={form.sku}
              onChange={(event) => setForm((current) => ({ ...current, sku: event.target.value }))}
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
              placeholder="Enter SKU"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Product</span>
            <input
              required
              autoComplete="off"
              value={form.product}
              onChange={(event) => setForm((current) => ({ ...current, product: event.target.value }))}
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
              placeholder="Enter Product"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Model</span>
            <select
              value={form.model}
              onChange={(event) => setForm((current) => ({ ...current, model: event.target.value }))}
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition focus:border-cyan-300/70 [&>option]:bg-slate-950 [&>option]:text-white"
            >
              <option>LSTM</option>
              <option>Prophet</option>
              <option>XGBoost</option>
              <option>Ensemble</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Demand</span>
            <input
              required
              min="0"
              type="number"
              value={form.forecastDemand}
              placeholder="Enter Forecast Demand"
              autoComplete="off"
              onChange={(event) => setForm((current) => ({ ...current, forecastDemand: event.target.value }))}
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition focus:border-cyan-300/70"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Confidence</span>
            <input
              required
              min="0"
              max="100"
              type="number"
              value={form.confidence}
              placeholder="Enter Confidence %"
              autoComplete="off"
              onChange={(event) => setForm((current) => ({ ...current, confidence: event.target.value }))}
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition focus:border-cyan-300/70"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">
              Period
            </span>

            <input
              required
              value={form.period}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  period: event.target.value,
                }))
              }
              placeholder="Enter the days"
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none"
            />
          </label>

          <button
            type="submit"
            disabled={saving}
            className="mt-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 px-5 font-semibold text-white shadow-lg shadow-fuchsia-950/30 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Run
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
          <h2 className="text-2xl font-semibold text-white">Predictions</h2>
          <p className="mt-1 text-sm text-slate-300">
            Live AI forecast records from the predictions API.
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-56 items-center justify-center text-slate-300">
            <Loader2 className="mr-3 h-5 w-5 animate-spin text-cyan-300" />
            Loading predictions...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1040px] text-left">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-[0.24em] text-blue-200">
                  <th className="px-4 py-4">SKU</th>
                  <th className="px-4 py-4">Product</th>
                  <th className="px-4 py-4">Model</th>
                  <th className="px-4 py-4">Demand</th>
                  <th className="px-4 py-4">Confidence</th>
                  <th className="px-4 py-4">Period</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="w-[330px] px-4 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {predictions.map((prediction, index) => {
                  const status = prediction.status ?? "Generated";
                  const style = statusStyles[status] ?? statusStyles.Generated;

                  return (
                    <tr
                      key={prediction.id}
                      className={`border-b border-white/10 text-white ${index % 2 ? "bg-white/[0.03]" : ""}`}
                    >
                      <td className="px-4 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            {prediction.sku}
                          </span>
                          <span className="text-xs text-slate-400">
                            ({prediction.id})
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-5 whitespace-nowrap">
                        {prediction.product ?? "Inventory SKU"}
                      </td>
                      <td className="px-4 py-5">{prediction.model ?? "Prophet"}</td>
                      <td className="px-4 py-5">{getDemand(prediction).toLocaleString()}</td>
                      <td className="px-4 py-5">{prediction.confidence}%</td>
                      <td className="px-4 py-5">
                        {prediction.period || "Not Set"}
                      </td>
                      <td className="px-4 py-5">
                        <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ring-1 ${style}`}>
                          {status}
                        </span>
                      </td>
                      <td className="w-[330px] px-4 py-5">
                        <div className="flex flex-nowrap justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => updatePrediction(prediction.id, { status: "Approved", confidence: 96 })}
                            className="inline-flex whitespace-nowrap items-center gap-2 rounded-lg border border-emerald-300/20 bg-emerald-500/15 px-3 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/25"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              updatePrediction(prediction.id, {
                                status: "Retrained",
                                confidence: Math.min((prediction.confidence ?? 0) + 2, 99),
                              })
                            }
                            className="inline-flex whitespace-nowrap items-center gap-2 rounded-lg border border-blue-300/20 bg-blue-500/15 px-3 py-2 text-sm font-semibold text-blue-100 transition hover:bg-blue-500/25"
                          >
                            <TrendingUp className="h-4 w-4" />
                            Refresh
                          </button>
                          <button
                            type="button"
                            onClick={() => deletePrediction(prediction.id)}
                            className="inline-flex whitespace-nowrap items-center gap-2 rounded-lg border border-rose-300/20 bg-rose-500/15 px-3 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-500/25"
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
