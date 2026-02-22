import { Menu, Bell, Calendar } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const allNav = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/dashboard/timesheet/daily", label: "Timesheets" },
  { to: "/projects", label: "Projects" },
  { to: "/team", label: "Team" },
  { to: "/leave", label: "Leave" },
  { to: "/payroll", label: "Payroll" },
  { to: "/reports", label: "Reports" },
  { to: "/settings", label: "Settings" },
];

export default function MobileHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="md:hidden flex items-center justify-between px-4 h-14 bg-black border-b border-border flex-shrink-0">
        <button onClick={() => setDrawerOpen(true)} className="text-muted-foreground hover:text-foreground transition-colors">
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-primary" />
          <span className="font-secondary text-[14px] font-bold tracking-[3px] text-foreground">TEAMTRACK</span>
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-colors relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground font-primary text-[8px] font-bold flex items-center justify-center">3</span>
        </button>
      </header>

      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/70" onClick={() => setDrawerOpen(false)} />
          <div className="relative w-64 bg-black border-r border-border flex flex-col">
            <div className="flex items-center gap-2 px-6 h-14 border-b border-border">
              <Calendar size={16} className="text-primary" />
              <span className="font-secondary text-[14px] font-bold tracking-[3px] text-foreground">TEAMTRACK</span>
            </div>
            <nav className="flex-1 py-4 px-3">
              {allNav.map((item) => (
                <NavLink key={item.to} to={item.to} onClick={() => setDrawerOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-3 font-primary text-[13px] w-full transition-colors ${
                      isActive ? "text-foreground border-l-2 border-primary" : "text-muted-foreground hover:text-foreground border-l-2 border-transparent"
                    }`
                  }>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
