"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, Plus, Truck } from "lucide-react";

const emptyVendor = {
  name: "",
  contact: "",
  email: "",
  region: "",
};

export default function CreateVendorPage() {
  const [form, setForm] = useState(emptyVendor);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Enter vendor master details and create a supplier record.");

  async function createVendor() {
    if (!form.name || !form.contact || !form.email || !form.region) {
      setMessage("Please fill Vendor, Contact, Email, and Region before creating the vendor.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/scm/vendors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          contact: form.contact,
          email: form.email,
          region: form.region,
          rating: 4.5,
          status: "Active",
        }),
      });
      const json = await response.json();
      if (json?.success) {
        setForm(emptyVendor);
        setMessage(`${form.name} was created and synced to the SCM vendor API.`);
      } else {
        setMessage("Vendor was not created. Check the API response.");
      }
    } catch {
      setMessage("Unable to create vendor. Check the dev server and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">Supply Chain & Inventory</p>
        <h1 className="mt-3 flex items-center gap-3 text-3xl font-bold text-white">
          <Truck className="h-8 w-8 text-cyan-300" />
          Create vendor
        </h1>
        <p className="mt-3 text-lg text-slate-300">Add a supplier to the SCM vendor master.</p>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 shadow-[0_0_60px_rgba(124,58,237,0.14)] backdrop-blur-xl">
        <div className="grid gap-5 lg:grid-cols-4">
          <label className="space-y-2">
            <span className="font-semibold text-white">Vendor</span>
            <input
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="Test Global Vendor"
              className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300"
            />
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-white">Contact</span>
            <input
              value={form.contact}
              onChange={(event) => setForm((current) => ({ ...current, contact: event.target.value }))}
              placeholder="Ravi Kumar"
              className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300"
            />
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-white">Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              placeholder="vendor@test.com"
              className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300"
            />
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-white">Region</span>
            <input
              value={form.region}
              onChange={(event) => setForm((current) => ({ ...current, region: event.target.value }))}
              placeholder="India"
              className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-5 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            onClick={createVendor}
            disabled={loading}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 px-8 font-bold text-white shadow-[0_0_35px_rgba(236,72,153,0.35)] transition hover:scale-[1.02] disabled:opacity-60"
          >
            <Plus className="h-5 w-5" />
            Create vendor
          </button>
          <Link
            href="/scm/vendors"
            className="inline-flex h-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 font-semibold text-white transition hover:border-cyan-300/60 hover:bg-white/10"
          >
            View vendors
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
