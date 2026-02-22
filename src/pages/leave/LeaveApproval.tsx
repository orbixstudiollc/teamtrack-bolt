import { useState, useMemo, useCallback } from "react";
import {
  Check,
  X,
  Calendar,
  Clock,
  AlertCircle,
  Filter,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import DataTable from "../../components/DataTable";
import Avatar from "../../components/Avatar";
import FilterTabs from "../../components/FilterTabs";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ApprovalStatus = "Pending" | "Approved" | "Rejected";
type TabValue = "All" | "Pending" | "Approved" | "Rejected";

interface ApprovalRequest {
  id: string;
  employee: string;
  avatar: string;
  department: string;
  type: string;
  dates: string;
  days: number;
  reason: string;
  status: ApprovalStatus;
}

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const initialRequests: ApprovalRequest[] = [
  {
    id: "AP-301",
    employee: "Sarah Chen",
    avatar: "SC",
    department: "Engineering",
    type: "Annual",
    dates: "Nov 25 - Nov 29",
    days: 5,
    reason: "Family vacation during Thanksgiving week",
    status: "Pending",
  },
  {
    id: "AP-302",
    employee: "Marcus Rivera",
    avatar: "MR",
    department: "Design",
    type: "Sick",
    dates: "Nov 22 - Nov 22",
    days: 1,
    reason: "Doctor's appointment and follow-up tests",
    status: "Pending",
  },
  {
    id: "AP-303",
    employee: "Aisha Patel",
    avatar: "AP",
    department: "Marketing",
    type: "Personal",
    dates: "Dec 02 - Dec 03",
    days: 2,
    reason: "Moving to a new apartment",
    status: "Pending",
  },
  {
    id: "AP-304",
    employee: "James O'Brien",
    avatar: "JO",
    department: "Sales",
    type: "Comp Off",
    dates: "Dec 05 - Dec 05",
    days: 1,
    reason: "Worked overtime on product launch weekend",
    status: "Pending",
  },
  {
    id: "AP-305",
    employee: "Lena Kowalski",
    avatar: "LK",
    department: "Engineering",
    type: "Annual",
    dates: "Nov 11 - Nov 15",
    days: 5,
    reason: "Pre-planned holiday trip",
    status: "Approved",
  },
  {
    id: "AP-306",
    employee: "Carlos Mendez",
    avatar: "CM",
    department: "HR",
    type: "Sick",
    dates: "Nov 04 - Nov 05",
    days: 2,
    reason: "Flu symptoms",
    status: "Approved",
  },
  {
    id: "AP-307",
    employee: "Nina Okafor",
    avatar: "NO",
    department: "Design",
    type: "Personal",
    dates: "Oct 28 - Oct 28",
    days: 1,
    reason: "Visa renewal appointment",
    status: "Rejected",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const tabs: TabValue[] = ["All", "Pending", "Approved", "Rejected"];

const statusVariant: Record<ApprovalStatus, string> = {
  Approved: "bg-[#BFFF00]/10 text-[#BFFF00]",
  Pending: "bg-[#FFB800]/10 text-[#FFB800]",
  Rejected: "bg-[#FF5C33]/10 text-[#FF5C33]",
};

const typeColor: Record<string, string> = {
  Annual: "bg-[#BFFF00]",
  Sick: "bg-[#FF5C33]",
  Personal: "bg-[#00C2FF]",
  "Comp Off": "bg-[#7B61FF]",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function LeaveApproval() {
  const [activeTab, setActiveTab] = useState<TabValue>("All");
  const [requests, setRequests] = useState(initialRequests);

  const pendingCount = useMemo(
    () => requests.filter((r) => r.status === "Pending").length,
    [requests],
  );

  const filtered = useMemo(() => {
    if (activeTab === "All") return requests;
    return requests.filter((r) => r.status === activeTab);
  }, [activeTab, requests]);

  const handleAction = useCallback(
    (id: string, action: "Approved" | "Rejected") => {
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: action } : r)),
      );
    },
    [],
  );

  // ---- Desktop columns ----
  const columns = [
    {
      header: "Employee",
      accessor: "employee" as const,
      render: (row: ApprovalRequest) => (
        <div className="flex items-center gap-3">
          <Avatar
            initials={row.avatar}
            className="flex h-8 w-8 items-center justify-center rounded-none bg-[#0A0A0A] border border-[#1A1A1A] text-xs font-semibold text-white font-[JetBrains_Mono]"
          />
          <div>
            <p className="text-sm font-medium text-white font-[Inter]">
              {row.employee}
            </p>
            <p className="text-xs text-[#6e6e6e] font-[Inter]">
              {row.department}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Type",
      accessor: "type" as const,
      render: (row: ApprovalRequest) => (
        <div className="flex items-center gap-2">
          <span
            className={`inline-block h-2 w-2 rounded-none ${typeColor[row.type] ?? "bg-white"}`}
          />
          <span className="text-sm text-[#6e6e6e] font-[Inter]">
            {row.type}
          </span>
        </div>
      ),
    },
    {
      header: "Dates",
      accessor: "dates" as const,
      render: (row: ApprovalRequest) => (
        <span className="text-sm text-[#6e6e6e] font-[JetBrains_Mono]">
          {row.dates}
        </span>
      ),
    },
    {
      header: "Days",
      accessor: "days" as const,
      render: (row: ApprovalRequest) => (
        <span className="text-sm font-semibold text-white font-[JetBrains_Mono]">
          {row.days}
        </span>
      ),
    },
    {
      header: "Reason",
      accessor: "reason" as const,
      render: (row: ApprovalRequest) => (
        <span className="line-clamp-1 max-w-[200px] text-sm text-[#6e6e6e] font-[Inter]">
          {row.reason}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status" as const,
      render: (row: ApprovalRequest) => (
        <Badge
          className={`rounded-none px-2.5 py-1 text-xs font-medium font-[Inter] ${statusVariant[row.status]}`}
        >
          {row.status}
        </Badge>
      ),
    },
    {
      header: "Actions",
      accessor: "id" as const,
      render: (row: ApprovalRequest) =>
        row.status === "Pending" ? (
          <div className="flex items-center gap-2">
            <Button
              onClick={() => handleAction(row.id, "Approved")}
              className="flex items-center gap-1.5 rounded-none bg-[#BFFF00]/10 px-3 py-1.5 text-xs font-medium text-[#BFFF00] font-[Inter] hover:bg-[#BFFF00]/20 transition-colors"
            >
              <Check className="h-3.5 w-3.5" />
              Approve
            </Button>
            <Button
              onClick={() => handleAction(row.id, "Rejected")}
              className="flex items-center gap-1.5 rounded-none bg-[#FF5C33]/10 px-3 py-1.5 text-xs font-medium text-[#FF5C33] font-[Inter] hover:bg-[#FF5C33]/20 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
              Reject
            </Button>
          </div>
        ) : (
          <span className="text-xs text-[#6e6e6e] font-[Inter]">--</span>
        ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#000] text-white font-[Inter]">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <PageHeader
          title="Leave Approvals"
          action={
            <Badge className="flex items-center gap-1.5 rounded-none bg-[#FFB800]/10 px-3 py-1.5 text-sm font-medium text-[#FFB800] font-[Inter]">
              <AlertCircle className="h-4 w-4" />
              {pendingCount} Pending
            </Badge>
          }
        />

        {/* Filter Tabs */}
        <FilterTabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={(tab) => setActiveTab(tab as TabValue)}
        />

        {/* Desktop Table */}
        <div className="hidden md:block rounded-none border border-[#1A1A1A] bg-[#111]">
          {filtered.length > 0 ? (
            <DataTable columns={columns} data={filtered} />
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-[#6e6e6e]">
              <Filter className="mb-3 h-8 w-8" />
              <p className="text-sm font-[Inter]">
                No {activeTab.toLowerCase()} requests.
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
                No {activeTab.toLowerCase()} requests.
              </p>
            </div>
          )}

          {filtered.map((req) => (
            <div
              key={req.id}
              className="rounded-none border border-[#1A1A1A] bg-[#111] p-4 space-y-4"
            >
              {/* Top row: avatar + name + badge */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar
                    initials={req.avatar}
                    className="flex h-10 w-10 items-center justify-center rounded-none bg-[#0A0A0A] border border-[#1A1A1A] text-xs font-semibold text-white font-[JetBrains_Mono]"
                  />
                  <div>
                    <p className="text-sm font-medium text-white font-[Inter]">
                      {req.employee}
                    </p>
                    <p className="text-xs text-[#6e6e6e] font-[Inter]">
                      {req.department}
                    </p>
                  </div>
                </div>
                <Badge
                  className={`rounded-none px-2 py-0.5 text-xs font-medium font-[Inter] ${statusVariant[req.status]}`}
                >
                  {req.status}
                </Badge>
              </div>

              {/* Leave info */}
              <div className="grid grid-cols-3 gap-2 rounded-none bg-[#0A0A0A] border border-[#1A1A1A] p-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#6e6e6e] font-[JetBrains_Mono]">
                    Type
                  </p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span
                      className={`inline-block h-2 w-2 rounded-none ${typeColor[req.type] ?? "bg-white"}`}
                    />
                    <span className="text-xs text-white font-[Inter]">
                      {req.type}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#6e6e6e] font-[JetBrains_Mono]">
                    Dates
                  </p>
                  <p className="mt-1 text-xs text-white font-[JetBrains_Mono]">
                    {req.dates}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#6e6e6e] font-[JetBrains_Mono]">
                    Days
                  </p>
                  <p className="mt-1 text-xs font-semibold text-white font-[JetBrains_Mono]">
                    {req.days}
                  </p>
                </div>
              </div>

              {/* Reason */}
              <p className="text-xs text-[#6e6e6e] font-[Inter] leading-relaxed">
                {req.reason}
              </p>

              {/* Action buttons (pending only) */}
              {req.status === "Pending" && (
                <div className="flex items-center gap-2 pt-1">
                  <Button
                    onClick={() => handleAction(req.id, "Approved")}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-none bg-[#BFFF00] py-2 text-xs font-semibold text-black font-[Inter] hover:bg-[#BFFF00]/90 transition-colors"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleAction(req.id, "Rejected")}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-none border border-[#FF5C33]/30 bg-transparent py-2 text-xs font-semibold text-[#FF5C33] font-[Inter] hover:bg-[#FF5C33]/10 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                    Reject
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
