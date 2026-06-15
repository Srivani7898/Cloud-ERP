"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { attendance, departments, employees, leaveRequests, onboardingTasks } from "@/services/hr-service";
import type { AttendanceRecord, Employee, LeaveRequest, OnboardingTask } from "@/types/hr";

type HrState = {
  employees: Employee[];
  attendance: AttendanceRecord[];
  leaveRequests: LeaveRequest[];
  onboardingTasks: OnboardingTask[];
  departments: typeof departments;
  addEmployee: (employee: Omit<Employee, "id" | "employeeCode" | "status" | "performanceScore">) => Employee;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  addAttendance: (record: Omit<AttendanceRecord, "id" | "employeeId">) => void;
  applyLeave: (request: Omit<LeaveRequest, "id" | "employeeId" | "status">) => void;
  updateLeaveStatus: (id: string, status: LeaveRequest["status"]) => void;
  toggleTask: (id: string) => void;
};

export const useHrStore = create<HrState>()(
  persist(
    (set) => ({
      employees,
      attendance,
      leaveRequests,
      onboardingTasks,
      departments,
      addEmployee: (input) => {
        const employee: Employee = {
          ...input,
          id: `emp-${Math.floor(2000 + Math.random() * 7000)}`,
          employeeCode: `NS-${Math.floor(2000 + Math.random() * 7000)}`,
          status: "onboarding",
          performanceScore: 82
        };
        set((state) => ({
          employees: [employee, ...state.employees],
          onboardingTasks: [
            { id: `onb-${Date.now()}`, employeeName: employee.name, task: "Complete onboarding checklist", owner: "People Ops", dueDate: employee.joinedAt, completed: false },
            ...state.onboardingTasks
          ]
        }));
        return employee;
      },
      updateEmployee: (id, employee) =>
        set((state) => ({
          employees: state.employees.map((item) => (item.id === id ? { ...item, ...employee } : item))
        })),
      addAttendance: (record) =>
        set((state) => ({
          attendance: [{ ...record, id: `att-${Date.now()}`, employeeId: "manual" }, ...state.attendance]
        })),
      applyLeave: (request) =>
        set((state) => ({
          leaveRequests: [{ ...request, id: `LV-${Math.floor(800 + Math.random() * 500)}`, employeeId: "manual", status: "pending" }, ...state.leaveRequests]
        })),
      updateLeaveStatus: (id, status) =>
        set((state) => ({
          leaveRequests: state.leaveRequests.map((item) => (item.id === id ? { ...item, status } : item))
        })),
      toggleTask: (id) =>
        set((state) => ({
          onboardingTasks: state.onboardingTasks.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
        }))
    }),
    { name: "cloud-erp-hr" }
  )
);
