"use client";

import { useState } from "react";

const settings = ["Enable Socket.IO realtime updates", "Throttle duplicate alerts", "Require approval for SMS campaigns", "Mask sensitive payload fields", "Enable webhook signature verification"];

export default function NotificationSettingsPage() {
  const [enabled, setEnabled] = useState(settings);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Notification settings</h1>
      <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-6">
        <div className="space-y-4">
          {settings.map((item) => {
            const active = enabled.includes(item);
            return <button key={item} onClick={() => setEnabled(active ? enabled.filter((value) => value !== item) : [...enabled, item])} className="flex w-full items-center justify-between rounded-lg border border-slate-800 bg-slate-950/60 p-4 text-left"><span>{item}</span><span className={`rounded-full px-3 py-1 text-sm font-semibold ${active ? "bg-blue-600" : "bg-slate-800 text-slate-300"}`}>{active ? "On" : "Off"}</span></button>;
          })}
        </div>
      </section>
    </div>
  );
}
