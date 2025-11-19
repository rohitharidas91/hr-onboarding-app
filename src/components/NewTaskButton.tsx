import { AccordionContent } from "@/components/ui/accordion";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { Plus } from "lucide-react";
import { TaskForm } from "./TaskForm";
import { TaskPhaseProps } from "./Task";

export function NewTaskButton() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <>
      <AccordionContent>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button
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
              onCancel={() => setIsFormOpen(false)}
              onSubmit={(taskData) => {
                setIsFormOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </AccordionContent>
    </>
  );
}
