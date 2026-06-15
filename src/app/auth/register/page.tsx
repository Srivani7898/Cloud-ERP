import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthShell title="Sign up for Cloud ERP" subtitle="Create your secure enterprise tenant and administrator account.">
      <RegisterForm />
    </AuthShell>
  );
}
