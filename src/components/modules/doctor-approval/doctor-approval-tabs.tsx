"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorApprovalTable from "./doctor-approval-table";
import { Suspense } from "react";
import DoctorApprovalTableLoading from "./doctor-approval-table-loading";

export default function DoctorApprovalTabs() {
  return (
    <>
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
      </Tabs>

      <Suspense fallback={<DoctorApprovalTableLoading />}>
        <DoctorApprovalTable />
      </Suspense>
    </>
  );
}
