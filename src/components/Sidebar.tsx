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
} from "lucide-react";

const mainNav = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/dashboard/timesheet/daily", icon: Clock, label: "Time Tracking" },
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
        `flex items-center gap-3 px-3.5 py-3 font-primary text-[13px] w-full ${
          isActive
            ? "bg-card font-medium text-foreground border-l-2 border-primary"
            : "text-muted-foreground hover:text-foreground"
        }`
      }
    >
      <Icon size={16} />
      {label}
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-60 h-screen bg-background border-r border-border flex-shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 h-[88px] border-b border-border">
        <div className="w-8 h-8 bg-primary rounded" />
        <span className="font-secondary text-[15px] font-semibold tracking-[3px] text-foreground">
          TEAMTRACK
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-0 px-3">
        <p className="text-muted-foreground font-primary text-xs font-medium px-3.5 py-4 tracking-wide">
          MAIN
        </p>
        {mainNav.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}

        <p className="text-muted-foreground font-primary text-xs font-medium px-3.5 py-4 tracking-wide">
          MANAGE
        </p>
        {manageNav.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </nav>

      {/* Footer */}
      <div className="flex items-center gap-2 px-6 py-6 border-t border-border">
        <div className="flex-1 min-w-0">
          <p className="text-foreground font-primary text-xs font-medium truncate">Sarah Admin</p>
          <p className="text-muted-foreground font-primary text-xs truncate">sarah@teamtrack.io</p>
        </div>
        <ChevronDown size={24} className="text-muted-foreground flex-shrink-0" />
      </div>
    </aside>
  );
}
