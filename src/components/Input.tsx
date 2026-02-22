/* eslint-disable @typescript-eslint/no-explicit-any */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  as?: string;
  children?: React.ReactNode;
}

export default function Input({ label, as, className = "", children, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-muted-foreground font-primary text-xs font-medium">{label}</label>
      )}
      {as === "select" || children ? (
        <select
          className={`bg-card border border-border px-3 py-2.5 text-foreground font-primary text-sm focus:outline-none focus:border-primary ${className}`}
          value={props.value as any}
          onChange={props.onChange as any}
          disabled={props.disabled}
        >
          {children}
        </select>
      ) : (
        <input
          className={`bg-card border border-border px-3 py-2.5 text-foreground font-primary text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary ${className}`}
          {...props}
        />
      )}
    </div>
  );
}
