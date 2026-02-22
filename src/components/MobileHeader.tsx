import { Menu, Bell } from "lucide-react";

export default function MobileHeader() {
  return (
    <header className="flex md:hidden items-center h-14 px-4 bg-background border-b border-border">
      <Menu size={24} className="text-foreground" />
      <div className="flex-1" />
      <span className="font-secondary text-sm font-bold tracking-[2px] text-foreground">
        TEAMTRACK
      </span>
      <div className="flex-1" />
      <Bell size={24} className="text-muted-foreground" />
    </header>
  );
}
