import z from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(8, "Password must be at least 8 characters long."),
});

export const signupSchema = z.object({
  fullName: z.string().min(1, "Full name is required."),
  email: z.email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .superRefine((value, ctx) => {
      if (!/[a-z]/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain at least 1 lowercase letter.",
        });
      }
      if (!/[A-Z]/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain at least 1 uppercase letter.",
        });
      }
      if (!/[0-9]/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain at least 1 number.",
        });
      }
      if (!/[^A-Za-z0-9]/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain at least 1 special character.",
        });
      }
    }),
});
