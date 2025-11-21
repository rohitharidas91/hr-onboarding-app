"use client";
import { AccordionContent } from "@/components/ui/accordion";
import { TaskType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  CalendarCheck,
  CheckCircle2,
  CirclePlus,
} from "lucide-react";
import { Spinner } from "../ui/spinner";
import { EditTask } from "./EditTask";
import { DeleteTask } from "./DeleteTask";
import useSWR from "swr";

interface TaskPhaseProps {
  phaseId: number;
  employeeId: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function TaskPhase({ phaseId, employeeId }: TaskPhaseProps) {
  const {
    data: tasks,
    error,
    isLoading,
    mutate,
  } = useSWR<TaskType[]>(
    employeeId ? `/api/tasks?phase=${phaseId}&employeeId=${employeeId}` : null,
    fetcher
  );

  if (isLoading) {
    return (
      <AccordionContent className="text-gray-400 px-6 pb-1">
        <Spinner />
        <p>Loading tasks...</p>
      </AccordionContent>
    );
  }

  if (error) {
    return (
      <AccordionContent className="text-gray-400 px-6 pb-1">
        <p>Error loading tasks.</p>
      </AccordionContent>
    );
  }

  return (
    <>
      {tasks?.map((task) => (
        <AccordionContent key={task._id} className="px-2 pb-1">
          <div className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">{task.title}</h3>
                {task.description && (
                  <p className="text-sm text-gray-600">{task.description}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    task.assignedTo === "Unassigned"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {task.assignedTo || "Unassigned"}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="grid grid-cols-4 text-sm text-gray-600">
                <div className="flex items-start justify-center">
                  <CalendarDays className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Due</p>
                    <p>
                      {new Date(task.dueDate)
                        .toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                        .replace(/ /g, "-")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start justify-center">
                  <CalendarCheck className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Started</p>
                    <p>
                      {new Date(task.startDate)
                        .toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                        .replace(/ /g, "-")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start justify-center">
                  {task.completionDate && (
                    <div className="flex">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Completed</p>
                        <p>
                          {new Date(task.completionDate)
                            .toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                            .replace(/ /g, "-")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-evenly">
                  <EditTask task={task} mutate={mutate} />
                  <DeleteTask taskId={task._id} mutate={mutate} />
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      ))}
      {!tasks?.length && !isLoading && (
        <AccordionContent className="text-gray-400 px-6 pb-1">
          <p>No tasks for this phase.</p>
        </AccordionContent>
      )}
      <AccordionContent className="px-2 pb-1">
        <Button variant="outline" className="bg-green-600 text-white">
          <CirclePlus />
          New Task
        </Button>
      </AccordionContent>
    </>
  );
}
