import { Link } from "react-router-dom";
import { Timer } from "lucide-react";
import Button from "../../components/Button";

export default function Error500() {
  const handleTryAgain = () => {
    window.location.reload();
  };

  const handleContactSupport = () => {
    window.location.href = "mailto:support@teamtrackpro.com";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      {/* TeamTrack Logo */}
      <Link to="/dashboard" className="flex items-center gap-2.5 mb-16">
        <div className="bg-primary p-1.5">
          <Timer size={20} className="text-primary-foreground" />
        </div>
        <span className="font-primary font-bold text-foreground text-lg tracking-tight">
          TeamTrack<span className="text-primary">Pro</span>
        </span>
      </Link>

      {/* Error Code */}
      <h1 className="font-secondary text-8xl font-bold text-destructive leading-none mb-6">
        500
      </h1>

      {/* Title */}
      <h2 className="font-secondary text-2xl font-semibold text-foreground mb-3">
        Server Error
      </h2>

      {/* Description */}
      <p className="font-primary text-sm text-muted-foreground max-w-md mb-10">
        Something went wrong on our end. Please try again later or contact
        support.
      </p>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button variant="primary" onClick={handleTryAgain}>
          Try Again
        </Button>
        <Button variant="secondary" onClick={handleContactSupport}>
          Contact Support
        </Button>
      </div>
    </div>
  );
}
