import { FolderOpen } from "lucide-react";
import EmptyState from "../../components/EmptyState";

export default function NoProjects() {
  const handleCreateProject = () => {
    // TODO: Navigate to project creation flow or open creation modal
    console.log("Create project");
  };

  return (
    <EmptyState
      icon={<FolderOpen size={64} />}
      title="No Projects Yet"
      description="Create your first project to start tracking time and managing tasks."
      actionLabel="Create Project"
      onAction={handleCreateProject}
    />
  );
}
