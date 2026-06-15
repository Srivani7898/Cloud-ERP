import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Use a valid work email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  tenantSlug: z.string().min(2, "Tenant is required."),
  portal: z.enum(["super_admin", "hr_admin", "finance_manager", "payroll_manager", "scm_manager", "forecast_manager", "project_manager", "employee"]),
  remember: z.boolean().default(false)
});

export const registerSchema = z.object({
  companyName: z.string().min(2, "Company name is required."),
  name: z.string().min(2, "Full name is required."),
  email: z.string().email("Use a valid work email."),
  password: z
    .string()
    .min(10, "Use at least 10 characters.")
    .regex(/[A-Z]/, "Add an uppercase letter.")
    .regex(/[0-9]/, "Add a number."),
  region: z.string().min(2, "Select a data residency region."),
  acceptTerms: z.boolean().refine((value) => value, "Accept the enterprise agreement.")
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Use a valid work email."),
  tenantSlug: z.string().min(2, "Tenant is required.")
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(10, "Use at least 10 characters."),
    confirmPassword: z.string().min(10, "Confirm your password.")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"]
  });

export const mfaSchema = z.object({
  code: z.string().regex(/^\d{6}$/, "Enter the six-digit code.")
});

export const profileSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  region: z.string().min(2)
});
