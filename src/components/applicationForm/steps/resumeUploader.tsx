import DropzoneInput from "@/components/ui/dropzone";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { convertMetricsToBytes } from "@/lib/files";
import React from "react";
import { useFormContext } from "react-hook-form";
import { MAX_FILES, MAX_RESUME_SIZE_IN_BYTES, VALID_RESUME_FILE_EXTENSIONS, type FormSchemaType } from "../schema";

const ResumeUploader = () => {
  const [value, setValue] = React.useState<File[]>([]);

  const { control,getFieldState, formState } = useFormContext<FormSchemaType>();

  return (
    <div>
      <FormField
        control={control}
        name="resume"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <DropzoneInput
                value={field.value ?? []}
                onValueChange={field.onChange}
                maxFiles={MAX_FILES}
                allowedExtensions={VALID_RESUME_FILE_EXTENSIONS}
                maxSizeInBytes={MAX_RESUME_SIZE_IN_BYTES}
                multiple={MAX_FILES > 1}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ResumeUploader;
