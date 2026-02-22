import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  footer?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, title, description, footer, className = "", children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className={`relative bg-card border border-border w-full md:max-w-lg md:mx-4 max-h-[85vh] overflow-y-auto rounded-t-2xl md:rounded-none ${className}`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-card z-10">
          <div>
            <h2 className="text-foreground font-secondary text-lg font-semibold">{title}</h2>
            {description && <p className="text-muted-foreground font-primary text-xs mt-1">{description}</p>}
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
        {footer && (
          <div className="px-6 py-4 border-t border-border">{footer}</div>
        )}
      </div>
    </div>
  );
}
