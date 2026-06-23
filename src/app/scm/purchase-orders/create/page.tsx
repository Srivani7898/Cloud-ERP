"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CheckCircle2,
  ClipboardList,
  Plus,
  RotateCcw,
  Trash2,
  FileText,
} from "lucide-react";

const emptyOrder = {
  vendor: "",
  sku: "",
  quantity: "",
  total: "",
  expected: "",
};

export default function CreatePurchaseOrderPage() {
  const [form, setForm] =
    useState(emptyOrder);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState(
      "Create a vendor PO for replenishment."
    );

  const clearForm = () => {
    setForm(emptyOrder);
    setMessage("Form cleared.");
  };

  const deleteForm = () => {
    setForm(emptyOrder);
    setMessage(
      "Draft purchase order deleted."
    );
  };

  const saveDraft = () => {
    localStorage.setItem(
      "scm-po-draft",
      JSON.stringify(form)
    );

    setMessage(
      "Purchase order saved as draft."
    );
  };

  async function createPurchaseOrder() {
    if (
      !form.vendor ||
      !form.sku ||
      !form.quantity ||
      !form.total ||
      !form.expected
    ) {
      setMessage(
        "Please fill Vendor, SKU, Quantity, Total, and Expected Date."
      );

      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/scm/purchase-orders",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            vendor: form.vendor,
            sku: form.sku,
            quantity: Number(
              form.quantity
            ),
            total: Number(
              form.total
            ),
            expectedDate:
              form.expected,
            status: "draft",
          }),
        }
      );

      const json =
        await response.json();

      if (json?.success) {
        setMessage(
          `Purchase order created successfully for ${form.vendor}.`
        );

        setForm(emptyOrder);

        localStorage.removeItem(
          "scm-po-draft"
        );
      } else {
        setMessage(
          "Purchase order was not created."
        );
      }
    } catch {
      setMessage(
        "Unable to create purchase order."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">
          Supply Chain & Inventory
        </p>

        <h1 className="mt-3 flex items-center gap-3 text-3xl font-bold text-white">
          <ClipboardList className="h-8 w-8 text-cyan-300" />
          Create Purchase Order
        </h1>

        <p className="mt-3 text-lg text-slate-300">
          Create a vendor PO for
          replenishment.
        </p>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 shadow-[0_0_60px_rgba(124,58,237,0.14)] backdrop-blur-xl">
        <div className="grid gap-5 lg:grid-cols-5">
          <label className="space-y-2">
            <span className="font-semibold text-white">
              Vendor
            </span>

            <input
              autoComplete="off"
              value={form.vendor}
              onChange={(event) =>
                setForm(
                  (current) => ({
                    ...current,
                    vendor:
                      event.target
                        .value,
                  })
                )
              }
              placeholder="Enter Vendor"
              className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none"
            />
          </label>

          <label className="space-y-2">
            <span className="font-semibold text-white">
              SKU
            </span>

            <input
              autoComplete="off"
              value={form.sku}
              onChange={(event) =>
                setForm(
                  (current) => ({
                    ...current,
                    sku: event.target
                      .value,
                  })
                )
              }
              placeholder="Enter SKU"
              className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none"
            />
          </label>

          <label className="space-y-2">
            <span className="font-semibold text-white">
              Quantity
            </span>

            <input
              autoComplete="off"
              type="number"
              value={form.quantity}
              onChange={(event) =>
                setForm(
                  (current) => ({
                    ...current,
                    quantity:
                      event.target
                        .value,
                  })
                )
              }
              placeholder="0"
              className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none"
            />
          </label>

          <label className="space-y-2">
            <span className="font-semibold text-white">
              Total
            </span>

            <input
              autoComplete="off"
              type="number"
              value={form.total}
              onChange={(event) =>
                setForm(
                  (current) => ({
                    ...current,
                    total:
                      event.target
                        .value,
                  })
                )
              }
              placeholder="0"
              className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none"
            />
          </label>

          <label className="space-y-2">
            <span className="font-semibold text-white">
              Expected Date
            </span>

            <input
              type="date"
              value={form.expected}
              onChange={(event) =>
                setForm(
                  (current) => ({
                    ...current,
                    expected:
                      event.target
                        .value,
                  })
                )
              }
              className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={
              createPurchaseOrder
            }
            disabled={loading}
            className="inline-flex h-14 items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 px-8 font-bold text-white"
          >
            <Plus className="h-5 w-5" />
            Create PO
          </button>

          <button
            onClick={saveDraft}
            type="button"
            className="inline-flex h-14 items-center gap-2 rounded-xl border border-white/10 px-6 text-white"
          >
            <FileText className="h-5 w-5" />
            Draft
          </button>

          <button
            onClick={clearForm}
            type="button"
            className="inline-flex h-14 items-center gap-2 rounded-xl border border-white/10 px-6 text-white"
          >
            <RotateCcw className="h-5 w-5" />
            Clear
          </button>

          <button
            onClick={deleteForm}
            type="button"
            className="inline-flex h-14 items-center gap-2 rounded-xl border border-red-500/40 px-6 text-red-300"
          >
            <Trash2 className="h-5 w-5" />
            Delete
          </button>

          <Link
            href="/scm/purchase-orders"
            className="inline-flex h-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 font-semibold text-white"
          >
            View Purchase Orders
          </Link>
        </div>

        <p className="mt-5 flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-100">
          <CheckCircle2 className="h-4 w-4" />
          {message}
        </p>
      </section>
    </div>
  );
}