import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { Edit } from "lucide-react";
import { TaskForm } from "./TaskForm";
import { tasks } from "@/lib/data"; // Assuming tasks is your data source

interface EditTaskButtonProps {
  taskId: string;
}

export function EditTaskButton({ taskId }: EditTaskButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const taskToEdit = tasks.find((task) => task.id === taskId);

  if (!taskToEdit) {
    return null; // Or handle the case where the task is not found
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" onClick={() => setIsFormOpen(true)}>
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Edit Task</DialogTitle>
        <TaskForm
          task={taskToEdit}
          onCancel={() => setIsFormOpen(false)}
          onSubmit={(taskData) => {
            console.log("Updated task data:", taskData);
            setIsFormOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
