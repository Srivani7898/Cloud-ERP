import type { FieldError } from "react-hook-form";
import { Label } from "@/components/ui/label";

export function FormField({
  id,
  label,
  error,
  children
}: {
  id: string;
  label: string;
  error?: FieldError;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? <p className="text-xs font-medium text-red-300">{error.message}</p> : null}
    </div>
  );
}
