import { AuthShell } from "@/components/auth/AuthShell";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthShell title="Recover account access" subtitle="We will send a time-limited reset link to the verified tenant administrator email.">
      <ForgotPasswordForm />
    </AuthShell>
  );
}
