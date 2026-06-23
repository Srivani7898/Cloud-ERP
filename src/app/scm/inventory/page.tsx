"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Boxes,
  CheckCircle2,
  Loader2,
  PackagePlus,
  RefreshCcw,
  Trash2,
  TriangleAlert,
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

type InventoryItem = {
  id: string;
  sku?: string;
  product: string;
  warehouse: string;
  qty?: number;
  quantity?: number;
  reorder?: number;
  reorderPoint?: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

const emptyItem = {
  sku: "",
  product: "",
  warehouse: "Bengaluru DC",
  qty: "0",
  reorder: "0",
};

const statusStyles: Record<string, string> = {
  "In Stock": "bg-emerald-500/15 text-emerald-200 ring-emerald-400/25",
  "Low Stock": "bg-amber-500/15 text-amber-200 ring-amber-400/25",
  "Out Of Stock": "bg-rose-500/15 text-rose-200 ring-rose-400/25",
  "Out of Stock": "bg-rose-500/15 text-rose-200 ring-rose-400/25",
};

function getQty(item: InventoryItem) {
  return item.qty ?? item.quantity ?? 0;
}

function getReorder(item: InventoryItem) {
  return item.reorder ?? item.reorderPoint ?? 0;
}

function getStockStatus(qty: number, reorder: number) {
  if (qty <= 0) return "Out Of Stock";
  if (qty < reorder) return "Low Stock";
  return "In Stock";
}

export default function SCMInventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [form, setForm] = useState(emptyItem);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const metrics = useMemo(() => {
    const totalQty = items.reduce((sum, item) => sum + getQty(item), 0);
    const lowStock = items.filter((item) => getQty(item) < getReorder(item)).length;
    const warehouses = new Set(items.map((item) => item.warehouse).filter(Boolean)).size;

    return { totalQty, lowStock, warehouses, skus: items.length };
  }, [items]);

  async function loadInventory() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/scm/inventory", { cache: "no-store" });
      const payload = (await response.json()) as ApiEnvelope<InventoryItem>;

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to load inventory.");
      }

      setItems(payload.data?.data ?? []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load inventory.");
    } finally {
      setLoading(false);
    }
  }

  async function createItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const qty = Number(form.qty);
    const reorder = Number(form.reorder);

    try {
      const response = await fetch("/api/scm/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sku: form.sku.trim().toUpperCase(),
          product: form.product.trim(),
          warehouse: form.warehouse,
          qty,
          reorder,
          status: getStockStatus(qty, reorder),
        }),
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to create inventory item.");
      }

      setForm(emptyItem);
      setMessage("Inventory item created and synced with the SCM backend API.");
      await loadInventory();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to create inventory item.");
    } finally {
      setSaving(false);
    }
  }

  async function updateItem(id: string, patch: Partial<InventoryItem>) {
    setMessage("");

    try {
      const response = await fetch(`/api/scm/inventory/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to update inventory item.");
      }

      setMessage(`Inventory item ${id} updated.`);
      await loadInventory();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to update inventory item.");
    }
  }

  async function deleteItem(id: string) {
    setMessage("");

    try {
      const response = await fetch(`/api/scm/inventory/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to delete inventory item.");
      }

      setMessage(`Inventory item ${id} deleted.`);
      await loadInventory();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to delete inventory item.");
    }
  }

  useEffect(() => {
    loadInventory();
  }, []);

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
            Supply Chain & Inventory
          </p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-semibold text-white md:text-4xl">
            <Boxes className="h-8 w-8 text-cyan-300" />
            Inventory control center
          </h1>
          <p className="mt-2 max-w-2xl text-base text-slate-300">
            Track warehouse quantities, reorder thresholds, and stock health through
            the live `/api/scm/inventory` backend.
          </p>
        </div>

        <button
          type="button"
          onClick={loadInventory}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-semibold text-white shadow-lg shadow-purple-950/20 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-white/[0.07]"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
          Refresh inventory
        </button>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {[
          ["Tracked SKUs", metrics.skus, "Items under control"],
          ["Total quantity", metrics.totalQty, "Available units"],
          ["Low-stock alerts", metrics.lowStock, "Below reorder policy"],
          ["Warehouses", metrics.warehouses, "Active locations"],
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
        onSubmit={createItem}
        className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_50px_rgba(124,58,237,0.14)] backdrop-blur-2xl"
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-white">Add inventory item</h2>
            <p className="mt-1 text-sm text-slate-300">
              Create a warehouse SKU and immediately persist it through the API.
            </p>
          </div>
          <PackagePlus className="hidden h-6 w-6 text-cyan-300 sm:block" />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_1.5fr_1fr_0.8fr_0.8fr_auto]">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">SKU</span>
            <input
              required
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
              value={form.product}
              onChange={(event) => setForm((current) => ({ ...current, product: event.target.value }))}
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
              placeholder="Enter Product"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Warehouse</span>
            <select
              value={form.warehouse}
              onChange={(event) => setForm((current) => ({ ...current, warehouse: event.target.value }))}
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition focus:border-cyan-300/70"
            >
              <option>Bengaluru DC</option>
              <option>Mumbai Hub</option>
              <option>Singapore Hub</option>
              <option>Hyderabad Plant</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Qty</span>
            <input
              required
              min="0"
              type="number"
              value={form.qty}
              onChange={(event) => setForm((current) => ({ ...current, qty: event.target.value }))}
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition focus:border-cyan-300/70"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Reorder</span>
            <input
              required
              min="0"
              type="number"
              value={form.reorder}
              onChange={(event) => setForm((current) => ({ ...current, reorder: event.target.value }))}
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition focus:border-cyan-300/70"
            />
          </label>

          <button
            type="submit"
            disabled={saving}
            className="mt-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 px-5 font-semibold text-white shadow-lg shadow-fuchsia-950/30 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <PackagePlus className="h-4 w-4" />}
            Create
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
          <h2 className="text-2xl font-semibold text-white">Inventory</h2>
          <p className="mt-1 text-sm text-slate-300">
            Live stock records from the SCM inventory API.
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-56 items-center justify-center text-slate-300">
            <Loader2 className="mr-3 h-5 w-5 animate-spin text-cyan-300" />
            Loading inventory...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-[0.24em] text-blue-200">
                  <th className="px-4 py-4">SKU</th>
                  <th className="px-4 py-4">Product</th>
                  <th className="px-4 py-4">Warehouse</th>
                  <th className="px-4 py-4">Qty</th>
                  <th className="px-4 py-4">Reorder</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="w-[360px] px-4 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  const qty = getQty(item);
                  const reorder = getReorder(item);
                  const style = statusStyles[item.status] ?? statusStyles["Low Stock"];

                  return (
                    <tr
                      key={item.id}
                      className={`border-b border-white/10 text-white ${index % 2 ? "bg-white/[0.03]" : ""}`}
                    >
                      <td className="px-4 py-5 whitespace-nowrap">
                        {item.sku ?? item.id}
                      </td>
                      <td className="px-4 py-5 whitespace-nowrap">
                        {item.product}
                      </td>

                      <td className="px-4 py-5 whitespace-nowrap">
                        {item.warehouse}
                      </td>

                      <td className="px-4 py-5 whitespace-nowrap">
                        {qty}
                      </td>

                      <td className="px-4 py-5 whitespace-nowrap">
                        {reorder}
                      </td>
                      <td className="px-4 py-5 whitespace-nowrap">
                        <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ring-1 ${style}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="w-[360px] px-4 py-5">
                        <div className="flex flex-nowrap justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => updateItem(item.id, { qty: reorder + 30, status: "In Stock" })}
                            className="inline-flex whitespace-nowrap items-center gap-2 rounded-lg border border-emerald-300/20 bg-emerald-500/15 px-3 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/25"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Restock
                          </button>
                          <button
                            type="button"
                            onClick={() => updateItem(item.id, { qty: 0, status: "Out Of Stock" })}
                            className="inline-flex whitespace-nowrap items-center gap-2 rounded-lg border border-amber-300/20 bg-amber-500/15 px-3 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-500/25"
                          >
                            <TriangleAlert className="h-4 w-4" />
                            Stockout
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteItem(item.id)}
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
