"use client";

import { jsPDF } from "jspdf";
import {
  FileDown,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { ScmStatusBadge } from "@/components/scm/ScmStatusBadge";
import { ScmTable } from "@/components/scm/ScmTable";
import { useScmStore } from "@/store/scm-store";

export default function GoodsReceiptsPage() {
  const receipts = useScmStore(
    (state) => state.goodsReceipts
  );

  const purchaseOrders = useScmStore(
    (state) => state.purchaseOrders
  );

  const inventory = useScmStore(
    (state) => state.inventory
  );

  const updateReceiptStatus = useScmStore(
    (state) => state.updateReceiptStatus
  );

  const downloadReport = (
    receipt: (typeof receipts)[number]
  ) => {
    const po = purchaseOrders.find(
      (item) => item.id === receipt.poId
    );

    const inventoryItem = inventory.find(
      (item) => item.sku === po?.sku
    );

    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text(
      "GOODS RECEIPT REPORT",
      20,
      20
    );

    pdf.setFontSize(11);

    pdf.text(
      `Receipt ID: ${receipt.id}`,
      20,
      40
    );

    pdf.text(
      `PO Number: ${receipt.poId}`,
      20,
      50
    );

    pdf.text(
      `Warehouse: ${receipt.warehouse}`,
      20,
      60
    );

    pdf.text(
      `Receipt Date: ${receipt.receivedAt}`,
      20,
      70
    );

    pdf.text(
      `Status: ${receipt.status}`,
      20,
      80
    );

    pdf.text(
      `Vendor: ${po?.vendor ?? "N/A"}`,
      20,
      100
    );

    pdf.text(
      `SKU: ${po?.sku ?? "N/A"}`,
      20,
      110
    );

    pdf.text(
      `Ordered Qty: ${po?.quantity ?? 0}`,
      20,
      120
    );

    pdf.text(
      `Received Qty: ${receipt.receivedQty}`,
      20,
      130
    );

    pdf.text(
      `Product: ${inventoryItem?.productName ?? "N/A"
      }`,
      20,
      150
    );

    pdf.text(
      `Current Stock: ${inventoryItem?.quantity ?? 0
      }`,
      20,
      160
    );

    pdf.text(
      `Reorder Point: ${inventoryItem?.reorderPoint ?? 0
      }`,
      20,
      170
    );

    pdf.text(
      `QC Status: ${receipt.status}`,
      20,
      190
    );

    pdf.text(
      "Inspector: SCM Quality Team",
      20,
      200
    );

    pdf.text(
      `Generated: ${new Date().toLocaleString()}`,
      20,
      220
    );

    pdf.save(
      `${receipt.id}-report.pdf`
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">
          Goods Receipts
        </h2>

        <p className="text-sm text-slate-500">
          Inbound receipt records and
          quality control status.
        </p>
      </div>

      <ScmTable
        title="Goods Receipts"
        description="Warehouse goods receipt activity."
        headers={[
          "Receipt",
          "PO",
          "Warehouse",
          "Qty",
          "Received",
          "Status",
          "Actions",
        ]}
        rows={receipts.map(
          (receipt) => [
            receipt.id,
            receipt.poId,
            receipt.warehouse,
            receipt.receivedQty,
            receipt.receivedAt,

            <ScmStatusBadge
              key={`${receipt.id}-status`}
              status={receipt.status}
            />,

            <div
              key={`${receipt.id}-actions`}
              className="flex items-center justify-center gap-2"
            >
              {receipt.status ===
                "pending_qc" && (
                  <>
                    <button
                      onClick={() =>
                        updateReceiptStatus(
                          receipt.id,
                          "accepted"
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-500"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        updateReceiptStatus(
                          receipt.id,
                          "rejected"
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-500"
                    >
                      <XCircle className="h-4 w-4" />
                      Reject
                    </button>
                  </>
                )}

              <button
                onClick={() =>
                  downloadReport(receipt)
                }
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
              >
                <FileDown className="h-4 w-4" />
                PDF Report
              </button>
            </div>,
          ]
        )}
      />
    </div>
  );
}