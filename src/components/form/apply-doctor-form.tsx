"use client";

import { useForm } from "@tanstack/react-form";
import {
  BadgeCheck,
  Banknote,
  BriefcaseMedical,
  FileText,
  FileUp,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Plus,
  Stethoscope,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  applyAsDoctorSchema,
  isAcceptedFileSize,
  isAcceptedFileType,
  MAX_ADDITIONAL_FILES,
  MAX_FILE_SIZE,
} from "@/validation";
import { DoctorApplicationData } from "@/types";
import { useApplyAsDoctor } from "@/hooks";
import { formatFileSize } from "@/utils";

const labelClass = "text-[13px] font-medium text-white/90";
const subLabelClass = "font-normal text-white/50";
const iconClass =
  "pointer-events-none absolute left-0 top-1/2 size-4 -translate-y-1/2 text-white/50";
const inputClass =
  "h-9 border-0 border-b border-white/25 rounded-none pl-6 pr-0 shadow-none bg-transparent text-white shadow-none focus-visible:ring-0 focus-visible:border-[#3b82f6] placeholder:text-white/40";
const descriptionClass = "text-white/50";
const chipClass =
  "inline-flex max-w-full items-center gap-2 rounded-lg bg-white/10 border border-white/15 px-2.5 py-1 text-sm text-white";
const chipIconClass = "size-4 shrink-0 text-[#3b82f6]";
const chipCloseClass =
  "text-white/50 transition-colors hover:text-red-400 focus:outline-none";

function toFieldErrors(errors: unknown[]) {
  return errors
    .filter((error): error is string | { message?: string } => Boolean(error))
    .map((error) => (typeof error === "string" ? { message: error } : error));
}

export default function DoctorApplyForm() {
  const { mutate: apply, isPending: applyPending } = useApplyAsDoctor();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      specialization: "",
      licenseNumber: "",
      qualifications: "",
      experienceYears: "",
      consultationFee: "",
      bio: "",
      resume: null as File | null,
      additionalFiles: [] as File[],
    },

    validators: {
      onSubmit: applyAsDoctorSchema,
    },

    onSubmit: async ({ value }) => {
      const trimmedAddress = value.address.trim();
      const trimmedBio = value.bio.trim();
      const trimmedPhone = value.phone.trim();

      const doctorData: DoctorApplicationData = {
        user: {
          name: value.name.trim(),
          email: value.email.trim(),
        },
        doctor: {
          specialization: value.specialization.trim(),
          licenseNumber: value.licenseNumber.trim(),
          qualifications: value.qualifications.trim(),
          experienceYears: Number(value.experienceYears),
          contactNumber: trimmedPhone,
          address: trimmedAddress,
          consultationFee: value.consultationFee.trim()
            ? Number(value.consultationFee)
            : undefined,
          bio: trimmedBio,
        },
      };

      apply(
        {
          data: doctorData,
          resume: value.resume as File,
          additionalFiles: value.additionalFiles,
        },
        {
          onSuccess: (res) => {
            console.log(res);
          },
        },
      );
    },
  });

  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Apply to join <span className="text-blue-800">MediSync</span>
        </h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        noValidate
      >
        <FieldGroup>
          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) => {
                  const result =
                    applyAsDoctorSchema.shape.name.safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
            >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className={labelClass}>
                      Full name
                    </FieldLabel>
                    <div className="relative">
                      <User className={iconClass} />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="Dr. John Doe"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className={inputClass}
                        autoComplete="name"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError
                        errors={toFieldErrors(field.state.meta.errors)}
                      />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  const result =
                    applyAsDoctorSchema.shape.email.safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
            >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className={labelClass}>
                      Email address
                    </FieldLabel>
                    <div className="relative">
                      <Mail className={iconClass} />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        placeholder="doctor@example.com"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className={inputClass}
                        autoComplete="email"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError
                        errors={toFieldErrors(field.state.meta.errors)}
                      />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field
              name="phone"
              validators={{
                onChange: ({ value }) => {
                  const result =
                    applyAsDoctorSchema.shape.phone.safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
            >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className={labelClass}>
                      Contact number
                    </FieldLabel>
                    <div className="relative">
                      <Phone className={iconClass} />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="tel"
                        placeholder="+880 1712 345678"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className={inputClass}
                        autoComplete="tel"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError
                        errors={toFieldErrors(field.state.meta.errors)}
                      />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field
              name="address"
              validators={{
                onChange: ({ value }) => {
                  const result =
                    applyAsDoctorSchema.shape.address.safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
            >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className={labelClass}>
                      Practice address{" "}
                      <span className={subLabelClass}>(optional)</span>
                    </FieldLabel>
                    <div className="relative">
                      <MapPin className={iconClass} />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="Chamber or hospital address"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className={inputClass}
                        autoComplete="street-address"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError
                        errors={toFieldErrors(field.state.meta.errors)}
                      />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field
              name="specialization"
              validators={{
                onChange: ({ value }) => {
                  const result =
                    applyAsDoctorSchema.shape.specialization.safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
            >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className={labelClass}>
                      Specialization
                    </FieldLabel>
                    <div className="relative">
                      <Stethoscope className={iconClass} />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="Cardiology"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className={inputClass}
                      />
                    </div>
                    {isInvalid && (
                      <FieldError
                        errors={toFieldErrors(field.state.meta.errors)}
                      />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field
              name="licenseNumber"
              validators={{
                onChange: ({ value }) => {
                  const result =
                    applyAsDoctorSchema.shape.licenseNumber.safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
            >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className={labelClass}>
                      BMDC registration number
                    </FieldLabel>
                    <div className="relative">
                      <BadgeCheck className={iconClass} />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="A-12345"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className={inputClass}
                      />
                    </div>
                    {isInvalid && (
                      <FieldError
                        errors={toFieldErrors(field.state.meta.errors)}
                      />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field
              name="qualifications"
              validators={{
                onChange: ({ value }) => {
                  const result =
                    applyAsDoctorSchema.shape.qualifications.safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
            >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className={labelClass}>
                      Qualifications
                    </FieldLabel>
                    <div className="relative">
                      <GraduationCap className={iconClass} />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="MBBS, FCPS (Medicine)"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className={inputClass}
                      />
                    </div>
                    {isInvalid && (
                      <FieldError
                        errors={toFieldErrors(field.state.meta.errors)}
                      />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field
              name="experienceYears"
              validators={{
                onChange: ({ value }) => {
                  const result =
                    applyAsDoctorSchema.shape.experienceYears.safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
            >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className={labelClass}>
                      Years of experience
                    </FieldLabel>
                    <div className="relative">
                      <BriefcaseMedical className={iconClass} />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        min={0}
                        max={70}
                        inputMode="numeric"
                        placeholder="10"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className={inputClass}
                      />
                    </div>
                    {isInvalid && (
                      <FieldError
                        errors={toFieldErrors(field.state.meta.errors)}
                      />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field
              name="consultationFee"
              validators={{
                onChange: ({ value }) => {
                  if (!value.trim()) return undefined;
                  const result =
                    applyAsDoctorSchema.shape.consultationFee.safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
            >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className={labelClass}>
                      Consultation fee (BDT){" "}
                      <span className={subLabelClass}>(optional)</span>
                    </FieldLabel>
                    <div className="relative">
                      <Banknote className={iconClass} />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        min={0}
                        step="0.01"
                        inputMode="decimal"
                        placeholder="1000"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className={inputClass}
                      />
                    </div>
                    {isInvalid && (
                      <FieldError
                        errors={toFieldErrors(field.state.meta.errors)}
                      />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          <form.Field name="bio">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name} className={labelClass}>
                    Professional bio{" "}
                    <span className={subLabelClass}>(optional)</span>
                  </FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    rows={4}
                    placeholder="Share your background, areas of interest and patient care philosophy..."
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    className="border-0 border-b border-white/25 rounded-none bg-transparent px-0 text-white shadow-none focus-visible:ring-0 focus-visible:border-[#3b82f6] placeholder:text-white/40"
                  />
                  <div className="flex items-center justify-between gap-2">
                    <FieldDescription className={descriptionClass}>
                      Shown on your public profile after approval.
                    </FieldDescription>
                    <span className="text-xs text-white/50">
                      {field.state.value.length}/1000
                    </span>
                  </div>
                  {isInvalid && (
                    <FieldError
                      errors={toFieldErrors(field.state.meta.errors)}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          <form.Field
            name="resume"
            validators={{
              onChange: ({ value }) =>
                value ? undefined : "Resume is required",
            }}
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              const file = field.state.value;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="resume-field" className={labelClass}>
                    Resume
                  </FieldLabel>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      render={<label htmlFor="resume-field" />}
                      nativeButton={false}
                      variant="outline"
                      className="border-white/25 bg-transparent text-white hover:bg-[#3b82f6]/10 hover:border-[#3b82f6]/50 hover:text-white"
                    >
                      <FileUp size="4" />
                      Upload resume
                    </Button>
                    <input
                      id="resume-field"
                      type="file"
                      className="sr-only"
                      name={field.name}
                      onChange={(e) => {
                        const selected = e.target.files?.[0] ?? null;

                        if (
                          selected &&
                          (!isAcceptedFileSize(selected.size) ||
                            !isAcceptedFileType(selected.type))
                        ) {
                          field.handleBlur();
                          return;
                        }

                        field.handleChange(selected);
                        e.target.value = "";
                      }}
                    />
                    {file ? (
                      <span className={chipClass}>
                        <FileText className={chipIconClass} />
                        <span className="truncate">{file.name}</span>
                        <span className="text-xs text-white/50">
                          {formatFileSize(file.size)}
                        </span>
                        <button
                          type="button"
                          aria-label="Remove resume"
                          onClick={() => {
                            field.handleChange(null);
                            field.handleBlur();
                          }}
                          className={chipCloseClass}
                        >
                          <X className="size-4" />
                        </button>
                      </span>
                    ) : (
                      <span className="text-xs text-white/50">
                        PDF, DOC, DOCX or image up to {MAX_FILE_SIZE} MB
                      </span>
                    )}
                  </div>
                  {isInvalid && (
                    <FieldError
                      errors={toFieldErrors(field.state.meta.errors)}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="additionalFiles">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              const files = field.state.value;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    htmlFor="additional-file-field"
                    className={labelClass}
                  >
                    Additional Documents{" "}
                    <span className={subLabelClass}>(optional)</span>
                  </FieldLabel>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      render={<label htmlFor="additional-file-field" />}
                      nativeButton={false}
                      variant="outline"
                      className="border-white/25 bg-transparent text-white hover:bg-[#3b82f6]/10 hover:border-[#3b82f6]/50 hover:text-white"
                    >
                      <Plus size="4" />
                      Add Files
                    </Button>
                    <input
                      id="additional-file-field"
                      type="file"
                      multiple
                      className="sr-only"
                      name={field.name}
                      onChange={(e) => {
                        const incoming = Array.from(e.target.files ?? []);

                        if (incoming.length === 0) {
                          return;
                        }

                        const invalid = incoming.some(
                          (file) =>
                            !isAcceptedFileSize(file.size) ||
                            !isAcceptedFileType(file.type),
                        );

                        if (invalid) {
                          field.handleBlur();
                          e.target.value = "";
                          return;
                        }

                        field.handleChange([...files, ...incoming]);
                      }}
                    />
                    {files.length > 0 && (
                      <span className="text-xs text-white/50">
                        {files.length} of {MAX_ADDITIONAL_FILES} added
                      </span>
                    )}
                  </div>
                  {files.length > 0 && (
                    <ul className="flex flex-col gap-2">
                      {files.map((file, index) => (
                        <li
                          key={`${file.name}-${index}`}
                          className="flex items-center justify-between gap-2 rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-sm text-white"
                        >
                          <span className="flex min-w-0 items-center gap-2">
                            <FileText className={chipIconClass} />
                            <span className="truncate">{file.name}</span>
                            <span className="text-xs text-white/50">
                              {formatFileSize(file.size)}
                            </span>
                          </span>
                          <button
                            type="button"
                            aria-label={`Remove ${file.name}`}
                            onClick={() => {
                              field.handleChange(
                                files.filter((_, i) => i !== index),
                              );
                              field.handleBlur();
                            }}
                            className={chipCloseClass}
                          >
                            <X className="size-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {isInvalid && (
                    <FieldError
                      errors={toFieldErrors(field.state.meta.errors)}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>
        <div className="flex justify-end w-full mt-5">
          <Button
            type="submit"
            size="lg"
            disabled={applyPending}
            className="rounded-lg bg-[#3b82f6] text-white hover:bg-[#2563eb] shadow-md shadow-blue-500/20"
          >
            {applyPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
      <p className="text-xs leading-relaxed text-white/50">
        Already an approved doctor?{" "}
        <Link
          href="/login"
          className="font-medium text-[#3b82f6] hover:underline"
        >
          Sign in to the Doctor Portal
        </Link>
        . Patient applications should use the{" "}
        <Link
          href="/register"
          className="font-medium text-[#3b82f6] hover:underline"
        >
          patient registration
        </Link>{" "}
        form instead.
      </p>
    </div>
  );
}
