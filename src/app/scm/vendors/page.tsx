"use client";

import Link from "next/link";
import { Plus, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScmStatusBadge } from "@/components/scm/ScmStatusBadge";
import { ScmTable } from "@/components/scm/ScmTable";
import { useScmStore } from "@/store/scm-store";

export default function VendorsPage() {
  const vendors = useScmStore(
    (state) => state.vendors
  );

  const updateVendorStatus =
    useScmStore(
      (state) => state.updateVendorStatus
    );

  const getNextStatus = (
    currentStatus: string
  ) => {
    switch (currentStatus) {
      case "active":
        return "pending";

      case "pending":
        return "suspended";

      case "suspended":
        return "inactive";

      default:
        return "active";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">
            Vendor Management
          </h2>

          <p className="text-sm text-slate-500">
            Suppliers, contacts, ratings,
            and notification readiness.
          </p>
        </div>

        <Button asChild>
          <Link href="/scm/vendors/create">
            <Plus className="h-4 w-4" />
            Create Vendor
          </Link>
        </Button>
      </div>

      <ScmTable
        title="Vendors"
        description="Supplier master records."
        headers={[
          "Vendor",
          "Contact",
          "Email",
          "Region",
          "Rating",
          "Status",
          "Actions",
        ]}
        rows={vendors.map((vendor) => [
          <span
            key={`${vendor.id}-name`}
            className="whitespace-nowrap"
          >
            {vendor.name}
          </span>,

          <span
            key={`${vendor.id}-contact`}
            className="whitespace-nowrap"
          >
            {vendor.contact}
          </span>,

          <span
            key={`${vendor.id}-email`}
            className="whitespace-nowrap"
          >
            {vendor.email}
          </span>,

          <span
            key={`${vendor.id}-region`}
            className="whitespace-nowrap"
          >
            {vendor.region}
          </span>,

          <span
            key={`${vendor.id}-rating`}
            className="whitespace-nowrap"
          >
            {vendor.rating}/100
          </span>,

          <ScmStatusBadge
            key={`${vendor.id}-status`}
            status={vendor.status}
          />,

          <Button
            key={`${vendor.id}-action`}
            size="sm"
            variant="outline"
            onClick={() =>
              updateVendorStatus(
                vendor.id,
                getNextStatus(
                  vendor.status
                ) as typeof vendor.status
              )
            }
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Change Status
          </Button>,
        ])}
      />
    </div>
  );
}