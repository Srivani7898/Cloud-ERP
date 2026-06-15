import { LiveModuleDashboard } from "@/components/shared/LiveModuleDashboard";

export default function NotificationsDashboardPage() {
  return (
    <LiveModuleDashboard
      eyebrow="Notification Engine"
      title="Enterprise communication command center"
      description="Live inbox, template, delivery history, retry queue, and channel summaries from notification APIs."
      moduleKey="notifications"
      resources={[
        { resource: "inbox", label: "Inbox", description: "In-app notification records and unread state." },
        { resource: "channels", label: "Channels", description: "Email, SMS, webhook, and in-app delivery setup." },
        { resource: "history", label: "History", description: "Delivery tracking and notification outcomes." },
        { resource: "retry-queue", label: "Retry Queue", description: "Failed delivery retries and recovery workflow." },
      ]}
    />
  );
}
