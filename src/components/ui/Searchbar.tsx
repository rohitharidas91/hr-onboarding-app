import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface SearchbarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
    className?: string;
}

export function Searchbar({
    onSearch,
    placeholder = "Search...",
    className = "mb-2"
}: SearchbarProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchQuery);
    };

    return (
        <form onSubmit={handleSubmit} className={`relative ${className}`}>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                type="search"
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => {
                    const value = e.target.value;
                    setSearchQuery(value);
                    onSearch(value); // Call onSearch directly on input change
                }}
                className="w-full rounded-lg bg-background pl-10 pr-4 py-2 text-sm shadow-sm"
            />
        </form>
    );
}