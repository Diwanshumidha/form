import { z } from "zod";

const jobSchema = z.object({
    title: z.string(),
    company: z.string(),
    from: z.date(),
    to: z.date(),
    description: z.string(),
  });
  // TODO: Add a file upload schema
export const formSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string(),
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
  
  export type FormSchemaType = z.infer<typeof formSchema>
  
  
  