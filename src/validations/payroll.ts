import { z } from "zod";

export const payrollRunSchema = z.object({
  period: z.string().min(3, "Period is required."),
  payDate: z.string().min(8, "Pay date is required.")
});

export const payrollEmployeeSchema = z.object({
  name: z.string().min(2),
  employeeCode: z.string().min(3),
  department: z.string().min(2),
  designation: z.string().min(2),
  baseSalary: z.coerce.number().positive(),
  taxRegion: z.string().min(2)
});
