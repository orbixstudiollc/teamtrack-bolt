interface BadgeProps {
  label?: string;
  color?: string;
  variant?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  [key: string]: unknown;
}

const colorMap: Record<string, string> = {
  lime: "bg-primary/20 text-primary",
  green: "bg-primary/20 text-primary",
  success: "bg-primary/20 text-primary",
  red: "bg-destructive/20 text-destructive",
  destructive: "bg-destructive/20 text-destructive",
  orange: "bg-warning/20 text-warning",
  warning: "bg-warning/20 text-warning",
  amber: "bg-warning/20 text-warning",
  blue: "bg-info/20 text-info",
  info: "bg-info/20 text-info",
  purple: "bg-purple/20 text-purple",
  gray: "bg-muted text-muted-foreground",
  default: "bg-muted text-muted-foreground",
};

export default function Badge({ label, color, variant, className = "", style, children }: BadgeProps) {
  const colorKey = color || variant || "lime";
  const cls = colorMap[colorKey] || colorMap.lime;
  const text = label || children;
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 font-primary text-[10px] font-semibold rounded-sm ${cls} ${className}`}
      style={style}
    >
      {text}
    </span>
  );
}
