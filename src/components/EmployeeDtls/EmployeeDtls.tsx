"use client";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface EmployeeDtlsProps {
  _id: string;
  email: string;
  name: string;
  designation: string;
  joiningDate?: string;
}

export function EmployeeDtls(selectedEmployee: EmployeeDtlsProps) {
  // Generate initials from employee's name
  const initials = selectedEmployee?.name
    ? selectedEmployee.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : "";

  if (!selectedEmployee.name) {
    return (
      <div className="flex items-center p-4 w-full border-b-2 h-24">
        <h2 className="text-gray-400">No employee selected...</h2>
      </div>
    );
  }

  return (
    <div className="flex items-center p-4 w-full border-b-2 h-24">
      <Avatar className="h-20 w-20">
        <AvatarFallback className="text-lg">{initials}</AvatarFallback>
      </Avatar>
      <div className="ml-4">
        <h2 className="text-2xl font-bold">{selectedEmployee.name}</h2>
        <h2 className="">{selectedEmployee.designation}</h2>
      </div>
    </div>
  );
}