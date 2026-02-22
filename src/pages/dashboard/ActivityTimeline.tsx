import React, { useState } from "react";
import {
  Clock,
  Coffee,
  TrendingUp,
  AppWindow,
  Code,
  Paintbrush,
  MessageSquare,
  Globe,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";
import MetricCard from "../../components/MetricCard";

// ---------------------------------------------------------------------------
// Types & data
// ---------------------------------------------------------------------------

type ActivityCategory = "coding" | "design" | "communication" | "browsing";

const categoryMeta: Record<
  ActivityCategory,
  { label: string; colorClass: string; dotClass: string; icon: React.ElementType }
> = {
  coding: {
    label: "Coding",
    colorClass: "bg-info",
    dotClass: "bg-[#00C2FF]",
    icon: Code,
  },
  design: {
    label: "Design",
    colorClass: "bg-primary",
    dotClass: "bg-[#BFFF00]",
    icon: Paintbrush,
  },
  communication: {
    label: "Communication",
    colorClass: "bg-purple",
    dotClass: "bg-[#7B61FF]",
    icon: MessageSquare,
  },
  browsing: {
    label: "Browsing",
    colorClass: "bg-warning",
    dotClass: "bg-[#FFB800]",
    icon: Globe,
  },
};

interface TimelineEntry {
  id: string;
  time: string;
  category: ActivityCategory;
  app: string;
  windowTitle: string;
  duration: string;
  activityLevel: number; // 0-100
}

const timelineEntries: TimelineEntry[] = [
  {
    id: "1",
    time: "9:00 AM",
    category: "coding",
    app: "VS Code",
    windowTitle: "ActivityMonitor.tsx - TeamTrack Pro",
    duration: "48 min",
    activityLevel: 94,
  },
  {
    id: "2",
    time: "10:00 AM",
    category: "design",
    app: "Figma",
    windowTitle: "Dashboard Components - TeamTrack",
    duration: "35 min",
    activityLevel: 88,
  },
  {
    id: "3",
    time: "11:00 AM",
    category: "communication",
    app: "Slack",
    windowTitle: "#dev-frontend",
    duration: "22 min",
    activityLevel: 72,
  },
  {
    id: "4",
    time: "12:00 PM",
    category: "browsing",
    app: "Chrome",
    windowTitle: "React 18 Docs - react.dev",
    duration: "40 min",
    activityLevel: 81,
  },
  {
    id: "5",
    time: "1:00 PM",
    category: "coding",
    app: "VS Code",
    windowTitle: "useTimeline.ts - TeamTrack Pro",
    duration: "55 min",
    activityLevel: 96,
  },
  {
    id: "6",
    time: "2:00 PM",
    category: "design",
    app: "Figma",
    windowTitle: "Screenshot Gallery Layout",
    duration: "30 min",
    activityLevel: 85,
  },
  {
    id: "7",
    time: "3:00 PM",
    category: "communication",
    app: "Slack",
    windowTitle: "#design-review",
    duration: "18 min",
    activityLevel: 65,
  },
  {
    id: "8",
    time: "4:00 PM",
    category: "coding",
    app: "VS Code",
    windowTitle: "ScreenshotGallery.tsx - TeamTrack Pro",
    duration: "52 min",
    activityLevel: 91,
  },
];

const stats = [
  { label: "Active Time", value: "6h 42m", icon: Clock, accentClass: "text-primary" },
  { label: "Idle Time", value: "1h 18m", icon: Coffee, accentClass: "text-[#FF5C33]" },
  { label: "Productive", value: "84%", icon: TrendingUp, accentClass: "text-[#00C2FF]" },
  { label: "Apps Used", value: "12", icon: AppWindow, accentClass: "text-[#7B61FF]" },
] as const;

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface TimelineItemProps {
  entry: TimelineEntry;
  isSelected: boolean;
  onSelect: () => void;
}

function TimelineItem({ entry, isSelected, onSelect }: TimelineItemProps) {
  const meta = categoryMeta[entry.category];
  const Icon = meta.icon;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex items-start gap-4 w-full text-left px-4 py-3 transition-colors rounded-none border ${
        isSelected
          ? "bg-[#0A0A0A] border-border"
          : "bg-transparent border-transparent hover:bg-[#0A0A0A]"
      }`}
    >
      {/* Time marker */}
      <span className="font-primary text-muted-foreground text-xs w-16 shrink-0 pt-0.5 tabular-nums">
        {entry.time}
      </span>

      {/* Dot & connector line */}
      <div className="flex flex-col items-center shrink-0 pt-1.5">
        <span className={`h-3 w-3 rounded-full ${meta.dotClass}`} />
        <span className="w-px flex-1 bg-border mt-1" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Icon className={`h-4 w-4 ${meta.dotClass.replace("bg-", "text-")}`} />
          <span className="font-secondary text-foreground text-sm font-medium truncate">
            {entry.app}
          </span>
          <span className="font-primary text-muted-foreground text-xs ml-auto tabular-nums shrink-0">
            {entry.duration}
          </span>
        </div>
        <p className="font-secondary text-muted-foreground text-xs truncate">
          {entry.windowTitle}
        </p>

        {/* Activity bar */}
        <div className="mt-2 h-1.5 w-full bg-[#0A0A0A] rounded-none">
          <div
            className={`h-full ${meta.colorClass} rounded-none`}
            style={{ width: `${entry.activityLevel}%` }}
          />
        </div>
      </div>
    </button>
  );
}

interface DetailPanelProps {
  entry: TimelineEntry;
}

function DetailPanel({ entry }: DetailPanelProps) {
  const meta = categoryMeta[entry.category];
  const Icon = meta.icon;

  return (
    <div className="bg-card border border-border p-6 rounded-none">
      <h3 className="font-primary text-foreground text-sm font-semibold uppercase tracking-wider mb-5">
        Selected Activity
      </h3>

      <div className="flex flex-col gap-5">
        {/* Category badge */}
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${meta.dotClass}`} />
          <span className="font-secondary text-foreground text-sm font-medium">
            {meta.label}
          </span>
        </div>

        {/* Info rows */}
        <div className="flex flex-col gap-3">
          <DetailRow label="Application" value={entry.app} />
          <DetailRow label="Window Title" value={entry.windowTitle} />
          <DetailRow label="Time" value={entry.time} />
          <DetailRow label="Duration" value={entry.duration} />
        </div>

        {/* Activity level */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-secondary text-muted-foreground text-xs">
              Activity Level
            </span>
            <span className="font-primary text-foreground text-sm tabular-nums">
              {entry.activityLevel}%
            </span>
          </div>
          <div className="h-2.5 w-full bg-[#0A0A0A] rounded-none">
            <div
              className={`h-full ${meta.colorClass} rounded-none transition-all duration-300`}
              style={{ width: `${entry.activityLevel}%` }}
            />
          </div>
        </div>

        {/* Icon */}
        <div className="flex items-center justify-center py-4 bg-[#0A0A0A] border border-border rounded-none">
          <Icon className={`h-10 w-10 ${meta.dotClass.replace("bg-", "text-")}`} />
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-secondary text-muted-foreground text-xs">{label}</span>
      <span className="font-secondary text-foreground text-sm">{value}</span>
    </div>
  );
}

function TimelineLegend() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {(Object.keys(categoryMeta) as ActivityCategory[]).map((key) => {
        const meta = categoryMeta[key];
        return (
          <div key={key} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${meta.dotClass}`} />
            <span className="font-secondary text-muted-foreground text-xs">
              {meta.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ActivityTimeline(): React.JSX.Element {
  const [selectedId, setSelectedId] = useState<string>(timelineEntries[0].id);

  const selectedEntry =
    timelineEntries.find((e) => e.id === selectedId) ?? timelineEntries[0];

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <PageHeader title="Activity Timeline" subtitle="Sarah Chen" />

      {/* Stat cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <MetricCard
            key={s.label}
            label={s.label}
            value={s.value}
            icon={s.icon}
            accentClass={s.accentClass}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6">
        <TimelineLegend />
      </div>

      {/* Two-column layout */}
      <div className="mt-4 flex flex-col lg:flex-row gap-4">
        {/* Timeline */}
        <div className="flex-1 bg-card border border-border rounded-none">
          <div className="p-4 border-b border-border">
            <h3 className="font-primary text-foreground text-sm font-semibold uppercase tracking-wider">
              Timeline
            </h3>
          </div>

          <div className="flex flex-col">
            {timelineEntries.map((entry) => (
              <TimelineItem
                key={entry.id}
                entry={entry}
                isSelected={entry.id === selectedId}
                onSelect={() => setSelectedId(entry.id)}
              />
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <div className="w-full lg:w-[280px] shrink-0">
          <DetailPanel entry={selectedEntry} />
        </div>
      </div>
    </div>
  );
}
