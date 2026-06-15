"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  Database,
  Loader2,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type ApiEnvelope = {
  success: boolean;
  data?: {
    module: string;
    resource: string;
    count: number;
    total: number;
    data: Record<string, unknown>[];
  };
  error?: string;
};

type ResourceConfig = {
  resource: string;
  label: string;
  description: string;
};

type ResourceState = ResourceConfig & {
  rows: Record<string, unknown>[];
  count: number;
  error?: string;
};

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  moduleKey: string;
  resources: ResourceConfig[];
};

const numericKeys = [
  "total",
  "amount",
  "budget",
  "net",
  "qty",
  "quantity",
  "forecastDemand",
  "forecastQty",
  "confidence",
  "aiRisk",
  "progress",
];

function asText(value: unknown, fallback = "Not set") {
  if (value === null || value === undefined || value === "") return fallback;
  return String(value);
}

function getName(row: Record<string, unknown>) {
  return asText(
    row.name ??
      row.title ??
      row.customer ??
      row.product ??
      row.action ??
      row.sku ??
      row.employee ??
      row.employeeId ??
      row.id,
  );
}

function getStatus(row: Record<string, unknown>) {
  return asText(row.status ?? row.severity ?? row.risk ?? row.verified, "Tracked");
}

function sumImportantValues(rows: Record<string, unknown>[]) {
  return rows.reduce((sum, row) => {
    const key = numericKeys.find((candidate) => typeof row[candidate] === "number");
    return sum + (key ? Number(row[key]) : 0);
  }, 0);
}

function formatValue(value: number) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return value.toLocaleString();
  return value.toString();
}

export function LiveModuleDashboard({ eyebrow, title, description, moduleKey, resources }: Props) {
  const [items, setItems] = useState<ResourceState[]>(
    resources.map((resource) => ({ ...resource, rows: [], count: 0 })),
  );
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadDashboard() {
    setLoading(true);
    setMessage("");

    const loaded = await Promise.all(
      resources.map(async (resource) => {
        try {
          const response = await fetch(`/api/${moduleKey}/${resource.resource}`, { cache: "no-store" });
          const payload = (await response.json()) as ApiEnvelope;

          if (!response.ok || !payload.success) {
            throw new Error(payload.error || `Unable to load ${resource.label}.`);
          }

          return {
            ...resource,
            rows: payload.data?.data ?? [],
            count: payload.data?.count ?? 0,
          };
        } catch (error) {
          return {
            ...resource,
            rows: [],
            count: 0,
            error: error instanceof Error ? error.message : `Unable to load ${resource.label}.`,
          };
        }
      }),
    );

    setItems(loaded);
    setLoading(false);
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  const summary = useMemo(() => {
    const allRows = items.flatMap((item) => item.rows);
    const records = items.reduce((sum, item) => sum + item.count, 0);
    const signal = sumImportantValues(allRows);
    const active = allRows.filter((row) =>
      ["Active", "Approved", "Paid", "Released", "Published", "Verified", "In Stock", "On track"].includes(
        asText(row.status ?? row.risk),
      ),
    ).length;
    const risks = allRows.filter((row) =>
      ["High", "Critical", "Overdue", "At Risk", "Low Stock", "Out Of Stock", "Failed"].includes(
        asText(row.status ?? row.risk ?? row.severity),
      ),
    ).length;

    return { records, signal, active, risks, allRows };
  }, [items]);

  const recentRows = summary.allRows.slice(0, 7);

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">{eyebrow}</p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-semibold text-white md:text-4xl">
            <BarChart3 className="h-8 w-8 text-cyan-300" />
            {title}
          </h1>
          <p className="mt-2 max-w-3xl text-base text-slate-300">{description}</p>
        </div>

        <button
          type="button"
          onClick={loadDashboard}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-semibold text-white shadow-lg shadow-purple-950/20 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-white/[0.07]"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
          Refresh live data
        </button>
      </section>

      {message ? (
        <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-5 py-4 text-cyan-100">
          {message}
        </div>
      ) : null}

      <section className="grid gap-4 md:grid-cols-4">
        {[
          ["Live records", summary.records, "Across connected APIs", Database],
          ["Operational signal", formatValue(summary.signal), "Summed key values", Activity],
          ["Healthy items", summary.active, "Completed or active records", ShieldCheck],
          ["Risk alerts", summary.risks, "Needs attention", Sparkles],
        ].map(([label, value, helper, Icon]) => {
          const MetricIcon = Icon as typeof Database;

          return (
            <div
              key={String(label)}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_50px_rgba(124,58,237,0.14)] backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-slate-300">{label as string}</p>
                <MetricIcon className="h-5 w-5 text-cyan-300" />
              </div>
              <p className="mt-3 text-3xl font-semibold text-white">{String(value)}</p>
              <p className="mt-2 text-sm text-cyan-200">{helper as string}</p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.resource}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_50px_rgba(124,58,237,0.14)] backdrop-blur-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">{item.label}</h2>
                <p className="mt-1 text-sm text-slate-300">{item.description}</p>
              </div>
              <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-sm font-semibold text-cyan-200 ring-1 ring-cyan-300/20">
                {item.count}
              </span>
            </div>
            {item.error ? (
              <p className="mt-5 rounded-xl border border-rose-300/20 bg-rose-500/10 p-3 text-sm text-rose-100">
                {item.error}
              </p>
            ) : (
              <div className="mt-5 space-y-3">
                {item.rows.slice(0, 3).map((row) => (
                  <div
                    key={asText(row.id ?? getName(row))}
                    className="rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-white">{getName(row)}</p>
                      <span className="whitespace-nowrap rounded-full bg-white/[0.06] px-3 py-1 text-xs font-semibold text-cyan-100">
                        {getStatus(row)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">{asText(row.id, item.resource)}</p>
                  </div>
                ))}
                {!item.rows.length ? <p className="text-sm text-slate-400">No records yet.</p> : null}
              </div>
            )}
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_50px_rgba(124,58,237,0.14)] backdrop-blur-2xl">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white">Recent live activity</h2>
          <p className="mt-1 text-sm text-slate-300">Latest records aggregated from the connected module APIs.</p>
        </div>

        {loading ? (
          <div className="flex min-h-40 items-center justify-center text-slate-300">
            <Loader2 className="mr-3 h-5 w-5 animate-spin text-cyan-300" />
            Loading dashboard summary...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-[0.24em] text-blue-200">
                  <th className="px-4 py-4">Record</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Module ID</th>
                  <th className="px-4 py-4">Updated</th>
                </tr>
              </thead>
              <tbody>
                {recentRows.map((row, index) => (
                  <tr
                    key={`${asText(row.id ?? getName(row))}-${index}`}
                    className={`border-b border-white/10 text-white ${index % 2 ? "bg-white/[0.03]" : ""}`}
                  >
                    <td className="px-4 py-5 font-semibold">{getName(row)}</td>
                    <td className="px-4 py-5">{getStatus(row)}</td>
                    <td className="px-4 py-5 text-slate-300">{asText(row.id)}</td>
                    <td className="px-4 py-5 text-slate-300">{asText(row.updatedAt ?? row.createdAt, "Live")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
