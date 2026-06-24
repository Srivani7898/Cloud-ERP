import { api } from "@/lib/api";
import type { AttendanceRecord, Department, Employee, LeaveRequest, OnboardingTask } from "@/types/hr";

export async function fetchEmployees(): Promise<Employee[]> {
  const response = await api.get<Employee[]>("/hr/employees");
  return response.data;
}

export async function createEmployee(
  dto: Omit<Employee, "id" | "employeeCode" | "status" | "performanceScore" | "annualLeaveBalance" | "sickLeaveBalance">
): Promise<Employee> {
  const response = await api.post<Employee>("/hr/employees", dto);
  return response.data;
}

export async function updateEmployee(id: string, data: Partial<Employee>): Promise<Employee> {
  const response = await api.patch<Employee>(`/hr/employees/${id}`, data);
  return response.data;
}

export async function fetchDepartments(): Promise<Department[]> {
  const response = await api.get<Department[]>("/hr/departments");
  return response.data;
}

export async function createDepartment(dto: Omit<Department, "id" | "status">): Promise<Department> {
  const response = await api.post<Department>("/hr/departments", dto);
  return response.data;
}

export async function fetchAttendance(status?: string): Promise<AttendanceRecord[]> {
  const response = await api.get<AttendanceRecord[]>("/hr/attendance", {
    params: status ? { status } : {}
  });
  return response.data;
}

export async function createAttendance(dto: Omit<AttendanceRecord, "id" | "employeeId">): Promise<AttendanceRecord> {
  const response = await api.post<AttendanceRecord>("/hr/attendance", dto);
  return response.data;
}

export async function updateAttendanceStatus(id: string, status: string): Promise<AttendanceRecord> {
  const response = await api.patch<AttendanceRecord>(`/hr/attendance/${id}/status`, { status });
  return response.data;
}

export async function fetchLeaves(status?: string): Promise<LeaveRequest[]> {
  const response = await api.get<LeaveRequest[]>("/hr/leaves", {
    params: status ? { status } : {}
  });
  return response.data;
}

export async function applyLeave(dto: Omit<LeaveRequest, "id" | "employeeId" | "status">): Promise<LeaveRequest> {
  const response = await api.post<LeaveRequest>("/hr/leaves", dto);
  return response.data;
}

export async function updateLeaveStatus(id: string, status: string): Promise<LeaveRequest> {
  const response = await api.patch<LeaveRequest>(`/hr/leaves/${id}/status`, { status });
  return response.data;
}

export async function fetchOnboardingTasks(): Promise<OnboardingTask[]> {
  const response = await api.get<OnboardingTask[]>("/hr/onboarding");
  return response.data;
}

export async function toggleOnboardingTask(id: string): Promise<OnboardingTask> {
  const response = await api.patch<OnboardingTask>(`/hr/onboarding/${id}/toggle`);
  return response.data;
}

export async function triggerSeed(): Promise<{ seeded: boolean }> {
  const response = await api.post<{ seeded: boolean }>("/hr/seed");
  return response.data;
}
