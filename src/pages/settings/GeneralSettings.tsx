import React, { useState } from "react";
import {
  Building2,
  Clock,
  Globe,
  Save,
  ChevronDown,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import Input from "../../components/Input";

const DAYS_OF_WEEK = [
  { key: "mon", label: "Mon" },
  { key: "tue", label: "Tue" },
  { key: "wed", label: "Wed" },
  { key: "thu", label: "Thu" },
  { key: "fri", label: "Fri" },
  { key: "sat", label: "Sat" },
  { key: "sun", label: "Sun" },
] as const;

type DayKey = (typeof DAYS_OF_WEEK)[number]["key"];

interface CompanyInfo {
  companyName: string;
  industry: string;
  companySize: string;
  timezone: string;
}

interface WorkHours {
  workDays: Set<DayKey>;
  startTime: string;
  endTime: string;
  breakDuration: string;
}

interface Localization {
  language: string;
  dateFormat: string;
  currency: string;
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground font-secondary">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-none border border-border bg-[#0A0A0A] px-4 py-2.5 pr-10 text-sm text-foreground font-secondary outline-none transition-colors focus:border-primary"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  );
}

export default function GeneralSettings() {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    companyName: "TeamTrack Pro Inc.",
    industry: "technology",
    companySize: "51-200",
    timezone: "utc-5",
  });

  const [workHours, setWorkHours] = useState<WorkHours>({
    workDays: new Set<DayKey>(["mon", "tue", "wed", "thu", "fri"]),
    startTime: "09:00",
    endTime: "17:00",
    breakDuration: "60",
  });

  const [localization, setLocalization] = useState<Localization>({
    language: "en",
    dateFormat: "mm-dd-yyyy",
    currency: "usd",
  });

  const [isSaving, setIsSaving] = useState(false);

  const toggleWorkDay = (day: DayKey) => {
    setWorkHours((prev) => {
      const next = new Set(prev.workDays);
      if (next.has(day)) {
        next.delete(day);
      } else {
        next.add(day);
      }
      return { ...prev, workDays: next };
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="General Settings" />

      {/* Company Information */}
      <section className="border border-border bg-card p-6">
        <div className="mb-6 flex items-center gap-3">
          <Building2 className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground font-primary">
            Company Information
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground font-secondary">
              Company Name
            </label>
            <Input
              value={companyInfo.companyName}
              onChange={(e) =>
                setCompanyInfo((prev) => ({
                  ...prev,
                  companyName: e.target.value,
                }))
              }
              placeholder="Enter company name"
            />
          </div>

          <SelectField
            label="Industry"
            value={companyInfo.industry}
            onChange={(value) =>
              setCompanyInfo((prev) => ({ ...prev, industry: value }))
            }
            options={[
              { value: "technology", label: "Technology" },
              { value: "finance", label: "Finance" },
              { value: "healthcare", label: "Healthcare" },
              { value: "education", label: "Education" },
              { value: "retail", label: "Retail" },
              { value: "manufacturing", label: "Manufacturing" },
              { value: "other", label: "Other" },
            ]}
          />

          <SelectField
            label="Company Size"
            value={companyInfo.companySize}
            onChange={(value) =>
              setCompanyInfo((prev) => ({ ...prev, companySize: value }))
            }
            options={[
              { value: "1-10", label: "1-10 employees" },
              { value: "11-50", label: "11-50 employees" },
              { value: "51-200", label: "51-200 employees" },
              { value: "201-500", label: "201-500 employees" },
              { value: "501-1000", label: "501-1000 employees" },
              { value: "1000+", label: "1000+ employees" },
            ]}
          />

          <SelectField
            label="Timezone"
            value={companyInfo.timezone}
            onChange={(value) =>
              setCompanyInfo((prev) => ({ ...prev, timezone: value }))
            }
            options={[
              { value: "utc-8", label: "(UTC-08:00) Pacific Time" },
              { value: "utc-7", label: "(UTC-07:00) Mountain Time" },
              { value: "utc-6", label: "(UTC-06:00) Central Time" },
              { value: "utc-5", label: "(UTC-05:00) Eastern Time" },
              { value: "utc+0", label: "(UTC+00:00) London" },
              { value: "utc+1", label: "(UTC+01:00) Berlin, Paris" },
              { value: "utc+5.5", label: "(UTC+05:30) Mumbai" },
              { value: "utc+8", label: "(UTC+08:00) Singapore" },
              { value: "utc+9", label: "(UTC+09:00) Tokyo" },
            ]}
          />
        </div>
      </section>

      {/* Work Hours */}
      <section className="border border-border bg-card p-6">
        <div className="mb-6 flex items-center gap-3">
          <Clock className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground font-primary">
            Work Hours
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {/* Work Days Checkboxes */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-foreground font-secondary">
              Work Days
            </label>
            <div className="flex flex-wrap gap-2">
              {DAYS_OF_WEEK.map(({ key, label }) => {
                const isActive = workHours.workDays.has(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleWorkDay(key)}
                    className={`flex h-10 w-14 items-center justify-center border text-sm font-medium font-secondary transition-colors ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-[#0A0A0A] text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground font-secondary">
                Start Time
              </label>
              <input
                type="time"
                value={workHours.startTime}
                onChange={(e) =>
                  setWorkHours((prev) => ({
                    ...prev,
                    startTime: e.target.value,
                  }))
                }
                className="w-full rounded-none border border-border bg-[#0A0A0A] px-4 py-2.5 text-sm text-foreground font-secondary outline-none transition-colors focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground font-secondary">
                End Time
              </label>
              <input
                type="time"
                value={workHours.endTime}
                onChange={(e) =>
                  setWorkHours((prev) => ({
                    ...prev,
                    endTime: e.target.value,
                  }))
                }
                className="w-full rounded-none border border-border bg-[#0A0A0A] px-4 py-2.5 text-sm text-foreground font-secondary outline-none transition-colors focus:border-primary"
              />
            </div>

            <SelectField
              label="Break Duration"
              value={workHours.breakDuration}
              onChange={(value) =>
                setWorkHours((prev) => ({ ...prev, breakDuration: value }))
              }
              options={[
                { value: "15", label: "15 minutes" },
                { value: "30", label: "30 minutes" },
                { value: "45", label: "45 minutes" },
                { value: "60", label: "60 minutes" },
                { value: "90", label: "90 minutes" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Localization */}
      <section className="border border-border bg-card p-6">
        <div className="mb-6 flex items-center gap-3">
          <Globe className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground font-primary">
            Localization
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <SelectField
            label="Language"
            value={localization.language}
            onChange={(value) =>
              setLocalization((prev) => ({ ...prev, language: value }))
            }
            options={[
              { value: "en", label: "English" },
              { value: "es", label: "Spanish" },
              { value: "fr", label: "French" },
              { value: "de", label: "German" },
              { value: "pt", label: "Portuguese" },
              { value: "ja", label: "Japanese" },
              { value: "zh", label: "Chinese" },
            ]}
          />

          <SelectField
            label="Date Format"
            value={localization.dateFormat}
            onChange={(value) =>
              setLocalization((prev) => ({ ...prev, dateFormat: value }))
            }
            options={[
              { value: "mm-dd-yyyy", label: "MM/DD/YYYY" },
              { value: "dd-mm-yyyy", label: "DD/MM/YYYY" },
              { value: "yyyy-mm-dd", label: "YYYY-MM-DD" },
            ]}
          />

          <SelectField
            label="Currency"
            value={localization.currency}
            onChange={(value) =>
              setLocalization((prev) => ({ ...prev, currency: value }))
            }
            options={[
              { value: "usd", label: "USD ($)" },
              { value: "eur", label: "EUR (\u20AC)" },
              { value: "gbp", label: "GBP (\u00A3)" },
              { value: "jpy", label: "JPY (\u00A5)" },
              { value: "inr", label: "INR (\u20B9)" },
              { value: "cad", label: "CAD ($)" },
              { value: "aud", label: "AUD ($)" },
            ]}
          />
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
