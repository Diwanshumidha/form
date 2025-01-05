import { isValidEmail } from "@/lib/utils";
import { isValidPhoneNumber,  } from "react-phone-number-input";
import { z } from "zod";

const jobSchema = z.object({
  title: z.string().min(2).max(70),
  company: z.string().min(2).max(70),
  from: z.date(),
  to: z.date(),
  description: z.string().min(2).max(500),
}).refine(
  (data) => !data.from || !data.to || data.from <= data.to,
  { message: "End date must be after start date", path:["to"] }
);

const EmailValidationSchema = z
  .string()
  .email()
  .superRefine(async (email, ctx) => {
    const isAvailable = await isValidEmail(email);
    if (!isAvailable) {
      ctx.addIssue({
        code: "custom",
        message: "You can't use a disposable email address",
      });
    }

    const hasAddSign = email.includes("+");
    if (hasAddSign) {
      ctx.addIssue({
        code: "custom",
        message: "You can't use a (+) Symbol in the email address",
      });
    }


    const isSubDomainEmail = email.split("@")[1].split(".").length > 2;
    if (isSubDomainEmail) {
      ctx.addIssue({
        code: "custom",
        message: "You can't use a sub-domain email address",
      });
    }
  });

// TODO: Add a file upload schema
export const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(70, { message: "First name must be at most 70 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(70, { message: "Last name must be at most 70 characters" }),
  email: EmailValidationSchema,
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters" })
    .max(70, { message: "Country must be at most 70 characters" }),
  state: z
    .string()
    .min(2, { message: "State must be at least 2 characters" })
    .max(70, { message: "State must be at most 70 characters" }),
  city: z
    .string()
    .min(2, { message: "City must be at least 2 characters" })
    .max(70, { message: "City must be at most 70 characters" }),
  address: z
    .string()
    .min(2, { message: "Address must be at least 2 characters" })
    .max(100, { message: "Address must be at most 100 characters" }),
  zip: z
    .string()
    .regex(/^\d{4,10}$/, { message: "ZIP code must be between 4 and 10 digits" }),
  timezone: z.string().optional(),
  jobs: z
    .array(jobSchema)
    .min(1, { message: "At least one job must be provided" }),
  linkedin: z
    .string()
    .url({ message: "Invalid URL format" })
    .refine((url) => url.includes("linkedin"), { message: "Must be a valid LinkedIn URL" }),
  github: z
    .string()
    .url({ message: "Invalid URL format" })
    .refine((url) => url.includes("github"), { message: "Must be a valid GitHub URL" }),
  portfolio: z.string().url({ message: "Invalid portfolio URL" }),
});

export type FormSchemaType = z.infer<typeof formSchema>;
