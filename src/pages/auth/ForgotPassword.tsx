import { Link } from "react-router-dom";
import { KeyRound, ArrowLeft } from "lucide-react";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function ForgotPassword() {
  return (
    <div className="bg-card border border-border p-8 md:p-10 w-full max-w-[420px]">
      <div className="flex flex-col items-center gap-4 mb-7">
        <div className="w-14 h-14 rounded-full bg-[#0A0A0A] border border-border flex items-center justify-center">
          <KeyRound size={24} className="text-primary" />
        </div>
        <div className="text-center">
          <h2 className="text-foreground font-secondary text-xl font-bold mb-2">Forgot Password?</h2>
          <p className="text-muted-foreground font-primary text-xs leading-relaxed">
            No worries. Enter your email and we'll{"\n"}send you a reset link.
          </p>
        </div>
      </div>

      <div className="mb-7">
        <Input label="Email" type="email" placeholder="  you@company.com" />
      </div>

      <Button className="w-full mb-7">Send Reset Link</Button>

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
