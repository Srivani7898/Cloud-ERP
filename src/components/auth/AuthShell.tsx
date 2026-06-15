export function AuthShell({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) {
  return (
    <main className="aurora-auth flex min-h-screen items-center justify-center px-5 py-10 text-slate-50 sm:px-8">
      <section className="auth-enter w-full max-w-md">
        <div className="auth-card-premium rounded-lg p-6 backdrop-blur-2xl sm:p-8">
          <div className="mb-7 text-center">
            <h1 className="text-2xl font-semibold tracking-normal text-white sm:text-[1.7rem]">{title}</h1>
            <p className="mt-2 text-sm leading-6 text-slate-300">{subtitle}</p>
          </div>
          {children}
        </div>
      </section>
    </main>
  );
}
