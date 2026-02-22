import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Save, Trash2, AlertTriangle } from "lucide-react";

const tabs = [
  { label: "General", path: "/settings" },
  { label: "Notifications", path: "/settings/notifications" },
  { label: "Security", path: "/settings/security" },
  { label: "Integrations", path: "/settings/integrations" },
  { label: "Billing", path: "/settings/billing" },
];

export default function GeneralSettings() {
  const location = useLocation();
  const [saving, setSaving] = useState(false);
  const [company, setCompany] = useState("TeamTrack Inc.");
  const [country, setCountry] = useState("United States");
  const [currency, setCurrency] = useState("USD");
  const [timezone, setTimezone] = useState("UTC-5 Eastern");
  const [language, setLanguage] = useState("English (US)");

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  return (
    <div className="py-8 px-12 min-h-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-secondary text-[28px] font-bold text-foreground">Settings</h1>
        <p className="font-primary text-[13px] text-muted-foreground mt-1">Manage your workspace preferences</p>
      </div>

      {/* Tab Nav */}
      <div className="flex items-center border-b border-border mb-8">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <Link key={tab.path} to={tab.path}
              className={`px-5 py-3 font-primary text-[13px] border-b-2 -mb-px transition-colors ${
                isActive ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}>
              {tab.label}
            </Link>
          );
        })}
      </div>

      <div className="max-w-2xl flex flex-col gap-8">
        {/* Company Info */}
        <div className="bg-card border border-border p-6">
          <h2 className="font-secondary text-[16px] font-bold text-foreground mb-5">Company Information</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">Company Name</label>
              <input value={company} onChange={(e) => setCompany(e.target.value)}
                className="bg-[#0A0A0A] border border-border px-3.5 py-3 font-primary text-[13px] text-foreground outline-none focus:border-primary transition-colors" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">Country</label>
                <select value={country} onChange={(e) => setCountry(e.target.value)}
                  className="bg-[#0A0A0A] border border-border px-3.5 py-3 font-primary text-[13px] text-foreground outline-none focus:border-primary transition-colors">
                  <option>United States</option><option>United Kingdom</option><option>Canada</option><option>Australia</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">Currency</label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)}
                  className="bg-[#0A0A0A] border border-border px-3.5 py-3 font-primary text-[13px] text-foreground outline-none focus:border-primary transition-colors">
                  <option>USD</option><option>EUR</option><option>GBP</option><option>CAD</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">Timezone</label>
                <select value={timezone} onChange={(e) => setTimezone(e.target.value)}
                  className="bg-[#0A0A0A] border border-border px-3.5 py-3 font-primary text-[13px] text-foreground outline-none focus:border-primary transition-colors">
                  <option>UTC-5 Eastern</option><option>UTC-6 Central</option><option>UTC-7 Mountain</option><option>UTC-8 Pacific</option><option>UTC+0 GMT</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground">Language</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)}
                  className="bg-[#0A0A0A] border border-border px-3.5 py-3 font-primary text-[13px] text-foreground outline-none focus:border-primary transition-colors">
                  <option>English (US)</option><option>English (UK)</option><option>Spanish</option><option>French</option><option>German</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 font-primary text-[13px] font-bold hover:opacity-90 disabled:opacity-50 transition-opacity">
            <Save size={14} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* Danger Zone */}
        <div className="bg-card border border-[#3A1510] p-6">
          <h2 className="font-secondary text-[16px] font-bold text-destructive mb-2">Danger Zone</h2>
          <p className="font-primary text-[12px] text-muted-foreground mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
          <button className="flex items-center gap-2 bg-[#0D0A05] border border-destructive text-destructive px-4 py-2.5 font-primary text-[13px] font-bold hover:bg-destructive/10 transition-colors">
            <Trash2 size={14} />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
