import { useState, useMemo } from "react";
import {
  Plus,
  Calendar,
  Clock,
  Filter,
  Download,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import DataTable from "../../components/DataTable";
import ListCard from "../../components/ListCard";
import FilterTabs from "../../components/FilterTabs";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type LeaveStatus = "Approved" | "Pending" | "Rejected";

interface LeaveRequest {
  id: string;
  type: string;
  from: string;
  to: string;
  days: number;
  status: LeaveStatus;
  appliedOn: string;
}

type TabValue = "All" | "Pending" | "Approved" | "Rejected";

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const leaveRequests: LeaveRequest[] = [
  {
    id: "LR-101",
    type: "Annual",
    from: "Nov 18, 2025",
    to: "Nov 22, 2025",
    days: 5,
    status: "Approved",
    appliedOn: "Nov 10, 2025",
  },
  {
    id: "LR-102",
    type: "Sick",
    from: "Nov 05, 2025",
    to: "Nov 06, 2025",
    days: 2,
    status: "Approved",
    appliedOn: "Nov 05, 2025",
  },
  {
    id: "LR-103",
    type: "Personal",
    from: "Dec 01, 2025",
    to: "Dec 01, 2025",
    days: 1,
    status: "Pending",
    appliedOn: "Nov 20, 2025",
  },
  {
    id: "LR-104",
    type: "Annual",
    from: "Dec 24, 2025",
    to: "Dec 31, 2025",
    days: 6,
    status: "Pending",
    appliedOn: "Nov 15, 2025",
  },
  {
    id: "LR-105",
    type: "Comp Off",
    from: "Oct 14, 2025",
    to: "Oct 14, 2025",
    days: 1,
    status: "Rejected",
    appliedOn: "Oct 10, 2025",
  },
  {
    id: "LR-106",
    type: "Sick",
    from: "Sep 22, 2025",
    to: "Sep 23, 2025",
    days: 2,
    status: "Approved",
    appliedOn: "Sep 22, 2025",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const tabs: TabValue[] = ["All", "Pending", "Approved", "Rejected"];

const statusVariant: Record<LeaveStatus, string> = {
  Approved: "bg-[#BFFF00]/10 text-[#BFFF00]",
  Pending: "bg-[#FFB800]/10 text-[#FFB800]",
  Rejected: "bg-[#FF5C33]/10 text-[#FF5C33]",
};

const typeIcon: Record<string, string> = {
  Annual: "bg-[#BFFF00]",
  Sick: "bg-[#FF5C33]",
  Personal: "bg-[#00C2FF]",
  "Comp Off": "bg-[#7B61FF]",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MyLeaveRequests() {
  const [activeTab, setActiveTab] = useState<TabValue>("All");

  const filtered = useMemo(() => {
    if (activeTab === "All") return leaveRequests;
    return leaveRequests.filter((r) => r.status === activeTab);
  }, [activeTab]);

  // Summary counts
  const counts = useMemo(() => {
    const map: Record<TabValue, number> = {
      All: leaveRequests.length,
      Pending: 0,
      Approved: 0,
      Rejected: 0,
    };
    leaveRequests.forEach((r) => {
      map[r.status as TabValue] = (map[r.status as TabValue] || 0) + 1;
    });
    return map;
  }, []);

  // Desktop columns
  const columns = [
    {
      header: "Type",
      accessor: "type" as const,
      render: (row: LeaveRequest) => (
        <div className="flex items-center gap-2">
          <span
            className={`inline-block h-2 w-2 rounded-none ${typeIcon[row.type] ?? "bg-white"}`}
          />
          <span className="text-sm text-white font-[Inter]">{row.type}</span>
        </div>
      ),
    },
    {
      header: "From",
      accessor: "from" as const,
      render: (row: LeaveRequest) => (
        <span className="text-sm text-[#6e6e6e] font-[JetBrains_Mono]">
          {row.from}
        </span>
      ),
    },
    {
      header: "To",
      accessor: "to" as const,
      render: (row: LeaveRequest) => (
        <span className="text-sm text-[#6e6e6e] font-[JetBrains_Mono]">
          {row.to}
        </span>
      ),
    },
    {
      header: "Days",
      accessor: "days" as const,
      render: (row: LeaveRequest) => (
        <span className="text-sm font-semibold text-white font-[JetBrains_Mono]">
          {row.days}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status" as const,
      render: (row: LeaveRequest) => (
        <Badge
          className={`rounded-none px-2.5 py-1 text-xs font-medium font-[Inter] ${statusVariant[row.status]}`}
        >
          {row.status}
        </Badge>
      ),
    },
    {
      header: "Applied On",
      accessor: "appliedOn" as const,
      render: (row: LeaveRequest) => (
        <span className="text-sm text-[#6e6e6e] font-[JetBrains_Mono]">
          {row.appliedOn}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#000] text-white font-[Inter]">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <PageHeader
          title="My Leave Requests"
          action={
            <Button className="flex items-center gap-2 rounded-none bg-[#BFFF00] px-4 py-2 text-sm font-semibold text-black font-[Inter] hover:bg-[#BFFF00]/90 transition-colors">
              <Plus className="h-4 w-4" />
              Apply Leave
            </Button>
          }
        />

        {/* Quick stats row */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(["All", "Pending", "Approved", "Rejected"] as TabValue[]).map(
            (t) => {
              const colorMap: Record<TabValue, string> = {
                All: "border-[#1A1A1A] text-white",
                Pending: "border-[#FFB800]/30 text-[#FFB800]",
                Approved: "border-[#BFFF00]/30 text-[#BFFF00]",
                Rejected: "border-[#FF5C33]/30 text-[#FF5C33]",
              };
              return (
                <div
                  key={t}
                  className={`rounded-none border bg-[#111] p-4 ${colorMap[t]}`}
                >
                  <p className="text-xs uppercase tracking-wider text-[#6e6e6e] font-[JetBrains_Mono]">
                    {t}
                  </p>
                  <p className="mt-1 text-2xl font-bold font-[JetBrains_Mono]">
                    {counts[t]}
                  </p>
                </div>
              );
            },
          )}
        </div>

        {/* Filter tabs + export */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <FilterTabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={(tab) => setActiveTab(tab as TabValue)}
          />
          <Button className="flex items-center gap-2 rounded-none border border-[#1A1A1A] bg-[#0A0A0A] px-3 py-2 text-xs text-[#6e6e6e] font-[Inter] hover:text-white transition-colors">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block rounded-none border border-[#1A1A1A] bg-[#111]">
          {filtered.length > 0 ? (
            <DataTable columns={columns} data={filtered} />
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-[#6e6e6e]">
              <Filter className="mb-3 h-8 w-8" />
              <p className="text-sm font-[Inter]">
                No {activeTab.toLowerCase()} requests found.
              </p>
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="space-y-3 md:hidden">
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-none border border-[#1A1A1A] bg-[#111] py-12 text-[#6e6e6e]">
              <Filter className="mb-3 h-8 w-8" />
              <p className="text-sm font-[Inter]">
                No {activeTab.toLowerCase()} requests found.
              </p>
            </div>
          )}

          {filtered.map((req) => (
            <ListCard key={req.id}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-none ${typeIcon[req.type] ?? "bg-[#1A1A1A]"}`}
                  >
                    <Calendar className="h-4 w-4 text-black" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white font-[Inter]">
                      {req.type} Leave
                    </p>
                    <p className="text-xs text-[#6e6e6e] font-[JetBrains_Mono]">
                      {req.id}
                    </p>
                  </div>
                </div>
                <Badge
                  className={`rounded-none px-2 py-0.5 text-xs font-medium font-[Inter] ${statusVariant[req.status]}`}
                >
                  {req.status}
                </Badge>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-[#6e6e6e] font-[JetBrains_Mono]">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" />
                  {req.from}
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" />
                  {req.to}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  {req.days} day{req.days > 1 ? "s" : ""}
                </div>
                <div className="text-[#6e6e6e]">Applied {req.appliedOn}</div>
              </div>
            </ListCard>
          ))}
        </div>
      </div>
    </div>
  );
}
