"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScmStatusBadge } from "@/components/scm/ScmStatusBadge";
import { ScmTable } from "@/components/scm/ScmTable";
import { useScmStore } from "@/store/scm-store";

export default function VendorsPage() {
  const vendors = useScmStore((state) => state.vendors);
  return <div className="space-y-6"><div className="flex items-center justify-between"><div><h2 className="text-2xl font-semibold">Vendor management</h2><p className="text-sm text-slate-500">Suppliers, contacts, ratings, and notification readiness.</p></div><Button asChild><Link href="/scm/vendors/create"><Plus className="h-4 w-4" />Create vendor</Link></Button></div><ScmTable title="Vendors" description="Supplier master records." headers={["Vendor", "Contact", "Email", "Region", "Rating", "Status"]} rows={vendors.map((vendor) => [vendor.name, vendor.contact, vendor.email, vendor.region, `${vendor.rating}/100`, <ScmStatusBadge key="status" status={vendor.status} />])} /></div>;
}
