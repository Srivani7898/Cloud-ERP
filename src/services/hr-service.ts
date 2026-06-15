import type { AttendanceRecord, Department, Employee, LeaveRequest, OnboardingTask } from "@/types/hr";

export const employees: Employee[] = [
  { id: "emp-1001", employeeCode: "NS-1001", name: "Anika Rao", email: "anika.rao@northstar.example", title: "HR Business Partner", department: "People Operations", location: "Bengaluru", joinedAt: "2024-02-12", status: "active", performanceScore: 94 },
  { id: "emp-1002", employeeCode: "NS-1002", name: "Ethan Clarke", email: "ethan.clarke@northstar.example", title: "Finance Controller", department: "Finance", location: "New York", joinedAt: "2023-08-21", status: "active", performanceScore: 89 },
  { id: "emp-1003", employeeCode: "NS-1003", name: "Maya Chen", email: "maya.chen@northstar.example", title: "Cloud ERP Architect", department: "Engineering", location: "Singapore", joinedAt: "2025-01-08", status: "onboarding", performanceScore: 91 },
  { id: "emp-1004", employeeCode: "NS-1004", name: "Omar Haddad", email: "omar.haddad@northstar.example", title: "Supply Chain Lead", department: "Operations", location: "Dubai", joinedAt: "2022-11-03", status: "on_leave", performanceScore: 86 }
];

export const attendance: AttendanceRecord[] = [
  { id: "att-9001", employeeId: "emp-1001", employeeName: "Anika Rao", date: "2026-06-01", checkIn: "09:02", checkOut: "18:08", status: "present" },
  { id: "att-9002", employeeId: "emp-1002", employeeName: "Ethan Clarke", date: "2026-06-01", checkIn: "09:42", checkOut: "18:20", status: "late" },
  { id: "att-9003", employeeId: "emp-1003", employeeName: "Maya Chen", date: "2026-06-01", checkIn: "08:58", checkOut: "17:52", status: "remote" }
];

export const leaveRequests: LeaveRequest[] = [
  { id: "LV-701", employeeId: "emp-1004", employeeName: "Omar Haddad", type: "Annual", from: "2026-06-03", to: "2026-06-07", days: 5, status: "approved" },
  { id: "LV-702", employeeId: "emp-1001", employeeName: "Anika Rao", type: "Sick", from: "2026-06-10", to: "2026-06-10", days: 1, status: "pending" }
];

export const departments: Department[] = [
  { id: "dept-people", name: "People Operations", head: "Anika Rao", employees: 28, budget: "$2.4M" },
  { id: "dept-finance", name: "Finance", head: "Ethan Clarke", employees: 41, budget: "$4.1M" },
  { id: "dept-engineering", name: "Engineering", head: "Maya Chen", employees: 112, budget: "$18.8M" },
  { id: "dept-ops", name: "Operations", head: "Omar Haddad", employees: 64, budget: "$7.2M" }
];

export const onboardingTasks: OnboardingTask[] = [
  { id: "onb-1", employeeName: "Maya Chen", task: "Provision ERP workspace", owner: "IT Ops", dueDate: "2026-06-02", completed: true },
  { id: "onb-2", employeeName: "Maya Chen", task: "Complete compliance training", owner: "People Ops", dueDate: "2026-06-04", completed: false },
  { id: "onb-3", employeeName: "Ravi Mehta", task: "Upload tax documents", owner: "Payroll", dueDate: "2026-06-05", completed: false }
];
