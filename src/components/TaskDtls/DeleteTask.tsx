import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";

interface DeleteTaskProps {
  taskId: string;
}

export function DeleteTask({ taskId }: DeleteTaskProps) {
  return (
    <Button variant="destructive">
      <TrashIcon />
    </Button>
  );
}
