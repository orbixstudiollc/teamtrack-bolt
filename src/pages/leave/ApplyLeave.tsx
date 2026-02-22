import { useState, useCallback } from "react";
import {
  Calendar,
  ChevronDown,
  Clock,
  Send,
  X,
  ToggleLeft,
  ToggleRight,
  User,
  FileText,
} from "lucide-react";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import Button from "../../components/Button";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type LeaveType = "Annual" | "Sick" | "Personal" | "Comp Off";

interface FormState {
  leaveType: LeaveType | "";
  startDate: string;
  endDate: string;
  halfDay: boolean;
  reason: string;
  coveringPerson: string;
}

// ---------------------------------------------------------------------------
// Options
// ---------------------------------------------------------------------------

const leaveTypes: LeaveType[] = ["Annual", "Sick", "Personal", "Comp Off"];

const coveringPersons = [
  { id: "cp-1", name: "Sarah Chen" },
  { id: "cp-2", name: "Marcus Rivera" },
  { id: "cp-3", name: "Aisha Patel" },
  { id: "cp-4", name: "James O'Brien" },
  { id: "cp-5", name: "Lena Kowalski" },
];

const leaveTypeColor: Record<LeaveType, string> = {
  Annual: "bg-[#BFFF00]",
  Sick: "bg-[#FF5C33]",
  Personal: "bg-[#00C2FF]",
  "Comp Off": "bg-[#7B61FF]",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ApplyLeave() {
  const [isOpen, setIsOpen] = useState(true);

  const [form, setForm] = useState<FormState>({
    leaveType: "",
    startDate: "",
    endDate: "",
    halfDay: false,
    reason: "",
    coveringPerson: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  // ---- Handlers ----

  const updateField = useCallback(
    <K extends keyof FormState>(key: K, value: FormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
    [],
  );

  const validate = useCallback((): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.leaveType) next.leaveType = "Please select a leave type";
    if (!form.startDate) next.startDate = "Start date is required";
    if (!form.endDate) next.endDate = "End date is required";
    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      next.endDate = "End date must be after start date";
    }
    if (!form.reason.trim()) next.reason = "Please provide a reason";
    if (!form.coveringPerson)
      next.coveringPerson = "Please select a covering person";
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [form]);

  const handleSubmit = useCallback(() => {
    if (!validate()) return;
    // In a real app, dispatch an action or call an API here.
    // eslint-disable-next-line no-console
    console.log("Submitting leave request:", form);
    setIsOpen(false);
  }, [form, validate]);

  const handleCancel = useCallback(() => {
    setIsOpen(false);
  }, []);

  // ---- Computed days ----
  const computedDays = (() => {
    if (!form.startDate || !form.endDate) return null;
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;
    const diff = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    ) + 1;
    if (diff < 1) return null;
    return form.halfDay ? diff - 0.5 : diff;
  })();

  // ---- Select wrapper ----
  function SelectField({
    label,
    value,
    onChange,
    options,
    placeholder,
    error,
    icon,
  }: {
    label: string;
    value: string;
    onChange: (val: string) => void;
    options: { value: string; label: string; color?: string }[];
    placeholder: string;
    error?: string;
    icon?: React.ReactNode;
  }) {
    return (
      <div className="space-y-1.5">
        <label className="block text-xs font-medium uppercase tracking-wider text-[#6e6e6e] font-[JetBrains_Mono]">
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6e6e6e]">
              {icon}
            </div>
          )}
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full appearance-none rounded-none border bg-[#0A0A0A] px-3 py-2.5 text-sm text-white font-[Inter] outline-none transition-colors focus:border-[#BFFF00] ${
              icon ? "pl-10" : ""
            } ${error ? "border-[#FF5C33]" : "border-[#1A1A1A]"}`}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6e6e6e]" />
        </div>
        {error && (
          <p className="text-xs text-[#FF5C33] font-[Inter]">{error}</p>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000] text-white font-[Inter]">
      <Modal
        open={isOpen}
        onClose={handleCancel}
        title="Apply for Leave"
        className="w-full max-w-lg rounded-none border border-[#1A1A1A] bg-[#111]"
      >
        {/* ---- Form body ---- */}
        <div className="max-h-[70vh] space-y-6 overflow-y-auto p-6">
          {/* Leave type indicator */}
          {form.leaveType && (
            <div className="flex items-center gap-2 rounded-none border border-[#1A1A1A] bg-[#0A0A0A] px-3 py-2">
              <span
                className={`inline-block h-3 w-3 rounded-none ${leaveTypeColor[form.leaveType as LeaveType]}`}
              />
              <span className="text-sm font-medium text-white font-[Inter]">
                {form.leaveType} Leave
              </span>
              {computedDays !== null && (
                <span className="ml-auto text-xs text-[#6e6e6e] font-[JetBrains_Mono]">
                  {computedDays} day{computedDays !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          )}

          {/* Leave Type */}
          <SelectField
            label="Leave Type"
            value={form.leaveType}
            onChange={(v) => updateField("leaveType", v as LeaveType)}
            options={leaveTypes.map((lt) => ({
              value: lt,
              label: lt,
            }))}
            placeholder="Select leave type"
            error={errors.leaveType}
            icon={<FileText className="h-4 w-4" />}
          />

          {/* Date range */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium uppercase tracking-wider text-[#6e6e6e] font-[JetBrains_Mono]">
                Start Date
              </label>
              <div className="relative">
                <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6e6e6e]" />
                <Input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => updateField("startDate", e.target.value)}
                  className={`w-full rounded-none border bg-[#0A0A0A] pl-10 pr-3 py-2.5 text-sm text-white font-[JetBrains_Mono] outline-none transition-colors focus:border-[#BFFF00] ${
                    errors.startDate ? "border-[#FF5C33]" : "border-[#1A1A1A]"
                  }`}
                />
              </div>
              {errors.startDate && (
                <p className="text-xs text-[#FF5C33] font-[Inter]">
                  {errors.startDate}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium uppercase tracking-wider text-[#6e6e6e] font-[JetBrains_Mono]">
                End Date
              </label>
              <div className="relative">
                <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6e6e6e]" />
                <Input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => updateField("endDate", e.target.value)}
                  className={`w-full rounded-none border bg-[#0A0A0A] pl-10 pr-3 py-2.5 text-sm text-white font-[JetBrains_Mono] outline-none transition-colors focus:border-[#BFFF00] ${
                    errors.endDate ? "border-[#FF5C33]" : "border-[#1A1A1A]"
                  }`}
                />
              </div>
              {errors.endDate && (
                <p className="text-xs text-[#FF5C33] font-[Inter]">
                  {errors.endDate}
                </p>
              )}
            </div>
          </div>

          {/* Half Day Toggle */}
          <div className="flex items-center justify-between rounded-none border border-[#1A1A1A] bg-[#0A0A0A] px-4 py-3">
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-[#6e6e6e]" />
              <div>
                <p className="text-sm font-medium text-white font-[Inter]">
                  Half Day
                </p>
                <p className="text-xs text-[#6e6e6e] font-[Inter]">
                  Request only half a day off
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => updateField("halfDay", !form.halfDay)}
              className="text-[#6e6e6e] transition-colors hover:text-white focus:outline-none"
              aria-label="Toggle half day"
            >
              {form.halfDay ? (
                <ToggleRight className="h-7 w-7 text-[#BFFF00]" />
              ) : (
                <ToggleLeft className="h-7 w-7" />
              )}
            </button>
          </div>

          {/* Reason */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium uppercase tracking-wider text-[#6e6e6e] font-[JetBrains_Mono]">
              Reason
            </label>
            <textarea
              value={form.reason}
              onChange={(e) => updateField("reason", e.target.value)}
              rows={3}
              placeholder="Briefly describe your reason for leave..."
              className={`w-full resize-none rounded-none border bg-[#0A0A0A] px-3 py-2.5 text-sm text-white placeholder-[#6e6e6e] font-[Inter] outline-none transition-colors focus:border-[#BFFF00] ${
                errors.reason ? "border-[#FF5C33]" : "border-[#1A1A1A]"
              }`}
            />
            {errors.reason && (
              <p className="text-xs text-[#FF5C33] font-[Inter]">
                {errors.reason}
              </p>
            )}
          </div>

          {/* Covering Person */}
          <SelectField
            label="Covering Person"
            value={form.coveringPerson}
            onChange={(v) => updateField("coveringPerson", v)}
            options={coveringPersons.map((cp) => ({
              value: cp.id,
              label: cp.name,
            }))}
            placeholder="Select a colleague"
            error={errors.coveringPerson}
            icon={<User className="h-4 w-4" />}
          />
        </div>

        {/* ---- Footer ---- */}
        <div className="flex items-center justify-between border-t border-[#1A1A1A] px-6 py-4">
          <Button
            onClick={handleCancel}
            className="flex items-center gap-2 rounded-none border border-[#1A1A1A] bg-transparent px-4 py-2 text-sm text-[#6e6e6e] font-[Inter] hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex items-center gap-2 rounded-none bg-[#BFFF00] px-5 py-2 text-sm font-semibold text-black font-[Inter] hover:bg-[#BFFF00]/90 transition-colors"
          >
            <Send className="h-4 w-4" />
            Submit Request
          </Button>
        </div>
      </Modal>

      {/* Fallback content when modal is closed */}
      {!isOpen && (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-[#6e6e6e]">
          <Calendar className="h-12 w-12" />
          <p className="text-sm font-[Inter]">Leave request form closed.</p>
          <Button
            onClick={() => {
              setForm({
                leaveType: "",
                startDate: "",
                endDate: "",
                halfDay: false,
                reason: "",
                coveringPerson: "",
              });
              setErrors({});
              setIsOpen(true);
            }}
            className="rounded-none border border-[#1A1A1A] bg-[#111] px-4 py-2 text-sm text-white font-[Inter] hover:bg-[#1A1A1A] transition-colors"
          >
            Open Again
          </Button>
        </div>
      )}
    </div>
  );
}
