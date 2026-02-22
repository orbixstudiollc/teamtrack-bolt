import { useState } from "react";
import { Search, Plus, Download, MoreHorizontal } from "lucide-react";
import Badge from "../../components/Badge";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";

const employees = [
  { id: "1", name: "Sarah Chen", position: "Senior Frontend Engineer", dept: "Engineering", email: "s.chen@teamtrack.io", hire: "Jan 15, 2021", status: "active", initials: "SC", color: "#BFFF00" },
  { id: "2", name: "Marcus Johnson", position: "Backend Engineer", dept: "Engineering", email: "m.johnson@teamtrack.io", hire: "Mar 8, 2021", status: "active", initials: "MJ", color: "#00C2FF" },
  { id: "3", name: "Aisha Patel", position: "UX Designer", dept: "Design", email: "a.patel@teamtrack.io", hire: "Jun 12, 2021", status: "on_leave", initials: "AP", color: "#FFB800" },
  { id: "4", name: "Tom Wilson", position: "DevOps Engineer", dept: "Operations", email: "t.wilson@teamtrack.io", hire: "Sep 20, 2021", status: "active", initials: "TW", color: "#7B61FF" },
  { id: "5", name: "Elena Rossi", position: "Finance Manager", dept: "Finance", email: "e.rossi@teamtrack.io", hire: "Feb 3, 2022", status: "active", initials: "ER", color: "#FF5C33" },
  { id: "6", name: "David Kim", position: "HR Business Partner", dept: "HR", email: "d.kim@teamtrack.io", hire: "Apr 18, 2022", status: "active", initials: "DK", color: "#BFFF00" },
  { id: "7", name: "Lisa Park", position: "Marketing Lead", dept: "Marketing", email: "l.park@teamtrack.io", hire: "Jul 5, 2022", status: "active", initials: "LP", color: "#00C2FF" },
  { id: "8", name: "James Lee", position: "Product Manager", dept: "Operations", email: "j.lee@teamtrack.io", hire: "Nov 14, 2022", status: "active", initials: "JL", color: "#FFB800" },
];

const filters = ["All", "Active", "On Leave", "Inactive"];

export default function TeamDirectory() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [addOpen, setAddOpen] = useState(false);

  const filtered = employees.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.dept.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || (filter === "Active" && e.status === "active") || (filter === "On Leave" && e.status === "on_leave");
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="py-8 px-12 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-secondary text-[28px] font-bold text-foreground">Team Directory</h1>
          <p className="font-primary text-[13px] text-muted-foreground mt-1">{employees.length} members across all departments</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-card border border-border px-4 py-2.5 font-primary text-[13px] text-muted-foreground hover:text-foreground hover:bg-[#0A0A0A] transition-colors">
            <Download size={14} />
            Export
          </button>
          <button onClick={() => setAddOpen(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 font-primary text-[13px] font-bold hover:opacity-90 transition-opacity">
            <Plus size={14} />
            Add Member
          </button>
        </div>
      </div>

      {/* Filters + Search */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border border-border pl-9 pr-4 py-2.5 font-primary text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
            placeholder="Search by name or department..." />
        </div>
        <div className="flex items-center gap-1">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 font-primary text-[12px] transition-colors border ${filter === f ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:text-foreground hover:bg-[#0A0A0A]"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0A0A0A] border-b border-border">
                {["Employee", "Position", "Department", "Email", "Hire Date", "Status", ""].map((h, i) => (
                  <th key={i} className="px-6 py-4 text-left font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp, i) => (
                <tr key={emp.id} className={`border-b border-border last:border-b-0 ${i % 2 === 0 ? "bg-card" : "bg-[#0D0D0D]"} hover:bg-muted/10 transition-colors`}>
                  <td className="px-6 py-4">
                    <Link to={`/team/profile/${emp.id}`} className="flex items-center gap-3 hover:opacity-80">
                      <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center text-[11px] font-bold font-primary" style={{ background: `${emp.color}20`, color: emp.color }}>
                        {emp.initials}
                      </div>
                      <span className="font-primary text-[13px] font-semibold text-foreground hover:text-primary transition-colors">{emp.name}</span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 font-primary text-[13px] text-muted-foreground">{emp.position}</td>
                  <td className="px-6 py-4 font-primary text-[13px] text-muted-foreground">{emp.dept}</td>
                  <td className="px-6 py-4 font-primary text-[12px] text-muted-foreground">{emp.email}</td>
                  <td className="px-6 py-4 font-primary text-[12px] text-muted-foreground">{emp.hire}</td>
                  <td className="px-6 py-4"><Badge color={emp.status === "active" ? "lime" : emp.status === "on_leave" ? "pending" : "gray"} label={emp.status.replace("_", " ")} /></td>
                  <td className="px-6 py-4">
                    <button className="text-muted-foreground hover:text-foreground transition-colors"><MoreHorizontal size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Member Modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Team Member"
        footer={
          <>
            <button onClick={() => setAddOpen(false)} className="bg-card border border-border px-5 py-2.5 font-primary text-[13px] text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
            <button className="bg-primary text-primary-foreground px-5 py-2.5 font-primary text-[13px] font-bold hover:opacity-90">Save Member</button>
          </>
        }>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2"><label className="font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">First Name</label><input type="text" className="bg-[#0A0A0A] border border-border px-3.5 py-3 font-primary text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors" placeholder="John" /></div>
            <div className="flex flex-col gap-2"><label className="font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">Last Name</label><input type="text" className="bg-[#0A0A0A] border border-border px-3.5 py-3 font-primary text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors" placeholder="Doe" /></div>
          </div>
          <div className="flex flex-col gap-2"><label className="font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">Work Email</label><input type="email" className="bg-[#0A0A0A] border border-border px-3.5 py-3 font-primary text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors" placeholder="you@company.com" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2"><label className="font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">Role</label><select className="bg-[#0A0A0A] border border-border px-3.5 py-3 font-primary text-[13px] text-foreground outline-none focus:border-primary transition-colors"><option>Member</option><option>Manager</option><option>Admin</option><option>Viewer</option></select></div>
            <div className="flex flex-col gap-2"><label className="font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">Department</label><select className="bg-[#0A0A0A] border border-border px-3.5 py-3 font-primary text-[13px] text-foreground outline-none focus:border-primary transition-colors"><option>Engineering</option><option>Design</option><option>Marketing</option><option>HR</option><option>Finance</option><option>Operations</option></select></div>
          </div>
          <div className="flex flex-col gap-2"><label className="font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">Start Date</label><input type="date" className="bg-[#0A0A0A] border border-border px-3.5 py-3 font-primary text-[13px] text-foreground outline-none focus:border-primary transition-colors" /></div>
        </div>
      </Modal>
    </div>
  );
}
