# Cloud ERP Authentication Frontend

Production-grade Next.js authentication and multi-tenancy frontend module for an enterprise AI-powered Cloud ERP platform.

## Run

```bash
npm install
npm run dev
```

The default entry point is `/auth/login`.

## Included

- Login, registration, forgot/reset password, MFA, SSO callback, and logout routes
- JWT session management with persisted Zustand state
- Tenant-aware Axios API client
- Protected routes and RBAC helpers
- Dashboard, profile, settings, unauthorized, and 404 pages
- Tailwind CSS, shadcn-style UI primitives, React Query, React Hook Form, Zod, and Lucide icons
