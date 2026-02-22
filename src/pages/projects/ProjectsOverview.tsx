import { useState } from "react";
import { Plus, Search, Filter, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Badge from "../../components/Badge";
import MetricCard from "../../components/MetricCard";
import Modal from "../../components/Modal";

const projects = [
  { id: "1", name: "Website Redesign", desc: "Complete overhaul of company website", status: "active", priority: "high", progress: 65, budget: "$50K", spent: "$32.5K", start: "Jan 15", end: "Jun 30", members: ["SC", "MJ", "AP"], color: "#BFFF00" },
  { id: "2", name: "Mobile App", desc: "iOS and Android mobile application", status: "active", priority: "high", progress: 45, budget: "$80K", spent: "$36K", start: "Feb 1", end: "Aug 31", members: ["TW", "ER", "DK"], color: "#00C2FF" },
  { id: "3", name: "API Integration", desc: "Third-party API integrations", status: "active", priority: "medium", progress: 78, budget: "$30K", spent: "$23.4K", start: "Jan 10", end: "May 15", members: ["MJ", "SC"], color: "#FFB800" },
  { id: "4", name: "Design System", desc: "Unified design system and component library", status: "active", priority: "high", progress: 82, budget: "$20K", spent: "$16.4K", start: "Jan 20", end: "Apr 30", members: ["AP", "ER"], color: "#7B61FF" },
  { id: "5", name: "Customer Portal", desc: "Self-service customer portal", status: "active", priority: "medium", progress: 38, budget: "$45K", spent: "$17.1K", start: "Feb 15", end: "Jul 31", members: ["DK", "TW", "SC"], color: "#FF5C33" },
  { id: "6", name: "Analytics Dashboard", desc: "Business intelligence dashboard", status: "active", priority: "low", progress: 22, budget: "$35K", spent: "$7.7K", start: "Mar 1", end: "Jun 15", members: ["SC", "MJ"], color: "#BFFF00" },
  { id: "7", name: "Security Audit", desc: "Comprehensive security review", status: "completed", priority: "high", progress: 100, budget: "$25K", spent: "$24.8K", start: "Nov 1", end: "Jan 31", members: ["ER", "DK"], color: "#6e6e6e" },
  { id: "8", name: "Marketing Campaign", desc: "Q1 marketing initiatives", status: "completed", priority: "medium", progress: 100, budget: "$18K", spent: "$17.2K", start: "Dec 1", end: "Mar 31", members: ["AP", "TW"], color: "#6e6e6e" },
];

const memberColors: Record<string, string> = { SC: "#BFFF00", MJ: "#00C2FF", AP: "#FFB800", TW: "#7B61FF", ER: "#FF5C33", DK: "#BFFF00" };
const priorityColor: Record<string, string> = { critical: "red", high: "orange", medium: "amber", low: "lime" };

export default function ProjectsOverview() {
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const filtered = projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="py-8 px-12 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-secondary text-[28px] font-bold text-foreground">Projects</h1>
          <p className="font-primary text-[13px] text-muted-foreground mt-1">Manage and track all projects</p>
        </div>
        <button onClick={() => setCreateOpen(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 font-primary text-[13px] font-bold hover:opacity-90 transition-opacity">
          <Plus size={14} />
          New Project
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard label="Total Projects" value="18" />
        <MetricCard label="Active" value="12" change="In progress" changeType="positive" />
        <MetricCard label="Completed" value="4" />
        <MetricCard label="Overdue" value="2" change="Needs attention" changeType="negative" />
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border border-border pl-9 pr-4 py-2.5 font-primary text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
            placeholder="Search projects..." />
        </div>
        <button className="flex items-center gap-2 bg-card border border-border px-4 py-2.5 font-primary text-[13px] text-muted-foreground hover:text-foreground hover:bg-[#0A0A0A] transition-colors">
          <Filter size={14} />
          Filter
        </button>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <div key={p.id} className="bg-card border border-border hover:border-muted transition-colors group">
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 flex-shrink-0" style={{ background: p.color }} />
                    <h3 className="font-secondary text-[15px] font-bold text-foreground truncate">{p.name}</h3>
                  </div>
                  <p className="font-primary text-[12px] text-muted-foreground line-clamp-1">{p.desc}</p>
                </div>
                <Link to={`/projects/${p.id}/sprint`} className="text-muted-foreground hover:text-primary transition-colors ml-2 opacity-0 group-hover:opacity-100">
                  <ExternalLink size={14} />
                </Link>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Badge color={p.status === "completed" ? "gray" : "lime"} label={p.status} />
                <Badge color={priorityColor[p.priority]} label={p.priority} />
              </div>
              <div className="mb-4">
                <div className="flex justify-between mb-1.5">
                  <span className="font-primary text-[11px] text-muted-foreground uppercase tracking-[0.5px]">Progress</span>
                  <span className="font-primary text-[11px] font-semibold" style={{ color: p.color }}>{p.progress}%</span>
                </div>
                <div className="h-1.5 bg-border">
                  <div className="h-1.5 transition-all" style={{ width: `${p.progress}%`, background: p.color }} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {p.members.map((m) => (
                    <div key={m} className="w-7 h-7 border-2 border-card flex items-center justify-center text-[9px] font-bold font-primary" style={{ background: `${memberColors[m]}20`, color: memberColors[m] }}>
                      {m}
                    </div>
                  ))}
                </div>
                <div className="text-right">
                  <p className="font-primary text-[11px] text-muted-foreground">{p.spent} / {p.budget}</p>
                  <p className="font-primary text-[10px] text-muted-foreground">{p.start} – {p.end}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Project Modal */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Create Project"
        footer={
          <>
            <button onClick={() => setCreateOpen(false)} className="bg-card border border-border px-5 py-2.5 font-primary text-[13px] text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
            <button className="bg-primary text-primary-foreground px-5 py-2.5 font-primary text-[13px] font-bold hover:opacity-90">Create Project</button>
          </>
        }>
        <div className="flex flex-col gap-4">
          {[["Project Name", "text", "Enter project name"], ["Description", "text", "Brief description"]].map(([label, type, ph]) => (
            <div key={label} className="flex flex-col gap-2">
              <label className="font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">{label}</label>
              <input type={type} className="bg-[#0A0A0A] border border-border px-3.5 py-3 font-primary text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors" placeholder={ph} />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2"><label className="font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">Start Date</label><input type="date" className="bg-[#0A0A0A] border border-border px-3.5 py-3 font-primary text-[13px] text-foreground outline-none focus:border-primary transition-colors" /></div>
            <div className="flex flex-col gap-2"><label className="font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">End Date</label><input type="date" className="bg-[#0A0A0A] border border-border px-3.5 py-3 font-primary text-[13px] text-foreground outline-none focus:border-primary transition-colors" /></div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">Priority</label>
            <select className="bg-[#0A0A0A] border border-border px-3.5 py-3 font-primary text-[13px] text-foreground outline-none focus:border-primary transition-colors">
              <option>High</option><option>Medium</option><option>Low</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
