/* eslint-disable @typescript-eslint/no-explicit-any */
interface MetricCardProps {
  label?: string;
  title?: string;
  value?: string;
  change?: string;
  trend?: string;
  changeType?: "up" | "down" | "neutral" | "positive" | "negative";
  children?: React.ReactNode;
  icon?: any;
  accentClass?: string;
  accentClassName?: string;
  className?: string;
  [key: string]: unknown;
}

export default function MetricCard({ label, title, value, change, trend, changeType = "neutral", children, icon, accentClass, accentClassName, className = "" }: MetricCardProps) {
  const displayLabel = label || title;
  const displayChange = change || trend;
  const isUp = changeType === "up" || changeType === "positive";
  const isDown = changeType === "down" || changeType === "negative";
  const accentColor = accentClass || accentClassName || (isUp ? "text-primary" : isDown ? "text-destructive" : "text-muted-foreground");

  // icon may be a React component constructor or a ReactNode (JSX element)
  let iconNode: React.ReactNode = null;
  if (icon) {
    if (typeof icon === "function" || (typeof icon === "object" && icon !== null && "$$typeof" in icon && typeof (icon as any).type === "function")) {
      // It's a component constructor – render it
      const IconComp = icon as React.ElementType;
      iconNode = <IconComp className={`h-5 w-5 ${accentColor}`} />;
    } else {
      // It's already a ReactNode
      iconNode = icon as React.ReactNode;
    }
  }

  if (children) {
    return (
      <div className={`bg-card border border-border p-4 md:p-6 flex-1 min-w-0 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border p-4 md:p-6 flex-1 min-w-0 ${className}`}>
      <div className="flex flex-col gap-1 md:gap-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground font-primary text-[10px] md:text-xs font-semibold tracking-wider uppercase">
            {displayLabel}
          </span>
          {iconNode && <span className={accentColor}>{iconNode}</span>}
        </div>
        <div className="flex items-end justify-between">
          <span className="text-foreground font-secondary text-xl md:text-3xl font-semibold">{value}</span>
          {displayChange && <span className={`font-primary text-[10px] md:text-sm ${accentColor}`}>{displayChange}</span>}
        </div>
      </div>
    </div>
  );
}
