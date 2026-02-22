import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  footer?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  width?: string;
}

export default function Modal({ open, onClose, title, description, footer, className = "", children, width = "max-w-[520px]" }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className={`relative bg-card border border-border w-full ${width} max-h-[90vh] overflow-y-auto ${className}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-border sticky top-0 bg-card z-10">
          <div>
            <h2 className="font-secondary text-[18px] font-bold text-foreground">{title}</h2>
            {description && <p className="font-primary text-[12px] text-muted-foreground mt-1">{description}</p>}
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors ml-4 flex-shrink-0">
            <X size={20} />
          </button>
        </div>
        <div className="px-6 py-6">{children}</div>
        {footer && (
          <div className="px-6 py-4 border-t border-border flex items-center justify-between gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
