import React from "react";
import { useFormControls } from "./hooks/useForm";
import { Step } from "./form";
import {  motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { FormSchemaType } from "./schema";
import { toast } from "sonner";

const FormHeader = ({ steps }: { steps: Step[] }) => {
  const { currentPageIndex, setPage } = useFormControls();
  const {
    trigger,
    formState: { errors },
  } = useFormContext<FormSchemaType>();

  return (
    <div className="flex justify-between px-7  gap-6">
      {steps.map((step, idx) => {
        const isEnabled =
          idx > currentPageIndex + 1 || idx === currentPageIndex; // Only Next one button and all prev buttons are enabled

        const hasError = step.inputs.some((key) => errors[key] !== undefined);

        return (
          <button
            type="button"
            disabled={isEnabled}
            onClick={async () => {
              const res = await trigger(steps[currentPageIndex].inputs, {shouldFocus: true});
              if (!res) {
                toast.error("Please fill the required fields");
                return;
              }

              setPage(idx);
            }}
            className={cn(
              "w-full flex flex-col  disabled:cursor-default text-left gap-2 ",
              idx <= currentPageIndex && "text-purple-600",
              idx > currentPageIndex && "opacity-50",
              hasError && "text-red-600"
            )}
            key={step.id}
          >
            <p>
              {idx + 1}. {step.title}
            </p>

            <motion.div className="w-full h-3 bg-purple-600/50 relative rounded-sm">
              <motion.div
                initial={{ width: "0%" }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 50, // Lower value makes it less bouncy
                }}
                animate={{
                  width: `${
                    idx === currentPageIndex
                      ? "100%"
                      : idx < currentPageIndex
                      ? "100%"
                      : "0%"
                  }`,
                }}
                className={cn(
                  "h-full rounded-sm",
                  hasError ? "bg-red-600" : "bg-purple-600"
                )}
              />
            </motion.div>
          </button>
        );
      })}
    </div>
  );
};

export default FormHeader;
