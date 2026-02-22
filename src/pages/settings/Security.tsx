import React, { useState } from "react";
import {
  Lock,
  ShieldCheck,
  Monitor,
  Smartphone,
  Tablet,
  History,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Toggle from "../../components/Toggle";

interface Session {
  id: string;
  device: string;
  deviceIcon: React.ReactNode;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

interface LoginEntry {
  id: string;
  date: string;
  device: string;
  ip: string;
  status: "success" | "failed";
}

export default function Security() {
  // Password form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // 2FA state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Sessions
  const [sessions] = useState<Session[]>([
    {
      id: "session-1",
      device: "Chrome on MacBook Pro",
      deviceIcon: <Monitor className="h-5 w-5 text-muted-foreground" />,
      location: "New York, NY, US",
      lastActive: "Now (current session)",
      isCurrent: true,
    },
    {
      id: "session-2",
      device: "Safari on iPhone 15",
      deviceIcon: <Smartphone className="h-5 w-5 text-muted-foreground" />,
      location: "New York, NY, US",
      lastActive: "2 hours ago",
      isCurrent: false,
    },
    {
      id: "session-3",
      device: "Firefox on iPad Air",
      deviceIcon: <Tablet className="h-5 w-5 text-muted-foreground" />,
      location: "Boston, MA, US",
      lastActive: "3 days ago",
      isCurrent: false,
    },
  ]);

  // Login history
  const [loginHistory] = useState<LoginEntry[]>([
    {
      id: "log-1",
      date: "Feb 22, 2026 09:14 AM",
      device: "Chrome on MacBook Pro",
      ip: "192.168.1.42",
      status: "success",
    },
    {
      id: "log-2",
      date: "Feb 21, 2026 08:53 PM",
      device: "Safari on iPhone 15",
      ip: "10.0.0.87",
      status: "success",
    },
    {
      id: "log-3",
      date: "Feb 20, 2026 11:22 AM",
      device: "Firefox on iPad Air",
      ip: "172.16.0.15",
      status: "success",
    },
    {
      id: "log-4",
      date: "Feb 19, 2026 03:47 PM",
      device: "Chrome on Windows PC",
      ip: "203.0.113.22",
      status: "failed",
    },
    {
      id: "log-5",
      date: "Feb 18, 2026 10:05 AM",
      device: "Chrome on MacBook Pro",
      ip: "192.168.1.42",
      status: "success",
    },
  ]);

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) return;
    if (newPassword !== confirmPassword) return;

    setIsUpdatingPassword(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsUpdatingPassword(false);
  };

  const handleRevokeSession = (sessionId: string) => {
    // In a real app, this would call an API to revoke the session
    console.log("Revoking session:", sessionId);
  };

  const passwordsMatch =
    newPassword.length > 0 &&
    confirmPassword.length > 0 &&
    newPassword === confirmPassword;
  const passwordsMismatch =
    confirmPassword.length > 0 && newPassword !== confirmPassword;

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="Security Settings" />

      {/* Password */}
      <section className="border border-border bg-card p-6">
        <div className="mb-6 flex items-center gap-3">
          <Lock className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground font-primary">
            Password
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          {/* Current Password */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground font-secondary">
              Current Password
            </label>
            <div className="relative">
              <Input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground font-secondary">
              New Password
            </label>
            <div className="relative">
              <Input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground font-secondary">
              Confirm New Password
            </label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {passwordsMismatch && (
              <span className="text-xs text-destructive font-secondary">
                Passwords do not match.
              </span>
            )}
            {passwordsMatch && (
              <span className="flex items-center gap-1 text-xs text-primary font-secondary">
                <CheckCircle2 className="h-3 w-3" />
                Passwords match.
              </span>
            )}
          </div>

          <div className="pt-1">
            <Button
              onClick={handleUpdatePassword}
              disabled={
                isUpdatingPassword ||
                !currentPassword ||
                !newPassword ||
                !passwordsMatch
              }
            >
              {isUpdatingPassword ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </div>
      </section>

      {/* Two-Factor Authentication */}
      <section className="border border-border bg-card p-6">
        <div className="mb-6 flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground font-primary">
            Two-Factor Authentication
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground font-secondary">
                  Enable Two-Factor Authentication
                </span>
                <Badge variant={twoFactorEnabled ? "success" : "warning"}>
                  {twoFactorEnabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <span className="text-xs text-muted-foreground font-secondary">
                Add an extra layer of security to your account by requiring a
                verification code on each login.
              </span>
            </div>
            <Toggle
              checked={twoFactorEnabled}
              onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
            />
          </div>

          {twoFactorEnabled && (
            <div className="flex flex-col gap-3 border-t border-border pt-5">
              <h3 className="text-sm font-medium text-foreground font-secondary">
                Setup Instructions
              </h3>
              <ol className="flex flex-col gap-2 pl-5 text-sm text-muted-foreground font-secondary">
                <li className="list-decimal">
                  Download an authenticator app such as Google Authenticator or
                  Authy on your mobile device.
                </li>
                <li className="list-decimal">
                  Scan the QR code below or manually enter the setup key into
                  your authenticator app.
                </li>
                <li className="list-decimal">
                  Enter the 6-digit verification code generated by the app to
                  complete the setup.
                </li>
              </ol>
              <div className="mt-2 flex h-40 w-40 items-center justify-center border border-border bg-[#0A0A0A]">
                <span className="text-xs text-muted-foreground font-secondary">
                  QR Code
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Active Sessions */}
      <section className="border border-border bg-card p-6">
        <div className="mb-6 flex items-center gap-3">
          <Monitor className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground font-primary">
            Active Sessions
          </h2>
        </div>

        <div className="flex flex-col divide-y divide-border">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center border border-border bg-[#0A0A0A]">
                  {session.deviceIcon}
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground font-secondary">
                      {session.device}
                    </span>
                    {session.isCurrent && (
                      <Badge variant="success">Current</Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground font-secondary">
                    {session.location} &middot; {session.lastActive}
                  </span>
                </div>
              </div>

              {!session.isCurrent && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRevokeSession(session.id)}
                >
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Login History */}
      <section className="border border-border bg-card p-6">
        <div className="mb-6 flex items-center gap-3">
          <History className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground font-primary">
            Login History
          </h2>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground font-secondary">
                  Date
                </th>
                <th className="pb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground font-secondary">
                  Device
                </th>
                <th className="pb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground font-secondary">
                  IP Address
                </th>
                <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground font-secondary">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {loginHistory.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b border-border last:border-b-0"
                >
                  <td className="py-3 text-sm text-foreground font-secondary">
                    {entry.date}
                  </td>
                  <td className="py-3 text-sm text-foreground font-secondary">
                    {entry.device}
                  </td>
                  <td className="py-3 font-primary text-sm text-muted-foreground">
                    {entry.ip}
                  </td>
                  <td className="py-3 text-right">
                    <span
                      className={`inline-flex items-center gap-1.5 text-sm font-secondary ${
                        entry.status === "success"
                          ? "text-primary"
                          : "text-destructive"
                      }`}
                    >
                      {entry.status === "success" ? (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5" />
                      )}
                      {entry.status === "success" ? "Success" : "Failed"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="flex flex-col gap-3 md:hidden">
          {loginHistory.map((entry) => (
            <div
              key={entry.id}
              className="flex flex-col gap-2 border border-border bg-[#0A0A0A] p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground font-secondary">
                  {entry.date}
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-secondary ${
                    entry.status === "success"
                      ? "text-primary"
                      : "text-destructive"
                  }`}
                >
                  {entry.status === "success" ? (
                    <CheckCircle2 className="h-3 w-3" />
                  ) : (
                    <XCircle className="h-3 w-3" />
                  )}
                  {entry.status === "success" ? "Success" : "Failed"}
                </span>
              </div>
              <span className="text-xs text-muted-foreground font-secondary">
                {entry.device}
              </span>
              <span className="font-primary text-xs text-muted-foreground">
                {entry.ip}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
