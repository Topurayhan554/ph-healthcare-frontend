import { applyAsDoctor, getAllDoctors, verifyDoctorAccount } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useApplyAsDoctor() {
  return useMutation({
    mutationFn: applyAsDoctor,
  });
}

export function useVerifyDoctorAccount() {
  return useMutation({
    mutationFn: verifyDoctorAccount,
  });
}

export function useGetAllDoctors() {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: getAllDoctors,
  });
}
