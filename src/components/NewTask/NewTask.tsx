"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { hods } from "@/lib/data";
import { TaskType } from "@/lib/types";
import { Plus } from "lucide-react";

const handleCreate = async (
  newTask: Omit<TaskType, "_id" | "createdAt" | "updatedAt">,
  mutate: () => void
) => {
  try {
    const response = await fetch(`/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(errorData.error || "Failed to create task");
    }

    const createdTask = await response.json();
    console.log("Task created successfully:", createdTask);
    mutate();
    return createdTask;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export function NewTask({
  employeeId,
  mutate,
}: {
  employeeId: string;
  mutate: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [newTask, setNewTask] = useState<Omit<TaskType, "_id" | "createdAt" | "updatedAt">>({
    title: "",
    description: "",
    assignedTo: "Unassigned",
    dueDate: "",
    startDate: "",
    completionDate: "",
    phase: 1,
    employeeId: employeeId,
  });

  const handleSubmit = () => {
    handleCreate(newTask, mutate);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />

          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />

          <Label>Assigned To</Label>
          <Select
            value={newTask.assignedTo}
            onValueChange={(value) =>
              setNewTask({ ...newTask, assignedTo: value })
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

          <Label htmlFor="phase">Phase</Label>
          <Select
            value={String(newTask.phase)}
            onValueChange={(value) =>
              setNewTask({ ...newTask, phase: Number(value) })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a phase" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Phase 1</SelectItem>
              <SelectItem value="2">Phase 2</SelectItem>
              <SelectItem value="3">Phase 3</SelectItem>
            </SelectContent>
          </Select>

          <Label htmlFor="startDate">Start Date</Label>
          <Input
            type="date"
            id="startDate"
            value={newTask.startDate}
            onChange={(e) =>
              setNewTask({ ...newTask, startDate: e.target.value })
            }
          />

          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            type="date"
            id="dueDate"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          />

          <Button onClick={handleSubmit}>Create Task</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
