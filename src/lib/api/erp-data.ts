export type ErpRecord = {
  id: string;
  [key: string]: unknown;
};

type ErpDatabase = Record<string, Record<string, ErpRecord[]>>;

const now = () => new Date().toISOString();

const seed: ErpDatabase = {
  finance: {
    invoices: [
      {
        id: "INV-10492",
        customer: "Apex Retail Group",
        status: "Overdue",
        dueDate: "2026-05-24",
        total: 128400,
        currency: "USD",
        aiRisk: 82,
        assignedTo: ""
      },

      {
        id: "INV-10491",
        customer: "HelioGrid Energy",
        status: "Approved",
        dueDate: "2026-06-02",
        total: 94200,
        currency: "USD",
        aiRisk: 24,
        assignedTo: ""
      },

      {
        id: "INV-10490",
        customer: "Orion Logistics",
        status: "Paid",
        dueDate: "2026-05-28",
        total: 221900,
        currency: "USD",
        aiRisk: 9,
        assignedTo: ""
      }
    ],
    payments: [
      { id: "PAY-7781", vendor: "CloudOps Global", status: "Scheduled", amount: 48200, method: "ACH", date: "2026-06-10" },
      { id: "PAY-7780", vendor: "Northstar Logistics", status: "Released", amount: 72800, method: "Wire", date: "2026-06-04" },
    ],
    accounts: [
      { id: "ACC-1000", name: "Cash and Equivalents", type: "Asset", balance: 1280000, currency: "USD" },
      { id: "ACC-2200", name: "Accounts Payable", type: "Liability", balance: 426000, currency: "USD" },
    ],
    ledger: [
      { id: "LED-9001", account: "Cash and Equivalents", debit: 128400, credit: 0, source: "INV-10492", postedAt: now() },
      { id: "LED-9002", account: "Revenue", debit: 0, credit: 128400, source: "INV-10492", postedAt: now() },
    ],
    "journal-entries": [
      { id: "JE-6101", description: "Revenue accrual", status: "Posted", debit: 128400, credit: 128400, period: "FY2026-Q2" },
    ],
    reports: [
      { id: "FIN-RPT-1", name: "Finance close report", period: "FY2026-Q2", status: "Ready", format: "PDF" },
    ],
    currency: [
      { id: "USD-INR", base: "USD", quote: "INR", rate: 83.42, updatedAt: now() },
      { id: "USD-EUR", base: "USD", quote: "EUR", rate: 0.92, updatedAt: now() },
    ],
    "audit-logs": [
      { id: "FIN-AUD-1", action: "Invoice approved", actor: "finance.manager@northstar.example", createdAt: now() },
    ],
  },
  hr: {
    employees: [
      { id: "EMP-1001", name: "Anika Rao", department: "Finance", title: "Senior Analyst", status: "Active", location: "Bengaluru" },
      { id: "EMP-1002", name: "Rohan Mehta", department: "HR", title: "People Partner", status: "Active", location: "Mumbai" },
    ],
    attendance: [
      { id: "ATT-1001", employeeId: "EMP-1001", date: "2026-06-06", status: "Present", checkIn: "09:10", checkOut: "18:05" },
    ],
    leave: [
      { id: "LEV-1001", employeeId: "EMP-1001", type: "Casual", from: "2026-06-12", to: "2026-06-12", status: "Approved" },
    ],
    departments: [
      { id: "DEP-FIN", name: "Finance", head: "Avery Stone", employees: 42 },
      { id: "DEP-HR", name: "Human Resources", head: "Rohan Mehta", employees: 18 },
    ],
    hierarchy: [
      { id: "ORG-1", employeeId: "EMP-1001", managerId: "EMP-9000", level: 3 },
    ],
    reports: [
      { id: "HR-RPT-1", name: "Headcount movement", period: "June 2026", status: "Ready" },
    ],
    onboarding: [
      { id: "ONB-1001", employee: "Maya Chen", stage: "IT provisioning", status: "In Progress" },
    ],
    settings: [
      { id: "HR-SET-1", key: "leaveApprovalRequired", enabled: true },
    ],
  },
  employee: {
    profile: [
      { id: "EMP-1001", name: "Anika Rao", email: "user@cloud.com", department: "Finance", title: "Senior Analyst" },
    ],
    attendance: [
      { id: "MY-ATT-1", date: "2026-06-06", status: "Present", checkIn: "09:10", checkOut: "18:05" },
    ],
    leave: [
      { id: "MY-LEV-1", type: "Casual", from: "2026-06-12", to: "2026-06-12", status: "Approved" },
    ],
    payslips: [
      { id: "MAY-2026", month: "May 2026", gross: 8400, deductions: 1120, net: 7280, payDate: "2026-05-31" },
    ],
    invoices: [
      { id: "EMP-INV-1", vendor: "Travel Desk", amount: 840, status: "Assigned" },
    ],
    documents: [
      { id: "DOC-1", name: "Offer Letter", type: "PDF", status: "Available" },
    ],
    notifications: [
      { id: "NOT-1", title: "Payslip available", unread: true, createdAt: now() },
    ],
  },
  payroll: {
    runs: [
      { id: "PAYRUN-JUN-2026", period: "June 2026", employees: 1280, gross: 6240000, status: "Draft" },
    ],
    employees: [
      { id: "EMP-1001", name: "Anika Rao", salary: 8400, taxCode: "IN-OLD", status: "Active" },
    ],
    payslips: [
      { id: "PS-MAY-1001", employeeId: "EMP-1001", month: "May 2026", net: 7280, status: "Generated" },
    ],
    tax: [
      { id: "TAX-1001", employeeId: "EMP-1001", taxableIncome: 96000, projectedTax: 11200 },
    ],
    reports: [
      { id: "PAY-RPT-1", name: "Payroll variance report", period: "June 2026", status: "Ready" },
    ],
    approvals: [
      { id: "APP-1001", runId: "PAYRUN-JUN-2026", approver: "CFO", status: "Pending" },
    ],
    history: [
      { id: "HIS-1001", runId: "PAYRUN-MAY-2026", status: "Completed", completedAt: "2026-05-31" },
    ],
    settings: [
      { id: "PAY-SET-1", key: "approvalWorkflow", enabled: true },
    ],
  },
  scm: {
    inventory: [
      { id: "ERP-BATTERY-X", product: "Industrial Battery Pack", warehouse: "Bengaluru DC", quantity: 20, reorderPoint: 50, status: "Low Stock" },
    ],
    products: [
      { id: "PRD-1001", name: "AI Edge Controller", sku: "ERP-AI-CHIP", category: "Electronics", status: "Active" },
    ],
    vendors: [
      { id: "VEN-1001", name: "VoltEdge Supplies", rating: 4.7, status: "Preferred" },
    ],
    "purchase-orders": [
      { id: "PO-1001", vendor: "VoltEdge Supplies", amount: 48200, status: "Open" },
    ],
    "goods-receipts": [
      { id: "GR-1001", poId: "PO-1001", status: "Pending Inspection", receivedQty: 240 },
    ],
    "stock-transfers": [
      { id: "ST-1001", from: "Bengaluru DC", to: "Singapore Hub", sku: "ERP-AI-CHIP", quantity: 80, status: "In Transit" },
    ],
    warehouses: [
      { id: "WH-BLR", name: "Bengaluru DC", capacity: 82, status: "Operational" },
    ],
    "reorder-alerts": [
      { id: "RO-1001", sku: "ERP-BATTERY-X", quantity: 20, reorderPoint: 50, status: "Open" },
    ],
    reports: [
      { id: "SCM-RPT-1", name: "Inventory health report", status: "Ready" },
    ],
    "audit-logs": [
      { id: "SCM-AUD-1", action: "Auto reorder generated", createdAt: now() },
    ],
  },
  forecast: {
    skus: [
      { id: "SKU-1001", sku: "ERP-BATTERY-X", demand: 420, forecast: 510, accuracy: 91 },
    ],
    products: [
      {
        id: "FPR-1001",
        name: "Industrial Battery Pack",
        category: "Batteries",
        revenueImpact: 125000,
        serviceLevel: 91,
      },
    ],
    predictions: [
      {
        id: "PRED-1001",
        sku: "ERP-BATTERY-X",
        product: "Industrial Battery Pack",
        model: "LSTM",
        period: "July 2026",
        forecastDemand: 510,
        confidence: 91,
        status: "Approved",
      },
    ],
    trends: [
      { id: "TREND-1", label: "APAC demand spike", impact: "High", confidence: 87 },
    ],
    recommendations: [
      { id: "REC-1", action: "Increase safety stock", sku: "ERP-BATTERY-X", priority: "High" },
    ],
    models: [
      { id: "MODEL-LSTM-1", name: "LSTM demand model", accuracy: 92, status: "Healthy" },
    ],
    reports: [
      { id: "FOR-RPT-1", name: "Forecast accuracy report", status: "Ready" },
    ],
    analytics: [
      { id: "ANA-1", metric: "MAPE", value: 8.2, trend: "Improving" },
    ],
    settings: [
      { id: "FOR-SET-1", key: "autoRefresh", enabled: true },
    ],
    "my-products": [
      { id: "MY-FPR-1", name: "Industrial Battery Pack", owner: "Anika Rao", forecast: 510 },
    ],
    "my-reports": [
      { id: "MY-FOR-RPT-1", name: "My demand forecast", status: "Ready" },
    ],
  },
  projects: {
    projects: [
      { id: "proj-1001", name: "Customer Portal Rollout", status: "In progress", progress: 68, budget: 393000 },
      { id: "proj-1002", name: "Warehouse Automation", status: "On track", progress: 52, budget: 280000 },
    ],
    "my-projects": [
      { id: "MY-PROJ-1001", name: "Customer Portal Rollout", role: "Project Manager", progress: 68, status: "In progress" },
      { id: "MY-PROJ-1002", name: "Warehouse Automation", role: "Contributor", progress: 52, status: "On track" },
    ],
    "my-tasks": [
      { id: "TASK-1001", project: "Customer Portal Rollout", title: "Finalize access workflow", assignee: "Anika Rao", status: "In Progress", dueDate: "2026-06-18" },
      { id: "TASK-1002", project: "Warehouse Automation", title: "Validate scanner integration", assignee: "Anika Rao", status: "Todo", dueDate: "2026-06-22" },
    ],
    "my-timesheets": [
      { id: "TIME-1001", project: "Customer Portal Rollout", week: "2026-W24", hours: 38, status: "Submitted" },
      { id: "TIME-1002", project: "Warehouse Automation", week: "2026-W24", hours: 12, status: "Draft" },
    ],
    "my-milestones": [
      { id: "MILE-1001", project: "Customer Portal Rollout", milestone: "Design sign-off", due: "2026-06-15", completed: false },
      { id: "MILE-1002", project: "Warehouse Automation", milestone: "Warehouse pilot", due: "2026-06-20", completed: true },
    ],
    tasks: [
      { id: "TASK-1", projectId: "proj-1001", title: "Design sign-off", status: "In progress", assignee: "Anika Rao" },
    ],
    resources: [
      { id: "RES-1", projectId: "proj-1001", name: "Anika Rao", role: "Project Manager", allocation: 85 },
    ],
    budget: [
      { id: "BUD-1", projectId: "proj-1001", category: "Labor", planned: 185000, actual: 142500 },
    ],
    milestones: [
      { id: "MS-1", projectId: "proj-1001", title: "Design sign-off", due: "2026-06-15", completed: false },
    ],
    risks: [
      { id: "RSK-1", projectId: "proj-1001", title: "Integration testing delay", severity: "High", status: "Open" },
    ],
    reports: [
      { id: "PRJ-RPT-1", projectId: "proj-1001", name: "Executive status report", status: "Ready" },
    ],
    timesheets: [
      { id: "TS-1", projectId: "proj-1001", employee: "Anika Rao", hours: 8, date: "2026-06-06" },
    ],
  },
  analytics: {
    dashboards: [
      { id: "DASH-1", name: "Executive BI dashboard", widgets: 6, status: "Published" },
    ],
    widgets: [
      { id: "WID-1", name: "Revenue trend", type: "Line chart", source: "Finance", status: "Active" },
    ],
    kpis: [
      { id: "KPI-1", label: "Revenue YTD", value: "$48.2M", trend: "+12.4%" },
    ],
    reports: [
      { id: "BI-RPT-1", name: "Executive ERP Performance", status: "Ready" },
    ],
    insights: [
      { id: "INS-1", title: "Margin anomaly detected", confidence: 91, priority: "High" },
    ],
  },
  notifications: {
    inbox: [
      { id: "N-1", title: "Invoice approval reminder", channel: "Email", status: "Delivered", unread: true },
    ],
    channels: [
      { id: "CH-INAPP", channel: "In-App", status: "Active", success: 99 },
      { id: "CH-EMAIL", channel: "Email", status: "Active", success: 98 },
    ],
    templates: [
      { id: "TPL-1", name: "Invoice approval reminder", channel: "Email", status: "Published" },
    ],
    rules: [
      { id: "RULE-1", name: "Invoice overdue > 7 days", enabled: true },
    ],
    webhooks: [
      { id: "WHK-1", name: "SCM Reorder Endpoint", status: "Failing" },
    ],
    analytics: [
      { id: "NOT-ANA-1", metric: "Delivery success", value: "98.7%" },
    ],
    history: [
      { id: "DLV-10092", event: "Invoice reminder", channel: "Email", status: "Delivered" },
    ],
    "retry-queue": [
      { id: "RTY-901", event: "Low-stock reorder alert", attempts: 2, status: "Queued" },
    ],
    settings: [
      { id: "NOT-SET-1", key: "realtimeUpdates", enabled: true },
    ],
  },
  audit: {
    logs: [
      { id: "AUD-98431", actor: "avery@northstar.example", action: "Finance role granted", hash: "9f2c-a81", status: "Verified" },
    ],
    activity: [
      { id: "ACT-1", user: "Avery Stone", activity: "Granted finance manager role", risk: "Medium" },
    ],
    compliance: [
      { id: "SOC2-1", framework: "SOC 2", control: "Access review", coverage: 94, status: "Verified" },
    ],
    gdpr: [
      { id: "GDPR-1021", subject: "anika.rao@northstar.example", request: "Data export", status: "Open" },
    ],
    "tamper-detection": [
      { id: "HASH-1", block: "Finance journal writes", status: "Verified", verifiedAt: now() },
    ],
    reports: [
      { id: "AUD-RPT-1", name: "SOC 2 Evidence Pack", status: "Ready" },
    ],
    "risk-monitoring": [
      { id: "AUD-RISK-1", title: "Privileged access spike", severity: "High", status: "Open" },
    ],
    "data-access": [
      { id: "DA-1", dataset: "Payroll compensation", user: "maya@northstar.example", decision: "Allowed" },
    ],
    "user-activity": [
      { id: "UA-1", user: "Maya Chen", sessions: 6, actions: 311, risk: "High" },
    ],
    settings: [
      { id: "AUD-SET-1", key: "immutableRetention", enabled: true },
    ],
  },
  admin: {
    compliance: [
      { id: "ADM-COMP-1", tenant: "Northstar Manufacturing", score: 93, status: "Compliant" },
    ],
    "audit-reports": [
      { id: "ADM-AUD-RPT-1", name: "Tenant Audit Pack", status: "Ready" },
    ],
    "security-events": [
      { id: "SEC-1", severity: "High", event: "Privileged access spike", status: "Open" },
    ],
  },
};

const globalKey = "__cloudErpApiDb";

function getDb(): ErpDatabase {
  const globalState = globalThis as typeof globalThis & { [globalKey]?: ErpDatabase };
  if (!globalState[globalKey]) {
    globalState[globalKey] = structuredClone(seed);
  }
  return globalState[globalKey]!;
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function listModules() {
  return Object.keys(getDb());
}

export function listResources(module: string) {
  const db = getDb();
  return Object.keys(db[module] ?? {});
}

export function getCollection(module: string, resource: string) {
  const db = getDb();
  return db[module]?.[resource];
}

export function ensureCollection(module: string, resource: string) {
  const db = getDb();
  db[module] ??= {};
  db[module][resource] ??= [];
  return db[module][resource];
}

export function filterRecords(records: ErpRecord[], searchParams: URLSearchParams) {
  const entries = Array.from(searchParams.entries()).filter(([key]) => !["limit", "offset", "q"].includes(key));
  const query = normalize(searchParams.get("q") ?? "");
  let filtered = records;

  if (query) {
    filtered = filtered.filter((record) => normalize(JSON.stringify(record)).includes(query));
  }

  for (const [key, value] of entries) {
    filtered = filtered.filter((record) => normalize(String(record[key] ?? "")) === normalize(value));
  }

  const offset = Number(searchParams.get("offset") ?? 0);
  const limit = Number(searchParams.get("limit") ?? filtered.length);
  return filtered.slice(offset, offset + limit);
}

export function createRecord(
  module: string,
  resource: string,
  payload: Record<string, unknown>
) {
  const collection = ensureCollection(
    module,
    resource
  );

  const id = String(
    payload.id ??
    `${module
      .slice(0, 3)
      .toUpperCase()}-${resource
        .slice(0, 3)
        .toUpperCase()}-${Date.now()}`
  );

  const record: ErpRecord = {
    id,
    ...payload,
    createdAt:
      payload.createdAt ??
      now(),
    updatedAt: now(),
  };

  collection.unshift(record);

  // ==========================
  // FORECAST AUTO SYNC
  // ==========================

  if (
    module === "forecast" &&
    resource === "predictions"
  ) {
    const skuCollection =
      ensureCollection(
        "forecast",
        "skus"
      );

    skuCollection.unshift({
      id: `SKU-${Date.now()}`,
      sku: payload.sku,
      demand:
        payload.forecastDemand,
      forecast:
        payload.forecastDemand,
      accuracy:
        payload.confidence,
      createdAt: now(),
      updatedAt: now(),
    });

    const productCollection =
      ensureCollection(
        "forecast",
        "products"
      );

    productCollection.unshift({
      id: `PRD-${Date.now()}`,
      name: payload.product,
      category:
        "Forecast Product",
      revenueImpact:
        Number(
          payload.forecastDemand
        ) * 100,
      serviceLevel:
        payload.confidence,
      createdAt: now(),
      updatedAt: now(),
    });
  }

  return record;
}

export function updateRecord(module: string, resource: string, id: string, payload: Record<string, unknown>) {
  const collection = getCollection(module, resource);
  if (!collection) return null;
  const index = collection.findIndex((record) => record.id === id);
  if (index === -1) return null;
  collection[index] = { ...collection[index], ...payload, id, updatedAt: now() };
  return collection[index];
}

export function deleteRecord(module: string, resource: string, id: string) {
  const collection = getCollection(module, resource);
  if (!collection) return null;
  const index = collection.findIndex((record) => record.id === id);
  if (index === -1) return null;
  const [deleted] = collection.splice(index, 1);
  return deleted;
}

export function isBlockedModule(module: string) {
  return ["auth", "authentication", "identity"].includes(normalize(module));
}
