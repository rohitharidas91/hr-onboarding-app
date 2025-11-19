'use client'
import { EmployeeList } from "@/components/EmployeeList"
import { EmployeeDtls } from "@/components/EmployeeDtls";
import { useState } from "react";
import { EmployeeType } from "@/components/EmployeeList"; // Import the EmployeeType

export default function Dashboard() {
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType | null>(null);
    return (
        <div className="p-2 flex h-full">
            <div className="w-1/3 h-[calc(100vh-4rem)] border-2 rounded-2xl m-2">
                <EmployeeList onEmployeeSelect={setSelectedEmployee} />
            </div>
            <EmployeeDtls employee={selectedEmployee} />
        </div>
    )
}