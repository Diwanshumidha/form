import { isValidEmail } from "@/lib/utils";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

const jobSchema = z.object({
  title: z.string().min(2).max(70),
  company: z.string().min(2).max(70),
  from: z.date(),
  to: z.date(),
  description: z.string().min(2).max(500),
});

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
  });

// TODO: Add a file upload schema
export const formSchema = z.object({
  firstName: z.string().min(2).max(70),
  lastName: z.string().min(2).max(70),
  email: EmailValidationSchema,
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  country: z.string().min(2).max(70),
  state: z.string().min(2).max(70),
  city: z.string().min(2).max(70),
  address: z.string().min(2).max(70),
  zip: z.string().min(2).max(20),
  timezone: z.string().optional(),
  jobs: z.array(jobSchema).min(1),
  expectedSalary: z.number(),
  linkedin: z.string().url(),
  github: z.string().url(),
  portfolio: z.string().url(),
  skills: z.array(
    z.object({
      name: z.string(),
      level: z.enum(["beginner", "intermediate", "advanced"]),
    })
  ),
});

export type FormSchemaType = z.infer<typeof formSchema>;
