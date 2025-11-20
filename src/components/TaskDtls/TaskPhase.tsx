"use client";
import { AccordionContent } from "@/components/ui/accordion";
import { TaskType } from "@/lib/types";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  CalendarCheck,
  CheckCircle2,
  CirclePlus,
} from "lucide-react";
import { Button } from "../ui/button";

interface TaskPhaseProps {
  phaseId: number;
  phaseName: string;
  phaseColor: string;
  employeeId: string;
}

export function TaskPhase({
  phaseId,
  phaseName,
  phaseColor,
  employeeId,
}: TaskPhaseProps) {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log("TaskPhase props", { phaseId, employeeId });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const params = new URLSearchParams();

        // Require an employee to be selected
        if (!employeeId) {
          setTasks([]);
          setIsLoading(false);
          return;
        }

        params.set("phase", String(phaseId));
        params.set("employeeId", employeeId);

        const res = await fetch(`/api/tasks?${params.toString()}`, {
          next: { revalidate: 5 },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data: TaskType[] = await res.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [phaseId, employeeId]);

  if (isLoading) {
    return <AccordionContent>Loading tasks...</AccordionContent>;
  }

  return (
    <>
      {tasks.map((task) => (
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
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {task.assignedTo}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="grid grid-cols-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <CalendarDays className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Due</p>
                    <p>{new Date(task.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <CalendarCheck className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Start</p>
                    <p>{new Date(task.startDate).toLocaleDateString()}</p>
                  </div>
                </div>

                {task.completionDate && (
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Completed</p>
                      <p>
                        {new Date(task.completionDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </AccordionContent>
      ))}
      {!tasks.length && !isLoading && (
        <AccordionContent className="text-gray-400 px-6 pb-1">
          <p>No tasks for this phase.</p>
        </AccordionContent>
      )}
      <AccordionContent className="px-2 pb-1">
        <Button variant="outline">
          <CirclePlus />
          New Task
        </Button>
      </AccordionContent>
    </>
  );
}
