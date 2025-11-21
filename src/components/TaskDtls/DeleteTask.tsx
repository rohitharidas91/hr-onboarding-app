import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface DeleteTaskProps {
  taskId: string;
  mutate: () => void;
}

export function DeleteTask({ taskId, mutate }: DeleteTaskProps) {
  const handleDelete = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(errorData.error || "Failed to delete task");
      }

      toast("Task Deleted - The task has been successfully deleted.");
      mutate();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task.");
    }
  };
  return (
    <Button variant="destructive" onClick={() => handleDelete(taskId)}>
      <TrashIcon />
    </Button>
  );
}
