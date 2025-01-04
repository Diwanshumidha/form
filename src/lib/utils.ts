import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const isValidEmail = async (email: string) => {
  const isDisposableResponse = await fetch(`https://open.kickbox.com/v1/disposable/${email}`)
  const isDisposable = await isDisposableResponse.json()
  if (isDisposable?.disposable) {
    return false
  }
  
  return true
}