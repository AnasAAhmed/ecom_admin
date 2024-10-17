import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const slugify = (title: string) => {
  return title
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")               // Replace spaces with hyphens
    .replace(/[|/]+/g, "-")             // Replace pipe and slashes with hyphen
    .replace(/[^\w-]+/g, "-")           // Replace non-word characters with '-'
    .replace(/-+/g, "-")                // Replace multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, "");            // Trim hyphens from the start and end
};

