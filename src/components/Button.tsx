interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive" | "ghost" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
}

const variants: Record<string, string> = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",
  secondary: "bg-card text-muted-foreground border border-border hover:text-foreground hover:bg-[#0A0A0A]",
  destructive: "bg-destructive text-white hover:opacity-90",
  ghost: "text-muted-foreground hover:text-foreground hover:bg-card",
  outline: "bg-transparent text-foreground border border-border hover:bg-card",
};

const sizes: Record<string, string> = {
  sm: "px-3 py-1.5 text-[12px]",
  md: "px-4 py-2.5 text-[13px]",
  lg: "px-6 py-3 text-[14px]",
  icon: "p-2",
};

export default function Button({ variant = "primary", size = "md", className = "", children, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-primary font-bold transition-all ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
