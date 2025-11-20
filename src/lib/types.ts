export interface TaskType {
  _id: string;
  title: string;
  description?: string;
  employeeId: string;
  dueDate: string;
  startDate: string;
  completionDate: string;
  phase: number;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export type EmployeeType = {
  _id: string;
  name: string;
  email: string;
  designation?: string;
  joiningDate?: string;
};