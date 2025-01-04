import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { FormSchemaType } from "../schema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, PlusCircle, Trash } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

const WorkExperience = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormSchemaType>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "jobs",
  });

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <Job key={field.id} field={field} index={index} remove={remove} />
      ))}
      <p className="text-destructive">
        {errors.jobs ? errors.jobs.message : null}
      </p>

      <button
        onClick={() =>
          append({
            title: "",
            company: "",
            from: new Date(),
            to: new Date(),
            description: "",
          })
        }
        type="button"
        className="flex items-center space-x-2 text-purple-700 hover:text-purple-700/80 hover:underline"
      >
        <PlusCircle className="size-4 mr-2" /> Add Job
      </button>
    </div>
  );
};

const Job = ({
  index,
  remove,
}: {
  field: Record<"id", string>;
  index: number;
  remove: (index: number) => void;
}) => {
  const { control } = useFormContext<FormSchemaType>();

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      layout
      className="bg-neutral-800 p-4 rounded-lg space-y-3"
    >
      <div className="w-full flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-100">
          Job #{index + 1}
        </h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => remove(index)}
          className="text-destructive hover:text-destructive/40"
        >
          <span className="sr-only">Remove this Job Experience</span>
          <Trash className="h-4 w-4" />
        </motion.button>
      </div>
      <div className="grid grid-cols-12 gap-4 ">
        <FormField
          control={control}
          name={`jobs.${index}.title`}
          render={({ field }) => (
            <FormItem className="space-y-3 col-span-3">
              <FormLabel className="flex items-center">Job Title</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Job Title "
                  className="flex-grow border-neutral-700"
                  id="job-title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`jobs.${index}.company`}
          render={({ field }) => (
            <FormItem className="space-y-3 col-span-3">
              <FormLabel className="flex items-center">Company</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Company"
                  className="flex-grow border-neutral-700"
                  id="company"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`jobs.${index}.from`}
          render={({ field }) => (
            <FormItem className="space-y-3 col-span-3">
              <FormLabel className="flex items-center">From</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        type="button"
                        variant={"outline"}
                        className={cn(
                          " w-full pl-3 text-left font-normal border-neutral-700 bg-accent",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`jobs.${index}.to`}
          render={({ field }) => (
            <FormItem className="space-y-3 col-span-3">
              <FormLabel className="flex items-center">To</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        type="button"
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal border-neutral-700 bg-accent",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date.getTime() >
                          new Date().setFullYear(
                            new Date().getFullYear() + 7,
                          ) || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`jobs.${index}.description`}
          render={({ field }) => (
            <FormItem className="space-y-3 col-span-12">
              <FormLabel className="flex items-center">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description"
                  className="flex-grow border-neutral-700"
                  id="description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </motion.div>
  );
};

export default WorkExperience;
