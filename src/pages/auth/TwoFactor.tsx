import { Link } from "react-router-dom";
import { ShieldCheck, Clock, ArrowLeft, KeyRound } from "lucide-react";
import Button from "../../components/Button";

const digits = ["4", "7", "2", "", "", ""];

export default function TwoFactor() {
  return (
    <div className="bg-card border border-border p-8 md:p-10 w-full max-w-[420px]">
      <div className="flex flex-col items-center gap-4 mb-7">
        <div className="w-14 h-14 rounded-full bg-[#0A0A0A] border border-border flex items-center justify-center">
          <ShieldCheck size={24} className="text-primary" />
        </div>
        <div className="text-center">
          <h2 className="text-foreground font-secondary text-xl font-bold mb-2">
            Two-Factor Authentication
          </h2>
          <p className="text-muted-foreground font-primary text-xs leading-relaxed">
            Enter the 6-digit code sent to{"\n"}your authenticator app
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 mb-4">
        {digits.map((d, i) => (
          <div
            key={i}
            className={`w-12 h-14 flex items-center justify-center bg-[#0A0A0A] border ${
              d ? "border-primary" : "border-border"
            }`}
          >
            <span className="text-foreground font-primary text-2xl font-bold">{d}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-1.5 mb-7">
        <Clock size={14} className="text-muted-foreground" />
        <span className="text-muted-foreground font-primary text-[11px]">Code expires in </span>
        <span className="text-primary font-primary text-[11px] font-bold">4:27</span>
      </div>

      <Button className="w-full mb-5">Verify Code</Button>

      <div className="flex items-center justify-center gap-1 mb-7">
        <span className="text-muted-foreground font-primary text-xs">Didn't receive it?</span>
        <button className="text-primary font-primary text-xs font-semibold">Resend code</button>
      </div>

      <div className="flex items-center gap-4 mb-7">
        <div className="flex-1 h-px bg-border" />
        <span className="text-muted-foreground font-primary text-[10px] font-semibold tracking-[2px]">OR</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <button className="flex items-center justify-center gap-2 w-full bg-[#0A0A0A] border border-border py-3 text-[#999] font-primary text-xs font-medium mb-7">
        <KeyRound size={14} className="text-muted-foreground" />
        Use Backup Code
      </button>

      <Link
        to="/login"
        className="flex items-center justify-center gap-2 text-muted-foreground font-primary text-xs font-medium"
      >
        <ArrowLeft size={14} />
        Back to Sign In
      </Link>
    </div>
  );
}
