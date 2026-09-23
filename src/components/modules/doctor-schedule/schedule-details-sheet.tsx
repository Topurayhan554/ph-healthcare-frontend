"use client";

import { ExternalLink, Video } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
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

  return (
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
              {new Date(schedule.startDateTime).toLocaleTimeString(undefined, {
                timeStyle: "short",
              })}
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
          <Button
            type="button"
            variant="outline"
            className="w-full justify-start"
            nativeButton={false}
            render={
              <a href={schedule.meetingLink} target="_blank" rel="noreferrer">
                <Video className="size-4" />
                Join meeting
                <ExternalLink className="ml-auto size-3.5 text-muted-foreground" />
              </a>
            }
          ></Button>
          {expired && (
            <p className="mt-1.5 text-xs text-muted-foreground">
              This schedule has ended, but the link is still active.
            </p>
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
  );
}
