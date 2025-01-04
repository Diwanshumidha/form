import { Loader2, MapPin } from "lucide-react";
import React from "react";
import {
  ControllerRenderProps,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { FormSchemaType } from "../schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchAddress } from "@/lib/utils";
import { Country, countryNames } from "@/lib/countries";

const AddressInformation = () => {
  const [isAutofillActive, setIsAutofillActive] = React.useState(false);
  const { control, setValue } = useFormContext<FormSchemaType>();

  const { country, state } = useWatch({
    control,
  });

  const handleAutofill = async () => {
    try {
      console.log("Starting Autofill...");
      setIsAutofillActive(true);

      // Get user's location
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
      );

      const { latitude, longitude } = position.coords;
      console.log(`Location: Latitude ${latitude}, Longitude ${longitude}`);

      // Fetch address based on location
      const address = await fetchAddress(latitude, longitude);
      console.log("Address:", address);

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      setValue("address", address?.city || "");
      setValue("country", address?.country || "");
      // setValue("state", address?.state || "");
      setValue("zip", address?.zip || "");
      // setValue("city", address?.city || "");
      setValue("timezone", timezone);
    } catch (error) {
      console.error("Autofill failed:", error);
    } finally {
      setIsAutofillActive(false);
    }
  };

  const onCountryChange = (
    value: string,
    field: ControllerRenderProps<FormSchemaType, "country">
  ) => {
    console.log(value);
    field.onChange(value);
    setValue("state", "");
    setValue("city", "");
  };

  const onStateChange = (
    value: string,
    field: ControllerRenderProps<FormSchemaType, "state">
  ) => {
    console.log({ value });
    field.onChange(value);
    setValue("city", "");
  };

  return (
    <div className="w-full grid grid-cols-12 gap-4 ">
      <FormField
        control={control}
        name="address"
        render={({ field }) => (
          <FormItem className="space-y-3 col-span-12">
            <FormLabel className="flex items-center">Address</FormLabel>
            <div className="flex gap-4 items-center">
              <FormControl>
                <Input
                  type="address"
                  placeholder="Enter your street address"
                  className="flex-grow"
                  id="address"
                  {...field}
                />
              </FormControl>
              <Button type="button" onClick={handleAutofill} disabled={isAutofillActive} aria-busy={isAutofillActive} aria-label="Autofill address" >
                {isAutofillActive ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                  <MapPin className="h-4 w-4" />
                )}
              </Button>
            </div>

            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-2 col-span-4">
        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="flex items-center">Country</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(v) => onCountryChange(v.toLowerCase(), field)}
                  value={field.value}
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryNames.map((country) => (
                      <SelectItem
                        key={country.code}
                        value={country.code.toLowerCase()}
                      >
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2 col-span-4">
        <FormField
          control={control}
          name="state"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="flex items-center">
                State/Province
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={(v) => onStateChange(v.toLowerCase(), field)}
                  disabled={field.disabled || !country}
                  name={field.name}
                  value={field.value}
                >
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {country &&
                      Country.getStateNames(country).map((state) => (
                        <SelectItem key={state} value={state.toLowerCase()}>
                          {state}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2 col-span-4">
        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="flex items-center">City</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(v) => field.onChange(v.toLowerCase())}
                  value={field.value}
                  disabled={field.disabled || !country || !state}
                >
                  <SelectTrigger id="city">
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent>
                    {state &&
                      country &&
                      Country.getCityNames(country, state).map((city) => (
                        <SelectItem key={city} value={city.toLowerCase()}>
                          {city}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2 col-span-6">
        <FormField
          control={control}
          name="zip"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="flex items-center">
                ZIP/Postal Code
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your ZIP/Postal code"
                  id="zip"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2 col-span-6">
        <FormField
          control={control}
          name="timezone"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="flex items-center">Timezone</FormLabel>
              <FormControl>
                <Input
                  disabled
                  id="timezone"
                  placeholder="Enter your Timezone"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default AddressInformation;
