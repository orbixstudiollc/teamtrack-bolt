import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Clock,
  FolderOpen,
  Users,
  CalendarCheck,
  Wallet,
  BarChart3,
  Settings,
  ChevronDown,
  Calendar,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const mainNav = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/dashboard/timesheet/daily", icon: Clock, label: "Timesheets" },
  { to: "/projects", icon: FolderOpen, label: "Projects" },
  { to: "/team", icon: Users, label: "Team" },
];

const manageNav = [
  { to: "/leave", icon: CalendarCheck, label: "Leave" },
  { to: "/payroll", icon: Wallet, label: "Payroll" },
  { to: "/reports", icon: BarChart3, label: "Reports" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

function NavItem({ to, icon: Icon, label }: { to: string; icon: React.ElementType; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3.5 py-3 font-primary text-[12px] w-full transition-colors ${
          isActive
            ? "bg-card text-foreground border-l-[2px] border-primary"
            : "text-muted-foreground hover:text-foreground hover:bg-card/50 border-l-[2px] border-transparent"
        }`
      }
    >
      <Icon size={20} className="flex-shrink-0" />
      {label}
    </NavLink>
  );
}

export default function Sidebar() {
  const { profile, user } = useAuth();
  const displayName = profile ? `${profile.first_name} ${profile.last_name}` : "Sarah Admin";
  const displayEmail = profile?.email || user?.email || "sarah@teamtrack.io";

  return (
    <aside className="hidden md:flex flex-col w-60 h-screen bg-black border-r border-border flex-shrink-0">
      <div className="flex items-center gap-3 px-6 h-[88px] border-b border-border">
        <div className="w-8 h-8 bg-primary flex items-center justify-center flex-shrink-0">
          <Calendar size={16} className="text-primary-foreground" />
        </div>
        <span className="font-secondary text-[20px] font-bold tracking-[4px] text-foreground">
          TEAMTRACK
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <p className="font-primary text-[10px] font-semibold uppercase tracking-[1px] text-muted-foreground px-3.5 pb-2">
          MAIN
        </p>
        <div className="mb-6">
          {mainNav.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </div>

        <p className="font-primary text-[10px] font-semibold uppercase tracking-[1px] text-muted-foreground px-3.5 pb-2">
          MANAGE
        </p>
        <div>
          {manageNav.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </div>
      </nav>

      <div className="border-t border-border px-4 py-4">
        <button className="w-full flex items-center gap-3 hover:bg-card p-2 transition-colors group">
          <div className="w-8 h-8 bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
            <span className="font-primary text-[11px] font-bold text-primary">
              {displayName.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </span>
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="font-primary text-[12px] font-semibold text-foreground truncate">{displayName}</p>
            <p className="font-primary text-[11px] text-muted-foreground truncate">{displayEmail}</p>
          </div>
          <ChevronDown size={14} className="text-muted-foreground flex-shrink-0" />
        </button>
      </div>
    </aside>
  );
}
