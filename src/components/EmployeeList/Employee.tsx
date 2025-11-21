"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface EmployeeProps {
  id: string;
  name: string;
  designation: string;
  email: string;
  joiningDate: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export function Employee({
  name = "",
  designation = "",
  isSelected = false,
  onClick,
}: EmployeeProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        "flex items-center space-x-4 p-3 rounded-lg transition-colors cursor-pointer",
        isSelected ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
      )}
      onClick={onClick}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src="" alt={name} />
        <AvatarFallback className="bg-blue-100 text-blue-800">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{name}</p>
        <p className="text-sm text-gray-500 truncate">{designation}</p>
        <div className="flex items-center">
          <span className="pr-5">Completion%</span>
          <Progress value={80} />
        </div>
      </div>
    </div>
  );
}
