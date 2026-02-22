import React, { useState } from "react";
import {
  CreditCard,
  Crown,
  Receipt,
  HardDrive,
  Users,
  FolderKanban,
  Check,
  Download,
  ArrowUpRight,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Button from "../../components/Button";

interface BillingEntry {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: "paid" | "pending" | "failed";
  invoiceId: string;
}

interface UsageMetric {
  label: string;
  icon: React.ReactNode;
  current: number;
  limit: number | null;
  unit: string;
  displayCurrent: string;
  displayLimit: string;
}

const PLAN_FEATURES = [
  "Unlimited projects",
  "Up to 50 team members",
  "10 GB storage",
  "Advanced analytics & reporting",
  "Priority email support",
  "Custom integrations",
  "API access",
  "SSO authentication",
];

export default function Billing() {
  const [billingHistory] = useState<BillingEntry[]>([
    {
      id: "inv-001",
      date: "Feb 1, 2026",
      description: "Pro Plan - Monthly Subscription",
      amount: "$576.00",
      status: "paid",
      invoiceId: "INV-2026-0201",
    },
    {
      id: "inv-002",
      date: "Jan 1, 2026",
      description: "Pro Plan - Monthly Subscription",
      amount: "$576.00",
      status: "paid",
      invoiceId: "INV-2026-0101",
    },
    {
      id: "inv-003",
      date: "Dec 1, 2025",
      description: "Pro Plan - Monthly Subscription",
      amount: "$540.00",
      status: "paid",
      invoiceId: "INV-2025-1201",
    },
    {
      id: "inv-004",
      date: "Nov 1, 2025",
      description: "Pro Plan - Monthly Subscription",
      amount: "$540.00",
      status: "paid",
      invoiceId: "INV-2025-1101",
    },
    {
      id: "inv-005",
      date: "Oct 1, 2025",
      description: "Pro Plan - Monthly Subscription + Add-on",
      amount: "$588.00",
      status: "paid",
      invoiceId: "INV-2025-1001",
    },
  ]);

  const usageMetrics: UsageMetric[] = [
    {
      label: "Storage",
      icon: <HardDrive className="h-4 w-4 text-muted-foreground" />,
      current: 7.2,
      limit: 10,
      unit: "GB",
      displayCurrent: "7.2 GB",
      displayLimit: "10 GB",
    },
    {
      label: "Team Members",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      current: 48,
      limit: 50,
      unit: "",
      displayCurrent: "48",
      displayLimit: "50",
    },
    {
      label: "Projects",
      icon: <FolderKanban className="h-4 w-4 text-muted-foreground" />,
      current: 12,
      limit: null,
      unit: "",
      displayCurrent: "12",
      displayLimit: "Unlimited",
    },
  ];

  const getStatusBadgeVariant = (
    status: BillingEntry["status"]
  ): "success" | "warning" | "destructive" => {
    switch (status) {
      case "paid":
        return "success";
      case "pending":
        return "warning";
      case "failed":
        return "destructive";
    }
  };

  const getUsagePercentage = (metric: UsageMetric): number => {
    if (metric.limit === null) return 0;
    return Math.min((metric.current / metric.limit) * 100, 100);
  };

  const getUsageBarColor = (percentage: number): string => {
    if (percentage >= 90) return "bg-destructive";
    if (percentage >= 75) return "bg-warning";
    return "bg-primary";
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="Billing & Subscription" />

      {/* Current Plan */}
      <section className="border border-border bg-card p-6">
        <div className="mb-6 flex items-center gap-3">
          <Crown className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground font-primary">
            Current Plan
          </h2>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-5">
            {/* Plan name and price */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-foreground font-primary">
                  Pro Plan
                </h3>
                <Badge variant="success">Active</Badge>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-primary font-primary">
                  $12
                </span>
                <span className="text-sm text-muted-foreground font-secondary">
                  / user / month
                </span>
              </div>
            </div>

            {/* Features list */}
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {PLAN_FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-foreground font-secondary"
                >
                  <Check className="h-4 w-4 shrink-0 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="shrink-0">
            <Button>
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Upgrade Plan
            </Button>
          </div>
        </div>
      </section>

      {/* Payment Method */}
      <section className="border border-border bg-card p-6">
        <div className="mb-6 flex items-center gap-3">
          <CreditCard className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground font-primary">
            Payment Method
          </h2>
        </div>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {/* Card visual */}
            <div className="flex h-12 w-20 items-center justify-center border border-border bg-[#0A0A0A]">
              <CreditCard className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-foreground font-secondary">
                Visa ending in 4242
              </span>
              <span className="text-xs text-muted-foreground font-secondary">
                Expires 08/2028
              </span>
            </div>
          </div>

          <Button variant="secondary">Update Payment Method</Button>
        </div>
      </section>

      {/* Billing History */}
      <section className="border border-border bg-card p-6">
        <div className="mb-6 flex items-center gap-3">
          <Receipt className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground font-primary">
            Billing History
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
                  Description
                </th>
                <th className="pb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground font-secondary">
                  Amount
                </th>
                <th className="pb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground font-secondary">
                  Status
                </th>
                <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground font-secondary">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b border-border last:border-b-0"
                >
                  <td className="py-3.5 text-sm text-foreground font-secondary">
                    {entry.date}
                  </td>
                  <td className="py-3.5 text-sm text-foreground font-secondary">
                    {entry.description}
                  </td>
                  <td className="py-3.5 font-primary text-sm font-medium text-foreground">
                    {entry.amount}
                  </td>
                  <td className="py-3.5">
                    <Badge variant={getStatusBadgeVariant(entry.status)}>
                      {entry.status.charAt(0).toUpperCase() +
                        entry.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 text-sm text-primary font-secondary transition-colors hover:text-primary/80"
                    >
                      <Download className="h-3.5 w-3.5" />
                      {entry.invoiceId}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="flex flex-col gap-3 md:hidden">
          {billingHistory.map((entry) => (
            <div
              key={entry.id}
              className="flex flex-col gap-3 border border-border bg-[#0A0A0A] p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground font-secondary">
                  {entry.date}
                </span>
                <Badge variant={getStatusBadgeVariant(entry.status)}>
                  {entry.status.charAt(0).toUpperCase() +
                    entry.status.slice(1)}
                </Badge>
              </div>
              <span className="text-xs text-muted-foreground font-secondary">
                {entry.description}
              </span>
              <div className="flex items-center justify-between">
                <span className="font-primary text-sm font-medium text-foreground">
                  {entry.amount}
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs text-primary font-secondary"
                >
                  <Download className="h-3 w-3" />
                  {entry.invoiceId}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Usage */}
      <section className="border border-border bg-card p-6">
        <div className="mb-6 flex items-center gap-3">
          <HardDrive className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground font-primary">
            Usage
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {usageMetrics.map((metric) => {
            const percentage = getUsagePercentage(metric);
            const barColor = getUsageBarColor(percentage);

            return (
              <div
                key={metric.label}
                className="flex flex-col gap-3 border border-border bg-[#0A0A0A] p-5"
              >
                <div className="flex items-center gap-2">
                  {metric.icon}
                  <span className="text-sm font-medium text-foreground font-secondary">
                    {metric.label}
                  </span>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-foreground font-primary">
                    {metric.displayCurrent}
                  </span>
                  <span className="text-sm text-muted-foreground font-secondary">
                    / {metric.displayLimit}
                  </span>
                </div>

                {/* Progress bar */}
                {metric.limit !== null ? (
                  <div className="flex flex-col gap-1.5">
                    <div className="h-2 w-full bg-border">
                      <div
                        className={`h-full transition-all duration-500 ${barColor}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground font-secondary">
                      {percentage.toFixed(0)}% used
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    <div className="h-2 w-full bg-border">
                      <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: "12%" }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground font-secondary">
                      No limit
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
