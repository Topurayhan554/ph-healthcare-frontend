import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useApproveDoctor, useGetAllDoctors } from "@/hooks";
import { ApproveDoctorPayload, DoctorParams } from "@/types";
import { useState } from "react";

interface Props extends DoctorParams {
  seletedId: string;
  onClose: () => void;
}

export default function DoctorReviewSheet({
  selectedId,
  onClose,
  ...params
}: Props) {
  const [confirmRejection, setConfirmRejection] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const { data } = useGetAllDoctors(params);
  const selectedDoctor = data?.data?.find((doctor) => doctor.id === selectedId);

  const { mutate: verify, isPending } = useApproveDoctor();

  const handleClose = () => {
    setConfirmRejection(false);
    setRejectionReason("");
    onClose();
  };

  const handleReviewAction = (status: "APPROVED" | "REJECTED") => {
    const reviewData: ApproveDoctorPayload = {
      doctorId: selectedId,
      verificationStatus: status,
      rejectionReason: rejectionReason,
    };
    // console.log("revew->", reviewData);

    verify(reviewData, {
      onSuccess: (res) => {
        handleClose();
      },
      onError: () => {
        console.log("Error");
      },
    });
  };

  return (
    <Sheet open={!!selectedId} onOpenChange={handleClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Review and take action</SheetTitle>
          <SheetDescription>This action cannot be undone.</SheetDescription>
        </SheetHeader>
        Doctor Name: {selectedDoctor?.name}
        <SheetFooter>
          {confirmRejection ? (
            <div className="flex flex-col gap-3">
              <Textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  size="lg"
                  onClick={handleClose}
                  variant={"outline"}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  size="lg"
                  onClick={() => handleReviewAction("REJECTED")}
                  variant={"destructive"}
                  disabled={!rejectionReason}
                >
                  Confirm Rejection
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setConfirmRejection(true)}
                variant={"destructive"}
                size="lg"
                className="flex-1"
              >
                Reject
              </Button>
              <Button
                onClick={() => handleReviewAction("APPROVED")}
                variant={"default"}
                size="lg"
                className="flex-1"
              >
                Approve
              </Button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
