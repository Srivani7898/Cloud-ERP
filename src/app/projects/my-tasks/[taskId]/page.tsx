"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useProjectsStore } from "@/store/projects-store";
import { useRouter } from "next/navigation";

type TaskStatus =
    | "todo"
    | "in_progress"
    | "review"
    | "done";

export default function TaskDetailsPage() {
    const { taskId } = useParams();

    const task = useProjectsStore((state) =>
        state.tasks.find((item) => item.id === taskId)
    );

    const updateTask = useProjectsStore(
        (state) => state.updateTask
    );

    const [status, setStatus] = useState<TaskStatus>(
        (task?.status as TaskStatus) ?? "todo"
    );

    const [loggedHours, setLoggedHours] = useState(
        task?.loggedHours ?? 0
    );

    const [notes, setNotes] = useState("");

    if (!task) {
        return (
            <div className="p-6">
                <h2 className="text-xl font-semibold">
                    Task Not Found
                </h2>
            </div>
        );
    }

    const remainingHours = Math.max(
        0,
        (task.estimateHours || 0) - Number(loggedHours)
    );

    const router = useRouter();
    const handleSave = () => {
        updateTask(task.id, {
            status,
            loggedHours,
        });

        router.push("/projects/my-tasks");
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold">
                Update Task
            </h1>

            {/* Task Information */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <h2 className="mb-4 text-xl font-semibold">
                    Task Information
                </h2>

                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <p className="text-sm text-slate-400">
                            Task
                        </p>

                        <p className="font-medium">
                            {task.title}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-slate-400">
                            Assignee
                        </p>

                        <p className="font-medium">
                            {task.assignee}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-slate-400">
                            Priority
                        </p>

                        <p className="font-medium capitalize">
                            {task.priority}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-slate-400">
                            Due Date
                        </p>

                        <p className="font-medium">
                            {task.dueDate}
                        </p>
                    </div>
                </div>
            </div>

            {/* Task Progress */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <h2 className="mb-4 text-xl font-semibold">
                    Task Progress
                </h2>

                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm text-slate-400">
                            Status
                        </label>

                        <select
                            value={status}
                            onChange={(e) => {
                                const value =
                                    e.target.value as TaskStatus;

                                setStatus(value);

                                if (value === "done") {
                                    setLoggedHours(
                                        task.estimateHours
                                    );
                                }
                            }}
                            className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
                        >
                            <option value="todo">
                                Todo
                            </option>

                            <option value="in_progress">
                                In Progress
                            </option>

                            <option value="review">
                                Review
                            </option>

                            <option value="done">
                                Done
                            </option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-slate-400">
                            Logged Hours
                        </label>

                        <input
                            type="number"
                            min={0}
                            max={task.estimateHours}
                            value={loggedHours}
                            onChange={(e) => {
                                const value = Number(
                                    e.target.value
                                );

                                if (
                                    value >= 0 &&
                                    value <= task.estimateHours
                                ) {
                                    setLoggedHours(value);
                                }
                            }}
                            className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
                        />
                    </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border border-white/10 p-4">
                        <p className="text-sm text-slate-400">
                            Estimated Hours
                        </p>

                        <p className="mt-2 text-2xl font-semibold">
                            {task.estimateHours}
                        </p>
                    </div>

                    <div className="rounded-lg border border-white/10 p-4">
                        <p className="text-sm text-slate-400">
                            Logged Hours
                        </p>

                        <p className="mt-2 text-2xl font-semibold">
                            {loggedHours}
                        </p>
                    </div>

                    <div className="rounded-lg border border-white/10 p-4">
                        <p className="text-sm text-slate-400">
                            Remaining Hours
                        </p>

                        <p className="mt-2 text-2xl font-semibold">
                            {remainingHours}
                        </p>
                    </div>
                </div>
            </div>

            {/* Work Notes */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <h2 className="mb-4 text-xl font-semibold">
                    Work Notes
                </h2>

                <textarea
                    rows={6}
                    value={notes}
                    onChange={(e) =>
                        setNotes(e.target.value)
                    }
                    placeholder="Enter work update notes..."
                    className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-3"
                />
            </div>

            {/* Save Button */}
            <div>
                <button
                    onClick={handleSave}
                    className="rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3 font-medium text-white"
                >
                    Save Task Update
                </button>
            </div>
        </div>
    );
}