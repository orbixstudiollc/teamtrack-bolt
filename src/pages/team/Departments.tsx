import {
  Plus,
  Users,
  DollarSign,
  FolderKanban,
  Code2,
  Palette,
  Megaphone,
  Heart,
  PiggyBank,
  Settings2,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Avatar from "../../components/Avatar";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Department {
  id: string;
  name: string;
  icon: React.ReactNode;
  headName: string;
  headInitials: string;
  headTitle: string;
  memberCount: number;
  budget: string;
  activeProjects: number;
  color: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const departments: Department[] = [
  {
    id: "dept-1",
    name: "Engineering",
    icon: <Code2 className="h-5 w-5" />,
    headName: "Alex Thompson",
    headInitials: "AT",
    headTitle: "VP of Engineering",
    memberCount: 24,
    budget: "$2.4M",
    activeProjects: 8,
    color: "#BFFF00",
  },
  {
    id: "dept-2",
    name: "Design",
    icon: <Palette className="h-5 w-5" />,
    headName: "Maya Singh",
    headInitials: "MS",
    headTitle: "Head of Design",
    memberCount: 8,
    budget: "$680K",
    activeProjects: 5,
    color: "#7B61FF",
  },
  {
    id: "dept-3",
    name: "Marketing",
    icon: <Megaphone className="h-5 w-5" />,
    headName: "David Kim",
    headInitials: "DK",
    headTitle: "Marketing Director",
    memberCount: 6,
    budget: "$520K",
    activeProjects: 4,
    color: "#00C2FF",
  },
  {
    id: "dept-4",
    name: "HR",
    icon: <Heart className="h-5 w-5" />,
    headName: "Elena Rodriguez",
    headInitials: "ER",
    headTitle: "HR Director",
    memberCount: 4,
    budget: "$340K",
    activeProjects: 3,
    color: "#FF5C33",
  },
  {
    id: "dept-5",
    name: "Finance",
    icon: <PiggyBank className="h-5 w-5" />,
    headName: "Robert Chang",
    headInitials: "RC",
    headTitle: "CFO",
    memberCount: 4,
    budget: "$410K",
    activeProjects: 2,
    color: "#FFB800",
  },
  {
    id: "dept-6",
    name: "Operations",
    icon: <Settings2 className="h-5 w-5" />,
    headName: "Natalie Brooks",
    headInitials: "NB",
    headTitle: "Head of Operations",
    memberCount: 3,
    budget: "$290K",
    activeProjects: 3,
    color: "#BFFF00",
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Departments() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Header */}
      <PageHeader
        title="Departments"
        action={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Department
          </Button>
        }
      />

      {/* Summary bar */}
      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-secondary text-muted-foreground">
        <span>
          <strong className="text-foreground font-primary">
            {departments.length}
          </strong>{" "}
          departments
        </span>
        <span className="hidden sm:inline">&middot;</span>
        <span>
          <strong className="text-foreground font-primary">
            {departments.reduce((s, d) => s + d.memberCount, 0)}
          </strong>{" "}
          total members
        </span>
        <span className="hidden sm:inline">&middot;</span>
        <span>
          <strong className="text-foreground font-primary">
            {departments.reduce((s, d) => s + d.activeProjects, 0)}
          </strong>{" "}
          active projects
        </span>
      </div>

      {/* Department cards grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="group rounded-none border border-border bg-card p-6 transition-colors hover:border-[#333]"
          >
            {/* Top row: icon + name */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-none border border-border"
                  style={{ color: dept.color }}
                >
                  {dept.icon}
                </div>
                <h3 className="font-primary text-lg font-semibold text-foreground">
                  {dept.name}
                </h3>
              </div>
              <Badge className="bg-[#0A0A0A] text-muted-foreground border border-border">
                {dept.memberCount} members
              </Badge>
            </div>

            {/* Head of department */}
            <div className="mt-5 flex items-center gap-3">
              <Avatar initials={dept.headInitials} size="sm" />
              <div>
                <p className="font-primary text-sm font-medium text-foreground">
                  {dept.headName}
                </p>
                <p className="font-secondary text-xs text-muted-foreground">
                  {dept.headTitle}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-5">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-secondary text-xs text-muted-foreground">
                    Budget
                  </p>
                  <p className="font-primary text-sm font-semibold text-foreground">
                    {dept.budget}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FolderKanban className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-secondary text-xs text-muted-foreground">
                    Active Projects
                  </p>
                  <p className="font-primary text-sm font-semibold text-foreground">
                    {dept.activeProjects}
                  </p>
                </div>
              </div>
            </div>

            {/* Members preview (small avatars) */}
            <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
              <div className="flex -space-x-2">
                {Array.from({ length: Math.min(dept.memberCount, 5) }).map(
                  (_, i) => (
                    <div
                      key={i}
                      className="flex h-7 w-7 items-center justify-center rounded-none border-2 border-card bg-[#0A0A0A]"
                    >
                      <Users className="h-3 w-3 text-muted-foreground" />
                    </div>
                  ),
                )}
                {dept.memberCount > 5 && (
                  <div className="flex h-7 w-7 items-center justify-center rounded-none border-2 border-card bg-[#0A0A0A]">
                    <span className="font-primary text-[10px] text-muted-foreground">
                      +{dept.memberCount - 5}
                    </span>
                  </div>
                )}
              </div>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
