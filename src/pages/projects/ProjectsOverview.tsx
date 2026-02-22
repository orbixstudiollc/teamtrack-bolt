import React from "react";
import {
  FolderKanban,
  ListChecks,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Calendar,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import MetricCard from "../../components/MetricCard";
import Avatar from "../../components/Avatar";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ProjectMember {
  name: string;
  avatar?: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: "Active" | "On Hold" | "Completed";
  dueDate: string;
  members: ProjectMember[];
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const metrics = [
  {
    label: "Active Projects",
    value: "12",
    icon: FolderKanban,
    accent: "text-[#BFFF00]",
  },
  {
    label: "Total Tasks",
    value: "156",
    icon: ListChecks,
    accent: "text-[#00C2FF]",
  },
  {
    label: "Completed",
    value: "89",
    icon: CheckCircle2,
    accent: "text-[#BFFF00]",
  },
  {
    label: "Overdue",
    value: "7",
    icon: AlertTriangle,
    accent: "text-[#FF5C33]",
  },
];

const projects: Project[] = [
  {
    id: "p1",
    name: "TeamTrack Pro v2.0",
    description: "Major platform upgrade with new analytics dashboard and performance improvements.",
    progress: 72,
    status: "Active",
    dueDate: "Dec 15, 2025",
    members: [
      { name: "Alice Johnson" },
      { name: "Bob Smith" },
      { name: "Carol Lee" },
    ],
  },
  {
    id: "p2",
    name: "Mobile App Redesign",
    description: "Complete redesign of the mobile experience with new navigation patterns.",
    progress: 45,
    status: "Active",
    dueDate: "Jan 20, 2026",
    members: [
      { name: "David Kim" },
      { name: "Eva Martinez" },
      { name: "Frank Chen" },
    ],
  },
  {
    id: "p3",
    name: "API Gateway Migration",
    description: "Migrating legacy REST endpoints to the new GraphQL gateway.",
    progress: 28,
    status: "On Hold",
    dueDate: "Nov 30, 2025",
    members: [
      { name: "Grace Liu" },
      { name: "Henry Park" },
      { name: "Iris Wang" },
    ],
  },
  {
    id: "p4",
    name: "Onboarding Flow",
    description: "New employee onboarding workflow automation with document signing.",
    progress: 91,
    status: "Active",
    dueDate: "Nov 22, 2025",
    members: [
      { name: "Jack Brown" },
      { name: "Karen Davis" },
      { name: "Leo Nguyen" },
    ],
  },
  {
    id: "p5",
    name: "Data Pipeline Rebuild",
    description: "Rebuilding ETL pipelines for real-time analytics processing.",
    progress: 15,
    status: "Active",
    dueDate: "Nov 10, 2025",
    members: [
      { name: "Mia Thompson" },
      { name: "Noah Wilson" },
      { name: "Olivia Garcia" },
    ],
  },
  {
    id: "p6",
    name: "Security Audit 2025",
    description: "Annual security audit and penetration testing with compliance reporting.",
    progress: 100,
    status: "Completed",
    dueDate: "Oct 30, 2025",
    members: [
      { name: "Paul Robinson" },
      { name: "Quinn Adams" },
      { name: "Rita Patel" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getProgressColor(progress: number, status: string): string {
  if (status === "Completed") return "bg-[#BFFF00]";
  if (progress < 30) return "bg-[#FF5C33]";
  if (progress < 60) return "bg-[#FFB800]";
  return "bg-[#BFFF00]";
}

function getStatusVariant(
  status: Project["status"]
): { bg: string; text: string } {
  switch (status) {
    case "Active":
      return { bg: "bg-[#BFFF00]/10", text: "text-[#BFFF00]" };
    case "On Hold":
      return { bg: "bg-[#FFB800]/10", text: "text-[#FFB800]" };
    case "Completed":
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

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const OverlappingAvatars: React.FC<{ members: ProjectMember[] }> = ({
  members,
}) => {
  const avatarColors = [
    "bg-[#7B61FF]",
    "bg-[#00C2FF]",
    "bg-[#FFB800]",
  ];

  return (
    <div className="flex -space-x-2">
      {members.map((member, idx) => (
        <Avatar
          key={member.name}
          src={member.avatar}
          fallback={getInitials(member.name)}
          className={`w-7 h-7 rounded-none border-2 border-[#111] text-[10px] font-semibold text-white ${avatarColors[idx % avatarColors.length]}`}
        />
      ))}
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const statusStyle = getStatusVariant(project.status);
  const barColor = getProgressColor(project.progress, project.status);

  return (
    <div className="bg-[#111] border border-[#1A1A1A] rounded-none p-5 flex flex-col gap-4 hover:border-[#333] transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-[JetBrains_Mono] text-sm font-semibold text-white leading-tight">
          {project.name}
        </h3>
        <Badge className={`${statusStyle.bg} ${statusStyle.text} rounded-none text-[11px] font-medium px-2 py-0.5 whitespace-nowrap`}>
          {project.status}
        </Badge>
      </div>

      {/* Description */}
      <p className="font-[Inter] text-xs text-[#6e6e6e] leading-relaxed line-clamp-2">
        {project.description}
      </p>

      {/* Progress */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="font-[JetBrains_Mono] text-[11px] text-[#6e6e6e]">
            Progress
          </span>
          <span className="font-[JetBrains_Mono] text-[11px] text-white">
            {project.progress}%
          </span>
        </div>
        <div className="h-1.5 w-full bg-[#1A1A1A] rounded-none overflow-hidden">
          <div
            className={`h-full ${barColor} rounded-none transition-all duration-500`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        <OverlappingAvatars members={project.members} />
        <div className="flex items-center gap-1.5 text-[#6e6e6e]">
          <Calendar className="w-3.5 h-3.5" />
          <span className="font-[Inter] text-[11px]">{project.dueDate}</span>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const ProjectsOverview: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* Header */}
        <PageHeader title="Projects">
          <Button className="bg-[#BFFF00] text-black font-[JetBrains_Mono] text-sm font-semibold px-4 py-2 rounded-none hover:bg-[#BFFF00]/90 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </PageHeader>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <MetricCard
              key={m.label}
              label={m.label}
              value={m.value}
              icon={m.icon}
              className="bg-[#111] border border-[#1A1A1A] rounded-none p-5"
              accentClassName={m.accent}
            />
          ))}
        </div>

        {/* Projects Grid */}
        <div>
          <h2 className="font-[JetBrains_Mono] text-base font-semibold text-white mb-4">
            All Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsOverview;
