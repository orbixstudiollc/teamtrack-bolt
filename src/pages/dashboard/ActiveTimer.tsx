import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, Square, FolderOpen, FileText } from "lucide-react";

import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import DataTable from "../../components/DataTable";
import ListCard from "../../components/ListCard";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type TimerStatus = "running" | "paused" | "stopped";

interface TimerEntry {
  id: number;
  project: string;
  task: string;
  start: string;
  end: string;
  duration: string;
}

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const todaysEntries: TimerEntry[] = [
  {
    id: 1,
    project: "TeamTrack Pro",
    task: "API Integration",
    start: "09:00 AM",
    end: "11:30 AM",
    duration: "2h 30m",
  },
  {
    id: 2,
    project: "Client Portal",
    task: "Login Page Redesign",
    start: "11:45 AM",
    end: "01:00 PM",
    duration: "1h 15m",
  },
  {
    id: 3,
    project: "TeamTrack Pro",
    task: "Unit Tests",
    start: "02:00 PM",
    end: "03:20 PM",
    duration: "1h 20m",
  },
  {
    id: 4,
    project: "Mobile App",
    task: "Push Notification Service",
    start: "03:30 PM",
    end: "04:45 PM",
    duration: "1h 15m",
  },
];

// ---------------------------------------------------------------------------
// DataTable column definitions
// ---------------------------------------------------------------------------

const entryColumns = [
  {
    key: "project" as const,
    header: "Project",
    render: (row: TimerEntry) => (
      <span className="font-secondary text-sm text-foreground font-medium">
        {row.project}
      </span>
    ),
  },
  {
    key: "task" as const,
    header: "Task",
    render: (row: TimerEntry) => (
      <span className="font-secondary text-sm text-muted-foreground">
        {row.task}
      </span>
    ),
  },
  {
    key: "start" as const,
    header: "Start",
    render: (row: TimerEntry) => (
      <span className="font-primary text-sm text-foreground">{row.start}</span>
    ),
  },
  {
    key: "end" as const,
    header: "End",
    render: (row: TimerEntry) => (
      <span className="font-primary text-sm text-foreground">{row.end}</span>
    ),
  },
  {
    key: "duration" as const,
    header: "Duration",
    render: (row: TimerEntry) => (
      <span className="font-primary text-sm text-primary font-semibold">
        {row.duration}
      </span>
    ),
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Formats total seconds into HH:MM:SS */
function formatTime(totalSeconds: number): string {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  return [hrs, mins, secs].map((n) => String(n).padStart(2, "0")).join(":");
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const INITIAL_SECONDS = 2 * 3600 + 34 * 60 + 17; // 02:34:17

const ActiveTimer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(INITIAL_SECONDS);
  const [status, setStatus] = useState<TimerStatus>("running");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ---- Timer tick logic ----
  const startTicking = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  }, []);

  const stopTicking = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Auto-start on mount since initial status is "running"
  useEffect(() => {
    if (status === "running") {
      startTicking();
    }
    return () => stopTicking();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ---- Controls ----
  const handlePauseResume = () => {
    if (status === "running") {
      stopTicking();
      setStatus("paused");
    } else if (status === "paused") {
      startTicking();
      setStatus("running");
    }
  };

  const handleStop = () => {
    stopTicking();
    setStatus("stopped");
  };

  // ---- Computed values ----
  const displayTime = formatTime(seconds);
  const totalToday = todaysEntries.reduce((acc, entry) => {
    const parts = entry.duration.match(/(\d+)h\s*(\d+)m/);
    if (!parts) return acc;
    return acc + parseInt(parts[1], 10) * 60 + parseInt(parts[2], 10);
  }, 0);
  const totalHours = Math.floor(totalToday / 60);
  const totalMins = totalToday % 60;

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
      {/* ------- Page Header ------- */}
      <PageHeader title="Active Timer" subtitle="Time Tracking" />

      {/* ------- Big Timer Section ------- */}
      <div className="bg-card border border-border rounded-none p-6 md:p-10 flex flex-col items-center gap-6">
        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              status === "running"
                ? "bg-primary animate-pulse"
                : status === "paused"
                ? "bg-amber-500"
                : "bg-red-500"
            }`}
          />
          <span className="font-primary text-xs uppercase tracking-widest text-muted-foreground">
            {status === "running"
              ? "Recording"
              : status === "paused"
              ? "Paused"
              : "Stopped"}
          </span>
        </div>

        {/* Timer display */}
        <h2 className="font-secondary text-6xl md:text-7xl font-bold text-foreground tabular-nums tracking-tight select-none">
          {displayTime}
        </h2>

        {/* Meta info */}
        <div className="flex flex-col items-center gap-2 mt-2">
          <div className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
            <span className="font-secondary text-sm text-muted-foreground">
              Project:
            </span>
            <Badge label="TeamTrack Pro" color="lime" />
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="font-secondary text-sm text-muted-foreground">
              Task:
            </span>
            <span className="font-secondary text-sm text-foreground font-medium">
              Dashboard UI Implementation
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 mt-4">
          <Button
            variant="destructive"
            size="md"
            onClick={handleStop}
            disabled={status === "stopped"}
          >
            <Square className="h-4 w-4" />
            <span>Stop</span>
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={handlePauseResume}
            disabled={status === "stopped"}
          >
            {status === "running" ? (
              <>
                <Pause className="h-4 w-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                <span>Resume</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* ------- Today's Entries ------- */}
      <div className="bg-card border border-border rounded-none">
        {/* Desktop table */}
        <div className="hidden md:block">
          <DataTable
            title="Today's Entries"
            columns={entryColumns}
            data={todaysEntries}
          />
        </div>

        {/* Mobile list cards */}
        <div className="md:hidden p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-primary text-base font-semibold text-foreground">
              Today's Entries
            </h2>
            <span className="font-primary text-xs text-muted-foreground">
              Total: {totalHours}h {totalMins}m
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {todaysEntries.map((entry) => (
              <ListCard
                key={entry.id}
                name={entry.project}
                detail={`${entry.task} | ${entry.start} - ${entry.end}`}
                badge={entry.duration}
                badgeColor="lime"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveTimer;
