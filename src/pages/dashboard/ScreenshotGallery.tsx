import React, { useState } from "react";
import { Camera, Clock, Activity, Monitor } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Button from "../../components/Button";

// ---------------------------------------------------------------------------
// Types & data
// ---------------------------------------------------------------------------

type FilterKey = "all" | "high" | "low" | "idle";

interface FilterOption {
  key: FilterKey;
  label: string;
}

const filters: FilterOption[] = [
  { key: "all", label: "All" },
  { key: "high", label: "High Activity" },
  { key: "low", label: "Low Activity" },
  { key: "idle", label: "Idle" },
];

interface ScreenshotItem {
  id: string;
  timestamp: string;
  activity: number; // 0-100
  app: string;
  category: FilterKey;
}

const screenshots: ScreenshotItem[] = [
  {
    id: "1",
    timestamp: "10:15 AM",
    activity: 92,
    app: "VS Code",
    category: "high",
  },
  {
    id: "2",
    timestamp: "10:25 AM",
    activity: 88,
    app: "VS Code",
    category: "high",
  },
  {
    id: "3",
    timestamp: "10:35 AM",
    activity: 45,
    app: "Chrome",
    category: "low",
  },
  {
    id: "4",
    timestamp: "10:45 AM",
    activity: 78,
    app: "Figma",
    category: "high",
  },
  {
    id: "5",
    timestamp: "10:55 AM",
    activity: 12,
    app: "Desktop",
    category: "idle",
  },
  {
    id: "6",
    timestamp: "11:05 AM",
    activity: 67,
    app: "Slack",
    category: "low",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function activityColor(level: number): string {
  if (level >= 80) return "bg-primary text-primary-foreground";
  if (level >= 50) return "bg-warning text-primary-foreground";
  if (level >= 25) return "bg-[#FF5C33] text-white";
  return "bg-muted-foreground text-white";
}

function filterScreenshots(
  items: ScreenshotItem[],
  filter: FilterKey
): ScreenshotItem[] {
  if (filter === "all") return items;
  return items.filter((s) => s.category === filter);
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface ScreenshotCardProps {
  screenshot: ScreenshotItem;
}

function ScreenshotCard({ screenshot }: ScreenshotCardProps) {
  return (
    <div className="bg-card border border-border rounded-none overflow-hidden">
      {/* Placeholder image area */}
      <div className="relative aspect-video bg-[#0A0A0A] flex items-center justify-center">
        <Monitor className="h-10 w-10 text-muted-foreground/30" />

        {/* Activity badge — top right */}
        <span
          className={`absolute top-2 right-2 px-2 py-0.5 font-primary text-xs font-semibold tabular-nums rounded-none ${activityColor(
            screenshot.activity
          )}`}
        >
          {screenshot.activity}%
        </span>
      </div>

      {/* Meta bar */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border">
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="font-primary text-muted-foreground text-xs tabular-nums">
            {screenshot.timestamp}
          </span>
        </div>

        <span className="font-secondary text-foreground text-xs font-medium">
          {screenshot.app}
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ScreenshotGallery(): React.JSX.Element {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const visible = filterScreenshots(screenshots, activeFilter);

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <PageHeader title="Screenshot Gallery" subtitle="Activity Screenshots" />

      {/* Filters */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {filters.map((f) => {
          const isActive = f.key === activeFilter;
          return (
            <Button
              key={f.key}
              variant={isActive ? "primary" : "ghost"}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </Button>
          );
        })}
      </div>

      {/* Summary line */}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-muted-foreground">
        <SummaryChip icon={Camera} text="52 screenshots" />
        <span className="text-border">|</span>
        <SummaryChip icon={Clock} text="4h 12m tracked" />
        <span className="text-border">|</span>
        <SummaryChip icon={Activity} text="Avg 87% activity" />
      </div>

      {/* Screenshot grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((s) => (
          <ScreenshotCard key={s.id} screenshot={s} />
        ))}
      </div>

      {/* Empty state */}
      {visible.length === 0 && (
        <div className="mt-12 flex flex-col items-center justify-center gap-3">
          <Camera className="h-12 w-12 text-muted-foreground/30" />
          <p className="font-secondary text-muted-foreground text-sm">
            No screenshots match the selected filter.
          </p>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tiny helper
// ---------------------------------------------------------------------------

function SummaryChip({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 font-secondary text-sm">
      <Icon className="h-3.5 w-3.5" />
      {text}
    </span>
  );
}
