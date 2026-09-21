"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { format } from "date-fns";
import { toast } from "sonner";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { useCreateSchedule } from "@/hooks";
import {
  scheduleSchema,
  MINIMUM_SLOT_MINUTE,
  MAXIMUM_SLOT_MINUTE,
  slotMinutes,
} from "@/validation";

interface Props {
  onSuccess?: () => void;
}

const TIME_STEP_MINUTES = 10;

const TIME_OPTIONS = Array.from(
  { length: (24 * 60) / TIME_STEP_MINUTES },
  (_, i) => {
    const totalMinutes = i * TIME_STEP_MINUTES;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const value = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    const label = format(new Date(2000, 0, 1, hours, minutes), "h:mm a");
    return { value, label };
  },
);

function TimePicker({
  value,
  onChange,
  onBlur,
  options,
  placeholder = "Select time",
  id,
}: {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  id?: string;
}) {
  const [open, setOpen] = useState(false);
  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) onBlur?.();
      }}
    >
      <PopoverTrigger
        render={<Button variant="outline" type="button" id={id} />}
      >
        <span className={selectedLabel ? "" : "text-muted-foreground"}>
          {selectedLabel ?? placeholder}
        </span>
      </PopoverTrigger>
      <PopoverContent className="p-1 w-40">
        <div className="max-h-64 overflow-y-auto flex flex-col gap-0.5">
          {options.length === 0 && (
            <p className="text-sm text-muted-foreground px-2 py-1.5">
              No times available
            </p>
          )}
          {options.map((opt) => (
            <Button
              key={opt.value}
              type="button"
              variant={opt.value === value ? "secondary" : "ghost"}
              className="justify-start h-8"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
                onBlur?.();
              }}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function CreateScheduleForm({ onSuccess }: Props) {
  const { mutate: create, isPending } = useCreateSchedule();

  const form = useForm({
    defaultValues: {
      date: "",
      startTime: "",
      endTime: "",
      meetingLink: "https://meet.google.com/aiu-ctor-moh",
    },
    validators: {
      onSubmit: scheduleSchema,
    },
    onSubmit: ({ value }) => {
      const scheduleValue = {
        startDateTime: new Date(
          `${value.date}T${value.startTime}`,
        ).toISOString(),
        endDateTime: new Date(`${value.date}T${value.endTime}`).toISOString(),
        meetingLink: value.meetingLink,
      };

      create(scheduleValue, {
        onSuccess: () => {
          toast.success("Schedule created successfully");
          form.reset();
          onSuccess?.();
        },
        onError: (error) => {
          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to create schedule",
          );
        },
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name="date">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            const selected = field.state.value
              ? new Date(`${field.state.value}T00:00:00`)
              : undefined;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Date</FieldLabel>
                <Popover>
                  <PopoverTrigger
                    render={<Button variant="outline" type="button" />}
                  >
                    {selected ? format(selected, "PPP") : "Select date"}
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={selected}
                      disabled={{ before: new Date() }}
                      onSelect={(date) => {
                        if (date) {
                          field.handleChange(format(date, "yyyy-MM-dd"));
                          field.handleBlur();
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <div className="grid grid-cols-2 gap-3">
          <form.Field name="startTime">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Start Time</FieldLabel>
                  <TimePicker
                    id={field.name}
                    value={field.state.value}
                    options={TIME_OPTIONS}
                    onBlur={field.handleBlur}
                    onChange={(next) => {
                      field.handleChange(next);
                      const currentEnd = form.state.values.endTime;
                      if (currentEnd) {
                        const mins = slotMinutes(next, currentEnd);
                        if (
                          mins < MINIMUM_SLOT_MINUTE ||
                          mins > MAXIMUM_SLOT_MINUTE
                        ) {
                          form.setFieldValue("endTime", "");
                        }
                      }
                    }}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Subscribe selector={(state) => [state.values.startTime]}>
            {([startTime]) => (
              <form.Field name="endTime">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  const endOptions = startTime
                    ? TIME_OPTIONS.filter((t) => {
                        const mins = slotMinutes(startTime, t.value);
                        return (
                          mins >= MINIMUM_SLOT_MINUTE &&
                          mins <= MAXIMUM_SLOT_MINUTE
                        );
                      })
                    : TIME_OPTIONS;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>End Time</FieldLabel>
                      <TimePicker
                        id={field.name}
                        value={field.state.value}
                        options={endOptions}
                        placeholder={
                          startTime ? "Select time" : "Select start time first"
                        }
                        onBlur={field.handleBlur}
                        onChange={field.handleChange}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            )}
          </form.Subscribe>
        </div>

        <form.Field name="meetingLink">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Meeting Link</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  autoComplete="off"
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Subscribe selector={(state) => [state.canSubmit]}>
          {([canSubmit]) => (
            <Button type="submit" disabled={!canSubmit || isPending}>
              {isPending ? "Creating..." : "Create Schedule"}
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
}
