"use client"
import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Navbar() {
    return (
        <nav className="flex items-center justify-between p-4 bg-accent border-b-2">
            <SidebarTrigger />
            <div className="flex items-center gap-4">
                {/*Might add stuff later*/}
                <Link href="/"></Link>
                <Link href="/"></Link>
                <Link href="/"></Link>
            </div>
            <div className="flex items-center gap-4">
                <Link href="/logout"><LogOut />Logout</Link>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </nav>
    );
}
