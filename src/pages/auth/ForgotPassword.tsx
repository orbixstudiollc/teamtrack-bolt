import { useState } from "react";
import { Link } from "react-router-dom";
import { KeyRound, ArrowLeft, Mail } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send reset link");
    } finally { setLoading(false); }
  };

  return (
    <div className="w-full max-w-[420px] bg-card border border-border p-10 flex flex-col gap-8">
      <div className="flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-[28px] bg-[#0A0A0A] border border-border flex items-center justify-center">
          <KeyRound size={24} className="text-primary" />
        </div>
        <div className="text-center">
          <h1 className="font-secondary text-xl font-bold text-foreground">Forgot Password?</h1>
          <p className="font-primary text-[12px] text-muted-foreground mt-2 leading-relaxed">
            No worries. Enter your email and we'll send you a reset link.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-[#0D0A05] border border-[#3A1510] p-3">
          <p className="font-primary text-[12px] text-destructive">{error}</p>
        </div>
      )}

      {sent ? (
        <div className="bg-[#0D1A0F] border border-[#1A3A1F] p-4">
          <p className="font-primary text-[13px] text-primary text-center">Reset link sent! Check your email inbox.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-border pl-10 pr-3.5 py-3 font-primary text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                placeholder="you@company.com" required />
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-primary text-primary-foreground font-primary text-[14px] font-bold py-3 transition-opacity hover:opacity-90 disabled:opacity-50">
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      )}

      <Link to="/login" className="flex items-center justify-center gap-2 text-muted-foreground font-primary text-[12px] hover:text-foreground transition-colors">
        <ArrowLeft size={14} />
        Back to Sign In
      </Link>
    </div>
  );
}
