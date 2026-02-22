import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Users,
  Check,
  X,
  Crown,
  UserCog,
  Briefcase,
  User,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import DataTable from "../../components/DataTable";
import ListCard from "../../components/ListCard";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Role {
  id: string;
  name: string;
  description: string;
  members: number;
  permissionsCount: number;
  icon: React.ReactNode;
  color: string;
}

type PermLevel = "view" | "create" | "edit" | "delete";

interface ModulePermissions {
  module: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const roles: Role[] = [
  {
    id: "role-1",
    name: "Super Admin",
    description: "Full system access with all permissions enabled",
    members: 2,
    permissionsCount: 28,
    icon: <ShieldAlert className="h-4 w-4" />,
    color: "#FF5C33",
  },
  {
    id: "role-2",
    name: "Admin",
    description: "Administrative access with most permissions",
    members: 4,
    permissionsCount: 24,
    icon: <ShieldCheck className="h-4 w-4" />,
    color: "#FFB800",
  },
  {
    id: "role-3",
    name: "Manager",
    description: "Team management and reporting capabilities",
    members: 8,
    permissionsCount: 18,
    icon: <Crown className="h-4 w-4" />,
    color: "#7B61FF",
  },
  {
    id: "role-4",
    name: "Team Lead",
    description: "Team oversight with limited administrative access",
    members: 12,
    permissionsCount: 14,
    icon: <UserCog className="h-4 w-4" />,
    color: "#00C2FF",
  },
  {
    id: "role-5",
    name: "Employee",
    description: "Standard employee access for day-to-day tasks",
    members: 22,
    permissionsCount: 8,
    icon: <User className="h-4 w-4" />,
    color: "#BFFF00",
  },
];

const modules: string[] = [
  "Dashboard",
  "Projects",
  "Team",
  "Leave",
  "Payroll",
  "Reports",
  "Settings",
];

const permLevels: PermLevel[] = ["view", "create", "edit", "delete"];

// Matrix data: for each module, which permission levels are enabled.
// We model it as a simple look-up where "Super Admin" has all.
const permissionsMatrix: ModulePermissions[] = [
  { module: "Dashboard", view: true, create: false, edit: false, delete: false },
  { module: "Projects", view: true, create: true, edit: true, delete: true },
  { module: "Team", view: true, create: true, edit: true, delete: true },
  { module: "Leave", view: true, create: true, edit: true, delete: false },
  { module: "Payroll", view: true, create: true, edit: true, delete: false },
  { module: "Reports", view: true, create: true, edit: false, delete: false },
  { module: "Settings", view: true, create: false, edit: true, delete: false },
];

// ---------------------------------------------------------------------------
// Table columns
// ---------------------------------------------------------------------------

const columns = [
  {
    key: "name" as const,
    header: "Role Name",
    render: (row: Role) => (
      <div className="flex items-center gap-3">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-none border border-border"
          style={{ color: row.color }}
        >
          {row.icon}
        </div>
        <span className="font-primary text-sm font-medium text-foreground">
          {row.name}
        </span>
      </div>
    ),
  },
  {
    key: "description" as const,
    header: "Description",
    render: (row: Role) => (
      <span className="font-secondary text-sm text-muted-foreground">
        {row.description}
      </span>
    ),
  },
  {
    key: "members" as const,
    header: "Members",
    render: (row: Role) => (
      <div className="flex items-center gap-1.5">
        <Users className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="font-primary text-sm text-foreground">
          {row.members}
        </span>
      </div>
    ),
  },
  {
    key: "permissionsCount" as const,
    header: "Permissions",
    render: (row: Role) => (
      <Badge className="bg-[#0A0A0A] text-muted-foreground border border-border">
        {row.permissionsCount} permissions
      </Badge>
    ),
  },
  {
    key: "actions" as const,
    header: "Actions",
    render: (_row: Role) => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          Edit
        </Button>
      </div>
    ),
  },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function PermissionCell({ allowed }: { allowed: boolean }) {
  return allowed ? (
    <Badge className="bg-[#BFFF00]/10 text-[#BFFF00] border border-[#BFFF00]/20">
      <Check className="h-3 w-3" />
    </Badge>
  ) : (
    <span className="flex h-6 w-6 items-center justify-center text-muted-foreground/40">
      <X className="h-3 w-3" />
    </span>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function RolesPermissions() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Header */}
      <PageHeader
        title="Roles & Permissions"
        action={
          <Button>
            <Shield className="mr-2 h-4 w-4" />
            Add Role
          </Button>
        }
      />

      {/* ---- Roles Table (Desktop) ---- */}
      <div className="mt-6 hidden md:block">
        <DataTable<Role> columns={columns} data={roles} />
      </div>

      {/* ---- Roles List (Mobile) ---- */}
      <div className="mt-6 flex flex-col gap-3 md:hidden">
        {roles.map((role) => (
          <ListCard key={role.id}>
            <div className="flex items-start gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none border border-border"
                style={{ color: role.color }}
              >
                {role.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-primary text-sm font-medium text-foreground">
                    {role.name}
                  </p>
                  <Badge className="bg-[#0A0A0A] text-muted-foreground border border-border text-xs">
                    {role.permissionsCount}
                  </Badge>
                </div>
                <p className="font-secondary mt-0.5 text-xs text-muted-foreground">
                  {role.description}
                </p>
                <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground font-secondary">
                  <Users className="h-3 w-3" />
                  {role.members} members
                </div>
                <div className="mt-3">
                  <Button variant="ghost" size="sm" className="w-full">
                    Edit Role
                  </Button>
                </div>
              </div>
            </div>
          </ListCard>
        ))}
      </div>

      {/* ---- Permissions Matrix ---- */}
      <div className="mt-10">
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-[#7B61FF]" />
          <h2 className="font-primary text-lg font-semibold text-foreground">
            Permissions Matrix
          </h2>
        </div>
        <p className="mt-1 font-secondary text-sm text-muted-foreground">
          Default permission levels for the Manager role across all modules.
        </p>

        {/* Matrix table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 pr-4 text-left font-primary text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Module
                </th>
                {permLevels.map((level) => (
                  <th
                    key={level}
                    className="px-4 py-3 text-center font-primary text-xs font-medium uppercase tracking-wider text-muted-foreground"
                  >
                    {level}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {permissionsMatrix.map((row) => (
                <tr
                  key={row.module}
                  className="transition-colors hover:bg-[#0A0A0A]"
                >
                  <td className="py-3 pr-4 font-primary text-sm text-foreground">
                    {row.module}
                  </td>
                  {permLevels.map((level) => (
                    <td key={level} className="px-4 py-3 text-center">
                      <div className="flex justify-center">
                        <PermissionCell allowed={row[level]} />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-4 text-xs font-secondary text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Badge className="bg-[#BFFF00]/10 text-[#BFFF00] border border-[#BFFF00]/20">
            <Check className="h-3 w-3" />
          </Badge>
          Allowed
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground/40">
            <X className="h-3 w-3" />
          </span>
          Denied
        </div>
      </div>
    </div>
  );
}
