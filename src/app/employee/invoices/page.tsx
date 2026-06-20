"use client";

import { useEffect, useState } from "react";
import { ReceiptText } from "lucide-react";
import { FinanceTable } from "@/components/finance/FinanceTable";
import { StatusBadge } from "@/components/finance/StatusBadge";
import { useAuthStore } from "@/store/auth-store";
import jsPDF from "jspdf";

type Invoice = {
  id: string;
  customer: string;
  assignedTo?: string;
  status: string;
  dueDate: string;
  total?: number;
  currency?: string;
};

type ApiResponse = {
  success: boolean;
  data?: {
    data: Invoice[];
  };
  error?: string;
};

export default function EmployeeInvoicesPage() {
  const user = useAuthStore((state) => state.user);

  const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    "all" | "Approved" | "Draft" | "Overdue"
  >("all");
  const [selectedInvoice, setSelectedInvoice] =
    useState<Invoice | null>(null);

  useEffect(() => {
    async function loadInvoices() {
      try {
        setLoading(true);

        const response = await fetch(
          "/api/finance/invoices",
          {
            cache: "no-store",
          }
        );

        const payload: ApiResponse =
          await response.json();

        if (
          response.ok &&
          payload.success
        ) {
          setAllInvoices(
            payload.data?.data ?? []
          );
        } else {
          setError(
            payload.error ??
            "Unable to load invoices."
          );
        }
      } catch (err) {
        console.error(err);
        setError(
          "Unable to load invoices."
        );
      } finally {
        setLoading(false);
      }
    }

    loadInvoices();
  }, []);

  const invoices = allInvoices.filter(
    (invoice) =>
      invoice.assignedTo === user?.name
  );

  const filteredInvoices = invoices.filter(
    (invoice) => {
      const matchesSearch =
        (invoice.id ?? "")
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        (invoice.customer ?? "")
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesFilter =
        filter === "all"
          ? true
          : filter === "Overdue"
            ? new Date(invoice.dueDate) < new Date() &&
            invoice.status !== "Paid"
            : invoice.status === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    }
  );

  const totalInvoices =
    invoices.length;

  const approvedInvoices =
    invoices.filter(
      (invoice) =>
        invoice.status === "Approved"
    ).length;

  const draftInvoices =
    invoices.filter(
      (invoice) =>
        invoice.status === "Draft"
    ).length;

  const overdueInvoices =
    invoices.filter(
      (invoice) =>
        new Date(
          invoice.dueDate
        ) < new Date() &&
        invoice.status !== "Paid"
    ).length;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-slate-700 p-8 text-center">
          Loading invoices...
        </div>
      </div>
    );
  }

  const handleDownloadPDF = () => {
    if (!selectedInvoice) return;

    const doc = new jsPDF();

    const subtotal = selectedInvoice.total ?? 0;
    const tax = Math.round(subtotal * 0.18);
    const grandTotal = subtotal + tax;

    doc.setFontSize(22);
    doc.setTextColor(20, 20, 20);
    doc.text("NORTHSTAR MANUFACTURING", 20, 20);

    doc.setFontSize(11);
    doc.text(
      "Enterprise Resource Planning System",
      20,
      28
    );

    doc.text(
      "Bangalore, Karnataka, India",
      20,
      34
    );

    doc.line(20, 40, 190, 40);

    doc.setFontSize(18);
    doc.text("INVOICE", 20, 55);

    doc.setFontSize(11);

    doc.text(
      `Invoice No: ${selectedInvoice.id}`,
      20,
      70
    );

    doc.text(
      `Invoice Date: ${new Date().toLocaleDateString()}`,
      20,
      78
    );

    doc.text(
      `Due Date: ${selectedInvoice.dueDate}`,
      20,
      86
    );

    doc.line(20, 92, 190, 92);

    doc.setFontSize(13);
    doc.text("Bill To", 20, 105);

    doc.setFontSize(11);
    doc.text(
      selectedInvoice.customer,
      20,
      114
    );

    doc.text(
      "Customer Address",
      20,
      122
    );

    doc.text(
      "Bangalore, India",
      20,
      130
    );

    doc.setFontSize(13);
    doc.text(
      "Assigned Employee",
      120,
      105
    );

    doc.setFontSize(11);
    doc.text(
      selectedInvoice.assignedTo ?? "N/A",
      120,
      114
    );

    doc.text(
      `Status: ${selectedInvoice.status}`,
      120,
      122
    );

    doc.line(20, 140, 190, 140);

    doc.setFontSize(12);

    doc.text("Description", 20, 150);
    doc.text("Qty", 110, 150);
    doc.text("Rate", 140, 150);
    doc.text("Amount", 170, 150);

    doc.line(20, 155, 190, 155);

    doc.text(
      "Cloud ERP License",
      20,
      165
    );

    doc.text("1", 110, 165);

    doc.text(
      `${subtotal.toLocaleString()}`,
      140,
      165
    );

    doc.text(
      `${subtotal.toLocaleString()}`,
      170,
      165
    );

    doc.text(
      "Implementation Support",
      20,
      175
    );

    doc.text("1", 110, 175);

    doc.text("Included", 140, 175);
    doc.text("Included", 170, 175);

    doc.line(20, 185, 190, 185);

    doc.setFontSize(12);

    doc.text(
      `Subtotal: USD ${subtotal.toLocaleString()}`,
      120,
      200
    );

    doc.text(
      `GST (18%): USD ${tax.toLocaleString()}`,
      120,
      210
    );

    doc.setFontSize(14);

    doc.text(
      `Grand Total: USD ${grandTotal.toLocaleString()}`,
      120,
      225
    );

    doc.line(20, 235, 190, 235);

    doc.setFontSize(11);

    doc.text(
      "Payment Terms:",
      20,
      248
    );

    doc.text(
      "Net 30 Days",
      60,
      248
    );

    doc.text(
      "Authorized Signature",
      20,
      270
    );

    doc.text(
      "Finance Department",
      20,
      278
    );

    doc.text(
      "Northstar Manufacturing",
      20,
      286
    );

    doc.save(`${selectedInvoice.id}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <ReceiptText className="h-5 w-5 text-blue-600 dark:text-cyan-300" />
          Assigned Invoices
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Invoices assigned for review
          or operational follow-up.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}

      <div>
        <input
          type="text"
          placeholder="Search by invoice ID or customer..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div
          onClick={() =>
            setFilter("all")
          }
          className="cursor-pointer rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-500"
        >
          <p className="text-sm text-slate-400">
            Total Invoices
          </p>

          <p className="text-3xl font-bold text-white">
            {totalInvoices}
          </p>
        </div>

        <div
          onClick={() =>
            setFilter(
              "Approved"
            )
          }
          className="cursor-pointer rounded-xl border border-green-500/20 bg-green-500/5 p-4 transition hover:border-green-500"
        >
          <p className="text-sm text-slate-400">
            Approved
          </p>

          <p className="text-3xl font-bold text-green-400">
            {approvedInvoices}
          </p>
        </div>

        <div
          onClick={() =>
            setFilter("Draft")
          }
          className="cursor-pointer rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 transition hover:border-yellow-500"
        >
          <p className="text-sm text-slate-400">
            Draft
          </p>

          <p className="text-3xl font-bold text-yellow-400">
            {draftInvoices}
          </p>
        </div>

        <div
          onClick={() =>
            setFilter(
              "Overdue"
            )
          }
          className="cursor-pointer rounded-xl border border-red-500/20 bg-red-500/5 p-4 transition hover:border-red-500"
        >
          <p className="text-sm text-slate-400">
            Overdue
          </p>

          <p className="text-3xl font-bold text-red-400">
            {overdueInvoices}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Showing:{" "}
          {filter === "all"
            ? "All Invoices"
            : filter}
        </h3>

        <span className="text-sm text-slate-400">
          {
            filteredInvoices.length
          }{" "}
          invoice(s)
        </span>
      </div>

      {filteredInvoices.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 p-8 text-center">
          <p className="text-slate-400">
            No invoices found.
          </p>
        </div>
      ) : (
        <FinanceTable
          title="My Invoices"
          description="Finance items assigned to this employee."
          headers={[
            "Invoice",
            "Customer",
            "Status",
            "Due Date",
            "Amount",
            "Actions",
          ]}
          rows={filteredInvoices.map(
            (invoice) => [
              <button
                key={invoice.id}
                onClick={() => setSelectedInvoice(invoice)}
                className="text-cyan-400 hover:text-cyan-300 hover:underline"
              >
                {invoice.id}
              </button>,

              invoice.customer,

              <StatusBadge
                key={`status-${invoice.id}`}
                status={invoice.status}
              />,

              invoice.dueDate,

              `${invoice.currency ?? "USD"} ${(
                invoice.total ?? 0
              ).toLocaleString()}`,

              <button
                key={`view-${invoice.id}`}
                onClick={() =>
                  setSelectedInvoice(invoice)
                }
                className="rounded-lg bg-cyan-500/10 px-3 py-1 text-cyan-400 hover:bg-cyan-500/20"
              >
                View
              </button>,
            ]
          )}
        />
      )}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-slate-950 p-8 shadow-2xl">

            <button
              onClick={() => setSelectedInvoice(null)}
              className="absolute right-5 top-5 text-2xl text-slate-400 hover:text-white"
            >
              ×
            </button>

            <div className="mb-8 border-b border-white/10 pb-6">
              <h2 className="text-3xl font-bold text-white">
                NORTHSTAR MANUFACTURING
              </h2>

              <p className="text-slate-400">
                Enterprise Invoice Report
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <p className="text-xs uppercase text-slate-400">
                  Invoice Number
                </p>

                <p className="text-lg font-semibold text-white">
                  {selectedInvoice.id}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase text-slate-400">
                  Status
                </p>

                <StatusBadge
                  status={selectedInvoice.status}
                />
              </div>

              <div>
                <p className="text-xs uppercase text-slate-400">
                  Customer
                </p>

                <p className="text-white">
                  {selectedInvoice.customer}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase text-slate-400">
                  Assigned Employee
                </p>

                <p className="text-white">
                  {selectedInvoice.assignedTo}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase text-slate-400">
                  Due Date
                </p>

                <p className="text-white">
                  {selectedInvoice.dueDate}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase text-slate-400">
                  Amount
                </p>

                <p className="text-lg font-semibold text-cyan-400">
                  {selectedInvoice.currency ?? "USD"}{" "}
                  {(selectedInvoice.total ?? 0).toLocaleString()}
                </p>
              </div>

            </div>

            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-white">
                Invoice Breakdown
              </h3>

              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-left">
                    <th className="py-3">Description</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th>Amount</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-3">
                      Cloud ERP Subscription
                    </td>

                    <td>1</td>

                    <td>
                      {selectedInvoice.currency ?? "USD"}{" "}
                      {(selectedInvoice.total ?? 0).toLocaleString()}
                    </td>

                    <td>
                      {selectedInvoice.currency ?? "USD"}{" "}
                      {(selectedInvoice.total ?? 0).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex justify-end">
              <div className="w-80 rounded-xl border border-white/10 bg-white/[0.03] p-5">

                <div className="flex justify-between">
                  <span>Subtotal</span>

                  <span>
                    {selectedInvoice.currency ?? "USD"}{" "}
                    {(selectedInvoice.total ?? 0).toLocaleString()}
                  </span>
                </div>

                <div className="mt-2 flex justify-between">
                  <span>Tax</span>
                  <span>0</span>
                </div>

                <div className="mt-4 flex justify-between border-t border-white/10 pt-4 text-lg font-bold">
                  <span>Total</span>

                  <span className="text-cyan-400">
                    {selectedInvoice.currency ?? "USD"}{" "}
                    {(selectedInvoice.total ?? 0).toLocaleString()}
                  </span>
                </div>

              </div>
            </div>

            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-slate-950 p-8 shadow-2xl">

              <button
                onClick={() => setSelectedInvoice(null)}
                className="rounded-lg border border-white/10 px-5 py-2 text-white"
              >
                Close
              </button>

              <button
                onClick={handleDownloadPDF}
                className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 text-white"
              >
                Download PDF
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}