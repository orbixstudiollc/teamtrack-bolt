import { useState, useMemo, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Avatar from "../../components/Avatar";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type LeaveCategory = "Annual" | "Sick" | "Personal";

interface TeamLeave {
  id: string;
  employee: string;
  avatar: string;
  department: string;
  type: LeaveCategory;
  startDay: number;
  endDay: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

const categoryColor: Record<LeaveCategory, { bg: string; dot: string; text: string }> = {
  Annual: { bg: "bg-[#BFFF00]/10", dot: "bg-[#BFFF00]", text: "text-[#BFFF00]" },
  Sick: { bg: "bg-[#FF5C33]/10", dot: "bg-[#FF5C33]", text: "text-[#FF5C33]" },
  Personal: { bg: "bg-[#00C2FF]/10", dot: "bg-[#00C2FF]", text: "text-[#00C2FF]" },
};

// ---------------------------------------------------------------------------
// Mock data generator for a given month/year
// ---------------------------------------------------------------------------

function getLeaveData(year: number, month: number): TeamLeave[] {
  // Static sample data -- in production this would come from an API.
  // We always return the same set but clamp days to the month length.
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const raw: Omit<TeamLeave, "id">[] = [
    { employee: "Sarah Chen", avatar: "SC", department: "Engineering", type: "Annual", startDay: 4, endDay: 8 },
    { employee: "Marcus Rivera", avatar: "MR", department: "Design", type: "Sick", startDay: 12, endDay: 12 },
    { employee: "Aisha Patel", avatar: "AP", department: "Marketing", type: "Personal", startDay: 15, endDay: 16 },
    { employee: "James O'Brien", avatar: "JO", department: "Sales", type: "Annual", startDay: 20, endDay: 24 },
    { employee: "Lena Kowalski", avatar: "LK", department: "Engineering", type: "Sick", startDay: 7, endDay: 9 },
    { employee: "Carlos Mendez", avatar: "CM", department: "HR", type: "Personal", startDay: 25, endDay: 27 },
    { employee: "Nina Okafor", avatar: "NO", department: "Design", type: "Annual", startDay: 18, endDay: 19 },
  ];

  return raw
    .filter((l) => l.startDay <= daysInMonth)
    .map((l, i) => ({
      ...l,
      id: `tl-${i}`,
      endDay: Math.min(l.endDay, daysInMonth),
    }));
}

// ---------------------------------------------------------------------------
// Helper: build calendar grid
// ---------------------------------------------------------------------------

interface CalendarDay {
  day: number | null; // null = filler cell
  isToday: boolean;
  leaves: TeamLeave[];
}

function buildCalendarGrid(
  year: number,
  month: number,
  leaves: TeamLeave[],
): CalendarDay[][] {
  const firstDow = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() === month;

  const cells: CalendarDay[] = [];

  // Leading blanks
  for (let i = 0; i < firstDow; i++) {
    cells.push({ day: null, isToday: false, leaves: [] });
  }

  // Actual days
  for (let d = 1; d <= daysInMonth; d++) {
    const dayLeaves = leaves.filter((l) => d >= l.startDay && d <= l.endDay);
    cells.push({
      day: d,
      isToday: isCurrentMonth && today.getDate() === d,
      leaves: dayLeaves,
    });
  }

  // Trailing blanks to fill last row
  while (cells.length % 7 !== 0) {
    cells.push({ day: null, isToday: false, leaves: [] });
  }

  // Split into weeks
  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TeamCalendar() {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(10); // November (0-indexed)

  const leaves = useMemo(() => getLeaveData(year, month), [year, month]);
  const weeks = useMemo(() => buildCalendarGrid(year, month, leaves), [year, month, leaves]);

  const goBack = useCallback(() => {
    setMonth((prev) => {
      if (prev === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  }, []);

  const goForward = useCallback(() => {
    setMonth((prev) => {
      if (prev === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  }, []);

  const goToday = useCallback(() => {
    const now = new Date();
    setYear(now.getFullYear());
    setMonth(now.getMonth());
  }, []);

  // Upcoming leaves sorted by start day (for mobile list)
  const upcoming = useMemo(
    () => [...leaves].sort((a, b) => a.startDay - b.startDay),
    [leaves],
  );

  return (
    <div className="min-h-screen bg-[#000] text-white font-[Inter]">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <PageHeader title="Team Calendar" subtitle="Leave schedule" />

        {/* Month navigation */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Button
              onClick={goBack}
              className="flex h-9 w-9 items-center justify-center rounded-none border border-[#1A1A1A] bg-[#111] text-[#6e6e6e] hover:text-white transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="min-w-[200px] text-center text-lg font-semibold text-white font-[Inter]">
              {MONTH_NAMES[month]} {year}
            </h2>
            <Button
              onClick={goForward}
              className="flex h-9 w-9 items-center justify-center rounded-none border border-[#1A1A1A] bg-[#111] text-[#6e6e6e] hover:text-white transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={goToday}
              className="rounded-none border border-[#1A1A1A] bg-[#0A0A0A] px-3 py-1.5 text-xs text-[#6e6e6e] font-[Inter] hover:text-white transition-colors"
            >
              Today
            </Button>
            <div className="flex items-center gap-1 text-xs text-[#6e6e6e] font-[Inter]">
              <Users className="h-4 w-4" />
              <span>{leaves.length} people on leave</span>
            </div>
          </div>
        </div>

        {/* ----- Desktop Calendar Grid ----- */}
        <div className="hidden md:block rounded-none border border-[#1A1A1A] bg-[#111] overflow-hidden">
          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-[#1A1A1A]">
            {DAY_NAMES.map((d) => (
              <div
                key={d}
                className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wider text-[#6e6e6e] font-[JetBrains_Mono]"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Week rows */}
          {weeks.map((week, wi) => (
            <div
              key={wi}
              className="grid grid-cols-7 border-b border-[#1A1A1A] last:border-b-0"
            >
              {week.map((cell, ci) => (
                <div
                  key={ci}
                  className={`relative min-h-[100px] border-r border-[#1A1A1A] last:border-r-0 p-2 transition-colors ${
                    cell.day === null
                      ? "bg-[#0A0A0A]"
                      : "bg-[#111] hover:bg-[#0A0A0A]"
                  }`}
                >
                  {cell.day !== null && (
                    <>
                      {/* Day number */}
                      <span
                        className={`inline-flex h-6 w-6 items-center justify-center text-xs font-[JetBrains_Mono] ${
                          cell.isToday
                            ? "bg-[#BFFF00] font-bold text-black"
                            : "text-[#6e6e6e]"
                        }`}
                      >
                        {cell.day}
                      </span>

                      {/* Leave indicators */}
                      {cell.leaves.length > 0 && (
                        <div className="mt-1.5 space-y-1">
                          {cell.leaves.slice(0, 3).map((leave) => {
                            const colors = categoryColor[leave.type];
                            return (
                              <div
                                key={leave.id}
                                className={`flex items-center gap-1.5 rounded-none px-1.5 py-0.5 ${colors.bg}`}
                                title={`${leave.employee} - ${leave.type}`}
                              >
                                <span
                                  className={`inline-block h-1.5 w-1.5 shrink-0 rounded-none ${colors.dot}`}
                                />
                                <span
                                  className={`truncate text-[10px] font-medium ${colors.text} font-[Inter]`}
                                >
                                  {leave.employee.split(" ")[0]}
                                </span>
                              </div>
                            );
                          })}
                          {cell.leaves.length > 3 && (
                            <span className="block text-[10px] text-[#6e6e6e] font-[Inter] pl-1">
                              +{cell.leaves.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Legend (desktop) */}
        <div className="hidden md:flex items-center gap-6 rounded-none border border-[#1A1A1A] bg-[#111] px-5 py-3">
          <span className="text-xs font-medium uppercase tracking-wider text-[#6e6e6e] font-[JetBrains_Mono]">
            Legend
          </span>
          {(Object.entries(categoryColor) as [LeaveCategory, typeof categoryColor[LeaveCategory]][]).map(
            ([label, colors]) => (
              <div key={label} className="flex items-center gap-2 text-xs font-[Inter]">
                <span className={`inline-block h-2.5 w-2.5 rounded-none ${colors.dot}`} />
                <span className={colors.text}>{label}</span>
              </div>
            ),
          )}
        </div>

        {/* ----- Mobile: Upcoming Leaves List ----- */}
        <div className="space-y-4 md:hidden">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white font-[Inter]">
              Upcoming Leaves
            </h3>
            <Badge className="rounded-none bg-[#1A1A1A] px-2 py-0.5 text-xs text-[#6e6e6e] font-[JetBrains_Mono]">
              {MONTH_NAMES[month].slice(0, 3)} {year}
            </Badge>
          </div>

          {/* Legend (mobile) */}
          <div className="flex items-center gap-4 rounded-none border border-[#1A1A1A] bg-[#0A0A0A] px-4 py-2.5">
            {(Object.entries(categoryColor) as [LeaveCategory, typeof categoryColor[LeaveCategory]][]).map(
              ([label, colors]) => (
                <div key={label} className="flex items-center gap-1.5 text-xs font-[Inter]">
                  <span className={`inline-block h-2 w-2 rounded-none ${colors.dot}`} />
                  <span className={colors.text}>{label}</span>
                </div>
              ),
            )}
          </div>

          {upcoming.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-none border border-[#1A1A1A] bg-[#111] py-12 text-[#6e6e6e]">
              <Calendar className="mb-3 h-8 w-8" />
              <p className="text-sm font-[Inter]">No leaves this month.</p>
            </div>
          )}

          {upcoming.map((leave) => {
            const colors = categoryColor[leave.type];
            const dateLabel =
              leave.startDay === leave.endDay
                ? `${MONTH_NAMES[month].slice(0, 3)} ${leave.startDay}`
                : `${MONTH_NAMES[month].slice(0, 3)} ${leave.startDay} - ${leave.endDay}`;
            const days = leave.endDay - leave.startDay + 1;

            return (
              <div
                key={leave.id}
                className="rounded-none border border-[#1A1A1A] bg-[#111] p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar
                      initials={leave.avatar}
                      className="flex h-9 w-9 items-center justify-center rounded-none bg-[#0A0A0A] border border-[#1A1A1A] text-xs font-semibold text-white font-[JetBrains_Mono]"
                    />
                    <div>
                      <p className="text-sm font-medium text-white font-[Inter]">
                        {leave.employee}
                      </p>
                      <p className="text-xs text-[#6e6e6e] font-[Inter]">
                        {leave.department}
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={`rounded-none px-2 py-0.5 text-xs font-medium font-[Inter] ${colors.bg} ${colors.text}`}
                  >
                    {leave.type}
                  </Badge>
                </div>

                <div className="mt-3 flex items-center justify-between rounded-none bg-[#0A0A0A] border border-[#1A1A1A] px-3 py-2">
                  <div className="flex items-center gap-1.5 text-xs text-[#6e6e6e] font-[JetBrains_Mono]">
                    <Calendar className="h-3 w-3" />
                    {dateLabel}
                  </div>
                  <span className="text-xs font-semibold text-white font-[JetBrains_Mono]">
                    {days} day{days > 1 ? "s" : ""}
                  </span>
                </div>

                {/* Visual bar */}
                <div className="mt-2 h-1 w-full rounded-none bg-[#1A1A1A]">
                  <div
                    className={`h-full rounded-none ${colors.dot} transition-all duration-500`}
                    style={{
                      width: `${((leave.endDay - leave.startDay + 1) / 30) * 100}%`,
                      minWidth: "8%",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
