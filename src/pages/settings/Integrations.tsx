import React, { useState } from "react";
import {
  MessageSquare,
  Mail,
  Github,
  Trello,
  Figma,
  FileText,
  Link2,
  Unlink,
  ExternalLink,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Button from "../../components/Button";

type ConnectionStatus = "connected" | "not_connected";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: ConnectionStatus;
  connectedSince?: string;
}

function IntegrationCard({
  integration,
  onToggleConnection,
}: {
  integration: Integration;
  onToggleConnection: (id: string) => void;
}) {
  const isConnected = integration.status === "connected";

  return (
    <div className="flex flex-col justify-between gap-5 border border-border bg-card p-6 transition-colors hover:border-border/80">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center border border-border bg-[#0A0A0A]">
          {integration.icon}
        </div>
        <Badge variant={isConnected ? "success" : "default"}>
          {isConnected ? "Connected" : "Not Connected"}
        </Badge>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold text-foreground font-primary">
          {integration.name}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground font-secondary">
          {integration.description}
        </p>
      </div>

      {/* Connected since */}
      {isConnected && integration.connectedSince && (
        <span className="text-xs text-muted-foreground font-secondary">
          Connected since {integration.connectedSince}
        </span>
      )}

      {/* Action */}
      <div className="flex items-center gap-3">
        <Button
          variant={isConnected ? "destructive" : "primary"}
          onClick={() => onToggleConnection(integration.id)}
          className="flex-1"
        >
          {isConnected ? (
            <>
              <Unlink className="mr-2 h-4 w-4" />
              Disconnect
            </>
          ) : (
            <>
              <Link2 className="mr-2 h-4 w-4" />
              Connect
            </>
          )}
        </Button>
        {isConnected && (
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border border-border bg-[#0A0A0A] text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            title="Open settings"
          >
            <ExternalLink className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function Integrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "slack",
      name: "Slack",
      description:
        "Send real-time notifications, leave updates, and team announcements directly to your Slack channels.",
      icon: <MessageSquare className="h-6 w-6 text-foreground" />,
      status: "connected",
      connectedSince: "Jan 15, 2026",
    },
    {
      id: "google-workspace",
      name: "Google Workspace",
      description:
        "Sync calendars, import employee data from Google Directory, and integrate with Google Drive for document management.",
      icon: <Mail className="h-6 w-6 text-foreground" />,
      status: "connected",
      connectedSince: "Dec 3, 2025",
    },
    {
      id: "github",
      name: "GitHub",
      description:
        "Link repositories to projects, track developer contributions, and automate time logging from commit activity.",
      icon: <Github className="h-6 w-6 text-foreground" />,
      status: "not_connected",
    },
    {
      id: "jira",
      name: "Jira",
      description:
        "Synchronize project tasks and sprints, map team assignments, and align HR workflows with development cycles.",
      icon: <Trello className="h-6 w-6 text-foreground" />,
      status: "not_connected",
    },
    {
      id: "figma",
      name: "Figma",
      description:
        "Connect design projects for team collaboration tracking, resource allocation visibility, and design review workflows.",
      icon: <Figma className="h-6 w-6 text-foreground" />,
      status: "connected",
      connectedSince: "Feb 1, 2026",
    },
    {
      id: "notion",
      name: "Notion",
      description:
        "Integrate your knowledge base, sync onboarding documentation, and share company policies with your HR workspace.",
      icon: <FileText className="h-6 w-6 text-foreground" />,
      status: "not_connected",
    },
  ]);

  const handleToggleConnection = (id: string) => {
    setIntegrations((prev) =>
      prev.map((integration) => {
        if (integration.id !== id) return integration;

        const nowConnected = integration.status === "not_connected";
        return {
          ...integration,
          status: nowConnected
            ? ("connected" as ConnectionStatus)
            : ("not_connected" as ConnectionStatus),
          connectedSince: nowConnected
            ? new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : undefined,
        };
      })
    );
  };

  const connectedCount = integrations.filter(
    (i) => i.status === "connected"
  ).length;

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="Integrations" />

      {/* Summary */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground font-secondary">
        <Link2 className="h-4 w-4" />
        <span>
          {connectedCount} of {integrations.length} integrations connected
        </span>
      </div>

      {/* Integration Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {integrations.map((integration) => (
          <IntegrationCard
            key={integration.id}
            integration={integration}
            onToggleConnection={handleToggleConnection}
          />
        ))}
      </div>
    </div>
  );
}
