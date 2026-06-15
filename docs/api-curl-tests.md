# Cloud ERP Backend API Curl Tests

Authentication APIs are intentionally excluded for now. These endpoints cover the ERP modules currently present in the frontend.

Base URL:

```bash
BASE=http://localhost:3000
```

## Module Discovery

```bash
curl "$BASE/api/finance"
curl "$BASE/api/hr"
curl "$BASE/api/payroll"
curl "$BASE/api/scm"
curl "$BASE/api/forecast"
curl "$BASE/api/projects"
curl "$BASE/api/analytics"
curl "$BASE/api/notifications"
curl "$BASE/api/audit"
```

## Finance

```bash
curl "$BASE/api/finance/invoices"
curl "$BASE/api/finance/invoices?status=Paid"
curl "$BASE/api/finance/invoices/INV-10492"

curl -X POST "$BASE/api/finance/invoices" \
  -H "Content-Type: application/json" \
  -d '{"customer":"Demo Customer","status":"Draft","dueDate":"2026-06-20","total":45000,"currency":"USD","aiRisk":18}'

curl -X PATCH "$BASE/api/finance/invoices/INV-10492" \
  -H "Content-Type: application/json" \
  -d '{"status":"Approved","aiRisk":12}'
```

## HR

```bash
curl "$BASE/api/hr/employees"
curl "$BASE/api/hr/leave"

curl -X POST "$BASE/api/hr/employees" \
  -H "Content-Type: application/json" \
  -d '{"name":"Priya Nair","department":"Finance","title":"Controller","status":"Active","location":"Chennai"}'

curl -X PATCH "$BASE/api/hr/leave/LEV-1001" \
  -H "Content-Type: application/json" \
  -d '{"status":"Approved"}'
```

## Employee Portal

```bash
curl "$BASE/api/employee/profile"
curl "$BASE/api/employee/payslips"

curl -X POST "$BASE/api/employee/attendance" \
  -H "Content-Type: application/json" \
  -d '{"date":"2026-06-06","status":"Present","checkIn":"09:05","checkOut":"18:02"}'
```

## Payroll

```bash
curl "$BASE/api/payroll/runs"
curl "$BASE/api/payroll/payslips"

curl -X PATCH "$BASE/api/payroll/runs/PAYRUN-JUN-2026" \
  -H "Content-Type: application/json" \
  -d '{"status":"Approved"}'
```

## Supply Chain

```bash
curl "$BASE/api/scm/inventory"
curl "$BASE/api/scm/reorder-alerts"

curl -X POST "$BASE/api/scm/purchase-orders" \
  -H "Content-Type: application/json" \
  -d '{"vendor":"VoltEdge Supplies","amount":38000,"status":"Open","source":"Auto reorder"}'
```

## Forecast

```bash
curl "$BASE/api/forecast/predictions"
curl "$BASE/api/forecast/recommendations"

curl -X PATCH "$BASE/api/forecast/models/MODEL-LSTM-1" \
  -H "Content-Type: application/json" \
  -d '{"accuracy":94,"status":"Healthy"}'
```

## Projects

```bash
curl "$BASE/api/projects/projects"
curl "$BASE/api/projects/tasks"
curl "$BASE/api/projects/milestones"

curl -X POST "$BASE/api/projects/tasks" \
  -H "Content-Type: application/json" \
  -d '{"projectId":"proj-1001","title":"API integration test","status":"Todo","assignee":"Anika Rao"}'
```

## Analytics

```bash
curl "$BASE/api/analytics/dashboards"
curl "$BASE/api/analytics/widgets"
curl "$BASE/api/analytics/insights"
```

## Notifications

```bash
curl "$BASE/api/notifications/inbox"
curl "$BASE/api/notifications/retry-queue"

curl -X PATCH "$BASE/api/notifications/retry-queue/RTY-901" \
  -H "Content-Type: application/json" \
  -d '{"attempts":3,"status":"Retried"}'
```

## Audit & Compliance

```bash
curl "$BASE/api/audit/logs"
curl "$BASE/api/audit/gdpr"
curl "$BASE/api/audit/tamper-detection"

curl -X PATCH "$BASE/api/audit/gdpr/GDPR-1021" \
  -H "Content-Type: application/json" \
  -d '{"status":"Closed"}'
```

## Admin

```bash
curl "$BASE/api/admin/compliance"
curl "$BASE/api/admin/audit-reports"
curl "$BASE/api/admin/security-events"
```

## Auth Exclusion Check

```bash
curl "$BASE/api/auth"
```

Expected: `403` with a message that authentication APIs are excluded.
