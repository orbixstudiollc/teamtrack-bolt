interface BadgeProps {
  label?: string;
  color?: string;
  variant?: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const colorMap: Record<string, string> = {
  lime: "bg-primary/15 text-primary",
  green: "bg-primary/15 text-primary",
  success: "bg-primary/15 text-primary",
  approved: "bg-primary/15 text-primary",
  active: "bg-primary/15 text-primary",
  red: "bg-destructive/15 text-destructive",
  destructive: "bg-destructive/15 text-destructive",
  rejected: "bg-destructive/15 text-destructive",
  orange: "bg-warning/15 text-warning",
  warning: "bg-warning/15 text-warning",
  amber: "bg-warning/15 text-warning",
  pending: "bg-warning/15 text-warning",
  blue: "bg-info/15 text-info",
  info: "bg-info/15 text-info",
  cyan: "bg-info/15 text-info",
  purple: "bg-purple/15 text-purple",
  gray: "bg-muted text-muted-foreground",
  default: "bg-muted text-muted-foreground",
  inactive: "bg-muted text-muted-foreground",
  critical: "bg-destructive/15 text-destructive",
  high: "bg-warning/15 text-warning",
  medium: "bg-[#FFB800]/15 text-[#FFB800]",
  low: "bg-primary/15 text-primary",
  done: "bg-info/15 text-info",
  blocked: "bg-destructive/15 text-destructive",
  review: "bg-warning/15 text-warning",
};

export default function Badge({ label, color, variant, className = "", children, style }: BadgeProps) {
  const key = color || variant || "lime";
  const cls = style ? "" : (colorMap[key] || colorMap.lime);
  return (
    <span className={`inline-flex items-center px-2 py-0.5 font-primary text-[10px] font-semibold uppercase tracking-[0.5px] ${cls} ${className}`} style={style}>
      {label || children}
    </span>
  );
}
