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
  departments: any[];
  addEmployee: (employee: Omit<Employee, "id" | "employeeCode" | "status" | "performanceScore">) => Employee;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  addAttendance: (record: Omit<AttendanceRecord, "id" | "employeeId">) => void;
  applyLeave: (request: Omit<LeaveRequest, "id" | "employeeId" | "status">) => void;
  updateLeaveStatus: (id: string, status: LeaveRequest["status"]) => void;
  toggleTask: (id: string) => void;
  addDepartment: (department: {
    name: string;
    head: string;
    employees: number;
    budget: number;
    status?: string;
  }) => void;
};

export const useHrStore = create<HrState>()(
  persist(
    (set) => ({
      employees,
      attendance,
      leaveRequests,
      onboardingTasks,
      departments,

      addDepartment: (department) =>
        set((state) => ({
          departments: [
            {
              id: `HR-DEP-${Date.now()}`,
              name: department.name,
              head: department.head,
              employees: department.employees,
              budget: department.budget,
              status: department.status ?? "Created",
            },
            ...state.departments,
          ],
        })),

      addEmployee: (input) => {
        const employee: Employee = {
          ...input,
          id: `emp-${Math.floor(2000 + Math.random() * 7000)}`,
          employeeCode: `NS-${Math.floor(2000 + Math.random() * 7000)}`,
          status: "onboarding",
          performanceScore: 82,
          manager: input.manager,
        };
        
        set((state) => ({
          employees: [employee, ...state.employees],
          onboardingTasks: [
            {
              id: `onb-${Date.now()}-1`,
              employeeName: employee.name,
              task: "Create Employee ID",
              owner: "HR",
              dueDate: employee.joinedAt,
              completed: false
            },
            {
              id: `onb-${Date.now()}-2`,
              employeeName: employee.name,
              task: "Issue Laptop",
              owner: "IT",
              dueDate: employee.joinedAt,
              completed: false
            },
            {
              id: `onb-${Date.now()}-3`,
              employeeName: employee.name,
              task: "Create Email Account",
              owner: "IT",
              dueDate: employee.joinedAt,
              completed: false
            },
            {
              id: `onb-${Date.now()}-4`,
              employeeName: employee.name,
              task: "Payroll Registration",
              owner: "Payroll",
              dueDate: employee.joinedAt,
              completed: false
            },
            {
              id: `onb-${Date.now()}-5`,
              employeeName: employee.name,
              task: "Compliance Training",
              owner: "Compliance",
              dueDate: employee.joinedAt,
              completed: false
            },
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
