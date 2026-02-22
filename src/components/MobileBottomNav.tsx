import { NavLink } from "react-router-dom";
import { LayoutGrid, FolderOpen, Users, Calendar, Settings } from "lucide-react";

const tabs = [
  { to: "/dashboard", icon: LayoutGrid, label: "Home" },
  { to: "/projects", icon: FolderOpen, label: "Projects" },
  { to: "/team", icon: Users, label: "Team" },
  { to: "/leave", icon: Calendar, label: "Leave" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export default function MobileBottomNav() {
  return (
    <nav className="flex md:hidden items-center h-16 bg-background border-t border-border">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center gap-0.5 py-2 ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`
          }
        >
          <tab.icon size={20} />
          <span className="font-primary text-[9px] font-semibold">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
