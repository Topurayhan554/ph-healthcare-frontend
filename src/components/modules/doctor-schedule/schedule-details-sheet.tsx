"use client";

import { useState } from "react";
import { AlertCircle, ExternalLink, Video } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Schedule } from "@/types";

interface Props {
  schedule: Schedule;
  open: boolean;
  onClose: () => void;
  onPublish?: (id: string) => void;
  onDelete?: (id: string) => void;
  isPublishing?: boolean;
  isDeleting?: boolean;
}

function isExpired(endDateTime: string) {
  return new Date(endDateTime).getTime() < Date.now();
}

export default function ScheduleDetailSheet({
  schedule,
  open,
  onClose,
  onPublish,
  onDelete,
  isPublishing,
  isDeleting,
}: Props) {
  const expired = isExpired(schedule.endDateTime);
  const [showExpiredDialog, setShowExpiredDialog] = useState(false);

  return (
    <>
      <Sheet open={open} onOpenChange={(next) => !next && onClose()}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Schedule details</SheetTitle>
            <SheetDescription>
              {new Date(schedule.startDateTime).toLocaleDateString(undefined, {
                dateStyle: "full",
              })}
            </SheetDescription>
          </SheetHeader>
          <dl className="mt-4 flex flex-col gap-3 px-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Start</dt>
              <dd>
                {new Date(schedule.startDateTime).toLocaleTimeString(
                  undefined,
                  {
                    timeStyle: "short",
                  },
                )}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">End</dt>
              <dd>
                {new Date(schedule.endDateTime).toLocaleTimeString(undefined, {
                  timeStyle: "short",
                })}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Status</dt>
              <dd>{schedule.status}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Slots</dt>
              <dd>
                {schedule.totalSlots - schedule.availableSlots}/
                {schedule.totalSlots} booked
              </dd>
            </div>
          </dl>

          <div className="mt-4 px-4">
            <p className="mb-1.5 text-sm text-muted-foreground">Meeting link</p>
            {expired ? (
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start text-muted-foreground"
                onClick={() => setShowExpiredDialog(true)}
              >
                <Video className="size-4" />
                Join meeting
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start"
                render={
                  <a
                    href={schedule.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Video className="size-4" />
                    Join meeting
                    <ExternalLink className="ml-auto size-3.5 text-muted-foreground" />
                  </a>
                }
              ></Button>
            )}
          </div>

          <SheetFooter className="gap-2">
            {schedule.status === "DRAFT" && !expired && onPublish && (
              <Button
                className="w-full"
                onClick={() => onPublish(schedule.id)}
                disabled={isPublishing}
              >
                {isPublishing ? "Publishing..." : "Publish Schedule"}
              </Button>
            )}
            {onDelete && (
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => onDelete(schedule.id)}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete Schedule"}
              </Button>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <AlertDialog open={showExpiredDialog} onOpenChange={setShowExpiredDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="size-5 text-destructive" />
            </div>
            <AlertDialogTitle>This meeting has ended</AlertDialogTitle>
            <AlertDialogDescription>
              This schedule ended on{" "}
              <span className="font-medium text-foreground">
                {new Date(schedule.endDateTime).toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
              . The meeting link is no longer accessible for expired schedules.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowExpiredDialog(false)}>
              Okay
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
