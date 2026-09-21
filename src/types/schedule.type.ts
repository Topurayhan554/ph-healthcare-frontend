export type ScheduleStatus = "DRAFT" | "PUBLISHED";

export interface Schedule {
  id: string;
  startDateTime: string;
  endDateTime: string;
  totalSlots: number;
  availableSlots: number;
  status: ScheduleStatus;
  meetingLink: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScheduleParams {
  page?: number;
  limit?: number;
  sortBy?: "startDateTime" | "endDateTime" | "createdAt";
  sortOrder?: "asc" | "desc";
  status?: ScheduleStatus;
}

export interface CreateSchedulePayload {
  startDateTime: string;
  endDateTime: string;
  totalSlots: number;
}
