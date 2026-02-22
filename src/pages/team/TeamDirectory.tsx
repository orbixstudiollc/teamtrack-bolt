import { useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Mail,
  Building2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import DataTable from "../../components/DataTable";
import ListCard from "../../components/ListCard";
import Avatar from "../../components/Avatar";
import Input from "../../components/Input";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Employee {
  id: string;
  name: string;
  avatar: string;
  position: string;
  department: string;
  email: string;
  status: "Active" | "On Leave" | "Inactive";
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const employees: Employee[] = [
  {
    id: "EMP-001",
    name: "Sarah Chen",
    avatar: "SC",
    position: "Senior Frontend Developer",
    department: "Engineering",
    email: "sarah.chen@teamtrack.io",
    status: "Active",
  },
  {
    id: "EMP-002",
    name: "Marcus Johnson",
    avatar: "MJ",
    position: "Product Designer",
    department: "Design",
    email: "marcus.j@teamtrack.io",
    status: "Active",
  },
  {
    id: "EMP-003",
    name: "Priya Patel",
    avatar: "PP",
    position: "Backend Engineer",
    department: "Engineering",
    email: "priya.p@teamtrack.io",
    status: "On Leave",
  },
  {
    id: "EMP-004",
    name: "David Kim",
    avatar: "DK",
    position: "Marketing Manager",
    department: "Marketing",
    email: "david.kim@teamtrack.io",
    status: "Active",
  },
  {
    id: "EMP-005",
    name: "Elena Rodriguez",
    avatar: "ER",
    position: "HR Specialist",
    department: "HR",
    email: "elena.r@teamtrack.io",
    status: "Active",
  },
  {
    id: "EMP-006",
    name: "James Wright",
    avatar: "JW",
    position: "DevOps Engineer",
    department: "Engineering",
    email: "james.w@teamtrack.io",
    status: "Inactive",
  },
  {
    id: "EMP-007",
    name: "Aisha Mohammed",
    avatar: "AM",
    position: "UX Researcher",
    department: "Design",
    email: "aisha.m@teamtrack.io",
    status: "Active",
  },
  {
    id: "EMP-008",
    name: "Liam O'Brien",
    avatar: "LO",
    position: "Financial Analyst",
    department: "Finance",
    email: "liam.ob@teamtrack.io",
    status: "Active",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const statusVariant: Record<Employee["status"], string> = {
  Active: "bg-[#BFFF00] text-black",
  "On Leave": "bg-[#FFB800] text-black",
  Inactive: "bg-[#FF5C33] text-black",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TeamDirectory() {
  const [search, setSearch] = useState("");

  const filtered = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.position.toLowerCase().includes(search.toLowerCase()) ||
      e.department.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()),
  );

  // ---- Desktop table columns ------------------------------------------------

  const columns = [
    {
      key: "employee" as const,
      header: "Employee",
      render: (row: Employee) => (
        <div className="flex items-center gap-3">
          <Avatar initials={row.avatar} size="sm" />
          <div>
            <p className="font-primary text-sm font-medium text-foreground">
              {row.name}
            </p>
            <p className="font-secondary text-xs text-muted-foreground">
              {row.id}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "position" as const,
      header: "Position",
      render: (row: Employee) => (
        <span className="font-secondary text-sm text-foreground">
          {row.position}
        </span>
      ),
    },
    {
      key: "department" as const,
      header: "Department",
      render: (row: Employee) => (
        <span className="font-secondary text-sm text-muted-foreground">
          {row.department}
        </span>
      ),
    },
    {
      key: "email" as const,
      header: "Email",
      render: (row: Employee) => (
        <span className="font-secondary text-sm text-muted-foreground">
          {row.email}
        </span>
      ),
    },
    {
      key: "status" as const,
      header: "Status",
      render: (row: Employee) => (
        <Badge className={statusVariant[row.status]}>{row.status}</Badge>
      ),
    },
    {
      key: "actions" as const,
      header: "Actions",
      render: (_row: Employee) => (
        <Button variant="ghost" size="sm">
          <Eye className="mr-1 h-4 w-4" />
          View
        </Button>
      ),
    },
  ];

  // ---- Render ---------------------------------------------------------------

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Header */}
      <PageHeader
        title="Team Directory"
        action={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        }
      />

      {/* Search */}
      <div className="mt-6">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="mt-6 hidden md:block">
        <DataTable<Employee> columns={columns} data={filtered} />
      </div>

      {/* Mobile List */}
      <div className="mt-6 flex flex-col gap-3 md:hidden">
        {filtered.map((emp) => (
          <ListCard key={emp.id}>
            <div className="flex items-start gap-3">
              <Avatar initials={emp.avatar} size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-primary text-sm font-medium text-foreground truncate">
                    {emp.name}
                  </p>
                  <Badge className={statusVariant[emp.status]}>
                    {emp.status}
                  </Badge>
                </div>
                <p className="font-secondary mt-0.5 text-xs text-muted-foreground">
                  {emp.position}
                </p>
                <div className="mt-2 flex flex-col gap-1 text-xs text-muted-foreground font-secondary">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-3 w-3" />
                    {emp.department}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-3 w-3" />
                    {emp.email}
                  </span>
                </div>
                <div className="mt-3">
                  <Button variant="ghost" size="sm" className="w-full">
                    <Eye className="mr-1 h-4 w-4" />
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          </ListCard>
        ))}
      </div>

      {/* Footer / pagination hint */}
      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <p className="font-secondary text-sm text-muted-foreground">
          Showing {filtered.length} of 48 employees
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-primary text-sm text-foreground">1</span>
          <Button variant="outline" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
