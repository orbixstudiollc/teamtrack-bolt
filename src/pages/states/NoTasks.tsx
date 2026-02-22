import { CheckSquare } from "lucide-react";
import EmptyState from "../../components/EmptyState";

export default function NoTasks() {
  const handleAddTask = () => {
    // TODO: Navigate to task creation flow or open creation modal
    console.log("Add task");
  };

  return (
    <EmptyState
      icon={<CheckSquare size={64} />}
      title="No Tasks Found"
      description="There are no tasks matching your current filters. Try adjusting your search or create a new task."
      actionLabel="Add Task"
      onAction={handleAddTask}
    />
  );
}
