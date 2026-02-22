import { BarChart3, Users, Calendar, DollarSign, TrendingUp, Clock, ChevronRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import MetricCard from "../../components/MetricCard";

const reportCards = [
  { title: "Attendance Report", desc: "Track team presence, absences, and late arrivals", icon: Calendar, color: "#BFFF00", link: "/reports/attendance" },
  { title: "Payroll Summary", desc: "Detailed breakdown of payroll by department", icon: DollarSign, color: "#00C2FF", link: "/reports/payroll" },
  { title: "Leave Analytics", desc: "Leave utilization, trends, and department breakdown", icon: Calendar, color: "#FFB800", link: "/reports/leave" },
  { title: "Team Performance", desc: "Efficiency, productivity, and performance metrics", icon: TrendingUp, color: "#7B61FF", link: "/reports/performance" },
];

export default function ReportsDashboard() {
  return (
    <div className="py-8 px-12 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-secondary text-[28px] font-bold text-foreground">Reports</h1>
          <p className="font-primary text-[13px] text-muted-foreground mt-1">Analytics and insights for your workforce</p>
        </div>
        <button className="flex items-center gap-2 bg-card border border-border px-4 py-2.5 font-primary text-[13px] text-muted-foreground hover:text-foreground hover:bg-[#0A0A0A] transition-colors">
          <Download size={14} />
          Export All
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard label="Reports Generated" value="156" change="↑ +12 this month" changeType="positive" />
        <MetricCard label="Departments" value="8" />
        <MetricCard label="Total Records" value="342" change="↑ +28 this week" changeType="positive" />
        <MetricCard label="Pending" value="3" change="Needs review" changeType="negative" />
      </div>

      {/* Report Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="bg-card border border-border hover:border-muted transition-colors group">
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{ background: `${card.color}20` }}>
                    <Icon size={22} style={{ color: card.color }} />
                  </div>
                  <div>
                    <h3 className="font-secondary text-[16px] font-bold text-foreground mb-1">{card.title}</h3>
                    <p className="font-primary text-[13px] text-muted-foreground">{card.desc}</p>
                  </div>
                </div>
                <Link to={card.link} className="flex items-center gap-2 bg-[#0A0A0A] border border-border px-4 py-2.5 font-primary text-[13px] text-muted-foreground hover:text-foreground hover:border-muted transition-colors w-full justify-between">
                  <span>View Report</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
