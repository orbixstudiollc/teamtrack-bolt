import { useState } from "react";
import { ChevronDown, ChevronRight, Network } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Avatar from "../../components/Avatar";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface OrgNode {
  id: string;
  name: string;
  initials: string;
  position: string;
  department?: string;
  color: string;
  children?: OrgNode[];
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const orgData: OrgNode = {
  id: "ceo",
  name: "Jennifer Walsh",
  initials: "JW",
  position: "Chief Executive Officer",
  department: "Executive",
  color: "#BFFF00",
  children: [
    {
      id: "vp-eng",
      name: "Alex Thompson",
      initials: "AT",
      position: "VP of Engineering",
      department: "Engineering",
      color: "#00C2FF",
      children: [
        {
          id: "eng-1",
          name: "Sarah Chen",
          initials: "SC",
          position: "Senior Frontend Developer",
          color: "#00C2FF",
        },
        {
          id: "eng-2",
          name: "Priya Patel",
          initials: "PP",
          position: "Backend Engineer",
          color: "#00C2FF",
        },
        {
          id: "eng-3",
          name: "James Wright",
          initials: "JW",
          position: "DevOps Engineer",
          color: "#00C2FF",
        },
      ],
    },
    {
      id: "head-design",
      name: "Maya Singh",
      initials: "MS",
      position: "Head of Design",
      department: "Design",
      color: "#7B61FF",
      children: [
        {
          id: "des-1",
          name: "Marcus Johnson",
          initials: "MJ",
          position: "Product Designer",
          color: "#7B61FF",
        },
        {
          id: "des-2",
          name: "Aisha Mohammed",
          initials: "AM",
          position: "UX Researcher",
          color: "#7B61FF",
        },
      ],
    },
    {
      id: "dir-marketing",
      name: "David Kim",
      initials: "DK",
      position: "Marketing Director",
      department: "Marketing",
      color: "#FFB800",
      children: [
        {
          id: "mkt-1",
          name: "Liam O'Brien",
          initials: "LO",
          position: "Content Strategist",
          color: "#FFB800",
        },
        {
          id: "mkt-2",
          name: "Natalie Brooks",
          initials: "NB",
          position: "Growth Marketing Lead",
          color: "#FFB800",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Desktop: Org Card
// ---------------------------------------------------------------------------

function OrgCard({ node }: { node: OrgNode }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-none border border-border bg-card px-5 py-4 transition-colors hover:border-[#333] min-w-[200px]">
      <Avatar initials={node.initials} size="md" />
      <div className="text-center">
        <p className="font-primary text-sm font-semibold text-foreground">
          {node.name}
        </p>
        <p className="font-secondary mt-0.5 text-xs text-muted-foreground">
          {node.position}
        </p>
        {node.department && (
          <Badge
            className="mt-2 border text-xs"
            style={{
              borderColor: `${node.color}33`,
              color: node.color,
              backgroundColor: `${node.color}10`,
            }}
          >
            {node.department}
          </Badge>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Desktop: Tree Visualization
// ---------------------------------------------------------------------------

function DesktopTree() {
  const ceo = orgData;
  const directs = ceo.children ?? [];

  return (
    <div className="hidden md:flex flex-col items-center gap-0">
      {/* CEO */}
      <OrgCard node={ceo} />

      {/* Vertical connector from CEO */}
      <div className="w-px h-8 bg-border" />

      {/* Horizontal rail connecting to each direct report */}
      <div className="relative flex items-start justify-center">
        {/* Horizontal line spanning all directs */}
        {directs.length > 1 && (
          <div
            className="absolute top-0 h-px bg-border"
            style={{
              left: `${100 / (directs.length * 2)}%`,
              right: `${100 / (directs.length * 2)}%`,
            }}
          />
        )}

        {/* Direct reports */}
        <div className="flex gap-8">
          {directs.map((direct) => (
            <div key={direct.id} className="flex flex-col items-center">
              {/* Vertical connector into each direct */}
              <div className="w-px h-8 bg-border" />

              <OrgCard node={direct} />

              {/* Children */}
              {direct.children && direct.children.length > 0 && (
                <>
                  <div className="w-px h-8 bg-border" />

                  <div className="relative flex items-start justify-center">
                    {direct.children.length > 1 && (
                      <div
                        className="absolute top-0 h-px bg-border"
                        style={{
                          left: `${100 / (direct.children.length * 2)}%`,
                          right: `${100 / (direct.children.length * 2)}%`,
                        }}
                      />
                    )}

                    <div className="flex gap-4">
                      {direct.children.map((member) => (
                        <div
                          key={member.id}
                          className="flex flex-col items-center"
                        >
                          <div className="w-px h-8 bg-border" />
                          <OrgCard node={member} />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mobile: Indented List View
// ---------------------------------------------------------------------------

function MobileListNode({
  node,
  depth = 0,
}: {
  node: OrgNode;
  depth?: number;
}) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <button
        onClick={() => hasChildren && setExpanded(!expanded)}
        className="flex w-full items-center gap-3 py-2.5 transition-colors hover:bg-[#0A0A0A]"
        style={{ paddingLeft: `${depth * 24 + 12}px` }}
      >
        {/* Expand/collapse indicator */}
        <span className="flex h-5 w-5 shrink-0 items-center justify-center text-muted-foreground">
          {hasChildren ? (
            expanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )
          ) : (
            <span className="h-1.5 w-1.5 rounded-none bg-muted-foreground/40" />
          )}
        </span>

        <Avatar initials={node.initials} size="sm" />

        <div className="flex-1 min-w-0 text-left">
          <p className="font-primary text-sm font-medium text-foreground truncate">
            {node.name}
          </p>
          <p className="font-secondary text-xs text-muted-foreground truncate">
            {node.position}
          </p>
        </div>

        {node.department && (
          <Badge
            className="shrink-0 border text-[10px]"
            style={{
              borderColor: `${node.color}33`,
              color: node.color,
              backgroundColor: `${node.color}10`,
            }}
          >
            {node.department}
          </Badge>
        )}
      </button>

      {/* Connector line + children */}
      {hasChildren && expanded && (
        <div
          className="border-l border-border"
          style={{ marginLeft: `${depth * 24 + 22}px` }}
        >
          {node.children!.map((child) => (
            <MobileListNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function MobileTree() {
  return (
    <div className="md:hidden rounded-none border border-border bg-card divide-y divide-border overflow-hidden">
      <MobileListNode node={orgData} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function OrgChart() {
  // Count all people in the tree
  function countNodes(node: OrgNode): number {
    let count = 1;
    if (node.children) {
      for (const child of node.children) {
        count += countNodes(child);
      }
    }
    return count;
  }

  const totalPeople = countNodes(orgData);
  const departments = new Set<string>();
  function collectDepts(node: OrgNode) {
    if (node.department) departments.add(node.department);
    node.children?.forEach(collectDepts);
  }
  collectDepts(orgData);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Header */}
      <PageHeader
        title="Organization Chart"
        action={
          <Button variant="outline">
            <Network className="mr-2 h-4 w-4" />
            Export
          </Button>
        }
      />

      {/* Summary */}
      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-secondary text-muted-foreground">
        <span>
          <strong className="text-foreground font-primary">{totalPeople}</strong>{" "}
          people
        </span>
        <span className="hidden sm:inline">&middot;</span>
        <span>
          <strong className="text-foreground font-primary">
            {departments.size}
          </strong>{" "}
          departments
        </span>
        <span className="hidden sm:inline">&middot;</span>
        <span>
          <strong className="text-foreground font-primary">
            {orgData.children?.length ?? 0}
          </strong>{" "}
          direct reports to CEO
        </span>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3">
        {Array.from(departments).map((dept) => {
          // Find the color for this department
          let color = "#6e6e6e";
          function findColor(node: OrgNode) {
            if (node.department === dept) color = node.color;
            node.children?.forEach(findColor);
          }
          findColor(orgData);

          return (
            <Badge
              key={dept}
              className="border text-xs"
              style={{
                borderColor: `${color}33`,
                color,
                backgroundColor: `${color}10`,
              }}
            >
              {dept}
            </Badge>
          );
        })}
      </div>

      {/* Org chart */}
      <div className="mt-8 overflow-x-auto pb-8">
        <DesktopTree />
        <MobileTree />
      </div>
    </div>
  );
}
