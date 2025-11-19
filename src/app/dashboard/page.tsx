import { EmployeeList } from "@/components/EmployeeList";
import { EmployeeDtls } from "@/components/EmployeeDtls";
import { EmployeeType } from "@/components/EmployeeList";

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  startDate: string;
  completionDate: string;
}

async function getTasks() {
  const res = await fetch("http://localhost:3000/api/tasks");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Dashboard() {
  const data = await getTasks();
  console.log(data);

  return (
    <div className="p-2 flex h-full">
      <div className="w-1/3 h-[calc(100vh-4rem)] border-2 rounded-2xl m-2">
        <EmployeeList onEmployeeSelect={data} />
      </div>
      <EmployeeDtls employee={data[0]} />
    </div>
  );
}
