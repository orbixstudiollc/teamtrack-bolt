interface AvatarProps {
  initials?: string;
  fallback?: string;
  name?: string;
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  [key: string]: unknown;
}

const sizes: Record<string, string> = {
  sm: "w-7 h-7 text-[10px]",
  md: "w-9 h-9 text-xs",
  lg: "w-12 h-12 text-sm",
  xl: "w-16 h-16 text-lg",
};

function getInitials(name?: string): string {
  if (!name) return "";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

export default function Avatar({ initials, fallback, name, src, alt, size = "sm", className = "" }: AvatarProps) {
  const displayInitials = initials || fallback || getInitials(name) || "";
  const sizeClass = sizes[size] || sizes.sm;

  if (src) {
    return (
      <div className={`${sizeClass} rounded-full overflow-hidden flex-shrink-0 ${className}`}>
        <img src={src} alt={alt || name || displayInitials} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`${sizeClass} rounded-full bg-primary flex items-center justify-center flex-shrink-0 ${className}`}
    >
      <span className="text-primary-foreground font-primary font-bold">{displayInitials}</span>
    </div>
  );
}
