"use client";
import { useState, useEffect } from 'react';
import { Task } from '@/lib/data';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { taskPhases } from '@/lib/data';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface TaskFormProps {
    task?: Task;
    onSubmit: (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
    onCancel: () => void;
    employeeId: string;
}

export function TaskForm({
    task,
    onSubmit,
    onCancel,
    employeeId
}: TaskFormProps) {

    return (
        <Card>
            <CardHeader>
                <CardTitle>New/Edit Task</CardTitle>
                <CardDescription>Update task details</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <Input type="text" placeholder='Title' className="w-full" name="title"/>
                    <Textarea placeholder='Description' className="w-full" name="description"/>
                    <Input type="date" className="w-full" name="dueDate"/>
                    <Input type="date" className="w-full" name="startDate"/>
                    <Input type="date" className="w-full" name="completionDate"/>
                    <Input type="text" placeholder='Assigned To' className="w-full" name="assignedTo"/>
                </form>
            </CardContent>
            <CardFooter>
                <Button type="submit" className="w-1/2">
                    Save
                </Button>
                <Button variant="destructive" className="w-1/2">
                    Cancel
                </Button>
            </CardFooter>
        </Card>
    )
}