import React, { useState, useMemo } from "react";
import { Plus, Search, ChevronDown } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import DataTable from "../../components/DataTable";
import ListCard from "../../components/ListCard";
import Avatar from "../../components/Avatar";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type FilterTab = "All" | "My Tasks" | "Unassigned";
type Priority = "High" | "Medium" | "Low";
type Status = "To Do" | "In Progress" | "Review" | "Done";

interface Task {
  id: string;
  title: string;
  project: string;
  assignee: string | null;
  priority: Priority;
  status: Status;
  dueDate: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const tasks: Task[] = [
  {
    id: "TSK-001",
    title: "Implement user authentication flow",
    project: "TeamTrack Pro",
    assignee: "Alice Johnson",
    priority: "High",
    status: "In Progress",
    dueDate: "Nov 15, 2025",
  },
  {
    id: "TSK-002",
    title: "Design settings page wireframes",
    project: "Mobile App",
    assignee: "Bob Smith",
    priority: "Medium",
    status: "Review",
    dueDate: "Nov 12, 2025",
  },
  {
    id: "TSK-003",
    title: "Fix pagination bug in employee list",
    project: "TeamTrack Pro",
    assignee: "Carol Lee",
    priority: "High",
    status: "To Do",
    dueDate: "Nov 18, 2025",
  },
  {
    id: "TSK-004",
    title: "Write unit tests for payroll module",
    project: "API Gateway",
    assignee: null,
    priority: "Medium",
    status: "To Do",
    dueDate: "Nov 20, 2025",
  },
  {
    id: "TSK-005",
    title: "Optimize image loading on dashboard",
    project: "TeamTrack Pro",
    assignee: "David Kim",
    priority: "Low",
    status: "Done",
    dueDate: "Nov 8, 2025",
  },
  {
    id: "TSK-006",
    title: "Create data migration scripts",
    project: "Data Pipeline",
    assignee: null,
    priority: "High",
    status: "To Do",
    dueDate: "Nov 22, 2025",
  },
  {
    id: "TSK-007",
    title: "Add export functionality to reports",
    project: "TeamTrack Pro",
    assignee: "Eva Martinez",
    priority: "Medium",
    status: "In Progress",
    dueDate: "Nov 16, 2025",
  },
  {
    id: "TSK-008",
    title: "Update onboarding email templates",
    project: "Onboarding",
    assignee: "Frank Chen",
    priority: "Low",
    status: "Review",
    dueDate: "Nov 14, 2025",
  },
];

// Current user stub for "My Tasks" filtering
const CURRENT_USER = "Alice Johnson";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getPriorityStyle(priority: Priority): { bg: string; text: string } {
  switch (priority) {
    case "High":
      return { bg: "bg-[#FF5C33]/10", text: "text-[#FF5C33]" };
    case "Medium":
      return { bg: "bg-[#FFB800]/10", text: "text-[#FFB800]" };
    case "Low":
      return { bg: "bg-[#00C2FF]/10", text: "text-[#00C2FF]" };
  }
}

function getStatusStyle(status: Status): { bg: string; text: string } {
  switch (status) {
    case "To Do":
      return { bg: "bg-[#6e6e6e]/10", text: "text-[#6e6e6e]" };
    case "In Progress":
      return { bg: "bg-[#00C2FF]/10", text: "text-[#00C2FF]" };
    case "Review":
      return { bg: "bg-[#7B61FF]/10", text: "text-[#7B61FF]" };
    case "Done":
      return { bg: "bg-[#BFFF00]/10", text: "text-[#BFFF00]" };
  }
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const avatarColorMap: Record<string, string> = {
  "Alice Johnson": "bg-[#7B61FF]",
  "Bob Smith": "bg-[#00C2FF]",
  "Carol Lee": "bg-[#FFB800]",
  "David Kim": "bg-[#FF5C33]",
  "Eva Martinez": "bg-[#BFFF00]",
  "Frank Chen": "bg-[#7B61FF]",
};

// ---------------------------------------------------------------------------
// Filter Tabs
// ---------------------------------------------------------------------------

const FilterTabsBar: React.FC<{
  active: FilterTab;
  onChange: (tab: FilterTab) => void;
  counts: Record<FilterTab, number>;
}> = ({ active, onChange, counts }) => {
  const tabs: FilterTab[] = ["All", "My Tasks", "Unassigned"];

  return (
    <div className="flex gap-1 bg-[#0A0A0A] border border-[#1A1A1A] rounded-none p-1 w-fit">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`font-[JetBrains_Mono] text-[11px] font-medium py-2 px-4 rounded-none transition-colors ${
            active === tab
              ? "bg-[#111] text-white"
              : "text-[#6e6e6e] hover:text-white"
          }`}
        >
          {tab}{" "}
          <span className="opacity-60">({counts[tab]})</span>
        </button>
      ))}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Desktop Table
// ---------------------------------------------------------------------------

const TaskTableDesktop: React.FC<{ data: Task[] }> = ({ data }) => {
  const columns = [
    { key: "task" as const, label: "Task", className: "w-[30%]" },
    { key: "project" as const, label: "Project", className: "w-[15%]" },
    { key: "assignee" as const, label: "Assignee", className: "w-[18%]" },
    { key: "priority" as const, label: "Priority", className: "w-[12%]" },
    { key: "status" as const, label: "Status", className: "w-[12%]" },
    { key: "dueDate" as const, label: "Due Date", className: "w-[13%]" },
  ];

  return (
    <DataTable
      columns={columns}
      className="hidden md:block"
    >
      {data.map((task) => {
        const priorityStyle = getPriorityStyle(task.priority);
        const statusStyle = getStatusStyle(task.status);
        const avatarColor = task.assignee
          ? avatarColorMap[task.assignee] ?? "bg-[#6e6e6e]"
          : "";

        return (
          <tr
            key={task.id}
            className="border-b border-[#1A1A1A] hover:bg-[#0A0A0A] transition-colors"
          >
            {/* Task */}
            <td className="py-3 px-4">
              <div className="flex flex-col gap-0.5">
                <span className="font-[Inter] text-sm text-white">
                  {task.title}
                </span>
                <span className="font-[JetBrains_Mono] text-[10px] text-[#6e6e6e]">
                  {task.id}
                </span>
              </div>
            </td>

            {/* Project */}
            <td className="py-3 px-4">
              <span className="font-[Inter] text-sm text-[#6e6e6e]">
                {task.project}
              </span>
            </td>

            {/* Assignee */}
            <td className="py-3 px-4">
              {task.assignee ? (
                <div className="flex items-center gap-2">
                  <Avatar
                    fallback={getInitials(task.assignee)}
                    className={`w-6 h-6 rounded-none text-[9px] font-semibold text-black ${avatarColor}`}
                  />
                  <span className="font-[Inter] text-sm text-white">
                    {task.assignee}
                  </span>
                </div>
              ) : (
                <span className="font-[Inter] text-sm text-[#6e6e6e] italic">
                  Unassigned
                </span>
              )}
            </td>

            {/* Priority */}
            <td className="py-3 px-4">
              <Badge
                className={`${priorityStyle.bg} ${priorityStyle.text} rounded-none text-[11px] font-medium px-2 py-0.5`}
              >
                {task.priority}
              </Badge>
            </td>

            {/* Status */}
            <td className="py-3 px-4">
              <Badge
                className={`${statusStyle.bg} ${statusStyle.text} rounded-none text-[11px] font-medium px-2 py-0.5`}
              >
                {task.status}
              </Badge>
            </td>

            {/* Due Date */}
            <td className="py-3 px-4">
              <span className="font-[Inter] text-sm text-[#6e6e6e]">
                {task.dueDate}
              </span>
            </td>
          </tr>
        );
      })}
    </DataTable>
  );
};

// ---------------------------------------------------------------------------
// Mobile List
// ---------------------------------------------------------------------------

const TaskListMobile: React.FC<{ data: Task[] }> = ({ data }) => (
  <div className="md:hidden flex flex-col gap-3">
    {data.map((task) => {
      const priorityStyle = getPriorityStyle(task.priority);
      const statusStyle = getStatusStyle(task.status);

      return (
        <ListCard
          key={task.id}
          className="bg-[#111] border border-[#1A1A1A] rounded-none p-4"
        >
          <div className="flex flex-col gap-2">
            {/* Title & ID */}
            <div className="flex flex-col gap-0.5">
              <span className="font-[Inter] text-sm text-white leading-snug">
                {task.title}
              </span>
              <span className="font-[JetBrains_Mono] text-[10px] text-[#6e6e6e]">
                {task.id}
              </span>
            </div>

            {/* Project */}
            <span className="font-[Inter] text-xs text-[#6e6e6e]">
              {task.project}
            </span>

            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                className={`${priorityStyle.bg} ${priorityStyle.text} rounded-none text-[10px] font-medium px-1.5 py-0.5`}
              >
                {task.priority}
              </Badge>
              <Badge
                className={`${statusStyle.bg} ${statusStyle.text} rounded-none text-[10px] font-medium px-1.5 py-0.5`}
              >
                {task.status}
              </Badge>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-1">
              {task.assignee ? (
                <div className="flex items-center gap-2">
                  <Avatar
                    fallback={getInitials(task.assignee)}
                    className={`w-5 h-5 rounded-none text-[8px] font-semibold text-black ${
                      avatarColorMap[task.assignee] ?? "bg-[#6e6e6e]"
                    }`}
                  />
                  <span className="font-[Inter] text-[11px] text-[#6e6e6e]">
                    {task.assignee}
                  </span>
                </div>
              ) : (
                <span className="font-[Inter] text-[11px] text-[#6e6e6e] italic">
                  Unassigned
                </span>
              )}
              <span className="font-[Inter] text-[11px] text-[#6e6e6e]">
                {task.dueDate}
              </span>
            </div>
          </div>
        </ListCard>
      );
    })}
  </div>
);

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const TaskList: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const counts: Record<FilterTab, number> = {
    All: tasks.length,
    "My Tasks": tasks.filter((t) => t.assignee === CURRENT_USER).length,
    Unassigned: tasks.filter((t) => t.assignee === null).length,
  };

  const filteredTasks = useMemo(() => {
    let result = tasks;

    // Tab filter
    if (activeFilter === "My Tasks") {
      result = result.filter((t) => t.assignee === CURRENT_USER);
    } else if (activeFilter === "Unassigned") {
      result = result.filter((t) => t.assignee === null);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.project.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        {/* Header */}
        <PageHeader title="Task List">
          <Button className="bg-[#BFFF00] text-black font-[JetBrains_Mono] text-sm font-semibold px-4 py-2 rounded-none hover:bg-[#BFFF00]/90 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Task
          </Button>
        </PageHeader>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <FilterTabsBar
            active={activeFilter}
            onChange={setActiveFilter}
            counts={counts}
          />

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6e6e6e]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              className="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-none pl-9 pr-4 py-2 font-[Inter] text-sm text-white placeholder:text-[#6e6e6e] focus:outline-none focus:border-[#BFFF00] transition-colors"
            />
          </div>
        </div>

        {/* Table (Desktop) */}
        <TaskTableDesktop data={filteredTasks} />

        {/* List (Mobile) */}
        <TaskListMobile data={filteredTasks} />

        {/* Empty state */}
        {filteredTasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <p className="font-[JetBrains_Mono] text-sm text-[#6e6e6e]">
              No tasks found
            </p>
            <p className="font-[Inter] text-xs text-[#6e6e6e]">
              Try adjusting your filters or search query.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
