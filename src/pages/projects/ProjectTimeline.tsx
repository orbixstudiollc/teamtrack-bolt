import React, { useMemo } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Button from "../../components/Button";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Phase {
  id: string;
  name: string;
  startDate: string; // ISO date
  endDate: string;   // ISO date
  progress: number;  // 0-100
  color: string;     // Tailwind bg class
  barColor: string;  // Hex for inline styles
  assignees: string[];
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const phases: Phase[] = [
  {
    id: "ph1",
    name: "Research",
    startDate: "2025-10-14",
    endDate: "2025-10-28",
    progress: 100,
    color: "bg-[#7B61FF]",
    barColor: "#7B61FF",
    assignees: ["Alice Johnson", "Bob Smith"],
  },
  {
    id: "ph2",
    name: "Design",
    startDate: "2025-10-21",
    endDate: "2025-11-11",
    progress: 85,
    color: "bg-[#00C2FF]",
    barColor: "#00C2FF",
    assignees: ["Carol Lee", "David Kim"],
  },
  {
    id: "ph3",
    name: "Frontend",
    startDate: "2025-11-04",
    endDate: "2025-12-02",
    progress: 45,
    color: "bg-[#BFFF00]",
    barColor: "#BFFF00",
    assignees: ["Eva Martinez", "Frank Chen"],
  },
  {
    id: "ph4",
    name: "Backend",
    startDate: "2025-11-04",
    endDate: "2025-12-09",
    progress: 38,
    color: "bg-[#FFB800]",
    barColor: "#FFB800",
    assignees: ["Grace Liu", "Henry Park"],
  },
  {
    id: "ph5",
    name: "Testing",
    startDate: "2025-11-25",
    endDate: "2025-12-16",
    progress: 10,
    color: "bg-[#FF5C33]",
    barColor: "#FF5C33",
    assignees: ["Iris Wang", "Jack Brown"],
  },
  {
    id: "ph6",
    name: "Launch",
    startDate: "2025-12-15",
    endDate: "2025-12-22",
    progress: 0,
    color: "bg-[#BFFF00]",
    barColor: "#BFFF00",
    assignees: ["Karen Davis"],
  },
];

// ---------------------------------------------------------------------------
// Date helpers
// ---------------------------------------------------------------------------

function toDate(iso: string): Date {
  return new Date(iso + "T00:00:00");
}

function formatShortDate(iso: string): string {
  const d = toDate(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

function getWeekLabels(start: Date, end: Date): { label: string; offset: number }[] {
  const labels: { label: string; offset: number }[] = [];
  const totalDays = daysBetween(start, end);
  const current = new Date(start);

  // Align to next Monday
  const dayOfWeek = current.getDay();
  const daysUntilMonday = dayOfWeek === 0 ? 1 : dayOfWeek === 1 ? 0 : 8 - dayOfWeek;
  current.setDate(current.getDate() + daysUntilMonday);

  while (current <= end) {
    const offset = daysBetween(start, current);
    const pct = (offset / totalDays) * 100;
    labels.push({
      label: current.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      offset: pct,
    });
    current.setDate(current.getDate() + 7);
  }

  return labels;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getProgressLabel(progress: number): string {
  if (progress === 100) return "Complete";
  if (progress === 0) return "Not Started";
  return `${progress}%`;
}

function getProgressTextColor(progress: number): string {
  if (progress === 100) return "text-[#BFFF00]";
  if (progress >= 60) return "text-[#BFFF00]";
  if (progress >= 30) return "text-[#FFB800]";
  if (progress > 0) return "text-[#FF5C33]";
  return "text-[#6e6e6e]";
}

// ---------------------------------------------------------------------------
// Desktop Gantt Chart
// ---------------------------------------------------------------------------

const GanttChart: React.FC = () => {
  const { timelineStart, timelineEnd, totalDays, weekLabels } = useMemo(() => {
    const allStarts = phases.map((p) => toDate(p.startDate).getTime());
    const allEnds = phases.map((p) => toDate(p.endDate).getTime());
    const minDate = new Date(Math.min(...allStarts));
    const maxDate = new Date(Math.max(...allEnds));

    // Add padding days
    minDate.setDate(minDate.getDate() - 3);
    maxDate.setDate(maxDate.getDate() + 3);

    const total = daysBetween(minDate, maxDate);
    const labels = getWeekLabels(minDate, maxDate);

    return {
      timelineStart: minDate,
      timelineEnd: maxDate,
      totalDays: total,
      weekLabels: labels,
    };
  }, []);

  return (
    <div className="hidden md:block bg-[#111] border border-[#1A1A1A] rounded-none overflow-hidden">
      {/* Week header */}
      <div className="relative h-10 border-b border-[#1A1A1A] bg-[#0A0A0A]">
        {weekLabels.map((w, i) => (
          <div
            key={i}
            className="absolute top-0 h-full flex items-center"
            style={{ left: `${w.offset}%` }}
          >
            <span className="font-[JetBrains_Mono] text-[10px] text-[#6e6e6e] whitespace-nowrap px-2">
              {w.label}
            </span>
          </div>
        ))}
      </div>

      {/* Phase rows */}
      {phases.map((phase, idx) => {
        const startOffset = daysBetween(timelineStart, toDate(phase.startDate));
        const duration = daysBetween(toDate(phase.startDate), toDate(phase.endDate));
        const leftPct = (startOffset / totalDays) * 100;
        const widthPct = (duration / totalDays) * 100;

        return (
          <div
            key={phase.id}
            className={`flex items-center h-14 ${
              idx < phases.length - 1 ? "border-b border-[#1A1A1A]" : ""
            }`}
          >
            {/* Phase name column */}
            <div className="w-36 lg:w-44 shrink-0 px-4 flex items-center gap-2 border-r border-[#1A1A1A] h-full bg-[#0A0A0A]">
              <span
                className={`w-2 h-2 shrink-0 rounded-none ${phase.color}`}
              />
              <span className="font-[JetBrains_Mono] text-xs text-white truncate">
                {phase.name}
              </span>
            </div>

            {/* Bar area */}
            <div className="flex-1 relative h-full">
              {/* Grid lines */}
              {weekLabels.map((w, i) => (
                <div
                  key={i}
                  className="absolute top-0 h-full border-l border-[#1A1A1A]/50"
                  style={{ left: `${w.offset}%` }}
                />
              ))}

              {/* Phase bar */}
              <div
                className="absolute top-1/2 -translate-y-1/2 h-7 flex items-center rounded-none overflow-hidden"
                style={{
                  left: `${leftPct}%`,
                  width: `${Math.max(widthPct, 2)}%`,
                }}
              >
                {/* Background bar */}
                <div
                  className="absolute inset-0 opacity-20 rounded-none"
                  style={{ backgroundColor: phase.barColor }}
                />
                {/* Progress fill */}
                <div
                  className="absolute inset-y-0 left-0 opacity-60 rounded-none"
                  style={{
                    backgroundColor: phase.barColor,
                    width: `${phase.progress}%`,
                  }}
                />
                {/* Label */}
                <span className="relative z-10 font-[JetBrains_Mono] text-[10px] text-white font-medium px-2 truncate">
                  {phase.name}
                  {phase.progress > 0 && phase.progress < 100
                    ? ` (${phase.progress}%)`
                    : ""}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Today indicator (static) */}
      {(() => {
        const today = new Date("2025-11-10T00:00:00");
        const offset = daysBetween(timelineStart, today);
        const pct = (offset / totalDays) * 100;
        if (pct < 0 || pct > 100) return null;

        return (
          <div
            className="absolute top-0 h-full border-l-2 border-[#BFFF00] z-20 pointer-events-none"
            style={{ left: `calc(${36 * 4}px + ${pct}% * (1 - ${36 * 4}px / 100%))` }}
          >
            <div className="bg-[#BFFF00] text-black font-[JetBrains_Mono] text-[9px] font-bold px-1 py-0.5 -translate-x-1/2">
              TODAY
            </div>
          </div>
        );
      })()}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Mobile Timeline List
// ---------------------------------------------------------------------------

const MobileTimeline: React.FC = () => (
  <div className="md:hidden flex flex-col gap-3">
    {phases.map((phase) => (
      <div
        key={phase.id}
        className="bg-[#111] border border-[#1A1A1A] rounded-none p-4 flex flex-col gap-3"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-none ${phase.color}`} />
            <span className="font-[JetBrains_Mono] text-sm font-semibold text-white">
              {phase.name}
            </span>
          </div>
          <span
            className={`font-[JetBrains_Mono] text-xs font-medium ${getProgressTextColor(
              phase.progress
            )}`}
          >
            {getProgressLabel(phase.progress)}
          </span>
        </div>

        {/* Date range */}
        <div className="flex items-center gap-2 text-[#6e6e6e]">
          <Calendar className="w-3.5 h-3.5" />
          <span className="font-[Inter] text-xs">
            {formatShortDate(phase.startDate)} &mdash;{" "}
            {formatShortDate(phase.endDate)}
          </span>
        </div>

        {/* Progress bar */}
        <div className="flex flex-col gap-1.5">
          <div className="h-1.5 w-full bg-[#1A1A1A] rounded-none overflow-hidden">
            <div
              className="h-full rounded-none transition-all duration-500"
              style={{
                width: `${phase.progress}%`,
                backgroundColor: phase.barColor,
              }}
            />
          </div>
        </div>

        {/* Assignees */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {phase.assignees.map((name) => (
            <span
              key={name}
              className="font-[Inter] text-[11px] text-[#6e6e6e] bg-[#0A0A0A] border border-[#1A1A1A] px-2 py-0.5 rounded-none"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
);

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const ProjectTimeline: React.FC = () => {
  // Overall project progress
  const overallProgress = Math.round(
    phases.reduce((sum, p) => sum + p.progress, 0) / phases.length
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        {/* Header */}
        <PageHeader title="Project Timeline" subtitle="TeamTrack Pro" />

        {/* Summary bar */}
        <div className="bg-[#111] border border-[#1A1A1A] rounded-none p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-[JetBrains_Mono] text-xs text-[#6e6e6e]">
              Overall Progress
            </span>
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-48 bg-[#1A1A1A] rounded-none overflow-hidden">
                <div
                  className="h-full bg-[#BFFF00] rounded-none transition-all duration-500"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <span className="font-[JetBrains_Mono] text-sm text-white font-medium">
                {overallProgress}%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end gap-0.5">
              <span className="font-[JetBrains_Mono] text-[10px] text-[#6e6e6e]">
                Start
              </span>
              <span className="font-[JetBrains_Mono] text-xs text-white">
                Oct 14, 2025
              </span>
            </div>
            <div className="w-px h-8 bg-[#1A1A1A]" />
            <div className="flex flex-col items-end gap-0.5">
              <span className="font-[JetBrains_Mono] text-[10px] text-[#6e6e6e]">
                End
              </span>
              <span className="font-[JetBrains_Mono] text-xs text-white">
                Dec 22, 2025
              </span>
            </div>
            <div className="w-px h-8 bg-[#1A1A1A]" />
            <div className="flex flex-col items-end gap-0.5">
              <span className="font-[JetBrains_Mono] text-[10px] text-[#6e6e6e]">
                Phases
              </span>
              <span className="font-[JetBrains_Mono] text-xs text-white">
                {phases.length}
              </span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 flex-wrap">
          {phases.map((phase) => (
            <div key={phase.id} className="flex items-center gap-1.5">
              <span
                className={`w-2.5 h-2.5 rounded-none ${phase.color}`}
              />
              <span className="font-[Inter] text-xs text-[#6e6e6e]">
                {phase.name}
              </span>
            </div>
          ))}
        </div>

        {/* Gantt (Desktop) */}
        <GanttChart />

        {/* List (Mobile) */}
        <MobileTimeline />
      </div>
    </div>
  );
};

export default ProjectTimeline;
