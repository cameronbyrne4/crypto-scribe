import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Development toggle - use environment variable
const ENABLE_WAITLIST_MODE = import.meta.env.VITE_ENABLE_WAITLIST === 'true';

// Routing utility for production vs development
export function getAppRoute() {
  return ENABLE_WAITLIST_MODE ? "/waitlist" : "/app";
}