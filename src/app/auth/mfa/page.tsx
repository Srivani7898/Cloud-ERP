import { AuthShell } from "@/components/auth/AuthShell";
import { MFAForm } from "@/components/auth/MFAForm";

export default function MFAPage() {
  return (
    <AuthShell title="Multi-factor verification" subtitle="Enter the six-digit code from your authenticator app to complete sign in.">
      <MFAForm />
    </AuthShell>
  );
}
