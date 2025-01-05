import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useFormContext } from "react-hook-form";
import type { FormSchemaType } from "../schema";

const SocialLinks = () => {
  const { control } = useFormContext<FormSchemaType>();
  return (
    <div className="grid grid-cols-4 gap-4">
      <FormField
        control={control}
        name="github"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Github Profile</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Github Profile Link"
                id="github"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
       <FormField
        control={control}
        name="linkedin"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>LinkedIn Profile</FormLabel>
            <FormControl>
              <Input
                
                type="text"
                placeholder="Github Profile Link"
                id="linkedin"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
       <FormField
        control={control}
        name="portfolio"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Personal Portfolio</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Github Profile Link"
                id="portfolio"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SocialLinks;
