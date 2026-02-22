import { NavLink } from "react-router-dom";
import { Home, FolderOpen, Users, CalendarCheck, Settings } from "lucide-react";

const tabs = [
  { to: "/dashboard", icon: Home, label: "Home" },
  { to: "/projects", icon: FolderOpen, label: "Projects" },
  { to: "/team", icon: Users, label: "Team" },
  { to: "/leave", icon: CalendarCheck, label: "Leave" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export default function MobileBottomNav() {
  return (
    <nav className="md:hidden flex items-center border-t border-border bg-black flex-shrink-0">
      {tabs.map(({ to, icon: Icon, label }) => (
        <NavLink key={to} to={to}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center py-3 gap-1 font-primary text-[10px] transition-colors ${
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`
          }>
          <Icon size={20} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
