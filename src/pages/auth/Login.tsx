import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function Login() {
  return (
    <div className="bg-card border border-border p-8 md:p-10 w-full max-w-[420px]">
      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="flex items-center gap-2.5">
          <Clock size={28} className="text-primary" />
          <span className="font-secondary text-xl font-bold tracking-[4px] text-foreground">
            TEAMTRACK
          </span>
        </div>
        <p className="text-muted-foreground font-primary text-xs">Sign in to your account</p>
      </div>

      <div className="flex flex-col gap-4 mb-8">
        <Input label="Email" type="email" placeholder="you@company.com" />
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-muted-foreground font-primary text-[11px] font-semibold tracking-wider">
              Password
            </label>
            <Link to="/forgot-password" className="text-primary font-primary text-[11px] font-medium">
              Forgot?
            </Link>
          </div>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full bg-card border border-border px-3 py-2.5 text-foreground font-primary text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <div className="w-4 h-4 bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-[10px] font-bold">✓</span>
          </div>
          <span className="text-muted-foreground font-primary text-[11px]">Remember me</span>
        </label>
      </div>

      <Button className="w-full mb-8">Sign In</Button>

      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 h-px bg-border" />
        <span className="text-muted-foreground font-primary text-[10px] font-semibold tracking-[2px]">OR</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="flex flex-col gap-3 mb-8">
        <button className="flex items-center justify-center gap-2 w-full bg-[#0A0A0A] border border-border py-3 text-[#999] font-primary text-xs font-medium">
          Google
        </button>
        <button className="flex items-center justify-center gap-2 w-full bg-[#0A0A0A] border border-border py-3 text-[#999] font-primary text-xs font-medium">
          Microsoft
        </button>
      </div>

      <div className="flex items-center justify-center gap-1">
        <span className="text-muted-foreground font-primary text-xs">Don't have an account?</span>
        <Link to="/signup" className="text-primary font-primary text-xs font-semibold">
          Sign up
        </Link>
      </div>
    </div>
  );
}
