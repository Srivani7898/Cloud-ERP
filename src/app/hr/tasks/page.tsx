"use client";

import { useState } from "react";
import { useTaskStore } from "@/store/task-store";
import { useNotificationStore } from "@/store/notification-store";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useHrStore } from "@/store/hr-store";

export default function HrTasksPage() {
    const addTask = useTaskStore(
        (state) => state.addTask
    );
    const addNotification =
        useNotificationStore(
            (state) => state.addNotification
        );
    const tasks = useTaskStore(
        (state) => state.tasks
    );
    console.log("Dashboard Tasks:", tasks);
    const employees = useHrStore(
        (state) => state.employees
    );

    const [form, setForm] = useState({
        title: "",
        description: "",
        assignedTo: "",
        dueDate: "",
        priority: "Medium",
    });

    function submitTask() {
        addTask({
            ...form,
            priority: form.priority as
                | "Low"
                | "Medium"
                | "High",
        });
        addNotification({
            employeeName: form.assignedTo,
            title: "New Task Assigned",
            message: `
                Task: ${form.title}
                Priority: ${form.priority}
                Due Date: ${form.dueDate}
            `,
        });
        console.log(
            "AFTER ADD",
            useTaskStore.getState().tasks
        );

        setForm({
            title: "",
            description: "",
            assignedTo: "",
            dueDate: "",
            priority: "Medium",
        });
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">
                Assign Tasks
            </h2>

            <div className="grid gap-4 max-w-2xl">
                <input
                    className="border p-2 rounded"
                    placeholder="Task Title"
                    value={form.title}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            title: e.target.value,
                        })
                    }
                />

                <textarea
                    className="border p-2 rounded"
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            description: e.target.value,
                        })
                    }
                />

                <Select
                    value={form.assignedTo}
                    onValueChange={(value) =>
                        setForm({
                            ...form,
                            assignedTo: value,
                        })
                    }
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Employee" />
                    </SelectTrigger>

                    <SelectContent>
                        {employees.map((employee) => (
                            <SelectItem
                                key={employee.id}
                                value={employee.name}
                            >
                                {employee.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <input
                    type="date"
                    className="border p-2 rounded"
                    value={form.dueDate}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            dueDate: e.target.value,
                        })
                    }
                />

                <select
                    className="border p-2 rounded"
                    value={form.priority}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            priority: e.target.value,
                        })
                    }
                >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>

                <button
                    onClick={submitTask}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Assign Task
                </button>
            </div>
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">
                    Assigned Tasks
                </h3>

                <div className="overflow-x-auto rounded-lg border border-white/10">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="p-3 text-left">Task ID</th>
                                <th className="p-3 text-left">Employee</th>
                                <th className="p-3 text-left">Title</th>
                                <th className="p-3 text-left">Due Date</th>
                                <th className="p-3 text-left">Priority</th>
                                <th className="p-3 text-left">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tasks.map((task) => (
                                <tr
                                    key={task.id}
                                    className="border-b border-white/5"
                                >
                                    <td className="p-3">{task.id}</td>
                                    <td className="p-3">{task.assignedTo}</td>
                                    <td className="p-3">{task.title}</td>
                                    <td className="p-3">{task.dueDate}</td>
                                    <td className="p-3">{task.priority}</td>
                                    <td className="p-3">{task.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
