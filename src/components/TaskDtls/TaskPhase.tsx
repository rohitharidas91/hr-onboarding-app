"use client";
import { AccordionContent } from "@/components/ui/accordion";
import { TaskType } from "@/lib/types";
import { useEffect, useState } from "react";

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
        <AccordionContent key={task._id}>
          <div>
            <h2>{task.title}</h2>
            <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
          </div>
        </AccordionContent>
      ))}
      {!tasks.length && !isLoading && (
        <AccordionContent>No tasks for this phase.</AccordionContent>
      )}
    </>
  );
}
