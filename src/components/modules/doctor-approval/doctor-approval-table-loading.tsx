import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DoctorReviewSheet from "./doctor-review-sheet";
import { Skeleton } from "@/components/ui/skeleton";

export default function DoctorApprovalTableLoading() {
  return (
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
          {[1, 2, 3].map((doctor) => (
            <TableRow key={doctor}>
              <TableCell colSpan={6}>
                <Skeleton className="h-5 w-20" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
