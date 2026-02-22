interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  action?: React.ReactNode;
  children?: React.ReactNode;
  [key: string]: unknown;
}

export default function PageHeader({ title, subtitle, actions, action, children }: PageHeaderProps) {
  const actionContent = actions || action || children;
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
      <div>
        <h1 className="text-foreground font-secondary text-lg md:text-2xl font-semibold">{title}</h1>
        {subtitle && (
          <p className="text-muted-foreground font-primary text-xs md:text-sm mt-1">{subtitle}</p>
        )}
      </div>
      {actionContent && <div className="flex items-center gap-2">{actionContent}</div>}
    </div>
  );
}
