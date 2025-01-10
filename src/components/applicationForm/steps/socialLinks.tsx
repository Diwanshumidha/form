import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AnimatePresence } from "framer-motion";
import { GitHubPreview } from "../githubProfile";
import { PortfolioPreview } from "../portfolioPreview";
import { debounce, fetchGitHubProfile, fetchPageMetadata } from "@/lib/utils";

import type React from "react";
import type { FormSchemaType } from "../schema";
import type { PageMetadata, GitHubProfile } from "@/lib/utils";
import type { ControllerRenderProps } from "react-hook-form";

const SocialLinks = () => {
  const { control, getValues } = useFormContext<FormSchemaType>();
  const [githubData, setGithubData] = useState<GitHubProfile | null>(null);

  const [portfolioData, setPortfolioData] = useState<PageMetadata | null>(null);

  const debouncedFetchGitHubProfile = useCallback(
    debounce(async (url: string) => {
      const data = await fetchGitHubProfile(url);
      setGithubData(data);
    }, 1000),
    []
  );

  const debouncedFetchPageMetadata = useCallback(
    debounce(async (url: string) => {
      const data = await fetchPageMetadata(url);
      setPortfolioData(data);
    }, 1000),
    []
  );

  useEffect(() => {
    const githubUrl = getValues("github");
    const portfolioUrl = getValues("portfolio");

    if (githubUrl?.includes("github.com")) {
      debouncedFetchGitHubProfile(githubUrl);
    }
    if (portfolioUrl?.includes("http")) {
      debouncedFetchPageMetadata(portfolioUrl);
    }
  }, [debouncedFetchGitHubProfile, debouncedFetchPageMetadata, getValues]);

  const handleGitHubChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FormSchemaType, "github">
  ) => {
    field.onChange(e);
    const url = e.target.value;
    if (!url.includes("github.com")) return;
    debouncedFetchGitHubProfile(url);
  };

  const handlePortfolioChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FormSchemaType, "portfolio">
  ) => {
    field.onChange(e);
    const url = e.target.value;
    if (!url.startsWith("http")) return;
    debouncedFetchPageMetadata(url);
  };

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
                onChange={(e) => handleGitHubChange(e, field)}
              />
            </FormControl>
            <AnimatePresence>
              {githubData && <GitHubPreview {...githubData} />}
            </AnimatePresence>
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
                onChange={(e) => handlePortfolioChange(e, field)}
              />
            </FormControl>
            <AnimatePresence>
              {portfolioData && <PortfolioPreview {...portfolioData} />}
            </AnimatePresence>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SocialLinks;
