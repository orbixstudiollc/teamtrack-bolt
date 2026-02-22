import React, { useState } from "react";
import { MoreHorizontal, Plus } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Avatar from "../../components/Avatar";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ColumnKey = "todo" | "in_progress" | "done";

interface TaskCard {
  id: string;
  title: string;
  project: string;
  priority: "High" | "Medium" | "Low";
  assignee: string;
  storyPoints: number;
}

interface Column {
  key: ColumnKey;
  label: string;
  dotColor: string;
  tasks: TaskCard[];
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const columns: Column[] = [
  {
    key: "todo",
    label: "TO DO",
    dotColor: "bg-[#6e6e6e]",
    tasks: [
      {
        id: "t1",
        title: "Set up CI/CD pipeline for staging",
        project: "TeamTrack Pro",
        priority: "High",
        assignee: "Alice Johnson",
        storyPoints: 5,
      },
      {
        id: "t2",
        title: "Write API documentation for auth endpoints",
        project: "API Gateway",
        priority: "Medium",
        assignee: "Bob Smith",
        storyPoints: 3,
      },
      {
        id: "t3",
        title: "Design empty state illustrations",
        project: "Mobile App",
        priority: "Low",
        assignee: "Carol Lee",
        storyPoints: 2,
      },
      {
        id: "t4",
        title: "Implement dark mode toggle",
        project: "TeamTrack Pro",
        priority: "Medium",
        assignee: "David Kim",
        storyPoints: 3,
      },
      {
        id: "t5",
        title: "Create seed data scripts",
        project: "Data Pipeline",
        priority: "Low",
        assignee: "Eva Martinez",
        storyPoints: 2,
      },
    ],
  },
  {
    key: "in_progress",
    label: "IN PROGRESS",
    dotColor: "bg-[#00C2FF]",
    tasks: [
      {
        id: "t6",
        title: "Build notification preferences panel",
        project: "TeamTrack Pro",
        priority: "High",
        assignee: "Frank Chen",
        storyPoints: 5,
      },
      {
        id: "t7",
        title: "Refactor user service to use Repository pattern",
        project: "API Gateway",
        priority: "High",
        assignee: "Grace Liu",
        storyPoints: 8,
      },
      {
        id: "t8",
        title: "Implement calendar week view",
        project: "Mobile App",
        priority: "Medium",
        assignee: "Henry Park",
        storyPoints: 5,
      },
      {
        id: "t9",
        title: "Add CSV export for reports",
        project: "TeamTrack Pro",
        priority: "Medium",
        assignee: "Iris Wang",
        storyPoints: 3,
      },
      {
        id: "t10",
        title: "Optimize database query performance",
        project: "Data Pipeline",
        priority: "High",
        assignee: "Jack Brown",
        storyPoints: 8,
      },
    ],
  },
  {
    key: "done",
    label: "DONE",
    dotColor: "bg-[#BFFF00]",
    tasks: [
      {
        id: "t11",
        title: "Fix login redirect loop on Safari",
        project: "TeamTrack Pro",
        priority: "High",
        assignee: "Karen Davis",
        storyPoints: 3,
      },
      {
        id: "t12",
        title: "Update onboarding copy and microcopy",
        project: "Onboarding",
        priority: "Low",
        assignee: "Leo Nguyen",
        storyPoints: 1,
      },
      {
        id: "t13",
        title: "Migrate user table to new schema",
        project: "Data Pipeline",
        priority: "Medium",
        assignee: "Mia Thompson",
        storyPoints: 5,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getPriorityStyle(priority: TaskCard["priority"]): {
  bg: string;
  text: string;
} {
  switch (priority) {
    case "High":
      return { bg: "bg-[#FF5C33]/10", text: "text-[#FF5C33]" };
    case "Medium":
      return { bg: "bg-[#FFB800]/10", text: "text-[#FFB800]" };
    case "Low":
      return { bg: "bg-[#00C2FF]/10", text: "text-[#00C2FF]" };
  }
}

function getProjectColor(project: string): string {
  const map: Record<string, string> = {
    "TeamTrack Pro": "bg-[#BFFF00]/10 text-[#BFFF00]",
    "API Gateway": "bg-[#7B61FF]/10 text-[#7B61FF]",
    "Mobile App": "bg-[#00C2FF]/10 text-[#00C2FF]",
    "Data Pipeline": "bg-[#FFB800]/10 text-[#FFB800]",
    Onboarding: "bg-[#FF5C33]/10 text-[#FF5C33]",
  };
  return map[project] ?? "bg-[#1A1A1A] text-[#6e6e6e]";
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const avatarColors: Record<string, string> = {
  "Alice Johnson": "bg-[#7B61FF]",
  "Bob Smith": "bg-[#00C2FF]",
  "Carol Lee": "bg-[#FFB800]",
  "David Kim": "bg-[#FF5C33]",
  "Eva Martinez": "bg-[#BFFF00]",
  "Frank Chen": "bg-[#7B61FF]",
  "Grace Liu": "bg-[#00C2FF]",
  "Henry Park": "bg-[#FFB800]",
  "Iris Wang": "bg-[#FF5C33]",
  "Jack Brown": "bg-[#BFFF00]",
  "Karen Davis": "bg-[#7B61FF]",
  "Leo Nguyen": "bg-[#00C2FF]",
  "Mia Thompson": "bg-[#FFB800]",
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const KanbanCard: React.FC<{ task: TaskCard }> = ({ task }) => {
  const priorityStyle = getPriorityStyle(task.priority);
  const projectStyle = getProjectColor(task.project);
  const avatarColor = avatarColors[task.assignee] ?? "bg-[#6e6e6e]";

  return (
    <div className="bg-[#111] border border-[#1A1A1A] rounded-none p-4 flex flex-col gap-3 hover:border-[#333] transition-colors cursor-grab active:cursor-grabbing">
      {/* Title */}
      <p className="font-[Inter] text-sm text-white leading-snug">
        {task.title}
      </p>

      {/* Badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge
          className={`${projectStyle} rounded-none text-[10px] font-medium px-1.5 py-0.5`}
        >
          {task.project}
        </Badge>
        <Badge
          className={`${priorityStyle.bg} ${priorityStyle.text} rounded-none text-[10px] font-medium px-1.5 py-0.5`}
        >
          {task.priority}
        </Badge>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        <Avatar
          fallback={getInitials(task.assignee)}
          className={`w-6 h-6 rounded-none text-[9px] font-semibold text-black ${avatarColor}`}
        />
        <span className="font-[JetBrains_Mono] text-[11px] text-[#6e6e6e] bg-[#0A0A0A] border border-[#1A1A1A] px-1.5 py-0.5 rounded-none">
          {task.storyPoints} SP
        </span>
      </div>
    </div>
  );
};

const ColumnView: React.FC<{ column: Column }> = ({ column }) => (
  <div className="flex flex-col gap-3 min-w-0">
    {/* Column header */}
    <div className="flex items-center justify-between px-1 pb-2">
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-none ${column.dotColor}`} />
        <span className="font-[JetBrains_Mono] text-xs font-semibold text-white tracking-wide">
          {column.label}
        </span>
        <span className="font-[JetBrains_Mono] text-[11px] text-[#6e6e6e] bg-[#0A0A0A] border border-[#1A1A1A] px-1.5 py-0.5 rounded-none">
          {column.tasks.length}
        </span>
      </div>
      <button className="text-[#6e6e6e] hover:text-white transition-colors">
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </div>

    {/* Cards */}
    <div className="flex flex-col gap-3">
      {column.tasks.map((task) => (
        <KanbanCard key={task.id} task={task} />
      ))}

      {/* Add card button */}
      <button className="flex items-center justify-center gap-2 py-3 border border-dashed border-[#1A1A1A] rounded-none text-[#6e6e6e] hover:text-white hover:border-[#333] transition-colors">
        <Plus className="w-3.5 h-3.5" />
        <span className="font-[Inter] text-xs">Add task</span>
      </button>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Mobile Filter Tabs
// ---------------------------------------------------------------------------

const FilterTabs: React.FC<{
  active: ColumnKey;
  onChange: (key: ColumnKey) => void;
}> = ({ active, onChange }) => {
  const tabs: { key: ColumnKey; label: string; count: number }[] = columns.map(
    (c) => ({ key: c.key, label: c.label, count: c.tasks.length })
  );

  return (
    <div className="flex gap-1 bg-[#0A0A0A] border border-[#1A1A1A] rounded-none p-1">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex-1 font-[JetBrains_Mono] text-[11px] font-medium py-2 px-3 rounded-none transition-colors ${
            active === tab.key
              ? "bg-[#111] text-white"
              : "text-[#6e6e6e] hover:text-white"
          }`}
        >
          {tab.label}{" "}
          <span className="opacity-60">({tab.count})</span>
        </button>
      ))}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const SprintBoard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ColumnKey>("todo");

  const activeColumn = columns.find((c) => c.key === activeTab)!;

  // Sprint stats
  const totalPoints = columns
    .flatMap((c) => c.tasks)
    .reduce((sum, t) => sum + t.storyPoints, 0);
  const donePoints = columns
    .find((c) => c.key === "done")!
    .tasks.reduce((sum, t) => sum + t.storyPoints, 0);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        {/* Header */}
        <PageHeader
          title="Sprint Board"
          subtitle="Sprint 14 &middot; Nov 4 - Nov 17"
        />

        {/* Sprint progress bar */}
        <div className="bg-[#111] border border-[#1A1A1A] rounded-none p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-[JetBrains_Mono] text-xs text-[#6e6e6e]">
              Sprint Progress
            </span>
            <span className="font-[JetBrains_Mono] text-xs text-white">
              {donePoints}/{totalPoints} SP
            </span>
          </div>
          <div className="h-1.5 w-full bg-[#1A1A1A] rounded-none overflow-hidden">
            <div
              className="h-full bg-[#BFFF00] rounded-none transition-all duration-500"
              style={{
                width: `${Math.round((donePoints / totalPoints) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Desktop: 3-column kanban */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {columns.map((column) => (
            <ColumnView key={column.key} column={column} />
          ))}
        </div>

        {/* Mobile / Tablet: tabbed single column */}
        <div className="lg:hidden flex flex-col gap-4">
          <FilterTabs active={activeTab} onChange={setActiveTab} />
          <ColumnView column={activeColumn} />
        </div>
      </div>
    </div>
  );
};

export default SprintBoard;
