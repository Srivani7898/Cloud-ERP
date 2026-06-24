"use client";

import { create } from "zustand";
import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  fetchDepartments,
  createDepartment,
  fetchAttendance,
  createAttendance,
  updateAttendanceStatus,
  fetchLeaves,
  applyLeave,
  updateLeaveStatus,
  fetchOnboardingTasks,
  toggleOnboardingTask,
  triggerSeed
} from "@/services/hr-service";
import type {
  AttendanceRecord,
  Department,
  Employee,
  LeaveRequest,
  OnboardingTask
} from "@/types/hr";
import { useHrNotificationStore } from "@/store/notification-store";

type HrState = {
  employees: Employee[];
  attendance: AttendanceRecord[];
  pendingAttendance: AttendanceRecord[];
  leaveRequests: LeaveRequest[];
  pendingLeaveRequests: LeaveRequest[];
  onboardingTasks: OnboardingTask[];
  departments: Department[];
  isLoading: boolean;

  fetchInitialData: () => Promise<void>;

  addEmployee: (
    employee: Omit<Employee, "id" | "employeeCode" | "status" | "performanceScore" | "annualLeaveBalance" | "sickLeaveBalance">
  ) => Promise<Employee>;

  updateEmployee: (
    id: string,
    employee: Partial<Employee>
  ) => Promise<void>;

  addAttendance: (
    record: Omit<AttendanceRecord, "id" | "employeeId">
  ) => Promise<void>;

  approveAttendance: (id: string) => Promise<void>;

  rejectAttendance: (id: string) => Promise<void>;

  applyLeave: (
    request: Omit<LeaveRequest, "id" | "employeeId" | "status">
  ) => Promise<void>;

  approveLeave: (id: string) => Promise<void>;

  rejectLeave: (id: string) => Promise<void>;

  updateLeaveStatus: (
    id: string,
    status: LeaveRequest["status"]
  ) => Promise<void>;

  toggleTask: (id: string) => Promise<void>;

  addDepartment: (department: {
    name: string;
    head: string;
    employees: number;
    budget: string;
    status?: string;
  }) => Promise<void>;
};

export const useHrStore = create<HrState>((set, get) => ({
  employees: [],
  attendance: [],
  pendingAttendance: [],
  leaveRequests: [],
  pendingLeaveRequests: [],
  onboardingTasks: [],
  departments: [],
  isLoading: false,

  fetchInitialData: async () => {
    set({ isLoading: true });
    try {
      let employees = await fetchEmployees();
      if (employees.length === 0) {
        await triggerSeed();
        employees = await fetchEmployees();
      }

      const departments = await fetchDepartments();
      const allAttendance = await fetchAttendance();
      const attendance = allAttendance.filter(a => (a.status as string) !== "pending");
      const pendingAttendance = allAttendance.filter(a => (a.status as string) === "pending");
      
      const allLeaves = await fetchLeaves();
      const leaveRequests = allLeaves.filter(l => l.status !== "pending");
      const pendingLeaveRequests = allLeaves.filter(l => l.status === "pending");
      
      const onboardingTasks = await fetchOnboardingTasks();

      set({
        employees,
        departments,
        attendance,
        pendingAttendance,
        leaveRequests,
        pendingLeaveRequests,
        onboardingTasks,
      });
    } catch (e) {
      console.error("Failed to load HR data:", e);
    } finally {
      set({ isLoading: false });
    }
  },

  addDepartment: async (dept) => {
    try {
      await createDepartment({
        name: dept.name,
        head: dept.head,
        employees: dept.employees,
        budget: dept.budget
      });
      const departments = await fetchDepartments();
      set({ departments });
    } catch (e) {
      console.error(e);
    }
  },

  addEmployee: async (input) => {
    try {
      const created = await createEmployee(input as any);
      const employees = await fetchEmployees();
      const onboardingTasks = await fetchOnboardingTasks();
      set({ employees, onboardingTasks });
      return created;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },

  updateEmployee: async (id, data) => {
    try {
      await updateEmployee(id, data);
      const employees = await fetchEmployees();
      set({ employees });
    } catch (e) {
      console.error(e);
    }
  },

  addAttendance: async (record) => {
    try {
      await createAttendance(record);
      const allAttendance = await fetchAttendance();
      const pendingAttendance = allAttendance.filter(a => (a.status as string) === "pending");
      set({ pendingAttendance });
    } catch (e) {
      console.error(e);
    }
  },

  approveAttendance: async (id) => {
    const record = get().pendingAttendance.find((item) => item.id === id);
    if (!record) return;

    try {
      await updateAttendanceStatus(id, "approved");
      const allAttendance = await fetchAttendance();
      set({
        attendance: allAttendance.filter(a => (a.status as string) !== "pending"),
        pendingAttendance: allAttendance.filter(a => (a.status as string) === "pending")
      });

      useHrNotificationStore
        .getState()
        .addNotification(
          record.employeeName,
          "Attendance Approved",
          `Your attendance for ${record.date} has been approved.`,
          "Attendance"
        );
    } catch (e) {
      console.error(e);
    }
  },

  rejectAttendance: async (id) => {
    const record = get().pendingAttendance.find((item) => item.id === id);
    if (!record) return;

    try {
      await updateAttendanceStatus(id, "rejected");
      const allAttendance = await fetchAttendance();
      set({
        attendance: allAttendance.filter(a => (a.status as string) !== "pending"),
        pendingAttendance: allAttendance.filter(a => (a.status as string) === "pending")
      });

      useHrNotificationStore
        .getState()
        .addNotification(
          record.employeeName,
          "Attendance Rejected",
          `Your attendance for ${record.date} has been rejected.`,
          "Attendance"
        );
    } catch (e) {
      console.error(e);
    }
  },

  applyLeave: async (request) => {
    try {
      await applyLeave(request);
      const allLeaves = await fetchLeaves();
      set({
        pendingLeaveRequests: allLeaves.filter(l => l.status === "pending")
      });
    } catch (e) {
      console.error(e);
    }
  },

  approveLeave: async (id) => {
    const leave = get().pendingLeaveRequests.find((item) => item.id === id);
    if (!leave) return;

    try {
      await updateLeaveStatus(id, "approved");
      const allLeaves = await fetchLeaves();
      const employees = await fetchEmployees();

      set({
        leaveRequests: allLeaves.filter(l => l.status !== "pending"),
        pendingLeaveRequests: allLeaves.filter(l => l.status === "pending"),
        employees
      });

      useHrNotificationStore
        .getState()
        .addNotification(
          leave.employeeName,
          "Leave Approved",
          `Your ${leave.type} leave request from ${leave.from} to ${leave.to} has been approved.`,
          "Leave"
        );
    } catch (e) {
      console.error(e);
    }
  },

  rejectLeave: async (id) => {
    const leave = get().pendingLeaveRequests.find((item) => item.id === id);
    if (!leave) return;

    try {
      await updateLeaveStatus(id, "rejected");
      const allLeaves = await fetchLeaves();

      set({
        leaveRequests: allLeaves.filter(l => l.status !== "pending"),
        pendingLeaveRequests: allLeaves.filter(l => l.status === "pending")
      });

      useHrNotificationStore
        .getState()
        .addNotification(
          leave.employeeName,
          "Leave Rejected",
          `Your ${leave.type} leave request from ${leave.from} to ${leave.to} has been rejected.`,
          "Leave"
        );
    } catch (e) {
      console.error(e);
    }
  },

  updateLeaveStatus: async (id, status) => {
    try {
      await updateLeaveStatus(id, status);
      const allLeaves = await fetchLeaves();
      set({
        leaveRequests: allLeaves.filter(l => l.status !== "pending"),
        pendingLeaveRequests: allLeaves.filter(l => l.status === "pending")
      });
    } catch (e) {
      console.error(e);
    }
  },

  toggleTask: async (id) => {
    try {
      await toggleOnboardingTask(id);
      const onboardingTasks = await fetchOnboardingTasks();
      set({ onboardingTasks });
    } catch (e) {
      console.error(e);
    }
  }
}));