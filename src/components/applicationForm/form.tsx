"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControlsProvider } from "./hooks/useForm";
import { Form } from "../ui/form";
import FormHeader from "./formHeader";
import FormFooter from "./formFooter";
import RenderComponent from "./renderComponent";
import PersonalInformation from "./steps/personalInformation";
import { formSchema, FormSchemaType } from "./schema";
import AddressInformation from "./steps/addressInformation";

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
    component: PersonalInformation,
    inputs: ["jobs"],
  },
  {
    id: "4",
    title: "Skills",
    description:
      "Enter your skills. Skills must be related to the job you are applying for.",
    component: PersonalInformation,
    inputs: ["skills"],
  },
  {
    id: "5",
    title: "Preferences",
    description:
      "Enter your job preferences. This information will be used to match you with the right job and give you right position.",
    component: PersonalInformation,
    inputs: ["jobs", "expectedSalary"],
  },
  {
    id: "6",
    title: "Social Links",
    description:
      "Enter your social links. This information helps us to know more about you.",
    component: PersonalInformation,
    inputs: ["linkedin", "github", "portfolio"],
  },
] satisfies Step[];

const ApplicationForm = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues:{
        firstName:"",
        lastName:"",
        email:"",
        phone:"",
        country:"",
        state:"",
        city:"",
        address:"",
        zip:"",
        jobs:[],
        skills:[],
        expectedSalary: 300,
        linkedin:"",
        github:"",
        portfolio:""
    }
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
