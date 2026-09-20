"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorApprovalTable from "./doctor-approval-table";
import { Suspense, useState } from "react";
import DoctorApprovalTableLoading from "./doctor-approval-table-loading";
import { DoctorParams, DoctorVerificationStatus } from "@/types";
import { Input } from "@/components/ui/input";
import DoctorReviewSheet from "./doctor-review-sheet";
import useDebounce from "@/hooks/debounce.hook";

const VERIFICATION_STATUS_TABS: ["ALL" | DoctorVerificationStatus, string][] = [
  ["APPROVED", "Approved"],
  ["PENDING", "Pending"],
  ["REJECTED", "Rejected"],
  ["ALL", "All"],
];

const DEFAULT_LIMIT = 10;

export default function DoctorApprovalTabs() {
  const [tab, setTab] = useState<"ALL" | DoctorVerificationStatus>("ALL");
  const [selectedId, setSelectedId] = useState("");
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  const debouncedSearch = useDebounce(searchInput);

  const queryParams: DoctorParams = {
    page,
    limit: DEFAULT_LIMIT,
    ...(tab === "ALL" ? {} : { verificationStatus: tab }),
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };

  const handleTabChange = (value: "ALL" | DoctorVerificationStatus) => {
    setTab(value);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setPage(1);
  };

  const handleClearFilters = () => {
    setTab("ALL");
    setSearchInput("");
    setPage(1);
  };

  return (
    <>
      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <Input
          value={searchInput}
          onChange={(e) => handleSearchChange(e.target.value)}
          type="search"
          placeholder="Search by name or email"
          className="sm:max-w-xs"
        />
        <Tabs value={tab} onValueChange={handleTabChange}>
          <TabsList>
            {VERIFICATION_STATUS_TABS.map(([value, label]) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <Suspense fallback={<DoctorApprovalTableLoading />}>
        <DoctorApprovalTable
          {...queryParams}
          page={page}
          onPageChange={setPage}
          handleReview={setSelectedId}
          onClearFilters={handleClearFilters}
        />
      </Suspense>

      <DoctorReviewSheet
        selectedId={selectedId}
        onClose={() => setSelectedId("")}
      />
    </>
  );
}
