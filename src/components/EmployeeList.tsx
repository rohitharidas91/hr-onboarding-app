import { CirclePlus } from 'lucide-react';
import { Employee } from './Employee';
import { Button } from './ui/button';
import { Searchbar } from './ui/Searchbar';
import { useState, useMemo } from 'react';
import { employees } from '../lib/data';

export interface EmployeeType {
    id: string;
    name: string;
    designation: string;
    startDate: string;
    onClick?: () => void;
}

interface EmployeeListProps {
    onEmployeeSelect: (employee: EmployeeType) => void;
}

export function EmployeeList({ onEmployeeSelect }: EmployeeListProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredEmployees = useMemo(() => {
        if (!searchQuery) return employees;
        const query = searchQuery.toLowerCase();
        return employees.filter(employee =>
            employee.name.toLowerCase().includes(query) ||
            employee.designation.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    return (
        <div className="h-full flex flex-col">
            <div className="p-2">
                <Searchbar
                    onSearch={(query) => setSearchQuery(query)}
                    placeholder="Search by name or designation..."
                />
                <Button className="w-full">
                    <CirclePlus className="mr-2 h-4 w-4" />
                    Add Employee
                </Button>
            </div>
            <div className="flex-1 overflow-y-scroll space-y-2 p-2">
                {filteredEmployees.length === 0 ? (
                    <div className="text-center text-muted-foreground py-4">
                        No employees found
                    </div>
                ) : (
                    filteredEmployees.map((employee, index) => (
                        <Employee
                            key={employee.id}
                            name={employee.name}
                            designation={employee.designation}
                            onClick={() => onEmployeeSelect(employee)}
                        />
                    )))}
            </div>
        </div>
    );
}