import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSuspenseGetAllDoctors } from "@/hooks";
import { DoctorParams } from "@/types";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import TablePagination from "@/components/ui/table-pagination";
import { UserSearchIcon } from "lucide-react";

interface Props extends DoctorParams {
  handleReview: Dispatch<SetStateAction<string>>;
  page: number;
  onPageChange: Dispatch<SetStateAction<number>>;
  onClearFilters?: () => void;
}

export default function DoctorApprovalTable({
  handleReview,
  page,
  onPageChange,
  onClearFilters,
  ...params
}: Props) {
  const { data } = useSuspenseGetAllDoctors({ page, ...params });

  const doctors = data?.data ?? [];
  const limit = params.limit ?? 10;
  const totalPages = Math.ceil((data?.meta?.total ?? 0) / limit);

  const hasActiveFilters = Boolean(
    params.searchTerm ||
    (params.verificationStatus && params.verificationStatus !== undefined),
  );

  if (doctors.length === 0) {
    return (
      <div className="border rounded-lg flex flex-col items-center justify-center gap-3 py-16 px-6 text-center">
        <div className="rounded-full bg-muted p-3">
          <UserSearchIcon className="size-6 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">No doctors found</p>
          <p className="text-sm text-muted-foreground">
            {hasActiveFilters
              ? "Try adjusting your search or filter to find what you're looking for."
              : "There are no doctors to display right now."}
          </p>
        </div>
        {hasActiveFilters && onClearFilters && (
          <Button variant="outline" size="sm" onClick={onClearFilters}>
            Clear filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>License No.</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact No.</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell className="font-medium">{doctor.name}</TableCell>
                <TableCell>{doctor.licenseNumber}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>{doctor.contactNumber || "-"}</TableCell>
                <TableCell>{doctor.specialization}</TableCell>
                <TableCell className="text-right">
                  {doctor.user.emailVerified ? (
                    <Button
                      variant="outline"
                      onClick={() => handleReview(doctor.id)}
                      disabled={doctor.verificationStatus !== "PENDING"}
                    >
                      Review
                    </Button>
                  ) : (
                    <Button disabled variant="outline">
                      Not Verified
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center py-4">
        <TablePagination
          totalPages={totalPages}
          page={page}
          handlePageChange={onPageChange}
        />
      </div>
    </>
  );
}
