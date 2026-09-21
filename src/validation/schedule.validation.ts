import z from "zod";

export const scheduleSchema = z.object({
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  meetingLink: z.string().trim().min(1, "Meeting link is required"),
});
