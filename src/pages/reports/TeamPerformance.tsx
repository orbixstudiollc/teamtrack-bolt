import React, { useState } from "react";
import {
  TrendingUp,
  CheckCircle2,
  Timer,
  Star,
  CalendarDays,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";
import MetricCard from "../../components/MetricCard";
import DataTable from "../../components/DataTable";
import ListCard from "../../components/ListCard";
import Avatar from "../../components/Avatar";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Performer {
  id: number;
  rank: number;
  name: string;
  avatarUrl: string;
  department: string;
  tasks: number;
  hours: string;
  productivity: number;
  rating: number;
}

interface DepartmentPerf {
  department: string;
  productivity: number;
  color: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const topPerformers: Performer[] = [
  {
    id: 1,
    rank: 1,
    name: "Sarah Chen",
    avatarUrl: "",
    department: "Engineering",
    tasks: 52,
    hours: "168h",
    productivity: 96,
    rating: 4.9,
  },
  {
    id: 2,
    rank: 2,
    name: "David Kim",
    avatarUrl: "",
    department: "Engineering",
    tasks: 48,
    hours: "162h",
    productivity: 94,
    rating: 4.8,
  },
  {
    id: 3,
    rank: 3,
    name: "Priya Patel",
    avatarUrl: "",
    department: "Engineering",
    tasks: 45,
    hours: "158h",
    productivity: 92,
    rating: 4.7,
  },
  {
    id: 4,
    rank: 4,
    name: "James Wilson",
    avatarUrl: "",
    department: "Design",
    tasks: 41,
    hours: "155h",
    productivity: 90,
    rating: 4.6,
  },
  {
    id: 5,
    rank: 5,
    name: "Maria Garcia",
    avatarUrl: "",
    department: "Marketing",
    tasks: 38,
    hours: "150h",
    productivity: 88,
    rating: 4.5,
  },
  {
    id: 6,
    rank: 6,
    name: "Alex Rivera",
    avatarUrl: "",
    department: "Sales",
    tasks: 36,
    hours: "148h",
    productivity: 86,
    rating: 4.4,
  },
];

const departmentPerformance: DepartmentPerf[] = [
  { department: "Engineering", productivity: 93, color: "bg-primary" },
  { department: "Design", productivity: 90, color: "bg-[#7B61FF]" },
  { department: "Marketing", productivity: 85, color: "bg-[#00C2FF]" },
  { department: "Sales", productivity: 88, color: "bg-[#FFB800]" },
  { department: "HR", productivity: 82, color: "bg-[#FF5C33]" },
  { department: "Finance", productivity: 87, color: "bg-[#00C2FF]" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function RankBadge({ rank }: { rank: number }) {
  const colors: Record<number, string> = {
    1: "bg-[#FFB800]/15 text-[#FFB800]",
    2: "bg-[#C0C0C0]/15 text-[#C0C0C0]",
    3: "bg-[#CD7F32]/15 text-[#CD7F32]",
  };
  const cls = colors[rank] ?? "bg-[#0A0A0A] text-muted-foreground";

  return (
    <span
      className={`inline-flex h-6 w-6 items-center justify-center font-primary text-xs font-bold rounded-none ${cls}`}
    >
      {rank}
    </span>
  );
}

function ProductivityBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 bg-[#0A0A0A] rounded-none overflow-hidden">
        <div
          className="h-full bg-primary rounded-none"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="font-primary text-xs text-foreground">{value}%</span>
    </div>
  );
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <Star size={12} className="fill-[#FFB800] text-[#FFB800]" />
      <span className="font-primary text-xs text-foreground">{rating}</span>
    </div>
  );
}

function InitialsAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#0A0A0A] border border-border rounded-none">
      <span className="font-primary text-xs font-bold text-primary">
        {initials}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Table columns                                                      */
/* ------------------------------------------------------------------ */

const columns = [
  {
    header: "Rank",
    accessor: "rank" as const,
    render: (val: number) => <RankBadge rank={val} />,
  },
  {
    header: "Employee",
    accessor: "name" as const,
    render: (_val: string, row: Performer) => (
      <div className="flex items-center gap-3">
        {row.avatarUrl ? (
          <Avatar src={row.avatarUrl} alt={row.name} className="h-8 w-8 rounded-none" />
        ) : (
          <InitialsAvatar name={row.name} />
        )}
        <div>
          <p className="font-primary text-sm text-foreground">{row.name}</p>
          <p className="font-secondary text-xs text-muted-foreground">
            {row.department}
          </p>
        </div>
      </div>
    ),
  },
  { header: "Department", accessor: "department" as const },
  { header: "Tasks", accessor: "tasks" as const },
  { header: "Hours", accessor: "hours" as const },
  {
    header: "Productivity",
    accessor: "productivity" as const,
    render: (val: number) => <ProductivityBar value={val} />,
  },
  {
    header: "Rating",
    accessor: "rating" as const,
    render: (val: number) => <RatingStars rating={val} />,
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function DepartmentPerformanceChart({
  data,
}: {
  data: DepartmentPerf[];
}) {
  return (
    <div className="space-y-4">
      {data.map((dept) => (
        <div key={dept.department} className="flex items-center gap-4">
          <span className="w-28 shrink-0 font-secondary text-sm text-foreground">
            {dept.department}
          </span>
          <div className="flex-1 h-6 bg-[#0A0A0A] rounded-none overflow-hidden">
            <div
              className={`h-full ${dept.color} rounded-none transition-all duration-500`}
              style={{ width: `${dept.productivity}%` }}
            />
          </div>
          <span className="w-10 text-right font-primary text-sm font-semibold text-foreground">
            {dept.productivity}%
          </span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const TeamPerformance: React.FC = () => {
  const [dateFrom, setDateFrom] = useState("2026-02-01");
  const [dateTo, setDateTo] = useState("2026-02-22");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <PageHeader title="Team Performance" />

          {/* Date range selector */}
          <div className="flex flex-wrap items-center gap-2">
            <CalendarDays size={16} className="text-muted-foreground" />
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="bg-card border border-border rounded-none px-3 py-1.5 font-primary text-xs text-foreground focus:outline-none focus:border-primary"
            />
            <span className="text-muted-foreground text-xs">to</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="bg-card border border-border rounded-none px-3 py-1.5 font-primary text-xs text-foreground focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Metric Cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Avg Productivity"
            value="87%"
            change="+4% vs last month"
            icon={<TrendingUp size={18} />}
          />
          <MetricCard
            title="Tasks Completed"
            value="234"
            change="+18 this week"
            icon={<CheckCircle2 size={18} />}
          />
          <MetricCard
            title="On-Time Delivery"
            value="92%"
            change="+2% vs last month"
            icon={<Timer size={18} />}
          />
          <MetricCard
            title="Satisfaction"
            value="4.2/5"
            change="+0.3 vs Q3"
            icon={<Star size={18} />}
          />
        </div>

        {/* Top Performers */}
        <section className="mt-10">
          <h2 className="font-primary text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Top Performers
          </h2>

          {/* Desktop */}
          <div className="mt-4 hidden md:block">
            <DataTable<Performer> columns={columns} data={topPerformers} />
          </div>

          {/* Mobile */}
          <div className="mt-4 flex flex-col gap-3 md:hidden">
            {topPerformers.map((performer) => (
              <ListCard
                key={performer.id}
                className="bg-card border border-border rounded-none p-4"
              >
                <div className="flex items-center gap-3">
                  <RankBadge rank={performer.rank} />
                  {performer.avatarUrl ? (
                    <Avatar
                      src={performer.avatarUrl}
                      alt={performer.name}
                      className="h-8 w-8 rounded-none"
                    />
                  ) : (
                    <InitialsAvatar name={performer.name} />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-primary text-sm font-semibold text-foreground">
                      {performer.name}
                    </p>
                    <p className="font-secondary text-xs text-muted-foreground">
                      {performer.department}
                    </p>
                  </div>
                  <RatingStars rating={performer.rating} />
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div>
                    <p className="font-secondary text-[10px] uppercase tracking-wider text-muted-foreground">
                      Tasks
                    </p>
                    <p className="font-primary text-xs text-foreground">
                      {performer.tasks}
                    </p>
                  </div>
                  <div>
                    <p className="font-secondary text-[10px] uppercase tracking-wider text-muted-foreground">
                      Hours
                    </p>
                    <p className="font-primary text-xs text-foreground">
                      {performer.hours}
                    </p>
                  </div>
                  <div>
                    <p className="font-secondary text-[10px] uppercase tracking-wider text-muted-foreground">
                      Productivity
                    </p>
                    <p className="font-primary text-xs text-primary">
                      {performer.productivity}%
                    </p>
                  </div>
                </div>

                {/* Mini productivity bar */}
                <div className="mt-2 h-1 w-full bg-[#0A0A0A] rounded-none overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-none"
                    style={{ width: `${performer.productivity}%` }}
                  />
                </div>
              </ListCard>
            ))}
          </div>
        </section>

        {/* Department Performance */}
        <section className="mt-10">
          <h2 className="font-primary text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Department Performance
          </h2>

          <div className="mt-4 bg-card border border-border rounded-none p-6">
            <DepartmentPerformanceChart data={departmentPerformance} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeamPerformance;
