export interface Task {
    id: string;
    title: string;
    description?: string;
    employeeId: string,
    dueDate: string;
    startDate: string;
    completionDate: string;
    phase: number;
    assignedTo?: string;
    createdAt: string;
    updatedAt: string;
}

export const taskPhases = [
    {
        id: 1,
        name: 'Stage 1: Pre-Boarding',
        count: 0, // Will be calculated
        color: 'bg-blue-100 text-blue-800 border-blue-300'
    },
    {
        id: 2,
        name: 'Stage 2: Day 1 Orientation',
        count: 0,
        color: 'bg-purple-100 text-purple-800 border-purple-300'
    },
    {
        id: 3,
        name: 'Stage 3: Functional Induction',
        count: 0,
        color: 'bg-yellow-100 text-yellow-800 border-yellow-300'
    },
    {
        id: 4,
        name: 'Stage 4: Role-Specific Training',
        count: 0,
        color: 'bg-green-100 text-green-800 border-green-300'
    },
    {
        id: 5,
        name: 'Stage 5: Integration & Engagement',
        count: 0,
        color: 'bg-indigo-100 text-indigo-800 border-indigo-300'
    },
    {
        id: 6,
        name: 'Stage 6: Performance & Feedback',
        count: 0,
        color: 'bg-pink-100 text-pink-800 border-pink-300'
    },
    {
        id: 7,
        name: 'Stage 7: Probation Completion',
        count: 0,
        color: 'bg-gray-100 text-gray-800 border-gray-300'
    }
];

export const employees = [
    {
        id: '1',
        name: "John Doe",
        designation: "Software Engineer",
        startDate: "2023-02-01",
    },
    {
        id: '2',
        name: "Jane Smith",
        designation: "Software Engineer",
        startDate: "2023-01-01",
    },
    {
        id: '3',
        name: "Alice Johnson",
        designation: "Software Engineer",
        startDate: "2023-01-01",
    },
    {
        id: '4',
        name: "Bob Brown",
        designation: "Software Engineer",
        startDate: "2023-01-01",
    },
    {
        id: '5',
        name: "Charlie Davis",
        designation: "Software Engineer",
        startDate: "2023-01-01",
    },
];

export const tasks: Task[] = [
    {
        id: '1',
        title: 'Send Welcome Package',
        description: 'Email welcome package with company info and first day details',
        employeeId: '1',
        dueDate: '2023-12-15',
        startDate: '2023-12-01',
        completionDate: '',
        phase: 1,
        assignedTo: 'John Doe',
        createdAt: '2023-11-15T09:00:00Z',
        updatedAt: '2023-11-15T09:00:00Z'
    },
    {
        id: '2',
        title: 'Complete Paperwork',
        description: 'Employment contract and tax forms',
        employeeId: '1',
        dueDate: '2023-12-10',
        startDate: '2023-12-01',
        completionDate: '2023-12-11',
        phase: 1,
        assignedTo: 'John Doe',
        createdAt: '2023-11-15T09:00:00Z',
        updatedAt: '2023-11-15T09:00:00Z'
    },
    {
        id: '3',
        title: 'Office Tour',
        description: 'Show new hire around the office',
        employeeId: '1',
        dueDate: '2023-12-16',
        startDate: '2023-12-16',
        completionDate: '',
        phase: 2,
        assignedTo: 'John Doe',
        createdAt: '2023-11-15T09:00:00Z',
        updatedAt: '2023-11-15T09:00:00Z'
    },
];
