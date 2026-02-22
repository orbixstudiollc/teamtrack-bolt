import { useState } from "react";
import { Users, Clock, FolderOpen, AlertCircle, ArrowUpRight, Download, Calendar, CheckCircle2, XCircle, Clock3, TrendingUp } from "lucide-react";
import MetricCard from "../../components/MetricCard";
import Badge from "../../components/Badge";

const teamActivity = [
  { id: 1, name: "Sarah Chen", action: "completed task", target: "Homepage Redesign", time: "2 min ago", color: "#BFFF00" },
  { id: 2, name: "Marcus Johnson", action: "logged 3h on", target: "API Integration", time: "15 min ago", color: "#00C2FF" },
  { id: 3, name: "Aisha Patel", action: "submitted leave request for", target: "Annual Leave", time: "1 hr ago", color: "#FFB800" },
  { id: 4, name: "Tom Wilson", action: "pushed update to", target: "Mobile App Sprint 2", time: "2 hrs ago", color: "#7B61FF" },
  { id: 5, name: "Elena Rossi", action: "approved payroll for", target: "February 2024", time: "3 hrs ago", color: "#FF5C33" },
  { id: 6, name: "David Kim", action: "created project", target: "Customer Portal", time: "5 hrs ago", color: "#BFFF00" },
];

const upcomingLeave = [
  { name: "Aisha Patel", type: "Annual Leave", dates: "Mar 1–5", days: 5, status: "pending" },
  { name: "Marcus Johnson", type: "Sick Leave", dates: "Feb 28", days: 1, status: "approved" },
  { name: "Tom Wilson", type: "Personal Day", dates: "Mar 4", days: 1, status: "approved" },
  { name: "Elena Rossi", type: "Comp Time", dates: "Mar 7–8", days: 2, status: "pending" },
];

const timeEntries = [
  { employee: "Sarah Chen", project: "Website Redesign", task: "Homepage UI", hours: "6h 30m", status: "active" },
  { employee: "Marcus Johnson", project: "API Integration", task: "Stripe Webhook", hours: "4h 15m", status: "active" },
  { employee: "Aisha Patel", project: "Design System", task: "Component Docs", hours: "3h 45m", status: "done" },
  { employee: "Tom Wilson", project: "Mobile App", task: "Auth Flow", hours: "5h 00m", status: "done" },
  { employee: "David Kim", project: "Customer Portal", task: "Dashboard Layout", hours: "2h 30m", status: "active" },
];

const budgetHealth = [
  { project: "Website Redesign", budget: 50000, spent: 32500, pct: 65, color: "#BFFF00" },
  { project: "Mobile App", budget: 80000, spent: 36000, pct: 45, color: "#00C2FF" },
  { project: "API Integration", budget: 30000, spent: 23400, pct: 78, color: "#FFB800" },
  { project: "Design System", budget: 20000, spent: 16400, pct: 82, color: "#7B61FF" },
];

const statusIcon = (s: string) => s === "active" ? <CheckCircle2 size={14} className="text-primary" /> : <Clock3 size={14} className="text-muted-foreground" />;

export default function Dashboard() {
  const [dateLabel] = useState("Feb 22, 2024");

  return (
    <div className="py-8 px-12 min-h-full">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-secondary text-[28px] font-bold text-foreground">Dashboard</h1>
          <p className="font-primary text-[13px] text-muted-foreground mt-1">Overview of your workforce</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-card border border-border px-4 py-2.5 font-primary text-[13px] text-muted-foreground hover:text-foreground hover:bg-[#0A0A0A] transition-colors">
            <Calendar size={14} />
            {dateLabel}
          </button>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 font-primary text-[13px] font-bold hover:opacity-90 transition-opacity">
            <Download size={14} />
            Download Report
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard label="Active Members" value="24" change="↑ +3 this week" changeType="positive" />
        <MetricCard label="Hours Tracked" value="186.5h" change="↑ +12h vs last week" changeType="positive" />
        <MetricCard label="Active Projects" value="12" change="2 due this month" changeType="neutral" />
        <MetricCard label="Pending Actions" value="7" change="3 urgent" changeType="negative" />
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        {/* Team Activity */}
        <div className="lg:col-span-2 bg-card border border-border">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-secondary text-[16px] font-bold text-foreground">Team Activity</h2>
            <button className="font-primary text-[12px] text-primary hover:opacity-80 transition-opacity">View all</button>
          </div>
          <div className="divide-y divide-border">
            {teamActivity.map((item) => (
              <div key={item.id} className="px-6 py-4 flex items-start gap-3 hover:bg-[#0A0A0A] transition-colors">
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-[11px] font-bold font-primary" style={{ background: `${item.color}20`, color: item.color }}>
                  {item.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-primary text-[13px] text-foreground">
                    <span className="font-semibold">{item.name}</span>{" "}
                    <span className="text-muted-foreground">{item.action}</span>{" "}
                    <span className="text-primary">{item.target}</span>
                  </p>
                  <p className="font-primary text-[11px] text-muted-foreground mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Leave */}
        <div className="bg-card border border-border">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-secondary text-[16px] font-bold text-foreground">Upcoming Leave</h2>
          </div>
          <div className="divide-y divide-border">
            {upcomingLeave.map((item, i) => (
              <div key={i} className="px-6 py-4 hover:bg-[#0A0A0A] transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-primary text-[13px] font-semibold text-foreground">{item.name}</p>
                  <Badge color={item.status === "approved" ? "lime" : "pending"} label={item.status} />
                </div>
                <p className="font-primary text-[12px] text-muted-foreground">{item.type}</p>
                <p className="font-primary text-[11px] text-muted-foreground mt-0.5">{item.dates} · {item.days} day{item.days > 1 ? "s" : ""}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Time Entries */}
        <div className="lg:col-span-2 bg-card border border-border">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-secondary text-[16px] font-bold text-foreground">Recent Time Entries</h2>
            <button className="font-primary text-[12px] text-primary hover:opacity-80 transition-opacity">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#0A0A0A] border-b border-border">
                  {["Employee", "Project", "Task", "Hours", "Status"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeEntries.map((row, i) => (
                  <tr key={i} className={`border-b border-border last:border-b-0 ${i % 2 === 0 ? "bg-card" : "bg-[#0D0D0D]"} hover:bg-muted/10 transition-colors`}>
                    <td className="px-6 py-4 font-primary text-[13px] text-foreground">{row.employee}</td>
                    <td className="px-6 py-4 font-primary text-[13px] text-muted-foreground">{row.project}</td>
                    <td className="px-6 py-4 font-primary text-[13px] text-muted-foreground">{row.task}</td>
                    <td className="px-6 py-4 font-primary text-[13px] font-semibold text-foreground">{row.hours}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">{statusIcon(row.status)}<Badge color={row.status === "active" ? "lime" : "gray"} label={row.status} /></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Project Budget Health */}
        <div className="bg-card border border-border">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-secondary text-[16px] font-bold text-foreground">Project Budget Health</h2>
          </div>
          <div className="p-6 flex flex-col gap-5">
            {budgetHealth.map((p, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-primary text-[12px] text-foreground truncate mr-2">{p.project}</p>
                  <span className="font-primary text-[12px] font-semibold text-muted-foreground flex-shrink-0">{p.pct}%</span>
                </div>
                <div className="h-1.5 bg-border">
                  <div className="h-1.5 transition-all" style={{ width: `${p.pct}%`, background: p.color }} />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="font-primary text-[10px] text-muted-foreground">${(p.spent/1000).toFixed(0)}k spent</span>
                  <span className="font-primary text-[10px] text-muted-foreground">${(p.budget/1000).toFixed(0)}k total</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
