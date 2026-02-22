import { useNavigate, Link } from "react-router-dom";
import { Timer } from "lucide-react";
import Button from "../../components/Button";

export default function Error404() {
  const navigate = useNavigate();

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
      <h1 className="font-secondary text-8xl font-bold text-primary leading-none mb-6">
        404
      </h1>

      {/* Title */}
      <h2 className="font-secondary text-2xl font-semibold text-foreground mb-3">
        Page Not Found
      </h2>

      {/* Description */}
      <p className="font-primary text-sm text-muted-foreground max-w-md mb-10">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Link to="/dashboard">
          <Button variant="primary">Go Home</Button>
        </Link>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    </div>
  );
}
