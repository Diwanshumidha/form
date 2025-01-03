import React from "react";
import { useFormControls } from "./hooks/useForm";
import { Step } from "./form";

const FormHeader = ({ steps }: { steps: Step[] }) => {
  const {} = useFormControls();

  return (
    <div>
      {steps.map((step) => {
        return (
          <div key={step.id}>
            <h3>{step.title}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default FormHeader;
