import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Calendar } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError("Passwords do not match"); return; }
    if (!agreed) { setError("Please agree to Terms of Service"); return; }
    setError(""); setLoading(true);
    try {
      await signUp(email, password, firstName, lastName);
      navigate("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="w-full max-w-[420px] bg-card border border-border p-10 flex flex-col gap-8">
      <div className="flex flex-col items-center gap-3">
        <div className="w-14 h-14 rounded-[28px] bg-[#0A0A0A] border border-border flex items-center justify-center">
          <Calendar size={24} className="text-primary" />
        </div>
        <div className="text-center">
          <p className="font-secondary font-bold tracking-[4px] text-foreground text-xl">TEAMTRACK</p>
          <p className="font-primary text-[12px] text-muted-foreground mt-0.5">workforce intelligence platform</p>
        </div>
      </div>

      <div className="text-center">
        <h1 className="font-secondary text-xl font-bold text-foreground">Create Account</h1>
        <p className="font-primary text-[12px] text-muted-foreground mt-1">Join your team on TeamTrack</p>
      </div>

      {error && (
        <div className="bg-[#0D0A05] border border-[#3A1510] p-3">
          <p className="font-primary text-[12px] text-destructive">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-3">
          <div className="flex flex-col gap-2 flex-1">
            <label className="font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">First Name</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#0A0A0A] border border-border px-3.5 py-3 font-primary text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
              placeholder="John" required />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">Last Name</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
              className="bg-[#0A0A0A] border border-border px-3.5 py-3 font-primary text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
              placeholder="Doe" required />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">Work Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="bg-[#0A0A0A] border border-border px-3.5 py-3 font-primary text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
            placeholder="you@company.com" required />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">Password</label>
          <div className="relative">
            <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-border px-3.5 py-3 pr-10 font-primary text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
              placeholder="Create password" required />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">Confirm Password</label>
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)}
            className="bg-[#0A0A0A] border border-border px-3.5 py-3 font-primary text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
            placeholder="Confirm password" required />
        </div>
        <label className="flex items-start gap-2 cursor-pointer">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-4 h-4 mt-0.5 accent-primary flex-shrink-0" />
          <span className="font-primary text-[12px] text-muted-foreground leading-relaxed">
            I agree to the <span className="text-primary">Terms of Service</span> and <span className="text-primary">Privacy Policy</span>
          </span>
        </label>
        <button type="submit" disabled={loading}
          className="w-full bg-primary text-primary-foreground font-primary text-[14px] font-bold py-3 transition-opacity hover:opacity-90 disabled:opacity-50">
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="font-primary text-[11px] text-muted-foreground">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="flex flex-col gap-3">
        <button className="w-full bg-card border border-border py-3 font-primary text-[13px] text-foreground flex items-center justify-center gap-2 hover:bg-[#0A0A0A] transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Continue with Google
        </button>
        <button className="w-full bg-card border border-border py-3 font-primary text-[13px] text-foreground flex items-center justify-center gap-2 hover:bg-[#0A0A0A] transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect width="11" height="11" fill="#F25022"/><rect x="13" width="11" height="11" fill="#7FBA00"/><rect y="13" width="11" height="11" fill="#00A4EF"/><rect x="13" y="13" width="11" height="11" fill="#FFB900"/></svg>
          Continue with Microsoft
        </button>
      </div>

      <p className="font-primary text-[12px] text-muted-foreground text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:opacity-80 transition-opacity">Sign in</Link>
      </p>
    </div>
  );
}
