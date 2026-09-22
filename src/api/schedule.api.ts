import apiClient from "@/lib/apiClient";
import { ApiResponse } from "@/types";
import {
  CreateSchedulePayload,
  Schedule,
  ScheduleParams,
} from "@/types/schedule.type";

export function createSchedule(payload: CreateSchedulePayload) {
  return apiClient<ApiResponse<Schedule>>("/schedule/create-schedule", {
    method: "POST",
    body: payload,
  });
}

export function getMySchedules(params: ScheduleParams) {
  return apiClient<ApiResponse<Schedule[]>>("/schedule/my-schedules", {
    params,
  });
}

export function publishSchedule(id: string) {
  return apiClient<ApiResponse<Schedule>>(`/schedule/publish-schedule/${id}`, {
    method: "PATCH",
  });
}

export function deleteSchedule(id: string) {
  return apiClient<ApiResponse<null>>(`/schedule/${id}`, {
    method: "DELETE",
  });
}
