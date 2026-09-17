import { z } from "zod";

export const applyAsDoctorSchema = z.object({
  user: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),

    email: z.email("Not email!!"),
  }),

  doctor: z.object({
    address: z.string().optional(),

    specialization: z.string().min(2, "Specialization is required"),

    licenseNumber: z.string().min(1, "License number is required"),

    qualifications: z.string().min(1, "Qualifications are required"),

    experienceYears: z.coerce
      .number({ error: "Enter a valid number" })
      .min(0, "Experience can't be negative")
      .max(70, "Enter a valid number of years"),

    bio: z.string().optional(),

    consultationFee: z.coerce
      .number({ error: "Enter a valid number" })
      .min(0, "Fee can't be negative")
      .optional(),

    contactNumber: z
      .string()
      .regex(/^[0-9+\-\s()]{7,20}$/, "Enter a valid contact number")
      .optional()
      .or(z.literal("")),
  }),
});

export type ApplyAsDoctorFormValues = z.infer<typeof applyAsDoctorSchema>;

export const MAX_FILE_SIZE = 5;

export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE * 1024 * 1024;

export const MAX_ADDITIONAL_FILES = 5;

export const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
];

export function isAcceptedFileSize(fileSize: number) {
  return fileSize <= MAX_FILE_SIZE_BYTES;
}

export function isAcceptedFileType(fileType: string) {
  return ACCEPTED_FILE_TYPES.includes(fileType);
}
