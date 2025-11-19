import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface EmployeeProps {
  name: string;
  designation: string;
  onClick?: () => void;  // Add this line
}

export function Employee({
  name = "",
  designation = "",
  onClick
}: EmployeeProps) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div
      className={`flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors`}
      onClick={onClick}>
      <Avatar className="h-10 w-10">
        <AvatarImage src="" alt={name} />
        <AvatarFallback className="bg-blue-100 text-blue-800">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{name}</p>
        <p className="text-sm text-gray-500 truncate">{designation}</p>
      </div>
    </div>
  );
}