import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Calendar, CheckCircle, XCircle, Clock } from "lucide-react";
import MetricCard from "../../components/MetricCard";
import Badge from "../../components/Badge";
import Modal from "../../components/Modal";

const leaveBalances = [
  { label: "Annual Leave", used: 12, total: 20, color: "#BFFF00" },
  { label: "Sick Leave", used: 3, total: 10, color: "#FF5C33" },
  { label: "Personal Days", used: 1, total: 5, color: "#00C2FF" },
  { label: "Comp Time", used: 2, total: 5, color: "#7B61FF" },
];

const upcomingLeave = [
  { name: "Sarah Chen", type: "Annual Leave", start: "Mar 1", end: "Mar 5", days: 5, status: "approved" },
  { name: "Marcus Johnson", type: "Sick Leave", start: "Feb 28", end: "Feb 28", days: 1, status: "approved" },
  { name: "Aisha Patel", type: "Annual Leave", start: "Mar 10", end: "Mar 14", days: 5, status: "pending" },
  { name: "Tom Wilson", type: "Personal Day", start: "Mar 4", end: "Mar 4", days: 1, status: "approved" },
];

const teamAvailability = [
  { name: "Sarah Chen", status: "available", dept: "Engineering", color: "#BFFF00" },
  { name: "Marcus Johnson", status: "available", dept: "Engineering", color: "#00C2FF" },
  { name: "Aisha Patel", status: "on_leave", dept: "Design", color: "#FFB800" },
  { name: "Tom Wilson", status: "available", dept: "Operations", color: "#7B61FF" },
  { name: "Elena Rossi", status: "available", dept: "Finance", color: "#FF5C33" },
  { name: "David Kim", status: "on_leave", dept: "HR", color: "#BFFF00" },
];

const recentRequests = [
  { type: "Annual Leave", start: "Mar 1", end: "Mar 5", duration: "5 days", status: "pending", reason: "Family vacation" },
  { type: "Sick Leave", start: "Feb 20", end: "Feb 21", duration: "2 days", status: "approved", reason: "Medical" },
  { type: "Personal Day", start: "Feb 15", end: "Feb 15", duration: "1 day", status: "approved", reason: "Personal" },
  { type: "Comp Time", start: "Feb 10", end: "Feb 11", duration: "2 days", status: "rejected", reason: "Overtime compensation" },
];

function StatusIcon({ status }: { status: string }) {
  if (status === "approved") return <CheckCircle size={14} className="text-primary" />;
  if (status === "rejected") return <XCircle size={14} className="text-destructive" />;
  return <Clock size={14} className="text-warning" />;
}

export default function LeaveOverview() {
  const [applyOpen, setApplyOpen] = useState(false);

  return (
    <div className="py-8 px-12 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-secondary text-[28px] font-bold text-foreground">Leave Management</h1>
          <p className="font-primary text-[13px] text-muted-foreground mt-1">Track and manage your time off</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/leave/requests" className="bg-card border border-border px-4 py-2.5 font-primary text-[13px] text-muted-foreground hover:text-foreground hover:bg-[#0A0A0A] transition-colors">
            My Requests
          </Link>
          <button onClick={() => setApplyOpen(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 font-primary text-[13px] font-bold hover:opacity-90 transition-opacity">
            <Plus size={14} />
            Apply Leave
          </button>
        </div>
      </div>

      {/* Leave Balance KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {leaveBalances.map((lb) => (
          <div key={lb.label} className="bg-card border border-border p-6">
            <p className="font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground mb-4">{lb.label}</p>
            <div className="flex items-end justify-between mb-3">
              <span className="font-secondary text-[32px] font-bold leading-none" style={{ color: lb.color }}>{lb.used}</span>
              <span className="font-primary text-[13px] text-muted-foreground">/ {lb.total} days</span>
            </div>
            <div className="h-1.5 bg-border">
              <div className="h-1.5" style={{ width: `${(lb.used / lb.total) * 100}%`, background: lb.color }} />
            </div>
            <p className="font-primary text-[11px] text-muted-foreground mt-2">{lb.total - lb.used} days remaining</p>
          </div>
        ))}
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        {/* Upcoming Leave */}
        <div className="lg:col-span-2 bg-card border border-border">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-secondary text-[16px] font-bold text-foreground">Upcoming Leave</h2>
            <Link to="/leave/calendar" className="font-primary text-[12px] text-primary hover:opacity-80">View Calendar</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#0A0A0A] border-b border-border">
                  {["Employee", "Type", "Period", "Days", "Status"].map(h => (
                    <th key={h} className="px-6 py-3 text-left font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {upcomingLeave.map((row, i) => (
                  <tr key={i} className={`border-b border-border last:border-b-0 ${i % 2 === 0 ? "bg-card" : "bg-[#0D0D0D]"}`}>
                    <td className="px-6 py-4 font-primary text-[13px] font-semibold text-foreground">{row.name}</td>
                    <td className="px-6 py-4 font-primary text-[13px] text-muted-foreground">{row.type}</td>
                    <td className="px-6 py-4 font-primary text-[13px] text-muted-foreground">{row.start} – {row.end}</td>
                    <td className="px-6 py-4 font-primary text-[13px] text-foreground">{row.days}d</td>
                    <td className="px-6 py-4"><Badge color={row.status} label={row.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Team Availability */}
        <div className="bg-card border border-border">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-secondary text-[16px] font-bold text-foreground">Team Availability</h2>
          </div>
          <div className="divide-y divide-border">
            {teamAvailability.map((m, i) => (
              <div key={i} className="px-6 py-3 flex items-center gap-3 hover:bg-[#0A0A0A] transition-colors">
                <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center text-[10px] font-bold font-primary" style={{ background: `${m.color}20`, color: m.color }}>
                  {m.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-primary text-[12px] text-foreground truncate">{m.name}</p>
                  <p className="font-primary text-[10px] text-muted-foreground">{m.dept}</p>
                </div>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${m.status === "available" ? "bg-primary" : "bg-warning"}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Leave Requests */}
      <div className="bg-card border border-border">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="font-secondary text-[16px] font-bold text-foreground">My Recent Requests</h2>
          <Link to="/leave/requests" className="font-primary text-[12px] text-primary hover:opacity-80">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0A0A0A] border-b border-border">
                {["Type", "Start Date", "End Date", "Duration", "Status", "Reason"].map(h => (
                  <th key={h} className="px-6 py-3 text-left font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((row, i) => (
                <tr key={i} className={`border-b border-border last:border-b-0 ${i % 2 === 0 ? "bg-card" : "bg-[#0D0D0D]"}`}>
                  <td className="px-6 py-4 font-primary text-[13px] font-semibold text-foreground">{row.type}</td>
                  <td className="px-6 py-4 font-primary text-[13px] text-muted-foreground">{row.start}</td>
                  <td className="px-6 py-4 font-primary text-[13px] text-muted-foreground">{row.end}</td>
                  <td className="px-6 py-4 font-primary text-[13px] text-foreground">{row.duration}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5"><StatusIcon status={row.status} /><Badge color={row.status} label={row.status} /></div>
                  </td>
                  <td className="px-6 py-4 font-primary text-[12px] text-muted-foreground">{row.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply Leave Modal */}
      <Modal open={applyOpen} onClose={() => setApplyOpen(false)} title="Apply for Leave"
        footer={
          <>
            <button onClick={() => setApplyOpen(false)} className="bg-card border border-border px-5 py-2.5 font-primary text-[13px] text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
            <button className="bg-primary text-primary-foreground px-5 py-2.5 font-primary text-[13px] font-bold hover:opacity-90 transition-opacity">Submit Request</button>
          </>
        }>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">Leave Type</label>
            <select className="bg-[#0A0A0A] border border-border px-3.5 py-3 font-primary text-[13px] text-foreground outline-none focus:border-primary transition-colors">
              <option>Annual Leave</option><option>Sick Leave</option><option>Personal Day</option><option>Comp Time</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label className="font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">Start Date</label>
              <input type="date" className="bg-[#0A0A0A] border border-border px-3.5 py-3 font-primary text-[13px] text-foreground outline-none focus:border-primary transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">End Date</label>
              <input type="date" className="bg-[#0A0A0A] border border-border px-3.5 py-3 font-primary text-[13px] text-foreground outline-none focus:border-primary transition-colors" />
            </div>
          </div>
          <div className="bg-[#0A0A0A] border border-primary px-4 py-3 flex items-center justify-between">
            <span className="font-primary text-[12px] text-muted-foreground">Duration</span>
            <span className="font-secondary text-[16px] font-bold text-primary">5 days</span>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">Reason</label>
            <textarea rows={3} className="bg-[#0A0A0A] border border-border px-3.5 py-3 font-primary text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors resize-none" placeholder="Brief description..." />
          </div>
        </div>
      </Modal>
    </div>
  );
}
