import { Link } from "react-router-dom";
import { AlertOctagon, Home, ArrowLeft } from "lucide-react";

export default function Error404() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center max-w-[400px] px-6">
        <div className="w-[120px] h-[120px] rounded-full bg-[#0D0A05] border border-[#3A1510] flex items-center justify-center">
          <AlertOctagon size={48} className="text-destructive" />
        </div>
        <div>
          <h1 className="font-secondary text-[28px] font-bold text-foreground mb-2">Page Not Found</h1>
          <p className="font-primary text-[14px] text-muted-foreground leading-relaxed">The page you're looking for doesn't exist or has been moved.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => history.back()} className="flex items-center gap-2 bg-card border border-border px-5 py-2.5 font-primary text-[13px] text-muted-foreground hover:text-foreground hover:bg-[#0A0A0A] transition-colors">
            <ArrowLeft size={14} />
            Go Back
          </button>
          <Link to="/dashboard" className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 font-primary text-[13px] font-bold hover:opacity-90 transition-opacity">
            <Home size={14} />
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
