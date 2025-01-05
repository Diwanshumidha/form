"use client";
import type React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControlsProvider } from "./hooks/useForm";
import { Form } from "../ui/form";
import FormHeader from "./formHeader";
import FormFooter from "./formFooter";
import RenderComponent from "./renderComponent";
import PersonalInformation from "./steps/personalInformation";
import { formSchema, type FormSchemaType } from "./schema";
import AddressInformation from "./steps/addressInformation";
import WorkExperience from "./steps/workExperience";
import { z } from "zod";
import SocialLinks from "./steps/socialLinks";

export type Step = {
  id: string;
  title: string;
  description?: string;
  component: () => React.JSX.Element;
  inputs: (keyof FormSchemaType)[];
};

const steps = [
  {
    id: "1",
    title: "Personal Information",
    component: PersonalInformation,
    description:
      "Enter your personal information. This information will be used to contact you.",
    inputs: ["firstName", "lastName", "email", "phone"],
  },
  {
    id: "2",
    title: "Address",
    description: "Enter your address information.",
    component: AddressInformation,
    inputs: ["country", "state", "city", "address", "zip", "timezone"],
  },
  {
    id: "3",
    title: "Work Experience",
    description:
      "Enter your work experience. This information will be used to evaluate your application.",
    component: WorkExperience,
    inputs: ["jobs"],
  },
  {
    id: "4",
    title: "Social Links",
    description:
      "Enter your social links. This information helps us to know more about you.",
    component: SocialLinks,
    inputs: ["linkedin", "github", "portfolio"],
  },
] satisfies Step[];

const ApplicationForm = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "Diwanshu",
      lastName: "Midha",
      email: "saidiwanhu@gmail.com",
      phone: "+917404729838",
      country: "in",
      state: "haryana",
      city: "ambala",
      address: "sadasd dasd asd asd asd asd asd as dasd",
      zip: "145552",
      jobs: [{company:"", title:"", from:new Date(), to:new Date(), description:""}],
      linkedin: "",
      github: "",
      portfolio: "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });

  function onSubmit(values: FormSchemaType) {
    console.log(values);
  }

  return (
    <FormControlsProvider steps={steps}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 h-svh py-20 flex flex-col justify-between"
        >
          <FormHeader steps={steps} />
          <RenderComponent steps={steps} />
          <FormFooter steps={steps} />
        </form>
      </Form>
    </FormControlsProvider>
  );
};

export default ApplicationForm;
