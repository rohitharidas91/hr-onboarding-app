"use client";
import { EmployeeList } from "@/components/EmployeeList/EmployeeList";
import { EmployeeDtls } from "@/components/EmployeeDtls/EmployeeDtls";
import { useEffect, useState } from "react";
import { TaskDtls } from "@/components/TaskDtls/TaskDtls";
import { EmployeeType } from "@/lib/types";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType | null>(
    null
  );
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users", {
          next: { revalidate: 5 },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)] w-full">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
          <p className="text-lg font-medium text-gray-700">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 flex h-full w-full">
      <div className="w-1/3 h-[calc(100vh-8rem)] border-2 rounded-2xl m-2 overflow-hidden">
        <EmployeeList
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          employees={employees}
        />
      </div>
      <div className="w-2/3 h-[calc(100vh-8rem)] border-2 rounded-2xl m-2 overflow-hidden">
        <EmployeeDtls
          _id={selectedEmployee?._id || ""}
          email={selectedEmployee?.email || ""}
          name={selectedEmployee?.name || ""}
          designation={selectedEmployee?.designation || ""}
          joiningDate={selectedEmployee?.joiningDate}
        />
        <TaskDtls employeeId={selectedEmployee?._id || ""} />
      </div>
    </div>
  );
}
