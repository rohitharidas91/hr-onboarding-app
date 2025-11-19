import { tasks } from "@/lib/data";
import { format } from "date-fns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { TaskForm } from "./TaskForm";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

interface TaskPhaseProps {
  phaseId: number;
  employeeId: string;
  phaseName: string;
}

export function Task({ phaseId, phaseName, employeeId }: TaskPhaseProps) {
  const phaseTasks = tasks.filter(
    (task) => task.phase === phaseId && task.employeeId === employeeId
  );
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem
        value={phaseId.toString()}
        className="border rounded-lg overflow-hidden"
      >
        <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50 [&[data-state=open]>svg]:rotate-180">
          <div className="flex items-center justify-between w-full pr-4">
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-base">{phaseName}</span>
              <span className="text-sm text-muted-foreground">
                ({phaseTasks.length}{" "}
                {phaseTasks.length === 1 ? "task" : "tasks"})
              </span>
            </div>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  New Task
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <TaskForm
                  employeeId={employeeId}
                  onCancel={() => setIsFormOpen(false)}
                  onSubmit={(taskData) => {
                    console.log("Task data to be submitted:", taskData);
                    setIsFormOpen(false);
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-0">
          <div className="space-y-3 py-2">
            {phaseTasks.map((task) => (
              <div
                key={task.id}
                className="border rounded-lg p-4 hover:bg-muted/10 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{task.title}</h3>
                    {task.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {task.description}
                      </p>
                    )}
                  </div>
                  <div className="text-sm text-right">
                    <div className="font-medium">
                      Due: {format(new Date(task.dueDate), "MMM d, yyyy")}
                    </div>
                    {task.completionDate && (
                      <div>
                        Completed:{" "}
                        {format(new Date(task.completionDate), "MMM d, yyyy")}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
