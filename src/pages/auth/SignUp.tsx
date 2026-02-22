import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function SignUp() {
  return (
    <div className="bg-card border border-border p-8 md:p-10 w-full max-w-[420px]">
      <div className="flex flex-col items-center gap-4 mb-7">
        <div className="flex items-center gap-2.5">
          <Clock size={28} className="text-primary" />
          <span className="font-secondary text-xl font-bold tracking-[4px] text-foreground">
            TEAMTRACK
          </span>
        </div>
        <p className="text-muted-foreground font-primary text-xs">Create your account</p>
      </div>

      <div className="flex flex-col gap-4 mb-7">
        <div className="flex gap-3">
          <Input label="First Name" placeholder="John" className="flex-1" />
          <Input label="Last Name" placeholder="Doe" className="flex-1" />
        </div>
        <Input label="Work Email" type="email" placeholder="you@company.com" />
        <Input label="Password" type="password" placeholder="Create password" />
        <Input label="Confirm Password" type="password" placeholder="Confirm password" />
        <label className="flex items-start gap-2 cursor-pointer">
          <div className="w-4 h-4 mt-0.5 bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-primary-foreground text-[10px] font-bold">✓</span>
          </div>
          <span className="text-muted-foreground font-primary text-[11px] leading-relaxed">
            I agree to the Terms of Service and Privacy Policy
          </span>
        </label>
      </div>

      <Button className="w-full mb-7">Create Account</Button>

      <div className="flex items-center gap-4 mb-7">
        <div className="flex-1 h-px bg-border" />
        <span className="text-muted-foreground font-primary text-[10px] font-semibold tracking-[2px]">OR</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="flex flex-col gap-3 mb-7">
        <button className="flex items-center justify-center gap-2 w-full bg-[#0A0A0A] border border-border py-3 text-[#999] font-primary text-xs font-medium">
          Google
        </button>
        <button className="flex items-center justify-center gap-2 w-full bg-[#0A0A0A] border border-border py-3 text-[#999] font-primary text-xs font-medium">
          Microsoft
        </button>
      </div>

      <div className="flex items-center justify-center gap-1">
        <span className="text-muted-foreground font-primary text-xs">Already have an account?</span>
        <Link to="/login" className="text-primary font-primary text-xs font-semibold">
          Sign in
        </Link>
      </div>
    </div>
  );
}
