import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { load } from 'cheerio'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidEmail = async (email: string) => {
  try {
    const isDisposableResponse = await fetch(
      `https://open.kickbox.com/v1/disposable/${email}`,
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



export type GitHubProfile = {
  avatar_url: string
  login: string
  bio: string
}

export type PageMetadata = {
  title: string
  description: string
  image: string
}


export async function fetchGitHubProfile(url: string): Promise<GitHubProfile | null> {
  try {
    const username = url.split('/').pop()
    if (!username) return null
    
    const response = await fetch(`https://api.github.com/users/${username}`)
    if (!response.ok) return null
    
    const data = await response.json()
    return {
      avatar_url: data.avatar_url,
      login: data.login,
      bio: data.bio || ''
    }
  } catch (error) {
    console.error('Error fetching GitHub profile:', error)
    return null
  }
}

export async function fetchPageMetadata(url: string): Promise<PageMetadata | null> {
  try {
    const response = await fetch(url)
    const html = await response.text()

    const $ = load(html)
    
    return {
      title: $('title').text() || $('meta[property="og:title"]').attr('content') || '',
      description: $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || '',
      image: $('meta[property="og:image"]').attr('content') || ''
    }
  } catch (error) {
    console.error('Error fetching page metadata:', error)
    return null
  }
}


export function debounce<T extends (...args: string[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}


