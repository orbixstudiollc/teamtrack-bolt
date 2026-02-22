import React, { useState } from "react";
import { Mail, Bell, Moon, Clock } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Toggle from "../../components/Toggle";
import Input from "../../components/Input";

interface NotificationToggle {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

interface QuietHoursConfig {
  enabled: boolean;
  startTime: string;
  endTime: string;
}

function NotificationRow({
  item,
  onToggle,
}: {
  item: NotificationToggle;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-border">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-foreground font-secondary">
          {item.label}
        </span>
        <span className="text-xs text-muted-foreground font-secondary">
          {item.description}
        </span>
      </div>
      <Toggle checked={item.enabled} onChange={() => onToggle(item.id)} />
    </div>
  );
}

export default function Notifications() {
  const [emailNotifications, setEmailNotifications] = useState<
    NotificationToggle[]
  >([
    {
      id: "leave-requests",
      label: "Leave Requests",
      description:
        "Receive email notifications when team members submit or update leave requests.",
      enabled: true,
    },
    {
      id: "payroll-updates",
      label: "Payroll Updates",
      description:
        "Get notified about payroll processing, salary changes, and payment confirmations.",
      enabled: true,
    },
    {
      id: "project-updates",
      label: "Project Updates",
      description:
        "Stay informed about project milestones, deadline changes, and status updates.",
      enabled: false,
    },
    {
      id: "team-changes",
      label: "Team Changes",
      description:
        "Receive alerts when team members join, leave, or change roles within the organization.",
      enabled: true,
    },
  ]);

  const [pushNotifications, setPushNotifications] = useState<
    NotificationToggle[]
  >([
    {
      id: "direct-messages",
      label: "Direct Messages",
      description:
        "Push notifications for new direct messages and conversation replies.",
      enabled: true,
    },
    {
      id: "task-assignments",
      label: "Task Assignments",
      description:
        "Get notified when you are assigned new tasks or when task priorities change.",
      enabled: true,
    },
    {
      id: "system-alerts",
      label: "System Alerts",
      description:
        "Important system notifications including maintenance windows and security alerts.",
      enabled: true,
    },
    {
      id: "reminders",
      label: "Reminders",
      description:
        "Scheduled reminders for upcoming meetings, deadlines, and pending approvals.",
      enabled: false,
    },
  ]);

  const [quietHours, setQuietHours] = useState<QuietHoursConfig>({
    enabled: false,
    startTime: "22:00",
    endTime: "07:00",
  });

  const toggleEmailNotification = (id: string) => {
    setEmailNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  const togglePushNotification = (id: string) => {
    setPushNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="Notification Settings" />

      {/* Email Notifications */}
      <section className="border border-border bg-card p-6">
        <div className="mb-6 flex items-center gap-3">
          <Mail className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground font-primary">
            Email Notifications
          </h2>
        </div>

        <div className="flex flex-col">
          {emailNotifications.map((item) => (
            <NotificationRow
              key={item.id}
              item={item}
              onToggle={toggleEmailNotification}
            />
          ))}
        </div>
      </section>

      {/* Push Notifications */}
      <section className="border border-border bg-card p-6">
        <div className="mb-6 flex items-center gap-3">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground font-primary">
            Push Notifications
          </h2>
        </div>

        <div className="flex flex-col">
          {pushNotifications.map((item) => (
            <NotificationRow
              key={item.id}
              item={item}
              onToggle={togglePushNotification}
            />
          ))}
        </div>
      </section>

      {/* Notification Schedule */}
      <section className="border border-border bg-card p-6">
        <div className="mb-6 flex items-center gap-3">
          <Moon className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground font-primary">
            Notification Schedule
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {/* Quiet Hours Toggle */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-foreground font-secondary">
                Quiet Hours
              </span>
              <span className="text-xs text-muted-foreground font-secondary">
                Mute all non-critical notifications during specified hours. Only
                urgent system alerts will be delivered.
              </span>
            </div>
            <Toggle
              checked={quietHours.enabled}
              onChange={() =>
                setQuietHours((prev) => ({ ...prev, enabled: !prev.enabled }))
              }
            />
          </div>

          {/* Quiet Hours Time Range */}
          {quietHours.enabled && (
            <div className="flex flex-col gap-4 border-t border-border pt-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-secondary">
                <Clock className="h-4 w-4" />
                <span>
                  Notifications will be silenced during the time window below.
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-foreground font-secondary">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={quietHours.startTime}
                    onChange={(e) =>
                      setQuietHours((prev) => ({
                        ...prev,
                        startTime: e.target.value,
                      }))
                    }
                    className="w-full rounded-none border border-border bg-[#0A0A0A] px-4 py-2.5 text-sm text-foreground font-secondary outline-none transition-colors focus:border-primary"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-foreground font-secondary">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={quietHours.endTime}
                    onChange={(e) =>
                      setQuietHours((prev) => ({
                        ...prev,
                        endTime: e.target.value,
                      }))
                    }
                    className="w-full rounded-none border border-border bg-[#0A0A0A] px-4 py-2.5 text-sm text-foreground font-secondary outline-none transition-colors focus:border-primary"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
