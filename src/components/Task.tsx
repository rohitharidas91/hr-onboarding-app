"use client";
import { tasks } from "@/lib/data";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Calendar as CalendarIcon,
  CheckCircle2 as CheckCircle2Icon,
  User,
} from "lucide-react";

import { NewTaskButton } from "./NewTaskButton";

export interface TaskPhaseProps {
  phaseId: number;
  employeeId: string;
  phaseName: string;
}

export function Task({ phaseId, phaseName, employeeId }: TaskPhaseProps) {
  const phaseTasks = tasks.filter(
    (task) => task.phase === phaseId && task.employeeId === employeeId
  );

  return (
    <Accordion type="single" collapsible className="border-b-2">
      <AccordionItem value={phaseId.toString()}>
        <AccordionTrigger>{phaseName}</AccordionTrigger>
        {phaseTasks.map((task) => (
          <AccordionContent key={task.id}>
            <div className="p-4 space-y-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <h2 className="text-xl font-semibold text-gray-800">
                {task.title}
              </h2>
              <p className="text-gray-600">{task.description}</p>
              <div className="flex flex-wrap gap-4 pt-2 text-sm text-gray-500 border-t border-gray-100">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>Assigned To: {task.assignedTo}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4 text-gray-400" />
                  <span>Due: {task.dueDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4 text-gray-400" />
                  <span>Start: {task.startDate}</span>
                </div>
                {task.completionDate && (
                  <div className="flex items-center gap-1">
                    <CheckCircle2Icon className="w-4 h-4 text-green-500" />
                    <span>Completed: {task.completionDate}</span>
                  </div>
                )}
              </div>
            </div>
          </AccordionContent>
        ))}
        <NewTaskButton />
      </AccordionItem>
    </Accordion>
  );
}
