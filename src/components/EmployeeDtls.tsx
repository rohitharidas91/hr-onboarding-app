'use client'
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Task } from "./Task";
import { taskPhases, Task as TaskType } from "@/lib/data";
interface EmployeeDtlsProps {
  employee: {
    id:string;
    name: string;
    designation: string;
    startDate: string;
  } | null;
}

export function EmployeeDtls({ employee }: EmployeeDtlsProps) {
  const handleStatusChange = (taskId: string, completed: boolean) => {
    console.log(`Task ${taskId} status: ${completed ? 'completed' : 'incomplete'}`);
  };

  const handleEdit = (task: TaskType) => {
    // Handle edit logic
    console.log('Edit task:', task);
  };

  const handleDelete = (taskId: string) => {
    // Handle delete logic
    console.log('Delete task:', taskId);
  };


  if (!employee) {
    return (
      <div className="w-2/3 h-[calc(100vh-4rem)] flex flex-col items-center justify-center border-2 rounded-2xl m-2 p-6 text-center">
        <p className="text-gray-500">Select an employee to view details</p>
      </div>
    );
  }

  const initials = employee.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="w-2/3 h-[calc(100vh-4rem)] flex flex-col border-2 rounded-2xl m-2 p-6">
      <div className="flex flex-col items-center mb-6">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-semibold">{employee.name}</h2>
        <p className="text-gray-600">{employee.designation}</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-500">Start Date:</span>
          <span className="font-medium">
            {new Date(employee.startDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col h-full overflow-y-scroll">
        {taskPhases.map((phase) => (
          <Task
            key={phase.id}
            phaseId={phase.id}
            phaseName={phase.name}
            employeeId={employee.id}
          />
        ))}
      </div>
    </div>
  );
}