"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  BellRing,
  CheckCircle2,
  Loader2,
  MailCheck,
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

type NotificationItem = {
  id: string;
  title: string;
  channel?: string;
  severity?: string;
  status: string;
  message?: string;
  createdAt?: string;
  updatedAt?: string;
};

const emptyNotification = {
  title: "",
  channel: "In-App",
  severity: "High",
  message: "",
};

const severityStyles: Record<string, string> = {
  Low: "bg-emerald-500/15 text-emerald-200 ring-emerald-400/25",
  Normal: "bg-blue-500/15 text-blue-200 ring-blue-400/25",
  Medium: "bg-blue-500/15 text-blue-200 ring-blue-400/25",
  High: "bg-amber-500/15 text-amber-200 ring-amber-400/25",
  Critical: "bg-rose-500/15 text-rose-200 ring-rose-400/25",
};

const statusStyles: Record<string, string> = {
  Unread: "bg-cyan-500/15 text-cyan-200 ring-cyan-400/25",
  Read: "bg-emerald-500/15 text-emerald-200 ring-emerald-400/25",
  Sent: "bg-blue-500/15 text-blue-200 ring-blue-400/25",
  Failed: "bg-rose-500/15 text-rose-200 ring-rose-400/25",
  Retrying: "bg-amber-500/15 text-amber-200 ring-amber-400/25",
};

export default function NotificationsInboxPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [form, setForm] = useState(emptyNotification);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const metrics = useMemo(() => {
    const unread = notifications.filter((item) => item.status === "Unread").length;
    const high = notifications.filter((item) => ["High", "Critical"].includes(item.severity ?? "")).length;
    const channels = new Set(notifications.map((item) => item.channel).filter(Boolean)).size;

    return { total: notifications.length, unread, high, channels };
  }, [notifications]);

  async function loadNotifications() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/notifications/inbox", { cache: "no-store" });
      const payload = (await response.json()) as ApiEnvelope<NotificationItem>;

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to load notifications.");
      }

      setNotifications(payload.data?.data ?? []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load notifications.");
    } finally {
      setLoading(false);
    }
  }

  async function createNotification(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/notifications/inbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          channel: form.channel,
          severity: form.severity,
          status: "Unread",
          message: form.message.trim() || "ERP event requires attention.",
        }),
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to create notification.");
      }

      setForm(emptyNotification);
      setMessage("Notification created and synced with the notifications backend API.");
      await loadNotifications();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to create notification.");
    } finally {
      setSaving(false);
    }
  }

  async function updateNotification(id: string, patch: Partial<NotificationItem>) {
    setMessage("");

    try {
      const response = await fetch(`/api/notifications/inbox/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to update notification.");
      }

      setMessage(`Notification ${id} updated.`);
      await loadNotifications();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to update notification.");
    }
  }

  async function deleteNotification(id: string) {
    setMessage("");

    try {
      const response = await fetch(`/api/notifications/inbox/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to delete notification.");
      }

      setMessage(`Notification ${id} deleted.`);
      await loadNotifications();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to delete notification.");
    }
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
            Notification Engine
          </p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-semibold text-white md:text-4xl">
            <BellRing className="h-8 w-8 text-cyan-300" />
            Notification inbox
          </h1>
          <p className="mt-2 max-w-2xl text-base text-slate-300">
            Manage in-app alerts, delivery state, severity, and channel context
            through the live `/api/notifications/inbox` backend.
          </p>
        </div>

        <button
          type="button"
          onClick={loadNotifications}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-semibold text-white shadow-lg shadow-purple-950/20 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-white/[0.07]"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
          Refresh inbox
        </button>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {[
          ["Notifications", metrics.total, "Inbox records"],
          ["Unread", metrics.unread, "Awaiting action"],
          ["High priority", metrics.high, "Important alerts"],
          ["Channels", metrics.channels, "Delivery surfaces"],
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
        onSubmit={createNotification}
        className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_50px_rgba(124,58,237,0.14)] backdrop-blur-2xl"
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-white">Create notification</h2>
            <p className="mt-1 text-sm text-slate-300">
              Send a test ERP alert into the notification API.
            </p>
          </div>
          <MailCheck className="hidden h-6 w-6 text-cyan-300 sm:block" />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1.6fr_auto]">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Title</span>
            <input
              required
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
              placeholder="Finance approval alert"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Channel</span>
            <select
              value={form.channel}
              onChange={(event) => setForm((current) => ({ ...current, channel: event.target.value }))}
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition focus:border-cyan-300/70 [&>option]:bg-slate-950 [&>option]:text-white"
            >
              <option>In-App</option>
              <option>Email</option>
              <option>SMS</option>
              <option>Webhook</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Severity</span>
            <select
              value={form.severity}
              onChange={(event) => setForm((current) => ({ ...current, severity: event.target.value }))}
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition focus:border-cyan-300/70 [&>option]:bg-slate-950 [&>option]:text-white"
            >
              <option>Low</option>
              <option>Normal</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-white">Message</span>
            <input
              value={form.message}
              onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
              className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
              placeholder="Finance approval requires action."
            />
          </label>

          <button
            type="submit"
            disabled={saving}
            className="mt-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 px-5 font-semibold text-white shadow-lg shadow-fuchsia-950/30 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <BellRing className="h-4 w-4" />}
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
          <h2 className="text-2xl font-semibold text-white">Inbox</h2>
          <p className="mt-1 text-sm text-slate-300">
            Live notification records from the inbox API.
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-56 items-center justify-center text-slate-300">
            <Loader2 className="mr-3 h-5 w-5 animate-spin text-cyan-300" />
            Loading notifications...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1040px] text-left">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-[0.24em] text-blue-200">
                  <th className="px-4 py-4">Notification</th>
                  <th className="px-4 py-4">Channel</th>
                  <th className="px-4 py-4">Severity</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Message</th>
                  <th className="w-[330px] px-4 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((item, index) => {
                  const severity = item.severity ?? "Normal";
                  const severityStyle = severityStyles[severity] ?? severityStyles.Normal;
                  const statusStyle = statusStyles[item.status] ?? statusStyles.Unread;

                  return (
                    <tr
                      key={item.id}
                      className={`border-b border-white/10 text-white ${index % 2 ? "bg-white/[0.03]" : ""}`}
                    >
                      <td className="px-4 py-5">
                        <div className="font-semibold">{item.title}</div>
                        <div className="text-xs text-slate-400">{item.id}</div>
                      </td>
                      <td className="px-4 py-5">{item.channel ?? "In-App"}</td>
                      <td className="px-4 py-5">
                        <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ring-1 ${severityStyle}`}>
                          {severity}
                        </span>
                      </td>
                      <td className="px-4 py-5">
                        <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusStyle}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="max-w-[320px] px-4 py-5 text-slate-200">{item.message ?? "ERP event notification."}</td>
                      <td className="w-[330px] px-4 py-5">
                        <div className="flex flex-nowrap justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => updateNotification(item.id, { status: "Read", severity: "Normal" })}
                            className="inline-flex whitespace-nowrap items-center gap-2 rounded-lg border border-emerald-300/20 bg-emerald-500/15 px-3 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/25"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Mark read
                          </button>
                          <button
                            type="button"
                            onClick={() => updateNotification(item.id, { status: "Retrying", severity: "High" })}
                            className="inline-flex whitespace-nowrap items-center gap-2 rounded-lg border border-amber-300/20 bg-amber-500/15 px-3 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-500/25"
                          >
                            <TriangleAlert className="h-4 w-4" />
                            Retry
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteNotification(item.id)}
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
