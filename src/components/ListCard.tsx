import Badge from "./Badge";

interface ListCardProps {
  name?: string;
  title?: string;
  detail?: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: string;
  badgeColor?: string;
  avatar?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

export default function ListCard({ name, title, detail, subtitle, badge, badgeColor, avatar, leading, trailing, onClick, children, className = "" }: ListCardProps) {
  if (children) {
    return (
      <div className={`bg-[#0A0A0A] border-b border-border px-3.5 py-3 ${className}`} onClick={onClick}>
        {children}
      </div>
    );
  }

  const displayName = name || title;
  const displayDetail = detail || subtitle;

  return (
    <div
      className={`bg-[#0A0A0A] border-b border-border px-3.5 py-3 flex items-center gap-2.5 cursor-pointer hover:bg-card/50 ${className}`}
      onClick={onClick}
    >
      {leading && <div className="flex-shrink-0">{leading}</div>}
      {!leading && avatar && (
        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <span className="text-primary-foreground font-primary text-[10px] font-bold">{avatar}</span>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-foreground font-primary text-[13px] truncate">{displayName}</span>
          {badge && <Badge label={badge} color={badgeColor} />}
        </div>
        {displayDetail && <div className="text-muted-foreground font-primary text-[11px] mt-1 truncate">{displayDetail}</div>}
      </div>
      {trailing && <div className="flex-shrink-0">{trailing}</div>}
    </div>
  );
}
