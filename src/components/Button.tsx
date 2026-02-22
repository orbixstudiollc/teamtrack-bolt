interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive" | "ghost" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
  href?: string;
}

const variants: Record<string, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-card text-foreground border border-border hover:bg-muted",
  destructive: "bg-destructive text-foreground hover:bg-destructive/90",
  ghost: "text-muted-foreground hover:text-foreground hover:bg-muted/50",
  outline: "bg-transparent text-foreground border border-border hover:bg-muted/50",
};

const sizeClasses: Record<string, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
  icon: "p-2",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  href: _href,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-primary font-medium transition-colors ${variants[variant] || variants.primary} ${sizeClasses[size] || sizeClasses.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
