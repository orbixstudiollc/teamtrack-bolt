type TabItem = string | { key: string; label: React.ReactNode };

interface FilterTabsProps {
  tabs: TabItem[];
  active?: string;
  activeTab?: string;
  activeKey?: string;
  onChange: (tab: string) => void;
  [key: string]: unknown;
}

function getTabKey(tab: TabItem): string {
  return typeof tab === "string" ? tab : tab.key;
}

function getTabLabel(tab: TabItem): React.ReactNode {
  return typeof tab === "string" ? tab : tab.label;
}

export default function FilterTabs({ tabs, active, activeTab, activeKey, onChange }: FilterTabsProps) {
  const firstKey = tabs.length > 0 ? getTabKey(tabs[0]) : "";
  const currentActive = active || activeTab || activeKey || firstKey;
  return (
    <div className="flex gap-0 border-b border-border">
      {tabs.map((tab) => {
        const key = getTabKey(tab);
        const label = getTabLabel(tab);
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`px-4 py-2.5 font-primary text-xs md:text-sm font-medium transition-colors ${
              currentActive === key
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
