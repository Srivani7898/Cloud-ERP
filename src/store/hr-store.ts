"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { attendance, departments, employees, leaveRequests, onboardingTasks } from "@/services/hr-service";
import type { AttendanceRecord, Employee, LeaveRequest, OnboardingTask } from "@/types/hr";

type HrState = {
  employees: Employee[];
  attendance: AttendanceRecord[];
  pendingAttendance: AttendanceRecord[];
  leaveRequests: LeaveRequest[];
  pendingLeaveRequests: LeaveRequest[];
  onboardingTasks: OnboardingTask[];
  departments: any[];

  addEmployee: (
    employee: Omit<Employee, "id" | "employeeCode" | "status" | "performanceScore">
  ) => Employee;

  updateEmployee: (
    id: string,
    employee: Partial<Employee>
  ) => void;

  addAttendance: (
    record: Omit<AttendanceRecord, "id" | "employeeId">
  ) => void;

  approveAttendance: (id: string) => void;

  rejectAttendance: (id: string) => void;

  applyLeave: (
    request: Omit<LeaveRequest, "id" | "employeeId" | "status">
  ) => void;

  approveLeave: (id: string) => void;

  rejectLeave: (id: string) => void;

  updateLeaveStatus: (
    id: string,
    status: LeaveRequest["status"]
  ) => void;

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
    (set, get) => ({
      employees,
      attendance,
      pendingAttendance: [],
      leaveRequests,
      pendingLeaveRequests: [],
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
        set((state) => {

          const alreadyExists =
            state.pendingAttendance.some(
              (item) =>
                item.employeeName === record.employeeName &&
                item.date === record.date
            ) ||
            state.attendance.some(
              (item) =>
                item.employeeName === record.employeeName &&
                item.date === record.date
            );

          if (alreadyExists) {
            return state;
          }

          return {
            pendingAttendance: [
              {
                ...record,
                id: `att-${Date.now()}`,
                employeeId: "manual",
              },
              ...state.pendingAttendance,
            ],
          };
        }),

      approveAttendance: (id) =>
        set((state) => {
          const record = state.pendingAttendance.find(
            (item) => item.id === id
          );

          if (!record) return state;

          return {
            attendance: [record, ...state.attendance],
            pendingAttendance: state.pendingAttendance.filter(
              (item) => item.id !== id
            ),
          };
        }),

      rejectAttendance: (id) =>
        set((state) => ({
          pendingAttendance: state.pendingAttendance.filter(
            (item) => item.id !== id
          ),
        })),

      applyLeave: (request) =>
        set((state) => {
          console.log("Leave Added:", request);

          return {
            pendingLeaveRequests: [
              {
                ...request,
                id: `LV-${Math.floor(800 + Math.random() * 500)}`,
                employeeId: "manual",
                status: "pending",
              },
              ...state.pendingLeaveRequests,
            ],
          };
        }),

      approveLeave: (id) =>
        set((state) => {
          const leave = state.pendingLeaveRequests.find(
            (item) => item.id === id
          );
          const employee = state.employees.find(
            (emp) => emp.name === leave?.employeeName
          );

          if (!leave) return state;

          return {
            leaveRequests: [
              { ...leave, status: "approved" },
              ...state.leaveRequests,
            ],

            pendingLeaveRequests: state.pendingLeaveRequests.filter(
              (item) => item.id !== id
            ),

            employees: state.employees.map((emp) =>
              emp.name === leave.employeeName
                ? {
                  ...emp,
                  annualLeaveBalance:
                    leave.type === "Annual"
                      ? Math.max(0, emp.annualLeaveBalance - leave.days)
                      : emp.annualLeaveBalance,

                  sickLeaveBalance:
                    leave.type === "Sick"
                      ? Math.max(0, emp.sickLeaveBalance - leave.days)
                      : emp.sickLeaveBalance,
                }
                : emp
            ),
          };
        }),

      rejectLeave: (id) =>
        set((state) => {
          const leave = state.pendingLeaveRequests.find(
            (item) => item.id === id
          );

          if (!leave) return state;

          return {
            leaveRequests: [
              { ...leave, status: "rejected" },
              ...state.leaveRequests,
            ],
            pendingLeaveRequests: state.pendingLeaveRequests.filter(
              (item) => item.id !== id
            ),
          };
        }),

      updateLeaveStatus: (id, status) =>
        set((state) => ({
          leaveRequests: state.leaveRequests.map((item) =>
            item.id === id ? { ...item, status } : item
          )
        })),
      toggleTask: (id) =>
        set((state) => ({
          onboardingTasks: state.onboardingTasks.map((item) =>
            item.id === id
              ? { ...item, completed: !item.completed }
              : item
          )
        }))
    }),
    {
      name: "cloud-erp-hr",
    }
  )
);