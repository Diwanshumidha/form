import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidEmail = async (email: string) => {
  try {
    const isDisposableResponse = await fetch(
      `https://open.kickbox.com/v1/disposable/${email}`
    );
    const isDisposable = await isDisposableResponse.json();
    if (isDisposable?.disposable) {
      return false;
    }

    return true;
  } catch {
    return true;
  }
};

export const fetchAddress = async (latitude: number, longitude: number) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "YourAppName/1.0" }, // Provide a User-Agent
    });
    const data = await response.json();

    // Extract necessary fields
    const address = data.address || {};

    return {
      city: address?.city || "",
      state: address?.state || "",
      country: address?.country_code || "",
      zip: address?.postcode || "",
    };
  } catch (error) {
    console.error("Error fetching address:", error);
    return {};
  }
};
