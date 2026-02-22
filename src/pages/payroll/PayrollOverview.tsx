import { useState } from "react";
import { DollarSign, Users, TrendingUp, Calendar, Plus, Download, ChevronRight } from "lucide-react";
import MetricCard from "../../components/MetricCard";
import Badge from "../../components/Badge";
import Modal from "../../components/Modal";

const payrollRuns = [
  { period: "February 2024", employees: 47, gross: "$284,000", deductions: "$56,800", net: "$227,200", status: "processing", date: "Feb 28" },
  { period: "January 2024", employees: 47, gross: "$280,000", deductions: "$56,000", net: "$224,000", status: "completed", date: "Jan 31" },
  { period: "December 2023", employees: 45, gross: "$275,000", deductions: "$55,000", net: "$220,000", status: "completed", date: "Dec 31" },
  { period: "November 2023", employees: 45, gross: "$271,000", deductions: "$54,200", net: "$216,800", status: "completed", date: "Nov 30" },
  { period: "October 2023", employees: 44, gross: "$268,000", deductions: "$53,600", net: "$214,400", status: "completed", date: "Oct 31" },
];

const deptBreakdown = [
  { dept: "Engineering", headcount: 18, avg: "$8,400", total: "$151,200", color: "#BFFF00" },
  { dept: "Design", headcount: 8, avg: "$6,800", total: "$54,400", color: "#00C2FF" },
  { dept: "Marketing", headcount: 7, avg: "$5,600", total: "$39,200", color: "#FFB800" },
  { dept: "HR", headcount: 5, avg: "$5,200", total: "$26,000", color: "#7B61FF" },
  { dept: "Finance", headcount: 5, avg: "$7,200", total: "$36,000", color: "#FF5C33" },
  { dept: "Operations", headcount: 4, avg: "$4,800", total: "$19,200", color: "#6e6e6e" },
];

export default function PayrollOverview() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleProcess = () => {
    setConfirmOpen(false);
    setSuccessOpen(true);
  };

  return (
    <div className="py-8 px-12 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-secondary text-[28px] font-bold text-foreground">Payroll</h1>
          <p className="font-primary text-[13px] text-muted-foreground mt-1">Manage employee compensation</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-card border border-border px-4 py-2.5 font-primary text-[13px] text-muted-foreground hover:text-foreground hover:bg-[#0A0A0A] transition-colors">
            <Download size={14} />
            Export
          </button>
          <button onClick={() => setConfirmOpen(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 font-primary text-[13px] font-bold hover:opacity-90 transition-opacity">
            <Plus size={14} />
            Run Payroll
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard label="Total Payroll" value="$284K" change="↑ +1.4% vs last month" changeType="positive" />
        <MetricCard label="Employees" value="47" change="No change" changeType="neutral" />
        <MetricCard label="Avg Salary" value="$6.2K" change="↑ +$120 vs last month" changeType="positive" />
        <MetricCard label="Next Pay Date" value="Feb 28" change="6 days away" changeType="neutral" />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Payroll Runs Table */}
        <div className="lg:col-span-2 bg-card border border-border">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-secondary text-[16px] font-bold text-foreground">Payroll History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#0A0A0A] border-b border-border">
                  {["Period", "Employees", "Gross", "Deductions", "Net", "Status"].map(h => (
                    <th key={h} className="px-6 py-3 text-left font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payrollRuns.map((row, i) => (
                  <tr key={i} className={`border-b border-border last:border-b-0 ${i % 2 === 0 ? "bg-card" : "bg-[#0D0D0D]"} hover:bg-muted/10 cursor-pointer transition-colors`}>
                    <td className="px-6 py-4 font-primary text-[13px] font-semibold text-foreground">{row.period}</td>
                    <td className="px-6 py-4 font-primary text-[13px] text-muted-foreground">{row.employees}</td>
                    <td className="px-6 py-4 font-primary text-[13px] text-foreground">{row.gross}</td>
                    <td className="px-6 py-4 font-primary text-[13px] text-muted-foreground">{row.deductions}</td>
                    <td className="px-6 py-4 font-primary text-[13px] font-semibold text-primary">{row.net}</td>
                    <td className="px-6 py-4"><Badge color={row.status === "completed" ? "lime" : "pending"} label={row.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Department Breakdown */}
        <div className="bg-card border border-border">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-secondary text-[16px] font-bold text-foreground">By Department</h2>
          </div>
          <div className="divide-y divide-border">
            {deptBreakdown.map((d, i) => (
              <div key={i} className="px-6 py-4 hover:bg-[#0A0A0A] transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 flex-shrink-0" style={{ background: d.color }} />
                    <span className="font-primary text-[13px] text-foreground">{d.dept}</span>
                  </div>
                  <span className="font-secondary text-[13px] font-bold text-foreground">{d.total}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-primary text-[11px] text-muted-foreground">{d.headcount} employees</span>
                  <span className="font-primary text-[11px] text-muted-foreground">avg {d.avg}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Process Payroll?" width="max-w-[440px]"
        footer={
          <>
            <button onClick={() => setConfirmOpen(false)} className="bg-card border border-border px-5 py-2.5 font-primary text-[13px] text-muted-foreground hover:text-foreground transition-colors">Review</button>
            <button onClick={handleProcess} className="bg-primary text-primary-foreground px-5 py-2.5 font-primary text-[13px] font-bold hover:opacity-90 transition-opacity">Process Payroll</button>
          </>
        }>
        <div className="flex flex-col items-center gap-4 py-2">
          <div className="w-14 h-14 bg-[#1A1207] border border-[#3A2A10] flex items-center justify-center">
            <DollarSign size={24} className="text-warning" />
          </div>
          <div className="text-center">
            <p className="font-primary text-[13px] text-muted-foreground">You are about to process payroll for February 2024</p>
          </div>
          <div className="w-full bg-[#1A1207] border border-[#3A2A10] p-4">
            <div className="flex justify-between mb-2"><span className="font-primary text-[12px] text-muted-foreground">Employees</span><span className="font-primary text-[12px] text-foreground font-semibold">47</span></div>
            <div className="flex justify-between mb-2"><span className="font-primary text-[12px] text-muted-foreground">Gross Total</span><span className="font-primary text-[12px] text-foreground font-semibold">$284,000</span></div>
            <div className="flex justify-between"><span className="font-primary text-[12px] text-muted-foreground">Net Payout</span><span className="font-primary text-[12px] text-primary font-bold">$227,200</span></div>
          </div>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal open={successOpen} onClose={() => setSuccessOpen(false)} title="Payroll Processed" width="max-w-[440px]"
        footer={
          <>
            <button onClick={() => setSuccessOpen(false)} className="bg-card border border-border px-5 py-2.5 font-primary text-[13px] text-muted-foreground hover:text-foreground transition-colors">Close</button>
            <button className="bg-primary text-primary-foreground px-5 py-2.5 font-primary text-[13px] font-bold hover:opacity-90 transition-opacity">View Payslips</button>
          </>
        }>
        <div className="flex flex-col items-center gap-4 py-2">
          <div className="w-14 h-14 bg-[#0D1A0F] border border-[#1A3A1F] flex items-center justify-center">
            <TrendingUp size={24} className="text-primary" />
          </div>
          <p className="font-primary text-[13px] text-muted-foreground text-center">Payroll for February 2024 has been processed successfully.</p>
          <div className="w-full bg-[#0D1A0F] border border-[#1A3A1F] p-4">
            <p className="font-primary text-[12px] text-primary text-center font-semibold">47 payslips have been generated and sent.</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
