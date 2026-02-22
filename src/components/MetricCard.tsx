/* eslint-disable @typescript-eslint/no-explicit-any */
interface MetricCardProps {
  label?: string;
  title?: string;
  value?: string | number;
  change?: string;
  trend?: string;
  changeType?: "up" | "down" | "neutral" | "positive" | "negative";
  children?: React.ReactNode;
  className?: string;
  accent?: string;
  icon?: any;
  accentClass?: string;
  accentClassName?: string;
}

export default function MetricCard({ label, title, value, change, trend, changeType = "neutral", children, className = "", accent }: MetricCardProps) {
  const displayLabel = label || title;
  const displayChange = change || trend;
  const isUp = changeType === "up" || changeType === "positive";
  const isDown = changeType === "down" || changeType === "negative";
  const changeColor = accent || (isUp ? "text-primary" : isDown ? "text-destructive" : "text-muted-foreground");

  if (children) {
    return (
      <div className={`bg-card border border-border p-6 flex-1 min-w-0 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border p-6 flex-1 min-w-0 ${className}`}>
      <p className="font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground mb-4">
        {displayLabel}
      </p>
      <div className="flex items-end justify-between">
        <span className="font-secondary text-[32px] font-bold text-foreground leading-none">{value}</span>
        {displayChange && (
          <span className={`font-primary text-[12px] font-semibold ${changeColor}`}>{displayChange}</span>
        )}
      </div>
    </div>
  );
}
