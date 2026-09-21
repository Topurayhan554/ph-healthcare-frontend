"use client";

import { useState } from "react";
import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  useSuspenseMySchedules,
  usePublishSchedule,
} from "@/hooks/schedule.hook";
import { Schedule, ScheduleParams } from "@/types";
import ScheduleCreateDialog from "./schedule-create-dialog";
import ScheduleDetailSheet from "./schedule-details-sheet";

interface Props extends ScheduleParams {}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function ScheduleTable(params: Props) {
  const { data } = useSuspenseMySchedules(params);
  const schedules: Schedule[] = data?.data ?? [];

  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null,
  );
  const [scheduleToPublish, setScheduleToPublish] = useState<Schedule | null>(
    null,
  );

  const {
    mutate: publish,
    isPending: isPublishing,
    variables,
  } = usePublishSchedule();

  function handlePublish(id: string) {
    publish(id, {
      onSuccess: () => {
        toast.success("Schedule published");
        setSelectedSchedule((prev) =>
          prev && prev.id === id ? { ...prev, status: "PUBLISHED" } : prev,
        );
        setScheduleToPublish(null);
      },
      onError: (error) => {
        toast.error(
          error instanceof Error ? error.message : "Failed to publish",
        );
      },
    });
  }

  if (schedules.length === 0) {
    return (
      <div className="relative flex flex-col items-center gap-4 overflow-hidden rounded-lg border border-dashed p-16 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.muted.DEFAULT)_0%,transparent_70%)] opacity-60" />
        <div className="relative flex size-20 animate-in items-center justify-center rounded-full bg-muted zoom-in-50 duration-500">
          <CalendarPlus
            className="size-9 text-muted-foreground"
            strokeWidth={1.5}
          />
        </div>
        <div className="relative space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <h3 className="text-lg font-semibold">No schedules yet</h3>
          <p className="mx-auto max-w-sm text-sm text-muted-foreground">
            Create your first schedule to start accepting appointments from
            patients.
          </p>
        </div>
        <div className="relative animate-in fade-in slide-in-from-bottom-2 duration-700">
          <ScheduleCreateDialog />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date & Time</TableHead>
              <TableHead>Slots</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell>
                  <div className="font-medium">
                    {formatDateTime(schedule.startDateTime)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    to {formatDateTime(schedule.endDateTime)}
                  </div>
                </TableCell>
                <TableCell>
                  {schedule.totalSlots - schedule.availableSlots}/
                  {schedule.totalSlots} booked
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      schedule.status === "PUBLISHED" ? "default" : "outline"
                    }
                    className={
                      schedule.status === "PUBLISHED"
                        ? "bg-green-600 hover:bg-green-600"
                        : "text-amber-600 border-amber-600"
                    }
                  >
                    {schedule.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  {schedule.status === "DRAFT" && (
                    <Button
                      size="sm"
                      onClick={() => setScheduleToPublish(schedule)}
                      disabled={isPublishing && variables === schedule.id}
                    >
                      {isPublishing && variables === schedule.id
                        ? "Publishing..."
                        : "Publish"}
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedSchedule(schedule)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedSchedule && (
        <ScheduleDetailSheet
          schedule={selectedSchedule}
          open={!!selectedSchedule}
          onClose={() => setSelectedSchedule(null)}
          onPublish={() => setScheduleToPublish(selectedSchedule)}
          isPublishing={isPublishing && variables === selectedSchedule.id}
        />
      )}

      <AlertDialog
        open={!!scheduleToPublish}
        onOpenChange={(next) => !next && setScheduleToPublish(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Publish this schedule?</AlertDialogTitle>
            <AlertDialogDescription>
              {scheduleToPublish && (
                <>
                  Once published, patients will be able to see and book slots
                  for{" "}
                  <span className="font-medium text-foreground">
                    {formatDateTime(scheduleToPublish.startDateTime)}
                  </span>
                  . You can't turn it back into a draft afterwards.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPublishing}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isPublishing}
              onClick={(e) => {
                e.preventDefault();
                if (scheduleToPublish) handlePublish(scheduleToPublish.id);
              }}
            >
              {isPublishing ? "Publishing..." : "Yes, publish"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
