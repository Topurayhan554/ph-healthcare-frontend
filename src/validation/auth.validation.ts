import z from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(8, "Password must be at least 8 characters long."),
});
export const signupSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required."),
    email: z.email("Please enter a valid email address."),
    phoneNumber: z
      .string()
      .min(1, "Phone number is required.")
      .regex(/^\+?[0-9]{10,15}$/, "Please enter a valid phone number."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .superRefine((value, ctx) => {
        if (!/[a-z]/.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password must contain at least 1 lowercase letter.",
          });
          return;
        }
        if (!/[A-Z]/.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password must contain at least 1 uppercase letter.",
          });
          return;
        }
        if (!/[0-9]/.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password must contain at least 1 number.",
          });
          return;
        }
        if (!/[^A-Za-z0-9]/.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password must contain at least 1 special character.",
          });
          return;
        }
      }),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match.",
        path: ["confirmPassword"],
      });
    }
  });
