import { z } from "zod";

export const employeeSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Use a valid email."),
  title: z.string().min(2, "Title is required."),
  department: z.string().min(2, "Department is required."),
  location: z.string().min(2, "Location is required."),
  joinedAt: z.string().min(8, "Join date is required.")
});

export const leaveSchema = z.object({
  employeeName: z.string().min(2),
  type: z.enum(["Annual", "Sick", "Parental", "Unpaid"]),
  from: z.string().min(8),
  to: z.string().min(8),
  days: z.coerce.number().positive()
});

export const attendanceSchema = z.object({
  employeeName: z.string().min(2),
  date: z.string().min(8),
  checkIn: z.string().min(4),
  checkOut: z.string().min(4),
  status: z.enum(["present", "remote", "late", "absent"])
});
