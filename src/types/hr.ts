export type EmploymentStatus = "active" | "onboarding" | "on_leave" | "terminated";
export type AttendanceStatus = "present" | "remote" | "late" | "absent";
export type LeaveStatus = "pending" | "approved" | "rejected";

export type Employee = {
  id: string;
  employeeCode: string;
  name: string;
  email: string;
  title: string;
  department: string;
  manager?: string;
  location: string;
  joinedAt: string;
  status: EmploymentStatus;
  performanceScore: number;

  annualLeaveBalance: number;
  sickLeaveBalance: number;
};

export type AttendanceRecord = {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: AttendanceStatus;
};

export type LeaveRequest = {
  id: string;
  employeeId: string;
  employeeName: string;
  type: "Annual" | "Sick" | "Parental" | "Unpaid";
  from: string;
  to: string;
  days: number;
  status: LeaveStatus;
};

export type Department = {
  id: string;
  name: string;
  head: string;
  employees: number;
  budget: string;
};

export type OnboardingTask = {
  id: string;
  employeeName: string;
  task: string;
  owner: string;
  dueDate: string;
  completed: boolean;
};
