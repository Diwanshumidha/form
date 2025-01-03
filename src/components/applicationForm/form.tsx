import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControlsProvider } from "./hooks/useForm";
import { Form } from "../ui/form";
import FormHeader from "./formHeader";
const steps = [
  {
    id: "1",
    title: "Personal Information",
    component: <p>Personal Information</p>,
    inputs: ["firstName", "lastName", "email", "phone"],
  },
  {
    id: "2",
    title: "Address",
    component: <p>Address</p>,
    inputs: ["country", "state", "city", "address", "zip"],
  },
  {
    id: "3",
    title: "Work Experience",
    component: <p>Personal Information</p>,
    inputs: ["jobs"],
  },
  {
    id: "4",
    title: "Skills",
    component: <p>Personal Information</p>,
    inputs: ["skills"],
  },
  {
    id: "5",
    title: "Preferences",
    component: <p>Personal Information</p>,
    inputs: ["jobLocation", "expectedSalary"],
  },
  {
    id: "6",
    title: "Social Links",
    component: <p>Personal Information</p>,
    inputs: ["linkedin", "github", "portfolio"],
  },
];

const jobSchema = z.object({
  title: z.string(),
  company: z.string(),
  from: z.date(),
  to: z.date(),
  description: z.string(),
});
// TODO: Add a file upload schema
const formSchema = z.object({
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
  skills: z.array(
    z.object({
      name: z.string(),
      level: z.enum(["beginner", "intermediate", "advanced"]),
    })
  ),
});

export type Step = (typeof steps)[number];

const ApplicationForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <FormControlsProvider steps={steps}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormHeader steps={steps} />
          <button type="submit">Submit</button>
        </form>
      </Form>
    </FormControlsProvider>
  );
};

export default ApplicationForm;
