"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { hods } from "@/lib/data";
import { TaskType } from "@/lib/types";

const handleEdit = async (task: TaskType, mutate: () => void) => {
  try {
    const response = await fetch(`/api/tasks/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...task,
        _id: undefined,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(errorData.error || "Failed to update task");
    }

    const updatedTask = await response.json();
    console.log("Task updated successfully:", updatedTask);
    mutate();
    return updatedTask;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export function EditTask({
  task,
  mutate,
}: {
  task: TaskType;
  mutate: () => void;
}) {
  const [updatedTask, setUpdatedTask] = useState(task);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button>
          <Edit />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            value={updatedTask.title}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, title: e.target.value })
            }
          />
          <Label>Assigned To</Label>
          <Select
            value={updatedTask.assignedTo}
            onValueChange={(value) =>
              setUpdatedTask({ ...updatedTask, assignedTo: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an employee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Unassigned">Unassigned</SelectItem>
              {hods.map((hod) => (
                <SelectItem key={hod.name} value={hod.name}>
                  {hod.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={updatedTask.description}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, description: e.target.value })
            }
          />
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            type="date"
            id="dueDate"
            value={updatedTask.dueDate}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, dueDate: e.target.value })
            }
          />
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            type="date"
            id="startDate"
            value={updatedTask.startDate}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, startDate: e.target.value })
            }
          />
          <Label htmlFor="completionDate">Completion Date</Label>
          <Input
            type="date"
            id="completionDate"
            value={updatedTask.completionDate}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, completionDate: e.target.value })
            }
          />
          <div className="py-2">
            <Button
              onClick={() => {
                handleEdit(updatedTask, mutate);
                setIsPopoverOpen(false);
              }}
            >
              Update
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
