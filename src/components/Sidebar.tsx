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
        `flex items-center gap-3 px-3.5 py-2.5 font-primary text-[13px] w-full transition-colors ${
          isActive
            ? "bg-card text-foreground border-l-[3px] border-primary"
            : "text-muted-foreground hover:text-foreground hover:bg-card/50"
        }`
      }
    >
      <Icon size={18} className="flex-shrink-0" />
      {label}
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-60 h-screen bg-black border-r border-border flex-shrink-0">
      <div className="flex items-center gap-2.5 px-6 h-[88px] border-b border-border">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-black rounded-sm" />
        </div>
        <span className="font-secondary text-base font-bold tracking-[0.15em] text-foreground">
          TEAMTRACK
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <p className="text-muted-foreground font-primary text-[10px] font-semibold px-3.5 pb-2 tracking-[0.1em] uppercase">
          MAIN
        </p>
        <div className="space-y-0.5">
          {mainNav.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </div>

        <p className="text-muted-foreground font-primary text-[10px] font-semibold px-3.5 pb-2 pt-6 tracking-[0.1em] uppercase">
          MANAGE
        </p>
        <div className="space-y-0.5">
          {manageNav.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </div>
      </nav>

      <div className="border-t border-border px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-foreground font-primary text-[13px] font-medium truncate">Sarah Admin</p>
            <p className="text-muted-foreground font-primary text-[11px] truncate mt-0.5">sarah@teamtrack.io</p>
          </div>
          <ChevronDown size={16} className="text-muted-foreground flex-shrink-0 ml-2" />
        </div>
      </div>
    </aside>
  );
}
