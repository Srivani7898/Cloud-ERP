"use client";

import { ReceiptText } from "lucide-react";
import { FinanceTable } from "@/components/finance/FinanceTable";
import { StatusBadge } from "@/components/finance/StatusBadge";
import { useFinanceStore } from "@/store/finance-store";
import { formatMoney } from "@/utils/finance";

export default function EmployeeInvoicesPage() {
  const allInvoices = useFinanceStore((state) => state.invoices);
  const invoices = allInvoices.slice(0, 4);
  return (
    <div className="space-y-6">
      <div><h2 className="flex items-center gap-2 text-2xl font-semibold"><ReceiptText className="h-5 w-5 text-blue-600 dark:text-cyan-300" />Assigned invoices</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Invoices assigned for review or operational follow-up.</p></div>
      <FinanceTable title="My invoices" description="Finance items visible to this employee." headers={["Invoice", "Customer", "Status", "Due Date", "Total"]} rows={invoices.map((invoice) => [invoice.id, invoice.customer, <StatusBadge key="status" status={invoice.status} />, invoice.dueDate, formatMoney(invoice.total)])} />
    </div>
  );
}
