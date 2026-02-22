import { useState } from "react";
import {
  DollarSign,
  Users,
  MinusCircle,
  Wallet,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import MetricCard from "../../components/MetricCard";

// ── Types ──────────────────────────────────────────────────────────────────────

interface Department {
  id: string;
  name: string;
  employees: number;
  total: string;
  totalNum: number;
}

// ── Data ───────────────────────────────────────────────────────────────────────

const departments: Department[] = [
  { id: "eng", name: "Engineering", employees: 16, total: "$112,000", totalNum: 112000 },
  { id: "des", name: "Design", employees: 8, total: "$52,000", totalNum: 52000 },
  { id: "mkt", name: "Marketing", employees: 10, total: "$55,000", totalNum: 55000 },
  { id: "sal", name: "Sales", employees: 9, total: "$45,000", totalNum: 45000 },
  { id: "ops", name: "Operations", employees: 5, total: "$20,160", totalNum: 20160 },
];

// ── Component ──────────────────────────────────────────────────────────────────

export default function RunPayroll() {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(departments.map((d) => d.id))
  );

  const toggleDepartment = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === departments.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(departments.map((d) => d.id)));
    }
  };

  const selectedDepts = departments.filter((d) => selected.has(d.id));
  const selectedEmployees = selectedDepts.reduce((sum, d) => sum + d.employees, 0);
  const selectedGross = selectedDepts.reduce((sum, d) => sum + d.totalNum, 0);
  const selectedDeductions = Math.round(selectedGross * 0.15);
  const selectedNet = selectedGross - selectedDeductions;

  const allSelected = selected.size === departments.length;
  const someSelected = selected.size > 0 && selected.size < departments.length;

  return (
    <div className="min-h-screen bg-background text-foreground font-secondary">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <PageHeader
          title="Run Payroll"
          subtitle="November 2025"
        />

        {/* Summary Metrics */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Gross"
            value={`$${selectedGross.toLocaleString()}`}
            icon={<DollarSign className="h-5 w-5" />}
          />
          <MetricCard
            title="Total Deductions"
            value={`$${selectedDeductions.toLocaleString()}`}
            icon={<MinusCircle className="h-5 w-5" />}
          />
          <MetricCard
            title="Net Payroll"
            value={`$${selectedNet.toLocaleString()}`}
            icon={<Wallet className="h-5 w-5" />}
          />
          <MetricCard
            title="Employees"
            value={String(selectedEmployees)}
            icon={<Users className="h-5 w-5" />}
          />
        </div>

        {/* Department Checklist */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="font-primary text-lg font-semibold tracking-tight text-foreground">
              Select Departments
            </h2>
            <button
              onClick={toggleAll}
              className="text-sm font-medium text-primary hover:underline"
            >
              {allSelected ? "Deselect All" : "Select All"}
            </button>
          </div>

          <div className="mt-4 space-y-2">
            {departments.map((dept) => {
              const isSelected = selected.has(dept.id);
              return (
                <label
                  key={dept.id}
                  className={`flex cursor-pointer items-center justify-between border px-4 py-4 transition-colors ${
                    isSelected
                      ? "border-primary/30 bg-primary/5"
                      : "border-border bg-card hover:border-border/80"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Custom checkbox */}
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleDepartment(dept.id)}
                        className="peer sr-only"
                      />
                      <div
                        className={`flex h-5 w-5 items-center justify-center border transition-colors ${
                          isSelected
                            ? "border-primary bg-primary"
                            : "border-border bg-[#0A0A0A]"
                        }`}
                      >
                        {isSelected && (
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary-foreground" />
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="font-primary text-sm font-medium text-foreground">
                        {dept.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {dept.employees} employees
                      </p>
                    </div>
                  </div>

                  <span className="font-primary text-sm font-semibold text-foreground">
                    {dept.total}
                  </span>
                </label>
              );
            })}
          </div>

          {/* Summary strip */}
          {someSelected && !allSelected && (
            <div className="mt-4 flex items-center gap-2 border border-warning/30 bg-warning/5 px-4 py-3">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {departments.length - selected.size}
                </span>{" "}
                department(s) excluded from this payroll run.
              </p>
            </div>
          )}
        </section>

        {/* Action Buttons */}
        <section className="mt-10 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
          <Button variant="secondary" className="sm:order-1">
            Preview Payroll
          </Button>
          <Button
            variant="primary"
            disabled={selected.size === 0}
            className="sm:order-2"
          >
            <DollarSign className="mr-2 h-4 w-4" />
            Process Payroll
          </Button>
        </section>
      </div>
    </div>
  );
}
