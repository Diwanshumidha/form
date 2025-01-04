import { isValidEmail } from "@/lib/utils";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

const jobSchema = z.object({
  title: z.string(),
  company: z.string(),
  from: z.date(),
  to: z.date(),
  description: z.string(),
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
  country: z.string(),
  state: z.string(),
  city: z.string(),
  address: z.string(),
  zip: z.string(),
  jobs: z.array(jobSchema),
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
