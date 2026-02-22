import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Clock, ArrowLeft, KeyRound } from "lucide-react";

export default function TwoFactor() {
  const [code, setCode] = useState(["4", "7", "2", "", "", ""]);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...code];
    next[index] = value;
    setCode(next);
    if (value && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="w-full max-w-[420px] bg-card border border-border p-10 flex flex-col gap-8">
      <div className="flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-[28px] bg-[#0A0A0A] border border-border flex items-center justify-center">
          <ShieldCheck size={24} className="text-primary" />
        </div>
        <div className="text-center">
          <h1 className="font-secondary text-xl font-bold text-foreground">Two-Factor Authentication</h1>
          <p className="font-primary text-[12px] text-muted-foreground mt-2 leading-[1.6]">
            Enter the 6-digit code sent to<br />your authenticator app
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        {code.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={`w-12 h-14 text-center bg-[#0A0A0A] border font-primary text-2xl font-bold text-foreground outline-none transition-colors ${
              digit ? "border-primary" : "border-border focus:border-primary"
            }`}
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-1.5">
        <Clock size={14} className="text-muted-foreground" />
        <span className="font-primary text-[11px] text-muted-foreground">Code expires in </span>
        <span className="text-primary font-primary text-[11px] font-bold">4:27</span>
      </div>

      <button className="w-full bg-primary text-primary-foreground font-primary text-[14px] font-bold py-3 transition-opacity hover:opacity-90">
        Verify Code
      </button>

      <div className="flex items-center justify-center gap-1">
        <span className="font-primary text-[12px] text-muted-foreground">Didn't receive it?</span>
        <button className="font-primary text-[12px] text-primary hover:opacity-80 transition-opacity">Resend code</button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="font-primary text-[11px] text-muted-foreground">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <button className="w-full bg-[#0A0A0A] border border-border py-3 font-primary text-[13px] text-muted-foreground flex items-center justify-center gap-2 hover:text-foreground transition-colors">
        <KeyRound size={14} />
        Use Backup Code
      </button>

      <Link to="/login" className="flex items-center justify-center gap-2 text-muted-foreground font-primary text-[12px] hover:text-foreground transition-colors">
        <ArrowLeft size={14} />
        Back to Sign In
      </Link>
    </div>
  );
}
