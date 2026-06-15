import { AlertSummary, ChannelHealth, NotificationKpis } from "@/components/notifications/NotificationWidgets";

export default function NotificationAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Notification analytics</h1>
        <p className="mt-2 text-slate-300">Delivery quality, channel success, latency, and failure concentration.</p>
      </div>
      <NotificationKpis />
      <div className="grid gap-6 xl:grid-cols-2">
        <ChannelHealth />
        <AlertSummary />
      </div>
    </div>
  );
}
