import { CirclePlus } from "lucide-react";
import { Employee } from "./Employee";
import { Button } from "./../ui/button";
import { Searchbar } from "./../ui/Searchbar";
import { useState } from "react";
import { EmployeeType } from "@/lib/types";

type EmployeeListProps = {
  selectedEmployee: EmployeeType | null;
  setSelectedEmployee: (employee: EmployeeType) => void;
  employees: EmployeeType[];
};

export function EmployeeList({
  selectedEmployee,
  setSelectedEmployee,
  employees = [],
}: EmployeeListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmployees = employees.filter(
    (employee) =>
      searchQuery === "" ||
      employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 space-y-2">
        <Searchbar onSearch={setSearchQuery} placeholder="Search by name..." />
        <Button className="w-full">
          <CirclePlus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {filteredEmployees.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            {employees.length === 0 ? "No employees" : "No matches found"}
          </p>
        ) : (
          filteredEmployees.map((employee) => (
            <Employee
              key={employee._id}
              id={employee._id}
              name={employee.name}
              email={employee.email}
              designation={employee.designation || "No designation"}
              joiningDate={employee.joiningDate || "N/A"}
              onClick={() => setSelectedEmployee(employee)}
              isSelected={selectedEmployee?._id === employee._id}
            />
          ))
        )}
      </div>
    </div>
  );
}