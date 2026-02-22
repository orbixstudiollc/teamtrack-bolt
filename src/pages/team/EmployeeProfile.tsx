import { useState } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Calendar,
  Clock,
  FolderKanban,
  CheckCircle2,
  BarChart3,
  Edit,
  Download,
  FileText,
  Activity,
  User,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import MetricCard from "../../components/MetricCard";
import Avatar from "../../components/Avatar";
import FilterTabs from "../../components/FilterTabs";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type TabKey = "overview" | "activity" | "documents";

interface PersonalField {
  label: string;
  value: string;
}

interface ActivityEntry {
  id: string;
  action: string;
  detail: string;
  timestamp: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  size: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const profile = {
  name: "Sarah Chen",
  initials: "SC",
  position: "Senior Frontend Developer",
  department: "Engineering",
  email: "sarah.chen@teamtrack.io",
  phone: "+1 (555) 234-5678",
  joinDate: "March 15, 2022",
  status: "Active" as const,
  location: "San Francisco, CA",
  reportingTo: "Alex Thompson",
  employeeId: "EMP-001",
  employmentType: "Full-time",
  workSchedule: "Mon - Fri, 9 AM - 6 PM",
  salary: "$145,000 / year",
};

const personalInfo: PersonalField[] = [
  { label: "Full Name", value: profile.name },
  { label: "Email", value: profile.email },
  { label: "Phone", value: profile.phone },
  { label: "Location", value: profile.location },
  { label: "Date of Birth", value: "June 12, 1992" },
  { label: "Gender", value: "Female" },
  { label: "Nationality", value: "American" },
  { label: "Emergency Contact", value: "Michael Chen - (555) 876-5432" },
];

const employmentDetails: PersonalField[] = [
  { label: "Employee ID", value: profile.employeeId },
  { label: "Department", value: profile.department },
  { label: "Position", value: profile.position },
  { label: "Employment Type", value: profile.employmentType },
  { label: "Join Date", value: profile.joinDate },
  { label: "Reporting To", value: profile.reportingTo },
  { label: "Work Schedule", value: profile.workSchedule },
  { label: "Salary", value: profile.salary },
];

const activities: ActivityEntry[] = [
  {
    id: "a1",
    action: "Completed Task",
    detail: 'Finished "Redesign user dashboard" in Project Alpha',
    timestamp: "2 hours ago",
  },
  {
    id: "a2",
    action: "Submitted Timesheet",
    detail: "Logged 42 hours for the week of Feb 10 - Feb 14",
    timestamp: "1 day ago",
  },
  {
    id: "a3",
    action: "Joined Project",
    detail: 'Added to "Mobile App Revamp" as Frontend Lead',
    timestamp: "3 days ago",
  },
  {
    id: "a4",
    action: "Leave Approved",
    detail: "PTO request for March 20 - March 22 approved",
    timestamp: "5 days ago",
  },
  {
    id: "a5",
    action: "Performance Review",
    detail: "Q4 2025 review completed - Rating: Exceeds Expectations",
    timestamp: "2 weeks ago",
  },
];

const documents: Document[] = [
  {
    id: "d1",
    name: "Employment Contract",
    type: "PDF",
    uploadedAt: "Mar 15, 2022",
    size: "2.4 MB",
  },
  {
    id: "d2",
    name: "NDA Agreement",
    type: "PDF",
    uploadedAt: "Mar 15, 2022",
    size: "1.1 MB",
  },
  {
    id: "d3",
    name: "Tax Form W-4",
    type: "PDF",
    uploadedAt: "Jan 10, 2026",
    size: "340 KB",
  },
  {
    id: "d4",
    name: "Performance Review Q4 2025",
    type: "PDF",
    uploadedAt: "Jan 28, 2026",
    size: "890 KB",
  },
  {
    id: "d5",
    name: "Benefits Enrollment",
    type: "PDF",
    uploadedAt: "Nov 1, 2025",
    size: "1.6 MB",
  },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function InfoCard({
  title,
  fields,
}: {
  title: string;
  fields: PersonalField[];
}) {
  return (
    <div className="rounded-none border border-border bg-card p-6">
      <h3 className="font-primary text-base font-semibold text-foreground">
        {title}
      </h3>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.label}>
            <p className="font-secondary text-xs text-muted-foreground">
              {f.label}
            </p>
            <p className="font-primary mt-0.5 text-sm text-foreground">
              {f.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function EmployeeProfile() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: "overview", label: "Overview", icon: <User className="h-4 w-4" /> },
    {
      key: "activity",
      label: "Activity",
      icon: <Activity className="h-4 w-4" />,
    },
    {
      key: "documents",
      label: "Documents",
      icon: <FileText className="h-4 w-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Back link */}
      <button className="mb-4 flex items-center gap-1 font-secondary text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Team Directory
      </button>

      {/* ---- Header section ---- */}
      <div className="rounded-none border border-border bg-card p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {/* Left: Avatar & basic info */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <Avatar initials="SC" size="xl" />
            <div className="text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                <h1 className="font-primary text-2xl font-bold text-foreground">
                  {profile.name}
                </h1>
                <Badge className="bg-[#BFFF00] text-black">
                  {profile.status}
                </Badge>
              </div>
              <p className="font-secondary mt-1 text-sm text-muted-foreground">
                {profile.position}
              </p>

              {/* Meta items */}
              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground font-secondary sm:justify-start">
                <span className="flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5" />
                  {profile.department}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  {profile.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  {profile.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Joined {profile.joinDate}
                </span>
              </div>
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2 self-center md:self-start">
            <Button variant="outline" size="sm">
              <Edit className="mr-1.5 h-4 w-4" />
              Edit
            </Button>
            <Button size="sm">
              <Mail className="mr-1.5 h-4 w-4" />
              Message
            </Button>
          </div>
        </div>
      </div>

      {/* ---- Stats row ---- */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard
          title="Hours This Month"
          value="168h"
          icon={<Clock className="h-5 w-5 text-[#00C2FF]" />}
        />
        <MetricCard
          title="Projects"
          value="4"
          icon={<FolderKanban className="h-5 w-5 text-[#7B61FF]" />}
        />
        <MetricCard
          title="Tasks Completed"
          value="23"
          icon={<CheckCircle2 className="h-5 w-5 text-[#BFFF00]" />}
        />
        <MetricCard
          title="Attendance"
          value="96%"
          icon={<BarChart3 className="h-5 w-5 text-[#FFB800]" />}
        />
      </div>

      {/* ---- Tabs ---- */}
      <div className="mt-8">
        <FilterTabs
          tabs={tabs.map((t) => ({
            key: t.key,
            label: (
              <span className="flex items-center gap-1.5">
                {t.icon}
                {t.label}
              </span>
            ),
          }))}
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key as TabKey)}
        />
      </div>

      {/* ---- Tab content ---- */}
      <div className="mt-6">
        {/* --- Overview --- */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-6">
            <InfoCard title="Personal Information" fields={personalInfo} />
            <InfoCard title="Employment Details" fields={employmentDetails} />
          </div>
        )}

        {/* --- Activity --- */}
        {activeTab === "activity" && (
          <div className="rounded-none border border-border bg-card divide-y divide-border">
            {activities.map((a) => (
              <div
                key={a.id}
                className="flex items-start gap-4 p-4 hover:bg-[#0A0A0A] transition-colors"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-none bg-[#0A0A0A] border border-border">
                  <Activity className="h-4 w-4 text-[#BFFF00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-primary text-sm font-medium text-foreground">
                    {a.action}
                  </p>
                  <p className="font-secondary mt-0.5 text-xs text-muted-foreground">
                    {a.detail}
                  </p>
                </div>
                <span className="shrink-0 font-secondary text-xs text-muted-foreground">
                  {a.timestamp}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* --- Documents --- */}
        {activeTab === "documents" && (
          <div className="rounded-none border border-border bg-card divide-y divide-border">
            {documents.map((d) => (
              <div
                key={d.id}
                className="flex items-center gap-4 p-4 hover:bg-[#0A0A0A] transition-colors"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none bg-[#0A0A0A] border border-border">
                  <FileText className="h-5 w-5 text-[#00C2FF]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-primary text-sm font-medium text-foreground truncate">
                    {d.name}
                  </p>
                  <p className="font-secondary mt-0.5 text-xs text-muted-foreground">
                    {d.type} &middot; {d.size} &middot; Uploaded {d.uploadedAt}
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
